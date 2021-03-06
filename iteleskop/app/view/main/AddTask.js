// Ta klasa definuje nowy panel odpowiedzialny za dodawanie nowych zadan.

Ext.define('iTeleskop.view.main.AddTask', {
    extend: 'iTeleskop.view.main.Task',

    xtype: 'addtask',

    title: 'Add new task',

    id: 'addtask',

    url: 'php/forms/add_task.php',

    requires: [
        'iTeleskop.view.main.Task'
    ],

    buttons: [
        {
            text: 'Add task',
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
            text: "Check correctness",
            handler: function() {
                var form = this.up('form'); // get the form panel
                if (form.isValid()) { // make sure the form contains valid data before submitting
                    Ext.Msg.alert('Success', "Data seems valid, but validation is still simple.");
                } else { // display error alert if the data is invalid
                    Ext.Msg.alert('Failure', 'Fix the fields marked with red rectangles.');
                }
            }
        },
        {
            text: "Reset to defaults",
            handler: function() {
                this.up('form').reset();
                this.up().up().setDefaultFields();
            }
        }
    ]

});
