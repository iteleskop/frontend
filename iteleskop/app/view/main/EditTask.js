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

                    form.submit({
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
