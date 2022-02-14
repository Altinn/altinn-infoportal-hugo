CMS.registerEditorComponent({
    id: "exbandlargeid",
    label: "Accordion",
    collapsed: false,
    fields: [{
            name: "uuid",
            label: "ID",
            widget: "uuid",
        }, {
            name: "header",
            label: "Header",
            widget: "string",
        },
        {
            name: "body",
            label: "Innhold",
            widget: "markdown",
        }
    ],
    pattern: /{{% expandlarge id="(.*?)" header="(.*?)" %}}(.*?){{% \/expandlarge %}}/s,
    fromBlock: function (match) {
        return {
            uuid: match[1],
            header: match[2],
            body: match[3]
        }
    },
    toBlock: function (obj) {
        return `{{% expandlarge id="${obj.uuid}" header="${obj.header}" %}}${obj.body}{{% /expandlarge %}}`;
    },
})