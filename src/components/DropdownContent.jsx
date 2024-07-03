import React, { useState, useEffect } from 'react';
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
import { colorOptions } from '../utils/colorOptions';

const DropdownContent = ({ editor, getPos, node, closeDropdown }) => {
    const [colorsVisible, setColorsVisible] = useState(false);
    const [performanceData, setPerformanceData] = useState({
        setBackgroundColor: [],
        clearCell: [],
        deleteRow: [],
        deleteColumn: [],
        addRowBefore: [],
        addRowAfter: [],
        addColumnBefore: [],
        addColumnAfter: []
    });

    const measurePerformance = (operationName, callback) => {
        const start = performance.now();
        callback();
        const end = performance.now();
        const duration = end - start;
        setPerformanceData(prevData => ({
            ...prevData,
            [operationName]: [...prevData[operationName], duration]
        }));
        console.log(`${operationName} took ${duration} ms`);
        return duration;
    };

    useEffect(() => {
        // Log average times on unmount
        return () => {
            Object.keys(performanceData).forEach(key => {
                const times = performanceData[key];
                if (times.length) {
                    const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
                    console.log(`Average time for ${key}: ${averageTime} ms`);
                }
            });
        };
    }, [performanceData]);

    const setBackgroundColor = (color) => {
        measurePerformance('setBackgroundColor', () => {
            editor.chain().focus().setCellAttribute('backgroundColor', color).run();
            closeDropdown();
        });
    };

    const clearCell = () => {
        measurePerformance('clearCell', () => {
            let nodeFrom = getPos();
            let nodeTo = nodeFrom + node.nodeSize;
            editor.chain().focus().command(({ tr }) => {
                tr.delete(nodeFrom + 2, nodeTo - 2);
                return true;
            }).run();
            closeDropdown();
        });
    };

    const deleteRow = () => {
        measurePerformance('deleteRow', () => {
            editor.chain().focus().deleteRow().run();
            closeDropdown();
        });
    };

    const deleteColumn = () => {
        measurePerformance('deleteColumn', () => {
            editor.chain().focus().deleteColumn().run();
            closeDropdown();
        });
    };

    const addRowBefore = () => {
        measurePerformance('addRowBefore', () => {
            editor.chain().focus().addRowBefore().run();
            closeDropdown();
        });
    };

    const addRowAfter = () => {
        measurePerformance('addRowAfter', () => {
            editor.chain().focus().addRowAfter().run();
        });
    };

    const addColumnBefore = () => {
        measurePerformance('addColumnBefore', () => {
            editor.chain().focus().addColumnBefore().run();
            closeDropdown();
        });
    };

    const addColumnAfter = () => {
        measurePerformance('addColumnAfter', () => {
            editor.chain().focus().addColumnAfter().run();
        });
    };

    return (
        <ul className="popover-list">
            <li onMouseOver={() => setColorsVisible(true)}>
                <button>
                    <FontAwesomeIcon icon={faFill} style={{ marginRight: '0.5rem' }} /> Background Color
                </button>
                {colorsVisible && (
                    <div className="dropdown-colors-container">
                        <ul className="popover-colors">
                            {colorOptions.map(({ name, color }) => (
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
