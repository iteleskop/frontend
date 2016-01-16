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
    
    columns: [
        { text: 'Task ID',  dataIndex: 'task_id', width: 70 },
        { text: 'Stan', dataIndex: 'state' },
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
