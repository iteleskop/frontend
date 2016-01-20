// Ta klasa definuje nowy panel odpowiedzialny za dodawanie nowych zadan.

/// @todo: Wyciagac te dane po stronie serwera z MySQL, z tabeli telescopes
var AddTaskScopes = Ext.create('Ext.data.Store', {
    fields: [ 'scope_id', 'text'],
    data: [
        { 'scope_id': 1, 'text': '1: CDK 12.5" (Nerpio)' },
        { 'scope_id': 2, 'text': '2: symulator teleskopu' }
    ]
});

var AddTaskBinning = Ext.create('Ext.data.Store', {
    fields: [ 'binning', 'text'],
    data: [
        { 'binning': 1, 'text': '1x1' },
        { 'binning': 2, 'text': '2x2' },
        { 'binning': 3, 'text': '3x3' },
        { 'binning': 4, 'text': '4x4' }
    ]
});

/// @todo: Wyciagac te dane po stronie serwera z MySQL, z tabeli filters
var AddTaskFilters = Ext.create('Ext.data.Store', {
    fields: ['filter' , 'text'],
    data: [
        { 'filter': 'CV',     'text': 'L (luminance)' },
        { 'filter': 'TR',   'text': 'R (red)' },
        { 'filter': 'TG', 'text': 'G (green)' },
        { 'filter': 'TB',  'text': 'B (blue)' },
        { 'filter': 'HA',    'text': 'H-alpha' },
        { 'filter': 'V',     'text': 'V (fotometric)' },
        { 'filter': 'B',     'text': 'B (fotometric)' },
        { 'filter': 'R',     'text': 'R (fotometric)' },
        { 'filter': 'none',  'text': 'bez filtra' }
    ]
});

var InitialState = Ext.create('Ext.data.Store', {
    fields: ['state', 'text'],
    data: [
        { 'state': 0, 'text': 'Waiting (0)' },
        { 'state': 1, 'text': 'New (1)' }
    ]
});

