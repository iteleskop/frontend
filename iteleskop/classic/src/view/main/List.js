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
        { text: 'Task ID',  dataIndex: 'task_id' },
        { text: 'Stan', dataIndex: 'state' },
        { text: 'Obiekt', dataIndex: 'object', flex: 1 },
        { text: 'RA', dataIndex: 'ra', flex: 1,
          renderer: function(value) {
              return RAfloatToHMS(value);
          }
        },
        { text: 'Dec', dataIndex: 'decl', flex: 1 },
        { text: 'Opis', dataIndex: 'descr', flex: 1 },
        { text: 'Komentarz', dataIndex: 'comment', flex: 1 },
        { text: 'Filtr', dataIndex: 'filter', flex: 1 },
        { text: 'Binning', dataIndex: 'binning', flex: 1 },
        { text: 'Defocus', dataIndex: 'defocus', flex: 1 },
        { text: 'Kalibracja', dataIndex: 'calibrate', flex: 1 },
        { text: 'PinPoint', dataIndex: 'solve', flex: 1 },
        { text: 'VPhot', dataIndex: 'vphot', flex: 1 },

        /* ograniczenia */
        { text: 'Min. wysokosc', dataIndex: 'min_alt', flex: 1 },
        { text: 'Min. old od Księżyca', dataIndex: 'moon_distance', flex: 1 },
        { text: 'Nie wcześniej niż', dataIndex: 'skip_before', flex: 1 },
        { text: 'Nie później niż', dataIndex: 'skip_after', flex: 1 },
        { text: 'Nie częściej niż sekund', dataIndex: 'skip_interval', flex: 1 },
        { text: 'Omiń, jeżeli w ciągu X sekund...', dataIndex: 'skip_period_seconds', flex: 1 },
        { text: '... było Y obserawacji', dataIndex: 'skip_period_count', flex: 1 }

/* Tych pol nie pokazujemy, bo jest za duza kaszana
        { text: 'Dodatkowe komendy', dataIndex: 'other_cmd', flex: 1 },
        { text: 'Plik', dataIndex: 'imagename', flex: 1 }

 */
    ],

    listeners: {
        select: 'onItemSelected'
    }
});

Ext.define('iTeleskop.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'users',

    requires: [
        'iTeleskop.store.Users'
    ],

    title: 'Zadania',

    store: {
        type: 'tasks'
    },

    columns: [
        { text: 'User ID',  dataIndex: 'user_id' },
        { text: 'Login', dataIndex: 'login', flex: 1 },
        { text: 'Imię', dataIndex: 'firstname', flex: 1 },
        { text: 'Nazwisko', dataIndex: 'lastname', flex: 1 },
        { text: 'Udziały', dataIndex: 'share', flex: 1 },
        { text: 'Telefon', dataIndex: 'phone', flex: 1 },
        { text: 'e-mail', dataIndex: 'email', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
