Ext.define('iTeleskop.store.Objects', {
    extend: 'Ext.data.Store',

    storeId: 'objects',

    alias: 'store.objects',

    sorters: [{
        property: 'object_id',
        direction: 'ASC'
    }],

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
    }
});
