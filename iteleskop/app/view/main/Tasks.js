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
            return "new(0)";
        case "1":
            return "passive(1)";
        case 2:
            return "in queue(2)";
        case 3:
            return "3";
        case 4:
            return "4";
        case 5:
            return "5";
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
              "0 - new (task has been just added and is not picked into the queue yet.<br/>" +
                  "1 - disabled (task has been added, but the user doesn't want it to be picked up yet)<br/>" +
                  "2 - ...<br/>" +
                  "3 - ...<br/>" +
                  "4 - ...<br/>" +
                  "5 - ...";
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
