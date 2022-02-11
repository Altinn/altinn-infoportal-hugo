CMS.registerEventListener({
    name: 'preSave',
    handler: ({
        entry
    }) => {
        return entry.get('data').set('lastmod', new Date());
    },
});
