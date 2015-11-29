/**
 * This view is an example list of people.
 */
Ext.define('iTeleskop.view.main.Tasks', {
    extend: 'Ext.grid.Panel',
    xtype: 'tasks',

    requires: [
        'iTeleskop.store.Tasks'
    ],

    title: 'Zadania',

    store: {
        type: 'tasks'
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

Ext.define('iTeleskop.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'users',

    requires: [
        'iTeleskop.store.Users'
    ],

    title: 'Zadania',

    store: {
        type: 'tasks'
    },

    columns: [
        { text: 'User ID',  dataIndex: 'user_id' },
        { text: 'Login', dataIndex: 'login', flex: 1 },
        { text: 'Imię', dataIndex: 'firstname', flex: 1 },
        { text: 'Nazwisko', dataIndex: 'lastname', flex: 1 },
        { text: 'Udziały', dataIndex: 'share', flex: 1 },
        { text: 'Telefon', dataIndex: 'phone', flex: 1 },
        { text: 'e-mail', dataIndex: 'email', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
