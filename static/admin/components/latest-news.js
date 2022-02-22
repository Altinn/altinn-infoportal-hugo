CMS.registerEditorComponent({
    id: "latest-news",
    label: "Siste nyheter",
    fields: [{
            name: "count",
            label: "Vis antall",
            widget: "number",
            default: 5
        },
        {
            name: "newscategory",
            label: "Kategori",
            widget: "select", 
            options: ["altinn", "business"],
            multiple: false,
        }
    ],
    pattern: /{{<latest-news count="(.*?)" newscategory="(.*?)">}}/s,
    fromBlock: function (match) {
        return {
            count: match[1],
            newscategory: match[2]
        };
    },
    toBlock: function (obj) {
        return `{{<latest-news count="${obj.count}" newscategory="${obj.newscategory}">}}`;
    }
});
