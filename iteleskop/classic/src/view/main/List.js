/**
 * This view is an example list of people.
 */
Ext.define('iTeleskop.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'tasks',

    requires: [
        'iTeleskop.store.Personnel'
    ],

    title: 'Zadania',

    store: {
        type: 'personnel'
    },

    columns: [
        { text: 'Task ID',  dataIndex: 'task_id' },
        { text: 'Obiekt', dataIndex: 'object', flex: 1 },
        { text: 'RA', dataIndex: 'ra', flex: 1 },
        { text: 'Dec', dataIndex: 'decl', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
