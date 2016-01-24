Ext.define('iTeleskop.view.main.Objects', {
    extend: 'Ext.grid.Panel',
    xtype: 'objects',

    requires: [
        'iTeleskop.store.Objects'
    ],

    title: 'Obiekty',

    store: {
        type: 'objects'
    },

    columns: [
        { text: 'Object ID',  dataIndex: 'object_id' },
        { text: 'Target name', dataIndex: 'name', flex: 1 },
        { text: 'RA', dataIndex: 'ra' },
        { text: 'Dec', dataIndex: 'decl' },
        { text: 'Description', dataIndex: 'descr', flex: 1 },
        { text: 'Comment', dataIndex: 'comment', flex: 1 }
    ]
});
