import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faCopy,
    faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { DOMSerializer } from '@tiptap/pm/model';
import 'tippy.js/dist/tippy.css';
import ToggleHeaderOptions from './ToggleHeaderOptions';

const iconStyle = { color: '#ffffff', fontSize: '1rem' };

const deleteTable = (editor, parentTable) => {
    if (parentTable) {
        editor.chain().focus().deleteTable().run();
    }
};

const copyTable = (editor, parentTable) => {
    if (parentTable) {
        const { schema } = editor.state;
        const tableNode = parentTable.node;
        const domSerializer = DOMSerializer.fromSchema(schema);

        const tableFragment = domSerializer.serializeFragment(tableNode.content);
        const tempDiv = document.createElement('div');

        tempDiv.appendChild(tableFragment);
        let htmlString = tempDiv.innerHTML;
        htmlString = `<table>${htmlString}</table>`;

        const blob = new Blob([htmlString], { type: 'text/html' });
        const clipboardItem = new ClipboardItem({ 'text/html': blob });

        navigator.clipboard.write([clipboardItem]);
    }
};

const TableOptions = ({ editor, parentTable }) => {
    const [showHeaderOptions, setShowHeaderOptions] = useState(false);

    const toggleHeaderOptions = () => {
        setShowHeaderOptions(!showHeaderOptions);
    };

    const handleHeaderOptionSelect = () => {
        setShowHeaderOptions(false);
    };
    
    return (
        <div className="table-options-menu">
            <button onClick={() => deleteTable(editor, parentTable)} title="Delete Table" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faTrashAlt} style={iconStyle} />
            </button>
            <button onClick={() => copyTable(editor, parentTable)} title="Copy Table" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faCopy} style={iconStyle} />
            </button>
            <button onClick={toggleHeaderOptions} title="Header Options" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faEllipsisH} style={iconStyle} />
            </button>
            {showHeaderOptions && (
                <ToggleHeaderOptions editor={editor} onOptionSelect={handleHeaderOptionSelect} />
            )}
        </div>
    );
};

export {TableOptions};