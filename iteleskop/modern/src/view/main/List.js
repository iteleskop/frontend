/**
 * This view is an example list of people.
 */
Ext.define('iTeleskop.view.main.List', {
    extend: 'Ext.grid.Grid',
    xtype: 'mainlist',

    requires: [
        'iTeleskop.store.Tasks'
    ],

    title: 'Zadania',

    store: {
        type: 'tasks'
    },

    columns: [
        { text: 'Name',  dataIndex: 'name', width: 100 },
        { text: 'Email', dataIndex: 'email', width: 230 },
        { text: 'Phone', dataIndex: 'phone', width: 150 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
