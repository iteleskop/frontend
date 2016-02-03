Ext.define('iTeleskop.view.main.UserPreferences', {
    extend: 'Ext.form.Panel',
    title: 'User preferences',
    xtype: 'userpref',

    autoScroll: true,
    height: 900,

    store: 'user',

    url: 'php/classes/UserPreferences.php',

    layout: {
        type: 'vbox',
        align: 'left',
        padding: 10,
        autoScroll: true,
        overflowX: 'scroll',
        overflowY: 'scroll'
    },

    defaultType: 'textfield',
    items: [
        {
            name: 'user_id',
            fieldLabel:'User ID',
            readOnly: true,
            labelWidth: 100
        },
        {
            name: 'login',
            fieldLabel:'Login',
            readOnly: true,
            labelWidth: 100
        },
        {
            name: 'firstname',
            fieldLabel:'First name',
            readOnly: true,
            labelWidth: 100
        },
        {
            name: 'lastname',
            fieldLabel:'Last name',
            readOnly: true,
            labelWidth: 100
        },
        {
            name: 'share',
            fieldLabel:'share',
            readOnly: true,
            labelWidth: 100
        },
        {
            name: 'phone',
            fieldLabel:'phone',
            labelWidth: 100
        },
        {
            name: 'email',
            fieldLabel:'email',
            labelWidth: 100
        },
        {
            name: 'permissions',
            fieldLabel:'permissions',
            readOnly: true,
            labelWidth: 100
        },
        {
            name: 'aavso_id',
            fieldLabel:'AAVSO ID',
            readOnly: true,
            labelWidth: 100
        },
        {
            name: 'ftp_login',
            fieldLabel:'FTP login',
            readOnly: true,
            labelWidth: 100
        },
        {
            name: 'ftp_pass',
            fieldLabel:'FTP password',
            readOnly: true,
            labelWidth: 100
        }
    ],

    listeners: {
        beforerender: function(component, opts) {
            component.loadRecord(Ext.getStore('user').getAt(0));
        }
    },

    buttons: [
        {
            text: 'Save changes',
            handler: function() {
                var form = this.up('form'); // get the form panel
                if (form.isValid()) { // make sure the form contains valid data before submitting
                    alert("Sorry! Not implemented yet.");
                    
                    /*form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.msg);
                            Ext.getStore('tasks').load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failure', action.result.msg);
                        }
                    });
                } else { // display error alert if the data is invalid
                    Ext.Msg.alert('Data incorrect',
                                  'Please check correctness of the fields marked in red.')
                } */
                }
            }
        }
    ]
});

        
