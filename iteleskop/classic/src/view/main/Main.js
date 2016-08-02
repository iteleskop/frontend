/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 */
Ext.define('iTeleskop.view.main.Main', {

    // This view is a set of panels
    extend: 'Ext.tab.Panel',

    // This object is can be referenced to as app-main, which can be used instead
    // of iTeleskop.view.main.Main
    xtype: 'app-main',

    // This is a list of classes, which have to be loaded before this object
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'iTeleskop.view.main.MainController',
        'iTeleskop.view.main.MainModel',
        'iTeleskop.view.main.Users',
        'iTeleskop.view.main.Tasks',
        'iTeleskop.view.main.AddTask',
        'iTeleskop.view.main.EditTask',
        'iTeleskop.view.main.Objects',
        'iTeleskop.view.main.UserPreferences'

        // 'Ext.ux.DateTimePicker',
        // 'Ext.ux.DateTimeField'
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
                html: "<div align='center' style='font-size: 50%'>".concat(
                    "<img src='logo-small.png' title='iTeleskop logo'/><br/>",
                    "<a href='ChangeLog.txt' target='_blank'>0.5.1</a>, ",
                    "<a href='https://www.sencha.com/products/extjs/'>Ext JS (",
                    Ext.getVersion().version,
                    ')</a> ',
                    '</div>')
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
        title: 'Tasks',
        iconCls: 'fa-camera',
        items: [{
            xtype: 'tasks'
        }],
        layout: 'fit',
        autoScroll: true,
        itemId: 'tasks-tab'
    },
    {
        // to jest panel z dodawaniem nowych zadan. Definicja samego panelu znajduje
        // sie w app/view/main/AddTask.js
        title: 'New task',
        iconCls: 'fa-plus-circle',
        items: [{
            xtype: 'addtask'
        }],
        layout: 'fit',
        autoScroll: true
    },
    {
        title: 'Edit task',
        iconCls: 'fa-edit',
        items: [{
            xtype: 'edittask'
        }],
        layout: 'fit',
        autoScroll: true,
        hidden: true,
        itemId: 'edittask-tab'
    },
    {
        title: 'Users',
        iconCls: 'fa-users',
        items: [{
            xtype: 'users'
        }]
    },
    {
        title: 'Objects',
        iconCls: 'fa-binoculars',
        items: [{
            xtype: 'objects'
        }],
        layout: 'fit',
        autoScroll: true
    },
    {
        title: 'Status',
        iconCls: 'fa-cog',
        bind: {
            html: 'TODO: This is a static page for now. Make it actually check the state<br/>'
                .concat('Telescope status: <b>BOUGHT!</b><br/>',
                'Web interface: <b>prototype</b><br/>',
                'Desktop interface: <b>prototype</b><br/>',
                'Szczecin/Nerpio communication: <b>in development</b><br/>',
                'Queuing management: <b>in development</b><br/>',
                'Telescope management: <b>in development</b><br/>',
                'Data server: <b>Offline (not set up yet)</b>')
        }
    },
    {
        title: 'Preferences',
        iconCls: 'fa-sliders',
        items: [{
            xtype: 'userpref'
        }]
    }]
});
