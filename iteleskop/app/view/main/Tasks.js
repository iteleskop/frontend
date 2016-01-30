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
        { 'filter': '5',   'text': '5(done,for users)' },
        { 'filter': '6',   'text': '5(done,public)' },
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
        case "5":
            return "5 (done,for users)";
        case "6":
            return "6 (done,public)";
        default:
            return "unknown(" + value + ")";
        };
    },

    columns: [
        { text: 'Task ID',  dataIndex: 'task_id', width: 70,
          renderer: function(value, metaData, record) { return this.tooltip(value, metaData, record); }
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
        { text: 'RA', dataIndex: 'ra', flex: 1,
          renderer: function(value) {
              return RAfloatToHMS(value);
          }
        },
        { text: 'Dec', dataIndex: 'decl', flex: 1,
          renderer: function(value) {
              return DeclinationFloatToDMS(value);
          }
        },
        { text: 'Exposure [s]', dataIndex: 'exposure', flex: 1 },
        { text: 'Description', dataIndex: 'descr', flex: 1 },
        { text: 'Comment', dataIndex: 'comment', flex: 1 },
        { text: 'Filter', dataIndex: 'filter', flex: 1 },
        { text: 'Binning', dataIndex: 'binning', flex: 1 },
        { text: 'Guiding', dataIndex: 'guiding', flex: 1 },
        { text: 'Dither', dataIndex: 'dither', flex: 1 },
        { text: 'Defocus', dataIndex: 'defocus', flex: 1 },
        { text: 'Calibrate', dataIndex: 'calibrate', flex: 1 },
        { text: 'Pinpoint', dataIndex: 'solve', flex: 1 },
        { text: 'VPhot', dataIndex: 'vphot', flex: 1 },

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
        { text: 'File', dataIndex: 'imagename', flex: 1,
          hidden: true, hideable: true }

    ],

    listeners: {
        select: 'onTaskClick'
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
        var btn1 = Ext.getCmp('my_tasks_filter');
        var btn2 = Ext.getCmp('task_state_filter');
        var user_login = Ext.getStore('user').getAt(0).data.login;

        var filter = [
        ];

        Ext.getStore('tasks').clearFilter();

        if (btn1.pressed) {
            filter.push({ property: 'login', value: user_login });
        }

        if (btn2.getValue() != 'all') {
            filter.push({ property: 'state', value: btn2.getValue() });
        }

        Ext.getStore('tasks').filter(filter);

        /*
                    if (this.pressed) {
                        Ext.getStore('tasks').filter('login', user_login);
                        this.setText('Your tasks only (yes)');
                    } else {
                        Ext.getStore('tasks').clearFilter();
                        this.setText('Your tasks only (no)');
                } */
    },

    header: {
        titlePosition: 0,
        items: [
            {
                xtype: 'button',
                id: 'my_tasks_filter',
                text: 'Your tasks only (no)',
                margins: '10 10 10 10',
                padding: '10 10 10 10',
                enableToggle: true,
                stateful: true,
                handler: function() {
                    if (this.pressed) {
                        this.setText('Your tasks only (yes)');
                    } else {
                        this.setText('Your tasks only (no)');
                    }
                    this.up().up().filterChanged();
                },

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
                id: 'task_state_filter',
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
