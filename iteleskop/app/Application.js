/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('iTeleskop.Application', {
    extend: 'Ext.app.Application',

    name: 'iTeleskop',

    controllers: [
        'Ctrl'
    ],

    // To okresla, ktory widok jest wyswietlany na poczatku. Mozna albo uzyc
    // bezposrednio konretnego widoku albo kontrolera Ctrl, ale nie obu
    // rzeczy naraz
    //mainView: 'iTeleskop.view.main.Main',
    //mainView: 'iTeleskop.view.login.Login'

    models: [
    ],

    requires: [
        'iTeleskop.view.main.Main'
    ],

    views: [
        'iTeleskop.view.login.Login',
        'iTeleskop.view.main.Main'
    ],

    // List of currently used data stores
    stores: [
        'Tasks',
        'Users',
        'Objects',
        'User'
    ],

    launch: function() {
        // Interfejs do pobierania danych server-side
        Ext.direct.Manager.addProvider(Ext.REMOTING_API);
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }

});
