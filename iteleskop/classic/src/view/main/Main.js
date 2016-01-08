/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('iTeleskop.view.main.Main', {

    // Ten widok to zestaw paneli (czyli takich przelaczanych zakladek)
    extend: 'Ext.tab.Panel',

    // Ten widok definituje typ app-main. Zamiast iTeleskop.view.main.Main
    // mozna poslugiwac sie nazwa app-main.
    xtype: 'app-main',

    /* tu jest lista klas, ktore trzeba zaladowac przed startem aplikacji */
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'iTeleskop.view.main.MainController',
        'iTeleskop.view.main.MainModel',
        'iTeleskop.view.main.List',
        'iTeleskop.view.main.AddTask',
        'iTeleskop.view.main.Objects',

        'Ext.ux.DateTimePicker',
        'Ext.ux.DateTimeField'
    ],

    // Dodany plugin viewport, ktory odpowiada za samodzielne wyswietlanie
    // tego widoku. Bez tego metoda show() by nie zadzialala.
    plugins: 'viewport',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    autoShow: true,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                // @todo: Jak wyciagnac wersje tej aplikacji?
                html: "<div align='center' style='font-size: 50%'>" +
                    "<img src='logo-small.png' title='iTeleskop logo'/><br/>"
                    + "0.1.0, <a href='https://www.sencha.com/products/extjs/'>Ext JS ("
                    + Ext.getVersion().version + ')</a>' +
                + '</div>'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 10,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [
    {
        title: 'Podgląd kolejki',
        iconCls: 'fa-users',
        items: [{
            xtype: 'tasks'
        }],
        layout: 'fit',
        autoScroll: true
    },
    {
        title: 'Moje zadania',
        iconCls: 'fa-user',
        bind: {
            html: '{loremIpsum}'
        }
    },
    {
        // to jest panel z dodawaniem nowych zadan. Definicja samego panelu znajduje
        // sie w app/view/main/AddTask.js
        title: 'Dodaj zadanie',
        iconCls: 'fa-plus-circle',
        items: [{
            xtype: 'addtask'
        }],
        layout: 'fit',
        autoScroll: true
    },
    {
        title: 'Status teleskopu',
        iconCls: 'fa-cog',
        bind: {
            html: 'Status teleskopu: Nie kupiony ;)'
        }
    },
    {
        title: 'Użytkownicy',
        iconCls: 'fa-users',
        items: [{
            xtype: 'users'
        }]
    },
    {
        title: 'Obiekty',
        iconCls: 'fa-users',
        items: [{
            xtype: 'objects'
        }]
    },
    {
        title: 'Zdjęcia',
        iconCls: 'fa-camera',
        bind: {
            html: '{loremIpsum}'
        }
    }]
});
