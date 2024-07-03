import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFill,
    faEraser,
    faTrashAlt,
    faArrowUp,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faCircle
} from '@fortawesome/free-solid-svg-icons';
import { COLOR_OPTIONS } from '../utils/colorOptions';



const DropdownContent = ({ editor, getPos, node, closeDropdown }) => {

    // Set the background color of the cell
    const setBackgroundColor = (color) => {
        editor.chain().focus().setCellAttribute('backgroundColor', color).run();
        closeDropdown();
    };

    // Clear the content of the cell
    const clearCell = () => {
        let nodeFrom = getPos();
        let nodeTo = nodeFrom + node.nodeSize;
        editor.chain().focus().command(({ tr }) => {
            tr.delete(nodeFrom + 2, nodeTo - 2);
            return true;
        }).run();
        closeDropdown();
    };

    // Delete the row
    const deleteRow = () => {
        editor.chain().focus().deleteRow().run();
        closeDropdown();
    };

    // Delete the column
    const deleteColumn = () => {
        editor.chain().focus().deleteColumn().run();
        closeDropdown();
    };

    // Add a row before the current row
    const addRowBefore = () => {
        editor.chain().focus().addRowBefore().run();
        closeDropdown();
    };

    // Add a row after the current row
    const addRowAfter = () => {
        editor.chain().focus().addRowAfter().run();
    };

    // Add a column before the current column
    const addColumnBefore = () => {
        editor.chain().focus().addColumnBefore().run();
        closeDropdown();
    };

    // Add a column after the current column
    const addColumnAfter = () => {
        editor.chain().focus().addColumnAfter().run();
    };

    const [colorsVisible, setColorsVisible] = useState(false);

    return (
        <ul className="popover-list">
            <li onMouseOver={() => setColorsVisible(true)}>
                <button>
                    <FontAwesomeIcon icon={faFill} style={{ marginRight: '0.5rem' }} /> Background Color
                </button>
                {colorsVisible && (
                    <div className="dropdown-colors-container">
                        <ul className="popover-colors">
                            {COLOR_OPTIONS.map(({ name, color }) => (
                                <li key={name}>
                                    <button onClick={() => setBackgroundColor(color)}>
                                        <FontAwesomeIcon icon={faCircle} style={{ color, marginRight: '0.5rem' }} /> {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </li>
            <li><button onMouseOver={() => setColorsVisible(false)} onClick={clearCell}><FontAwesomeIcon icon={faEraser} style={{ marginRight: '0.5rem' }} /> Clear Cell</button></li>
            <li><button onMouseOver={() => setColorsVisible(false)} onClick={deleteRow}><FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Delete Row</button></li>
            <li><button onMouseOver={() => setColorsVisible(false)} onClick={deleteColumn}><FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} /> Delete Column</button></li>
            <li><button onMouseOver={() => setColorsVisible(false)} onClick={addRowBefore}><FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '0.5rem' }} /> Add Row Above</button></li>
            <li><button onMouseOver={() => setColorsVisible(false)} onClick={addRowAfter}><FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '0.5rem' }} /> Add Row Below</button></li>
            <li><button onMouseOver={() => setColorsVisible(false)} onClick={addColumnBefore}><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5rem' }} /> Add Column Left</button></li>
            <li><button onMouseOver={() => setColorsVisible(false)} onClick={addColumnAfter}><FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '0.5rem' }} /> Add Column Right</button></li>
        </ul>
    );
};

export default DropdownContent;
