CMS.registerEditorComponent({
    id: "tblockid",
    label: "Tekstblokk",
    fields: [{
      name: "tblock",
      label: "Tekstblokk",
      widget: "relation",
      collection: "textblocks",
      search_fields: ["title"],
      display_fields: ["title"],
      value_field: "uuid"
    }],
    pattern: /{{< tblock uuid="([!"a-zA-Z0-9-_ ]+)" >}}/,
    fromBlock: function (match) {
      return {
        tblock: match[1]
      }
    },
    toBlock: function (obj) {
      return `{{< tblock uuid="${obj.tblock}" >}}`;
    },
  })