import React from 'react';

const ToggleHeaderOptions = ({ editor, onOptionSelect }) => {
    const toggleHeaderRow = () => {
        editor.chain().focus().toggleHeaderRow().run();
        onOptionSelect();
    };

    const toggleHeaderColumn = () => {
        editor.chain().focus().toggleHeaderColumn().run();
        onOptionSelect();
    };

    return (
        <div className="toggle-header-options" style={{ position: 'absolute',width: '152px', left: 0, top: '32px', backgroundColor: '#333', padding: '5px', borderRadius: '3px' }}>
            <button 
                onClick={toggleHeaderColumn} 
                title="Toggle Header Column" 
                style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'white', display: 'block', textAlign: 'centre', padding: '5px', borderBottom: `1px solid grey` }}
            >
                 Toggle Header Column
            </button>
            <button 
                onClick={toggleHeaderRow} 
                title="Toggle Header Row" 
                style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'white', display: 'block', textAlign: 'centre', padding: '5px' }}
            >
                 Toggle Header Row
            </button>
        </div>
    );
};

export default ToggleHeaderOptions;