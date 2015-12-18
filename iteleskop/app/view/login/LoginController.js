Ext.define('iTeleskop.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    loginText: 'Logging in...',

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

        // Set the localStorage value to true
        // localStorage.setItem("TutorialLoggedIn", true);

        alert('doLogin1');

        // Hide the Login Window
        this.getView().hide();
        // this.getView().show();

        alert('doLogin2');

        // Add the main view to the viewport
        this.getView().destroy();

        // To z jakiegos powodu niestety nie dziala
        // Ext.widget('app-main');
    },

    onLoginFailure: function() {
        // Do something
        Ext.getBody().unmask();
    },

    onLoginSuccess: function(user) {
        Ext.getBody().unmask();

        //var org = this.lookupReference('organization').getSelectedRecord();
        //this.fireViewEvent('login', this.getView(), user, org, this.loginManager);
    }
});
