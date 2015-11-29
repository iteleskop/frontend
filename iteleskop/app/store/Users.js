Ext.define('iTeleskop.store.Users', {
    extend: 'Ext.data.Store',

    /* storeId: 'usersStore', */

    alias: 'store.users',

    fields: [
        'user_id', 'login', 'firstname', 'lastname', 'share', 'phone', 'email'
    ],

    proxy: {
        type: 'direct',
         directFn: 'QueryUsers.getResults'
    },

    autoLoad: true
});
