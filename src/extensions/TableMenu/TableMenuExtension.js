import { Extension } from "@tiptap/core"

import { TableMenuPlugin } from "./TableMenuPlugin"

const TableMenuExtension = Extension.create({
    name: "tableMenu",

    addOptions() {
        return {
            element: null,
            tippyOptions: {},
            pluginKey: "tableMenu",
            updateDelay: undefined,
            shouldShow: null
        }
    },

    addProseMirrorPlugins() {
        if (!this.options.element) {
            return []
        }

        return [
            TableMenuPlugin({
                pluginKey: this.options.pluginKey,
                editor: this.editor,
                element: this.options.element,
                tippyOptions: this.options.tippyOptions,
                updateDelay: this.options.updateDelay,
                shouldShow: this.options.shouldShow
            })
        ]
    }
})

export default TableMenuExtension;