CMS.registerEditorComponent({
    id: "toc",
    label: "Table of contents",
    pattern: /{{< table-of-contents >}}/,
    toBlock: function (obj) {
        return `{{< table-of-contents >}}`;
    },
});