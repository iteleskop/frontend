Ext.define('iTeleskop.store.User', {
    extend: 'Ext.data.Store',

    storeId: 'user',

    alias: 'store.user',

    fields: [
        'user_id', 'login'
    ]

});
