import './styles.css';
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { TableMenu } from './extensions/TableMenu/TableMenu';
import CustomTable from './extensions/CustomTable';
import CustomTableHeader from './extensions/CustomTableHeader';
import CustomTableCell from './extensions/CustomTableCell';
import TableMenuExtension from './extensions/TableMenu/TableMenuExtension';
import { TableOptions } from './components/TableOptions';
import { findParentTable } from './utils/findParentTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faCode, faListUl, faListOl, faQuoteRight, faTable } from '@fortawesome/free-solid-svg-icons';

const TABLE_WRAPPER_STYLES = {
    border: '2px solid #ced4da',
    padding: '0px',
    overflowX: 'auto',
};

const Tiptap = () => {
    const [htmlContent, setHtmlContent] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            CustomTable,
            TableRow,
            TableHeader,
            CustomTableHeader,
            TableCell,
            CustomTableCell,
            TableMenuExtension,
        ],
        content: `
            <p>Hey There!! ...</p>
            <p></p>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Place</th>
                    <th>Animal</th>
                    <th>Thing</th>
                </tr>
                <tr>
                    <td>John Doe</td>
                    <td>New York</td>
                    <td>Cat</td>
                    <td>Toy</td>
                </tr>
                <tr>
                    <td>Jane Smith</td>
                    <td>Los Angeles</td>
                    <td>Dog</td>
                    <td>Ball</td>
                </tr>
                <tr>
                    <td>Michael Johnson</td>
                    <td>Chicago</td>
                    <td>Bird</td>
                    <td>Book</td>
                </tr>
            </table>

            <p></p>
        `,
        onCreate: ({ editor }) => {
            setHtmlContent(editor.getHTML());
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setHtmlContent(html);
        },
    });

    if (!editor) {
        return null;
    }

    const resolvedPos = editor.state.doc?.resolve(editor.state.selection.from);
    const parentTable = resolvedPos ? findParentTable(resolvedPos, (node) => node.type.name === 'table') : null;

    return (
        <div>
            <h1 className="mainHeader">Tiptap Interactive Table!</h1>
            <h2 className="secondaryHeader">Text Editor</h2>
            <div className="editorWrapper">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="toggleButton"
                    title="Toggle Bold"
                >
                    <FontAwesomeIcon icon={faBold} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="toggleButton"
                    title="Toggle Italic"
                >
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className="toggleButton"
                    title="Toggle Code"
                >
                    <FontAwesomeIcon icon={faCode} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className="toggleButton"
                    title="Toggle Bullet List"
                >
                    <FontAwesomeIcon icon={faListUl} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className="toggleButton"
                    title="Toggle Ordered List"
                >
                    <FontAwesomeIcon icon={faListOl} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className="toggleButton"
                    title="Toggle Blockquote"
                >
                    <FontAwesomeIcon icon={faQuoteRight} />
                </button>
                <button
                    onClick={() => editor.chain().focus().insertTable({ rows: 4, cols: 3, withHeaderRow: true }).run()}
                    className="toggleButton addTableButton"
                    title="Add a New Table"
                >
                    <FontAwesomeIcon icon={faTable} className="fa-icon" style={{ marginRight: '7px' }} />
                    Add Table
                </button>
            </div>

            <EditorContent className="editorContent" style={TABLE_WRAPPER_STYLES} editor={editor} />

            {editor && (
                <TableMenu editor={editor}>
                    <TableOptions editor={editor} parentTable={parentTable} />
                </TableMenu>
            )}

            <div className="editorHTMLWrapper">
                <div className="editorHTMLLeft">
                    <h2>Editor Content HTML:</h2>
                    <pre>{htmlContent}</pre>
                </div>
                <div className="editorHTMLRight">
                    <h2>Compiled Editor HTML:</h2>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }}/>
                </div>
            </div>
        </div>
    );
};

export default Tiptap;
