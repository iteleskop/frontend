Ext.define('iTeleskop.controller.Ctrl', {
    extend: 'Ext.app.Controller',

    requires: [
        'iTeleskop.view.login.Login',
        'iTeleskop.view.main.Main'
    ],

    onLaunch: function() {

        // alert("onLaunch w iTeleskop.controller.Ctrl");

        this.session = new Ext.data.Session({
            autoDestroy: false
        });

        this.login = new iTeleskop.view.login.Login({
            session: this.session,
            listeners: {
                scope: this,
                login: 'onLoginSuccess'
            },
        });

        // iTeleskop.view.login.Login doesn't have autoShow, so
        // we need to explicitly call show to display it.
        this.login.show();
    },

    onLoginSuccess: function (loginController, loginManager) {
        // alert('Ctrl.onLoginSuccess');
        this.login.hide();
        this.loginManager = loginManager;
        this.showUI();
    },

    showUI: function() {
        this.viewport = new iTeleskop.view.main.Main({
            session: this.session,
            autoShow: true,
            viewModel: {
                type: 'main'
            }
        });

        this.viewport.show();
    }

});

