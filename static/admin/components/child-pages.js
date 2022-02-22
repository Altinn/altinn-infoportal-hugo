CMS.registerEditorComponent({
    id: "childpagesid",
    label: "Childpages",
    collapsed: false,
    pattern: /{{<child-pages>}}/,
    fromBlock: function (match) {
      return "{{<child-pages>}}"
    },
    toBlock: function (obj) {
      return `{{<child-pages>}}`;
    },
  })