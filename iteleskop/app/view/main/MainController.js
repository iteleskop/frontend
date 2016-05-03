/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('iTeleskop.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'Ext.window.Toast'
    ],

    onTaskClick: function (sender, record) {
        var user_login = Ext.getStore('user').getAt(0).data.login;
        var record_login = record.get('login');
        console.debug('your login: ',user_login, ", record login:", record_login);

        // @todo: Add check for admin rights
        if (user_login != record_login) {
            Ext.MessageBox.show({
                title: "Not your task",
                msg: "I'm terribly sorry, but this doesn't seem to be your task." +
                    "<br/>You can't do anything with it.",
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }

        var state = record.get('state');
        if ( (state == 0) || (state == 1) || (state == 2)) {
            if (state == 0 || state == 2) {
                var button = "Move to New(1) state";
                var new_state ="1";
            }
            if (state == 1) {
                var button = "Move to Template(0) state";
                var new_state = "0";
            }

            // We need to remember the callback, beause deeper inside within the
            // Ext.MessageBox.show we will not be able to use this anymore.
            // (this will be pointing to Ext.MessageBox instance)
            var callbackUpdate = this.updateResult;
            var callbackDelete = this.deleteResult;

            Ext.MessageBox.show({
                title:'What to do with this task?',
                msg: 'What do you want to do with this task?',
                buttonText: {yes: button, no: "Delete", cancel: "Do nothing"},
                fn: function(btn) {
                    if (btn == "yes") {
                        // Moving to wait state
                        console.debug('Move task to wait state: ', record.get('task_id'));
                        var data = {
                            "user_id": Ext.getStore('user').getAt(0).data.user_id,
                            "task_id": record.get('task_id'),
                            "new_state": new_state
                        };
                        record.set('state', new_state);

                        Tasks.update(data, callbackUpdate, this);

                    } else if (btn == "no") {
                        // Delete task
                        var data = {
                            "user_id": Ext.getStore('user').getAt(0).data.user_id,
                            "task_id": record.get('task_id')
                        };
                        console.debug('Delete task: ', record.get('task_id'));

                        /// @todo: This is removed from the view immediately.
                        /// Should be removed after the server-side confirms
                        /// that it was indeed removed (i.e. in the deleteResult),
                        /// but I don't know how to pass record there :(
                        var s = record.store;
                        s.remove(record);

                        Tasks.deleteTask(data, callbackDelete, this);
                    } else if (btn == "cancel") {
                        // do nothing
                    }
                }
            });
        } else {
            Ext.MessageBox.show({
                title: "Can't modify task",
                msg: "I'm terribly sorry, but you can only modify tasks" +
                    "<br/>in states 0(template) or 1 (new).",
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    updateResult: function(result, event, success) {
        if (result.hasOwnProperty('failure')) {
            Ext.toast("Update failed: " + result.msg);
            return;
        }

        if (result.hasOwnProperty('success')) {
            Ext.toast("Update successful: " + result.msg);
        }
    },

    deleteResult: function(result, event, success) {
        if (result.hasOwnProperty('failure')) {
            Ext.toast("Delete failed: " + result.msg);
            return;
        }

        if (result.hasOwnProperty('success')) {
            Ext.toast("Delete successful: " + result.msg);
            Ext.getStore('tasks')
        }
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
