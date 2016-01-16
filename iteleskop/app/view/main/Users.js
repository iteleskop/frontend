Ext.define('iTeleskop.view.main.Users', {
    extend: 'Ext.grid.Panel',
    xtype: 'users',

    requires: [
        'iTeleskop.store.Users'
    ],

    title: 'Zadania',

    store: {
        type: 'users'
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
