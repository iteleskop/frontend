Ext.define('iTeleskop.store.Objects', {
    extend: 'Ext.data.Store',

    storeId: 'objects',

    alias: 'store.objects',

    sorters: [{
        sorterFn: function (o1, o2) {
            rank1 = parseInt(o1.get('object_id'));
            rank2 = parseInt(o2.get('object_id'));
            return rank1 < rank2 ? -1 : 1;
        }
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