Ext.define('iTeleskop.view.main.AddTask', {
    extend: 'Ext.form.Panel',
    title: 'Nowe zadanie',
    xtype: 'addtask',

    // Eskperyment z przewijaniem (autoScroll + height w pixelach wlacza scroll
    // pionowy)
    autoScroll: true,
    height: 900,

    url: 'php/classes/AddTask.php',

    layout: {
        type: 'vbox',
        align: 'left',
        padding: 10,
        autoScroll: true,
        overflowX: 'scroll',
        overflowY: 'scroll'
    },

    defaultType: 'textfield',
    items: [
        {
            // To pole jest ustawianie w metodzie beforerender
            name: 'user_id',
            xtype: 'textfield',
            fieldLabel:'ID użytkownika',
            readOnly: true,
            labelWidth: 300
        },
        {
            // Wybor obiektu, jedno wielkie @todo trzeba te dane wyciagac z jakiejs bazy
            // danych, moze z simbada? Na razie wpisywane z reki
            fieldLabel: 'Obiekt',
            name: 'object',
            labelWidth: 300,
            allowBlank: false
        },

        // Right ascension starts here
        {
            xtype: 'container',
            layout: 'hbox',
            layoutConfig: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            padding: "0 0 10 0", // top right bottom left
            items: [
                {
                    // Right ascension in floating point format.
                    xtype: 'textfield',
                    fieldLabel: 'Rektascencja',
                    name: 'ra',
                    value: '0.0',
                    labelWidth: 300,
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    text: 'a.b => h:m:s',
                    scope: this,
                    handler: function(x) {
                        var ra_field = x.up().up().getForm().findField('ra');
                        var h_field = x.up().up().getForm().findField('ra_h');
                        var m_field = x.up().up().getForm().findField('ra_m');
                        var s_field = x.up().up().getForm().findField('ra_s');

                        var ra = ra_field.getValue();
                        var h = Math.floor(ra/15); // hours
                        var tmp = ra - (15*h);
                        var m = Math.floor(tmp*4);
                        tmp = tmp - (m/4);
                        var s = Math.floor(tmp * 2400)/10;
                        h_field.setValue(h);
                        m_field.setValue(m);
                        s_field.setValue(s);
                    }
                },
                {
                    xtype: 'button',
                    text: 'a.b <= h:m:s',
                    handler: function(x) {
                        var ra_field = x.up().up().getForm().findField('ra');
                        var h_field = x.up().up().getForm().findField('ra_h');
                        var m_field = x.up().up().getForm().findField('ra_m');
                        var s_field = x.up().up().getForm().findField('ra_s');

                        var ra = RAhmsToFloat(h_field.getValue(), m_field.getValue(),
                                              s_field.getValue());
                        ra_field.setValue(ra);
                    }
                },
                {
                    // Right ascension (hour value: 0...23)
                    xtype: 'textfield',
                    fieldLabel: 'h',
                    labelAlign: 'right',
                    value: '0',
                    name: 'ra_h',
                    labelWidth: 30,
                    width: 100,
                    allowBlank: false
                },
                {
                    // Right ascension (minute value: 0...59)
                    xtype: 'textfield',
                    fieldLabel: 'm',
                    labelAlign: 'right',
                    value: '0',
                    name: 'ra_m',
                    labelWidth: 30,
                    width: 100,
                    allowBlank: false
                },
                {
                    // Right ascension (seconds value: 0.0...59.99)
                    xtype: 'textfield',
                    fieldLabel: 's',
                    labelAlign: 'right',
                    value: '0.0',
                    name: 'ra_s',
                    labelWidth: 30,
                    width: 100,
                    allowBlank: false
                }
            ]
        },
        // End of right ascension declaration

        // Declination starts here
        {
            xtype: 'container',
            layout: 'hbox',
            layoutConfig: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            padding: "0 0 10 0", // top right bottom left
            items: [
                {
                    // Wybor deklinacji, @todo wyciagac max. limity z tabeli telescopes,
                    // na razie na sztywno od -20 do +90 dla CDK12.5" w Nerpio.
                    xtype: 'textfield',
                    fieldLabel: 'Deklinacja (-20 do +90)',
                    name: 'decl',
                    value: '0.0',
                    labelWidth: 300,
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    text: 'a.b => deg:m:s',
                    scope: this,
                    handler: function(x) {
                        var dec_field = x.up().up().getForm().findField('decl');
                        var d_field = x.up().up().getForm().findField('decl_deg');
                        var m_field = x.up().up().getForm().findField('decl_m');
                        var s_field = x.up().up().getForm().findField('decl_s');

                        var dec = dec_field.getValue();
                        var negative = false;
                        if (dec < 0) {
                            negative = true;
                            dec = -dec;
                        }

                        var deg = Math.floor(dec);
                        var tmp = (dec - deg)*60;
                        var m = Math.floor(tmp);
                        tmp = (tmp - m)*600;
                        var s = Math.round(tmp)/10;

                        if (negative) {
                            deg = -deg;
                        }

                        d_field.setValue(deg);
                        m_field.setValue(m);
                        s_field.setValue(s);
                    }
                },
                {
                    xtype: 'button',
                    text: 'a.b <= deg:m:s',
                    handler: function(x) {
                        var decl_field = x.up().up().getForm().findField('decl');
                        var d_field = x.up().up().getForm().findField('decl_deg');
                        var m_field = x.up().up().getForm().findField('decl_m');
                        var s_field = x.up().up().getForm().findField('decl_s');

                        var decl = DeclinationDMSToFloat(d_field.getValue(),
                                                         m_field.getValue(),
                                                         s_field.getValue());
                        decl_field.setValue(decl);
                    }
                },
                {
                    // Right ascension (hour value: 0...23)
                    xtype: 'textfield',
                    fieldLabel: 'deg',
                    labelAlign: 'right',
                    value: '0',
                    name: 'decl_deg',
                    labelWidth: 30,
                    width: 100,
                    allowBlank: false
                },
                {
                    // Right ascension (minute value: 0...59)
                    xtype: 'textfield',
                    fieldLabel: 'm',
                    labelAlign: 'right',
                    value: '0',
                    name: 'decl_m',
                    labelWidth: 30,
                    width: 100,
                    allowBlank: false
                },
                {
                    // Right ascension (seconds value: 0.0...59.99)
                    xtype: 'textfield',
                    fieldLabel: 's',
                    labelAlign: 'right',
                    value: '0.0',
                    name: 'decl_s',
                    labelWidth: 30,
                    width: 100,
                    allowBlank: false
                }
            ]
        },
        // Declination ends here

        {
            fieldLabel: 'Espozycja [s]',
            name: 'exposure',
            value: '10',
            labelWidth: 300,
            allowNegative: false,
            allowBlank: false,

            // Ta walidacja jakos nie chce dzialac
            validator: function(val) {
                if (val === "") {
                    return "Nie moze byc pusta";
                }
                if (isNaN(val)) {
                    return "Wartość nie jest liczbą";
                }

                if (val < 0) {
                    return "Wartość nie może być ujemna";
                }

                return true;
            }
        },

        {
            fieldLabel: 'Initial state',
            name: 'state',
            value: '1',
            xtype: 'combobox',
            valueField: 'state',
            displayField: 'text',
            queryMode: 'local',
            store: InitialState,
            labelWidth: 300
        },
        {
            // Wybor teleskopu: @todo: wyciagac te dane z tabeli telescopes
            fieldLabel: 'Teleskop',
            name: 'scope_id',
            value: "1",
            xtype: 'combobox',
            valueField: 'scope_id',
            displayField: 'text',
            queryMode: 'local',
            store: AddTaskScopes,
            labelWidth: 300
        },
        {
            fieldLabel: 'Opis zadania',
            labelWidth: 300,
            name: 'descr'
        },
        {
            fieldLabel: 'Komentarz',
            name: 'comment',
            labelWidth: 300,
            value: 'na'
        },
        {
            fieldLabel: 'Filtr',
            name: 'filter',
            editable: false,
            value: 'none',
            xtype: 'combobox',
            valueField: 'filter',
            displayField: 'text',
            queryMode: 'local',
            store: AddTaskFilters,
            labelWidth: 300
        },
        {
            fieldLabel: 'Binning',
            xtype: 'combobox',
            name: 'binning',
            store: AddTaskBinning,
            queryMode: 'local',
            valueField: 'binning',
            displayField: 'text',
            labelWidth: 300,
            value: '2'
        },
        {
            fieldLabel: 'Defocus',
            xtype: 'checkbox',
            name: 'defocus',
            labelWidth: 300,
            checked: false
        },
        {
            fieldLabel: 'Kalibracja zdjęć',
            xtype: 'checkbox',
            checked: true,
            labelWidth: 300,
            name: 'calibrate'
        },
        {
            fieldLabel: 'Rozwiąż (pinpoint)',
            xtype: 'checkbox',
            checked: true,
            labelWidth: 300,
            name: 'solve'
        },
        {
            fieldLabel: 'Vphot',
            xtype: 'checkbox',
            checked: false,
            labelWidth: 300,
            name: 'vphot'
        },
        {
            fieldLabel: 'Dodatkowe komendy',
            labelWidth: 300,
            name: 'other_cmd'
        },
        {
            fieldLabel: 'Minimalna wysokość (w stopniach)',
            name: 'min_alt',
            value: '0',
            labelWidth: 300
        },
        {
            fieldLabel: 'Min. odległość od księżyca (w stopniach)',
            labelWidth: 300,
            name: 'moon_distance',
            value: '0'
        },
        {
            fieldLabel: 'Nie rozpoczynaj przed datą:',
            labelWidth: 300,
            //xtype: 'datetimefield',
            //format: 'Y-m-d H:i',
            name: 'skip_before'
        },
        {
            fieldLabel: 'Nie rozpoczynaj po dacie:',
            labelWidth: 300,
            name: 'skip_after'
        },
        {
            fieldLabel: 'Nie wykonuj, jeżeli ostatnie zdjęcie było mniej niż X sekund temu',
            labelWidth: 300,
            name: 'skip_interval'
        },
        {
            fieldLabel: 'Pomiń, jeżeli co najmniej x zdjęć zostało zrobionych w ostatnich ... sekundach',
            labelWidth: 300,
            name: 'skip_period_seconds'
        },
        {
            fieldLabel: 'Pomiń, jeżeli co najmniej ... zdjęć zostało zrobionych w ostatnich x sekundach',
            labelWidth: 300,
            name: 'skip_period_count'
        }
    ], // koniec items, czyli obiektow znadujacych sie w tej formie
    buttons: [
        {
            text: 'Wyślij',
            handler: function() {
                var form = this.up('form'); // get the form panel
                if (form.isValid()) { // make sure the form contains valid data before submitting
                    form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert('Sukces', action.result.msg);
                            Ext.getStore('tasks').load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Porażka', action.result.msg);
                        }
                    });
                } else { // display error alert if the data is invalid
                    Ext.Msg.alert('Niepoprawne', 'Proszę sprawdzić poprawność.')
                }
            }
        },
        {
            text: "Sprawdź dane",
            handler: function() {
                var form = this.up('form'); // get the form panel
                if (form.isValid()) { // make sure the form contains valid data before submitting
                    Ext.Msg.alert('Sukces', "Dane wygladają na poprawne.");
                } else { // display error alert if the data is invalid
                    Ext.Msg.alert('Niestety', 'Popraw pola oznaczone czerwonym kolorem.');
                }
            }
        }
    ],

    listeners: {

        // Ta funkcja jest zawolana zaraz przed wyrenderowaniem formularza.
        // Wyciagamy dane z magazynu 'user' i ustawiamy pole formularza
        // user_id.
        beforerender: function(component, eOpts) {
            var user_id = Ext.getStore('user').getAt(0).data.user_id;
            component.getForm().findField('user_id').setValue(user_id);
        }
    }
});
