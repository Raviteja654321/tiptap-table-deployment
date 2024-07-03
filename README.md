# Tiptap


## File structure

    public
    └── index.html

    src
    ├── components
    │   ├── DropdownContent.jsx
    │   ├── TableCellNodeView.jsx
    │   ├── TableOptions.jsx
    │   └── ToggleHeaderOptions.jsx
    ├── extensions
    │   ├── CustomTable.js
    │   ├── CustomTableCell.js
    │   ├── CustomTableHeader.js
    │   └── TableMenu
    │       ├─ TableMenu.js
    │       ├─ TableMenuPlugin.js
    │       └─ TableMenuExtension.js         
    ├── utils
    │   └── colorOptions.js
    ├── styles.css
    ├── App.js
    ├── index.js
    └── Tiptap.jsx

<hr>

# Table Extension Tasks

## View Styles
- Table styles should be applied as inline styles in the HTML.

## Resizing Columns
- Column resizing should be functional in the editor mode.
- Resize styles should be applied as inline styles in the HTML.

## Cell Popover
- Each cell should display a popover when focused.
- Popover should contain cell formatting options including:
  - Background color of the cell
  - Clear cell content
  - Delete row and column
  - Add row and column options:
    - Row: Add above, Add below
    - Column: Add left, Add right

## Cell Selection
- Ability to select a single cell.
- Ability to select a subset of the table:
  - Change the border color of the selected subset.

## Table Options
- Table options should be visible at the bottom of the table when:
  - The table is selected.
  - A cell within the table is focused.
- Table options should include:
  - Delete table
  - Cell options
  - Toggle header row
  - Toggle header column

## Insert Icons
- Icons for inserting columns or rows should appear when hovering between columns or rows.