/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
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

    /// This method is called, when Clone icon in Tasks view is clicked.
    onCloneClick: function(grid, rowIndex, colIndex) {

        var rec = grid.getStore().getAt(rowIndex);

        // Get the current date
        var before = new Date();
        var after = new Date();

        after.setDate(before.getDate() + 30);

        // Prepare all data for the new task
        var data = {
            "user_id": Ext.getStore('user').getAt(0).data.user_id,
            "state": 1,
            "object": rec.get('object'),
            "scope_id": rec.get('scope_id'),
            "ra": rec.get('ra'),
            "decl": rec.get('decl'),
            "exposure": rec.get('exposure'),
            "descr": rec.get('descr'),
            "filter": rec.get('filter'),
            "binning": rec.get('binning'),
            "guiding": rec.get('guiding'),
            "dither": rec.get('dither'),
            "defocus": rec.get('defocus'),
            "calibrate": rec.get('calibrate'),
            "solve": rec.get('solve'),
            "min_alt": rec.get('min_alt'),
            "max_sun_alt": rec.get('max_sun_alt'),
            "moon_distance": rec.get('moon_distance'),
            "max_moon_phase": rec.get('max_moon_phase'),
            "min_interval": rec.get('min_interval'),
            "skip_before": before,
            "skip_after": after,
            "comment": rec.get('comment'),
            "auto_center": rec.get('auto_center'),
            "vphot": rec.get('vphot')
            // no task_id - will be set up automatically
        };

        Task.cloneTask(data, this.onCloneResult, this);
    },

    /// @brief A callback function after onCloneClick is executed
    onCloneResult: function(result, event, success) {
        if (result.hasOwnProperty('failure')) {
            Ext.toast("Clone failed: " + result.msg);
            return;
        }

        if (result.hasOwnProperty('success')) {
            Ext.toast("Clone successful: " + result.msg);
        }
    },

    // This method is called when Edit icon in Tasks view is clicked.
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        var user_data = Ext.getStore('user').getAt(0).data;

        if (rec.data.user_id != user_data.user_id) {
            // Nope, you can't edit someone elses task.
            Ext.toast("This is not your task! You can't edit it");
            return;
        }

        if (rec.data.state > 3) {
            Ext.toast("You can't edit task in state ".concat(rec.data.state));
            return;
        }

        // All is good, user is editing its own task.
        var edit = grid.up('app-main').child('#edittask-tab');
        edit.tab.show();
        grid.up('app-main').setActiveTab(edit);
        edit.down("edittask").loadRecord(rec);
        edit.down("edittask").setTitle("Editing task ".concat(rec.data.task_id));
    },

    // This method is called when Delete icon in Tasks view is clicked.
    onDeleteClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        alert("onDeleteClick " + rec.get('task_id'));
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
