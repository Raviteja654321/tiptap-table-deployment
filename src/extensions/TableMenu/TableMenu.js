import { TableMenuPlugin } from "./TableMenuPlugin"
import React, { useEffect, useState, useRef } from "react"
import { useCurrentEditor } from "@tiptap/react"

export const TableMenu = props => {
    const [element, setElement] = useState(null);
    const { editor: currentEditor } = useCurrentEditor();
    const tippyInstanceRef = useRef(null);

    useEffect(() => {
        if (!element) {
            return;
        }

        if (props.editor?.isDestroyed || currentEditor?.isDestroyed) {
            return;
        }

        const {
            pluginKey = "TableMenu",
            editor,
            tippyOptions = {},
            updateDelay,
            shouldShow = null
        } = props;

        const menuEditor = editor || currentEditor;

        if (!menuEditor) {
            console.warn(
                "TableMenu component is not rendered inside of an editor component or does not have editor prop."
            );
            return;
        }

        // Check if the Tippy instance already exists and reuse it
        if (!tippyInstanceRef.current) {
            const plugin = TableMenuPlugin({
                updateDelay,
                editor: menuEditor,
                element,
                pluginKey,
                shouldShow,
                tippyOptions
            });

            menuEditor.registerPlugin(plugin);
            tippyInstanceRef.current = plugin; // Store the plugin instance
        } else {
            // Update the existing Tippy instance
            tippyInstanceRef.current.editor = menuEditor;
            tippyInstanceRef.current.element = element;
            tippyInstanceRef.current.tippyOptions = tippyOptions;
        }

        return () => {
            if (menuEditor.isDestroyed) {
                menuEditor.unregisterPlugin(pluginKey);
                tippyInstanceRef.current = null; // Clear the reference on unmount
            }
        };
    }, [props, props.editor, currentEditor, element]);

    return (
        <div
            ref={setElement}
            className={props.className}
            style={{ visibility: "hidden" }}
        >
            {props.children}
        </div>
    );
};