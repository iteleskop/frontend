Ext.define('iTeleskop.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'Ext.plugin.Viewport',
        'iTeleskop.view.login.LoginController',
        'Ext.form.Panel'
    ],

    viewModel: 'login',
    controller: 'login',

    bodyPadding: 10,
    title: 'Welcome to iTeleskop',
    closable: false,

    // autoShow jest wylaczone, bo wyswietlaniem steruje app/controller/Ctrl.js
    //autoShow: true,

    cls: 'login',

    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'username',
            reference: 'login_user',
            fieldLabel: 'Username:',
            value: '',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            reference: 'login_pass',
            inputType: 'password',
            fieldLabel: 'Password:',
            allowBlank: false
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'This system is for shareholders only.<br/>' +
                'If you\'re one of them and forgotten<br/>' +
                'your password, contact admins<br/>' +
                'at <a href="http://iteleskop.org/">iteleskop.org</a>'
        }],
        buttons: [{
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }

});
