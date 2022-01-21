CMS.registerEditorComponent({
    id: "latest-news",
    label: "Siste nyheter",
    fields: [{
            name: "count",
            label: "Vis antall",
            widget: "number",
            default: 3
        },
        {
            name: "newscategory",
            label: "Kategori",
            widget: "string",
            default: "altinn"
        }
    ],
    pattern: /{{< latest-news (?<count>[0-9]+)\s{0,}(?<newscategory>[a-zA-Z0-9]+)?\s+>}}/,
    fromBlock: function (obj) {
        return {
            count: match[1],
            newscategory: match[2]
        };
    },
    toBlock: function (obj) {
        return `{{< latest-news ${obj.count} ${
        obj.newscategory 
        }>}}`;
    }
});