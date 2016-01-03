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

    // Ta metoda jest wolana, kiedy user wcisnal ENTER albo kliknal login
    doLogin: function() {
        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.

        var user = this.lookupReference('login_user').getValue();
        var pwd = this.lookupReference('login_pass').getValue();

        var data = {
            "user": user,
            "md5pass": pwd
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

        // resuuult

        // Jezeli w odpowiedzi jest pole failure, to logowanie sie
        // nie udalo. Wyswietl zalaczony komunikat i na tym koniec
        // przetwarzania.
        if (result.hasOwnProperty('failure')) {
            Ext.toast("Błąd logowania: " + result.msg);
            return;
        }

        if (result.hasOwnProperty('success')) {
            Ext.toast("Logowanie udane, Twój id to " + result.user_id);

            this.saveUserData(result.user_id,
                         this.lookupReference('login_user').getValue());

            // Zakoncz logowanie z sukcesem.
            this.onLoginSuccess();
        }

    },

    // Zapisuje dane uzytkownika w magazynie 'user'
    saveUserData: function(user_id, login) {
        var x = Ext.getStore('user');
        x.add({ login: login, user_id: user_id });
        // alert("added to store:" + login + user_id);
    },

    onLoginSuccess: function(user) {
        this.fireViewEvent('login', this.getView(), this.loginManager);
    }
});
