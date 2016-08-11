Ext.define('iTeleskop.view.main.EditTask', {

    extend: 'iTeleskop.view.main.Task',
    xtype: 'edittask',
    title: 'Edit existing task',
    id: 'edittask',

    url: 'php/forms/edit_task.php',

    requires: [
        'iTeleskop.view.main.Task'
    ],

    buttons: [
        {
            text: 'Save changes',
            handler: function() {
                var form = this.up('form'); // get the form panel
                if (form.isValid()) { // make sure the form contains valid data before submitting

                    var user_data = Ext.getStore('user').getAt(0).data;

                    var params = {
                        "user": user_data.login,
                        "user_id": user_data.user_id,
                        "md5pass": md5(user_data.pass),
                        "task_id": form.getForm().findField('task_id').getValue(),
                        "object": form.getForm().findField('object').getValue(),
                        "ra": form.getForm().findField('ra').getValue(),
                        "decl": form.getForm().findField('decl').getValue(),
                        "exposure": form.getForm().findField('exposure').getValue(),
                        "state": form.getForm().findField('state').getValue(),
                        "descr": form.getForm().findField('descr').getValue(),
                        "comment": form.getForm().findField('comment').getValue(),
                        "filter": form.getForm().findField('filter').getValue(),
                        "binning": form.getForm().findField('binning').getValue(),
                        "guiding": form.getForm().findField('guiding').getValue(),
                        "dither": form.getForm().findField('dither').getValue(),
                        "defocus": form.getForm().findField('defocus').getValue(),
                        "calibrate": form.getForm().findField('calibrate').getValue(),
                        "solve": form.getForm().findField('solve').getValue(),
                        "vphot": form.getForm().findField('vphot').getValue(),

                        "min_alt": form.getForm().findField('min_alt').getValue(),
                        "max_sun_alt": form.getForm().findField('max_sun_alt').getValue(),
                        "moon_distance": form.getForm().findField('moon_distance').getValue(),
                        "max_moon_phase": form.getForm().findField('max_moon_phase').getValue(),
                        "min_interval": form.getForm().findField('min_interval').getValue(),
                        "skip_before": form.getForm().findField('skip_before').getValue(),
                        "skip_after": form.getForm().findField('skip_after').getValue(),

                        "scope_id": form.getForm().findField('scope_id').getValue(),
                        "auto_center": form.getForm().findField('auto_center').getValue(),
                    };

                    Task.edit(params, this.editCallback, this);
                } else { // display error alert if the data is invalid
                    Ext.Msg.alert('Data incorrect',
                                  'Please check correctness of the fields marked in red.')
                }
            },
            /// @brief Callback after submitting edit form
            editCallback: function (result, event, success) {
                if (result.hasOwnProperty('failure')) {
                    Ext.toast("Edit error: " + result.msg);
                    return;
                }

                if (result.hasOwnProperty('success')) {
                    Ext.toast("Edit successful: " + result.msg);

                    // This button cancels the edit, then switches to the tasks-list tab,
                    // then hides the edit task tab.
                    var tasks = this.up('app-main').child('#tasks-tab');
                    var edit = this.up('app-main').child('#edittask-tab');
                    this.up('app-main').setActiveTab(tasks);
                    edit.tab.hide();
                }
            }
        },
        {
            text: 'Cancel edit',
            handler: function() {
                // This button cancels the edit, then switches to the tasks-list tab,
                // then hides the edit task tab.
                var tasks = this.up('app-main').child('#tasks-tab');
                var edit = this.up('app-main').child('#edittask-tab');
                this.up('app-main').setActiveTab(tasks);
                edit.tab.hide();
            }
        },
        {
            text: "Check correctness",
            handler: function() {
                var form = this.up('form'); // get the form panel
                if (form.isValid()) { // make sure the form contains valid data before submitting
                    Ext.Msg.alert('Success', "Data seems valid, but validation is still simple.");
                } else { // display error alert if the data is invalid
                    Ext.Msg.alert('Failure', 'Fix the fields marked with red rectangles.');
                }
            }
        }
    ]

});
