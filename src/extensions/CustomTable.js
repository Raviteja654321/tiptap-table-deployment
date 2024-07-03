import Table from '@tiptap/extension-table';
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import '@fortawesome/fontawesome-free/css/all.css';

const CustomTable = Table.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            resizable: true,
            HTMLAttributes: {
                style: `
                    border-collapse: collapse;
                    min-width: 100px;
                `,
            },
        };
    },
    addProseMirrorPlugins() {
        return [
            ...this.parent?.(),
            new Plugin({
                key: new PluginKey("addRowColumnButton"),
                props: {
                    decorations: ({ doc, selection }) => {
                        const decorations = [];
    
                        const addColumnRight = (pos) => {
                            console.log("Add column right clicked");
                            this.editor.commands.setTextSelection(pos);
                            this.editor.chain().focus(pos).addColumnAfter().run();
                        };
    
                        const addRowBelow = (pos) => {
                            console.log("Add row below clicked");
                            this.editor.commands.setTextSelection(pos);
                            this.editor.chain().focus(pos).addRowAfter().run();
                        };
    
                        doc.descendants((node, pos) => {
                            if ((node.type.name === "table" && selection.from > pos && selection.to < pos + node.nodeSize)) {
                                // Iterate through table rows and columns
                                node.content.forEach((row, rowIndex) => {
                                    row.content.forEach((cell, cellIndex) => {
                                        // Add row button
                                        if (cellIndex === 0) {
                                            const rowButtonPos = pos + cell.nodeSize + rowIndex + 1;
                                            const rowButtonDecoration = Decoration.widget(
                                                rowButtonPos,
                                                () => {
                                                    const button = document.createElement("button");
                                                    button.className = 'add-row-button';
                                                    button.innerHTML = '<div class="dot"></div>'; // Initially display a dot
                                                    button.id = `row-button-${rowButtonPos}`;
                                                    button.title = 'Add row'; // Tooltip using the title attribute
                                                    button.onclick = event => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        addRowBelow(rowButtonPos);
                                                    };
    
                                                    button.addEventListener('mouseenter', () => {
                                                        button.innerHTML = '<i class="fas fa-plus"></i>'; // Change to plus icon on hover
                                                    });
    
                                                    button.addEventListener('mouseleave', () => {
                                                        button.innerHTML = '<div class="dot"></div>'; // Revert back to dot on mouse leave
                                                    });
    
                                                    return button;
                                                },
                                                { side: -1 }
                                            );
                                            decorations.push(rowButtonDecoration);
                                        }
    
                                        // Add column button
                                        if (rowIndex === 0) {
                                            const columnButtonPos = pos + cell.nodeSize + cellIndex + 1;
                                            const columnButtonDecoration = Decoration.widget(
                                                columnButtonPos,
                                                () => {
                                                    const button = document.createElement("button");
                                                    button.className = 'add-column-button';
                                                    button.innerHTML = '<div class="dot"></div>'; // Initially display a dot
                                                    button.id = `column-button-${columnButtonPos}`;
                                                    button.title = 'Add column'; // Tooltip using the title attribute
                                                    button.onclick = event => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        addColumnRight(columnButtonPos);
                                                    };
    
                                                    button.addEventListener('mouseenter', () => {
                                                        button.innerHTML = '<i class="fas fa-plus"></i>'; // Change to plus icon on hover 
                                                    });
    
                                                    button.addEventListener('mouseleave', () => {
                                                        button.innerHTML = '<div class="dot"></div>'; // Revert back to dot on mouse leave
                                                    });
    
                                                    return button;
                                                },
                                                { side: -1 }
                                            );
                                            decorations.push(columnButtonDecoration);
                                        }
                                    });
                                });
                            }
                        });
    
                        return DecorationSet.create(doc, decorations);
                    }
                }
            })
        ];
    }    
});

export default CustomTable;
