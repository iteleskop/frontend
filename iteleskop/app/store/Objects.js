Ext.define('iTeleskop.store.Objects', {
    extend: 'Ext.data.Store',

    storeId: 'objects',

    alias: 'store.objects',

    fields: [
        'object_id',
        'name',
        'ra',
        'decl',
        'descr',
        'comment'
    ],

    proxy: {
        type: 'direct',
        directFn: 'QueryObjects.getResults'
    },

    autoLoad: true
});
