import TableCell from '@tiptap/extension-table-cell';
import TableCellNodeView from '../components/TableCellNodeView';
import { undo, redo, history } from '@tiptap/pm/history';
import { mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react';
import { keymap } from '@tiptap/pm/keymap';

const CustomTableCell = TableCell.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                style: `
                    position: relative;
                    height: 50px;
                    border: 2px solid #CFD5DA;
                    width: 150px;
                `,
                class: 'table-cell',
            }
        };
    },

    content: "block+",
    selectable: true,

    addAttributes() {
        return {
            ...this.parent?.(),
            colwidth: {
                default: null,
                renderHTML: attributes => {
                    return {
                        colwidth: attributes.colwidth,
                        style: attributes.colwidth ? `width: ${attributes.colwidth}px` : null
                    };
                },
                parseHTML: (element) => {
                    const colwidth = element.getAttribute("colwidth");
                    const value = colwidth ? [parseInt(colwidth, 10)] : null;
                    return value;
                },
            },
            backgroundColor: {
                default: null,
                renderHTML: attributes => {
                    return {
                        style: attributes.backgroundColor ? `background-color: ${attributes.backgroundColor}` : null
                    };
                },
                parseHTML: (element) => {
                    const backgroundColor = element.style.backgroundColor;
                    return backgroundColor || null;
                },
            }
        };
    },

    addProseMirrorPlugins() {
        return [
            history(),
            keymap({
                "Mod-z": undo,
                "Mod-y": redo,
                "Mod-Shift-z": redo,
            })
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(TableCellNodeView, { as: 'td', className: 'tableCell' });
    },

    parseHTML() {
        return [{ tag: "td" }];
    },

    renderHTML({ HTMLAttributes }) {
        const style = `${HTMLAttributes.style || ''} ${HTMLAttributes.backgroundColor ? `background-color: ${HTMLAttributes.backgroundColor};` : ''}`;
        return [
            "td",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { style }),
            0,
        ];
    },
});

export default CustomTableCell;
