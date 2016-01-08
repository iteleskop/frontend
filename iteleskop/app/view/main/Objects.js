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
        { text: 'ID objektu',  dataIndex: 'object_id' },
        { text: 'Nazwa', dataIndex: 'name', flex: 1 },
        { text: 'Rektascencja', dataIndex: 'ra' },
        { text: 'Deklinacja', dataIndex: 'decl' },
        { text: 'Opis', dataIndex: 'descr', flex: 1 },
        { text: 'Komentarz', dataIndex: 'comment', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
