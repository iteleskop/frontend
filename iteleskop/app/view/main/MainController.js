/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('iTeleskop.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onTaskClick: function (sender, record) {
        var user_login = Ext.getStore('user').getAt(0).data.login;
        var record_login = record.get('login');
        console.debug('your login: ',user_login, ", record login:", record_login);

        // @todo: Add check for admin rights
        if (user_login == record_login) {

            var state = record.get('state');
            if ( (state == 0) || (state == 1)) {
                Ext.MessageBox.show({
                    title:'What to do with this task?',
                    msg: 'Are you sure want to delete?',
                    buttonText: {yes: "Wait", no: "Delete", cancel: "Keep current"},
                    fn: function(btn) {
                        if (btn == "yes") {
                            // Moving to wait state
                            console.debug('Move task to wait state: ', record.get('task_id'));
                            var data = {
                                "user_id": Ext.getStore('user').getAt(0).data.user_id,
                                "task_id": record.get('task_id'),
                                "new_state": 0
                            };
                            record.set('state', '0');
                            Tasks.update(data, this.updateResult, this);

                        } else if (btn == "no") {
                            // Delete task
                            var data = {
                                "user_id": Ext.getStore('user').getAt(0).data.user_id,
                                "task_id": record.get('task_id')
                            };
                            console.debug('Delete task: ', record.get('task_id'));
                            Tasks.delete(data, this.deleteResult, this);
                        } else if (btn == "cancel") {
                            // do nothing
                        }
                    }
                });
            } else {
                Ext.MessageBox.show({
                    title: "Can't modify task",
                    msg: "I'm terribly sorry, but you can only modify tasks" +
                        "<br/>in states 0(waiting) or 1 (new).",
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        } else {
            Ext.MessageBox.show({
                title: "Not your task",
                msg: "I'm terribly sorry, but this doesn't seem to be your task." +
                    "<br/>You can't do anything with it.",
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    updateResult: function(result, event, success) {
        alert("updateResult AFTER");

        // @todo: Finish task update!
        /*
        if (result.hasOwnProperty('failure')) {
            Ext.toast("Update failed: " + result.msg);
            return;
        }

        if (result.hasOwnProperty('success')) {
            Ext.toast("Update successful: " + result.msg);
        } */
    },

    updateResult: function(result, event, success) {
        alert("deleteResult AFTER");
        // @todo: Finish task deletion!
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
