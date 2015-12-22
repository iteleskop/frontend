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
    title: 'Zaloguj się do iTeleskop',
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
            fieldLabel: 'Użytkownik',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Hasło',
            allowBlank: false
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Proszę podać swoje dane. Jeżeli zapomniałeś hasła, skontaktuj się z abc@example.org'
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
