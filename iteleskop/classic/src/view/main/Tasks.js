/**
 * This view is an example list of people.
 */

// This is a list of allowed filters. Those filters are displayed at the top
// of the grid and allow filtering displayed tasks.
var FilterStates = Ext.create('Ext.data.Store', {
    fields: ['states' , 'text'],
    data: [
        { 'filter': '0',   'text': '0(templates)' },
        { 'filter': '1',   'text': '1(new)' },
        { 'filter': '2',   'text': '2(activated)' },
        { 'filter': '3',   'text': '3(in queue)' },
        { 'filter': '4',   'text': '4(executed)' },
        { 'filter': '6',   'text': '6(done)' },
        { 'filter': '-1',  'text': '-1 (deleted)'},
        { 'filter': '-2',  'text': '-2 (deleted templates)'},
        { 'filter': 'all', 'text': 'show all states' }
    ]
});

Ext.define('iTeleskop.view.main.Tasks', {
    extend: 'Ext.grid.Panel',
    xtype: 'tasks',

    requires: [
        'iTeleskop.store.Tasks'
    ],

    title: 'Tasks',

    store: 'tasks',

    // Method prepares tooltip with all the task details.
    tooltip: function(value, metaData, record) {
        var tip = 'Task ID: <b>' + record.get('task_id') + '</b>, submitted by '
            + record.get('login') + '<br/>';
        tip += 'Object: <b>' + record.get('object') + '</b><br/>'
            + 'Coords: RA: <b>' + RAfloatToHMS(record.get('ra')) + '</b>, Dec <b>'
            + DeclinationFloatToDMS(record.get('decl'), false) + '</b><br/>'
            + 'Exposure: <b>' + record.get('exposure') + '</b>, filter: <b>' + record.get('filter') + '</b><br/>';

        metaData.tdAttr = 'data-qtip="' + tip + '"';
        return value;
    },

    // Converts numeric value to more descriptive representation of the status
    stateToText: function(value) {
        switch (value) {
        case "-1":
            return "-1 (deleted)";
        case "-2":
            return "-2 (deleted tmpl)";
        case "0":
            return "0 (template)";
        case "1":
            return "1 (new)";
        case "2":
            return "2 (activated)";
        case "3":
            return "3 (in Nerpio queue)";
        case "4":
            return "4 (executed)";
        case "6":
            return "6 (done)";
        default:
            return "unknown(" + value + ")";
        };
    },

    columns: [
        { text: 'Task ID',  dataIndex: 'task_id', width: 70,
          renderer: function(value, metaData, record) { return this.tooltip(value, metaData, record); }
        },
        {
            text: 'Actions',
            xtype:'actioncolumn',
            width:80,
            items: [{
                icon: 'images/add.png',
                tooltip: 'Clone this task',
                handler: 'onCloneClick'
            },  {
                icon: 'images/cog_edit.png',
                tooltip: 'Edit this task',
                handler: 'onEditClick'
            } /*, {
                icon: 'images/delete.png',
                tooltip: 'Delete this task',
                handler: 'onDeleteClick'
                //handler: function(grid, rowIndex, colIndex) {
                //   var rec = grid.getStore().getAt(rowIndex);
                //  alert("Delete " + rec.get('task_id'));
                }
            }*/]
        },

        { text: 'State', dataIndex: 'state',
          renderer: function(value, metaData) {
              var tip = "Available states:<br/>" +
                  "<b>0 (template)</b> - the user marked this task as not to be conducted. " +
                  "It will stay in this state until the user either " +
                  "moves it to the new (1) state or deletes this task. In the future it will<br/>" +
                  "be used to create many similar tasks.<br/>" +
                  "<b>1 (new)</b> - the task has been added, but it was not picked up by the " +
                  " queueing software yet.<br/>" +
                  "<b>2 (activated)</b> - the task has been picked by the queing software for " +
                  "execution.<br/>" +
                  "<b>3 (in queue)</b> - the task is currently in Nerpio queue and will be " +
                  "executed soon.<br/>" +
                  "<b>4 (executed)</b> - the observation is complete! The resulting image " +
                  "has to be downloaded and processed.<br/>" +
                  "<b>5 (done,for users)</b> - the processing is done and the resulting data is " +
                  "available to all shareholders<br/>" +
                  "<b>6 (done,public)</b> - this processing is done and certain amount of time " +
                  "has elapsed, so the photo is made available for everyone publicly";

              metaData.tdAttr = 'data-qtip="' + tip + '"';
              return this.stateToText(value);
          }
        },
        { text: 'Login', dataIndex: 'login' },
        { text: 'Target', dataIndex: 'object', flex: 1 },
        { text: 'RA', dataIndex: 'ra',
          renderer: function(value) {
              return RAfloatToHMS(value);
          }
        },
        { text: 'Dec', dataIndex: 'decl',
          renderer: function(value) {
              return DeclinationFloatToDMS(value);
          }
        },
        { text: 'Exposure [s]', dataIndex: 'exposure', width: 60 },
        { text: 'Description', dataIndex: 'descr', flex: 1 },
        { text: 'Comment', dataIndex: 'comment', width: 100 },
        { text: 'Filter', dataIndex: 'filter', width: 50 },
        { text: 'Binning', dataIndex: 'binning', width: 60 },
        { text: 'Guiding', dataIndex: 'guiding', width: 60 },
        { text: 'Auto Center', dataIndex: 'auto_center', hidden: true, hideable: true },
        { text: 'Dither', dataIndex: 'dither', width: 60, hidden: true, hideable: true },
        { text: 'Defocus', dataIndex: 'defocus', width: 70, hidden: true, hideable: true },
        { text: 'Calibrate', dataIndex: 'calibrate', width: 70, hidden: true, hideable: true },
        { text: 'Pinpoint', dataIndex: 'solve', width: 70, hidden: true, hideable: true },
        { text: 'Upload', dataIndex: 'vphot', width: 50, hidden: true, hideable: true },

        /* ograniczenia */
        { text: 'Min. Target altitude', dataIndex: 'min_alt', flex: 1,
          hidden: true, hideable: true },
        { text: 'Max Sun altitude', dataIndex: 'max_sun_alt', flex: 1,
          hidden: true, hideable: true },
        { text: 'Min. Moon Distance', dataIndex: 'moon_distance', flex: 1,
          hidden: true, hideable: true },
        { text: 'Max Moon phase', dataIndex: 'max_moon_phase', flex: 1,
          hidden: true, hideable: true },
        { text: 'Min interval [s]', dataIndex: 'skip_interval', flex: 1,
          hidden: true, hideable: true },
        { text: 'No earlier than', dataIndex: 'skip_before', flex: 1,
          hidden: true, hideable: true },
        { text: 'No later than', dataIndex: 'skip_after', flex: 1,
          hidden: true, hideable: true },

        /* pozostale */
        { text: 'Other commands', dataIndex: 'other_cmd', flex: 1,
          hidden: true, hideable: true },
        { text: 'Created', dataIndex: 'created', hidden: false, hideable: true },
        { text: 'Activated', dataIndex: 'activated', hidden: false, hideable: true },
        { text: 'Performed', dataIndex: 'performed', hidden: false, hideable: true },
        { text: 'File', dataIndex: 'imagename', width: 100,
          hidden: false, hideable: true,
          renderer: function(value, metaData, record) {

              var u = Ext.getStore('user').getAt(0);
              if (value === null) {
                  return "--";
              }
              var url = '://'.concat(u.data.ftp_login, ":", u.data.ftp_pass,
                                     '@iteleskop.ddns.net:2100/', value, '"');
              return '<a href="ftp'.concat(url, ' target="_blank">ftp</a> <a href="ftps', url, ' target="_blank">ftps</a>');
          }
        },
        { text: 'Scope ID', dataIndex: 'scope_id', hidden: true, hideable: true }
    ],

    listeners: {
        itemdblclick: 'onTaskClick',

        beforerender: function(component, eOpts) {

            // Load the tasks information from DB
            Ext.getStore('tasks').load();

            // Set the default filter (show user's tasks only)
            var user_login = Ext.getStore('user').getAt(0).data.login;
            var filter = [
                { property: 'login', value: user_login }
            ];
            Ext.getStore('tasks').filter(filter);
        }
    },

    // That's gonna be cool. This will allow showing records a page at a time.
    /*
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'tasks',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        }],  */

    filterChanged: function() {
        var btn1 = Ext.getCmp('tasks_my_filter');
        var btn2 = Ext.getCmp('tasks_state_filter');
        var btn3 = Ext.getCmp('tasks_name_filter');
        var btn4 = Ext.getCmp('tasks_stats');

        var user_login = Ext.getStore('user').getAt(0).data.login;

        var myFilter = new Ext.util.Filter({
            filterFn: function(item) {
                if (this.hasOwnProperty('login') && (this.login != item.data.login)) {
                    return false;
                }

                if (this.hasOwnProperty('state') && (this.state != item.data.state)) {
                    return false;
                }

                if (this.hasOwnProperty('target') && (this.target.length > 0) ) {
                    if (item.data.object.indexOf(this.target) == -1)
                        return false;
                }

                return true;
            }
        });

        Ext.getStore('tasks').clearFilter();

        if (btn1.pressed) {
            myFilter.login = user_login;
        }

        if (btn2.getValue() != 'all') {
            myFilter.state = btn2.getValue();
        }

        myFilter.target = btn3.getValue();

        Ext.getStore('tasks').filter(myFilter);

        btn4.setValue(Ext.getStore('tasks').getCount() + " of "
                      + Ext.getStore('tasks').getTotalCount());
    },

    header: {
        titlePosition: 0,
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Number of tasks',
                disabled: true,
                id: 'tasks_stats'
            },
            {
                xtype: 'textfield',
                id: 'tasks_name_filter',
                fieldLabel: 'Target:',
                labelWidth: 50,
                margins: '10 10 10 10',
                padding: '10 10 10 10',
                listeners: {
                    specialkey: function(f,e){
                        if (e.getKey() == e.ENTER) {
                            this.up().up().filterChanged();
                        }
                    }
                }
            },
            {
                xtype: 'button',
                id: 'tasks_my_filter',
                text: 'My tasks',
                margins: '10 10 10 10',
                padding: '10 10 10 10',
                enableToggle: true,
                stateful: true,
                pressed: true,
                handler: function() {
                    if (this.pressed) {
                        this.setText('My tasks');
                    } else {
                        this.setText('All users\' tasks');
                    }
                    this.up().up().filterChanged();
                },

                // @todo: WTF is this shit? Why do I need this?
                getState: function() {
                    if (this.enableToggle == true) {
                        var config = {};
                        config.pressed = this.pressed;
                        return config;
                }
                    return null;
                }
            },
            {
                bind: { html: '<p>Show tasks in state:</p>' }
            },

            {
                xtype: 'combobox',
                valueField: 'filter',
                id: 'tasks_state_filter',
                displayField: 'text',
                queryMode: 'local',
                value: 'all',
                store: FilterStates,
                forceSelection: true,
                labelWidth: 250,
                listeners: {
                    change: function(element, newValue, oldValue) {
                        element.up().up().filterChanged();
                    }
                    //select: function(ele, rec, index) { alert("select" + ele); }
                }
            },

            {
                xtype: 'button',
                text: 'Refresh',
                handler: function() {
                    Ext.getStore('tasks').load();
                }
            }
        ]
    }

    /*
    buttons: [
        {
            text: 'Your tasks',
            handler: function() {
                var user_login = Ext.getStore('user').getAt(0).data.login;
                Ext.getStore('tasks').filter('login', user_login);
            }
        },
        {
            text: 'All tasks',
            handler: function() {
                Ext.getStore('tasks').clearFilter();
            }
        }
    ] */
});
