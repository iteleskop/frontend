Ext.define('iTeleskop.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    // Toast to male wyskakujace powiadomienie, defaultowo w prawym dolnym rogu
    requires: [
        'Ext.window.Toast',
        'iTeleskop.store.User'
    ],

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    onLoginClick: function() {
        this.doLogin();
    },

    // This method is called when the user pressed ENTER or clicked 'login' button
    doLogin: function() {
        var user = this.lookupReference('login_user').getValue();
        var pwd = this.lookupReference('login_pass').getValue();

        var data = {
            "user": user,
            "md5pass": md5(pwd)
        };

        // Zawolaj zdalna metode (server-side) przez Ext.Direct. To wywolanie
        // zostanie przetworzone na zawołanie metode verify w klasie Login
        // w php/classes/Login.php. Po zakonczeniu, zostanie zawolany callback
        // verifyResult.
        Login.verify(data, this.verifyResult, this);
    },

    // Ta metoda jest wolana o otrzymaniu wynikow proby logowania po stronie
    // serwera. Mozliwe odpowiedzi:
    // { 'success': true, 'login': ..., 'user_id': 123 }
    // { 'failure': true, msg: '...' }
    verifyResult: function(result, event, success) {

        // Jezeli w odpowiedzi jest pole failure, to logowanie sie
        // nie udalo. Wyswietl zalaczony komunikat i na tym koniec
        // przetwarzania.
        if (result.hasOwnProperty('failure')) {
            Ext.toast("Login error: " + result.msg);
            return;
        }

        if (result.hasOwnProperty('success')) {
            Ext.toast("Logged in, your id is " + result.user_id + ", welcome!");

            this.saveUserData(result,
                              this.lookupReference('login_user').getValue());
            /// @todo: why do we pass 2 parameters here, if saveUserData takes
            /// only one?

            // Login successful.
            this.onLoginSuccess();
        }

    },

    // Saves user's data in 'user' store.
    // Userdata is a structure returned by Login.verify() in src/classes/Login.php
    saveUserData: function(userdata) {
        var x = Ext.getStore('user');

        // userdata does not contain user's password, so we need to store it.
        var pwd = this.lookupReference('login_pass').getValue();
        userdata.pass = pwd;

        x.add(userdata);
    },

    onLoginSuccess: function(user) {
        this.fireViewEvent('login', this.getView(), this.loginManager);
    }
});
