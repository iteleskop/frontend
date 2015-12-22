Ext.define('iTeleskop.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

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

        this.onLoginSuccess();
    },

    onLoginFailure: function() {
    },

    onLoginSuccess: function(user) {

        this.fireViewEvent('login', this.getView(), this.loginManager);
    }
});
