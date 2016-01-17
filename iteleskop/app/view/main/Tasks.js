/**
 * This view is an example list of people.
 */
Ext.define('iTeleskop.view.main.Tasks', {
    extend: 'Ext.grid.Panel',
    xtype: 'tasks',

    requires: [
        'iTeleskop.store.Tasks'
    ],

    title: 'Zadania',

    store: {
        type: 'tasks'
    },

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
            return "0 (waiting)";
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
        { text: 'Stan', dataIndex: 'state',
          renderer: function(value, metaData) {
              var tip = "Available states:<br/>" +
                  "<b>0 (waiting)</b> - the user marked this task as not to be conducted yet. " +
                  "It will stay in this state until the user either " +
                  "moves it to the new (1) state or deletes this task.<br/>" +
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
        { text: 'Obiekt', dataIndex: 'object', flex: 1 },
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
        { text: 'Ekspozycja [s]', dataIndex: 'exposure', flex: 1 },
        { text: 'Opis', dataIndex: 'descr', flex: 1 },
        { text: 'Komentarz', dataIndex: 'comment', flex: 1 },
        { text: 'Filtr', dataIndex: 'filter', flex: 1 },
        { text: 'Binning', dataIndex: 'binning', flex: 1 },
        { text: 'Defocus', dataIndex: 'defocus', flex: 1 },
        { text: 'Kalibracja', dataIndex: 'calibrate', flex: 1 },
        { text: 'PinPoint', dataIndex: 'solve', flex: 1 },
        { text: 'VPhot', dataIndex: 'vphot', flex: 1 },

        /* ograniczenia */
        { text: 'Min. wysokosc', dataIndex: 'min_alt', flex: 1,
          hidden: true, hideable: true },
        { text: 'Min. old od Księżyca', dataIndex: 'moon_distance', flex: 1,
          hidden: true, hideable: true },
        { text: 'Nie wcześniej niż', dataIndex: 'skip_before', flex: 1,
          hidden: true, hideable: true },
        { text: 'Nie później niż', dataIndex: 'skip_after', flex: 1,
          hidden: true, hideable: true },
        { text: 'Nie częściej niż sekund', dataIndex: 'skip_interval', flex: 1,
          hidden: true, hideable: true },
        { text: 'Omiń, jeżeli w ciągu X sekund...', dataIndex: 'skip_period_seconds', flex: 1,
          hidden: true, hideable: true },
        { text: '... było Y obserawacji', dataIndex: 'skip_period_count', flex: 1,
          hidden: true, hideable: true},

        /* pozostale */
        { text: 'Dodatkowe komendy', dataIndex: 'other_cmd', flex: 1,
          hidden: true, hideable: true },
        { text: 'Plik', dataIndex: 'imagename', flex: 1,
          hidden: true, hideable: true }

    ],

    listeners: {
        select: 'onItemSelected'
    }
});
