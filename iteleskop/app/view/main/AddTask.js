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
        { 'binning': 3, 'text': '3x3' }
    ]
});

/// @todo: Wyciagac te dane po stronie serwera z MySQL, z tabeli filters
var AddTaskFilters = Ext.create('Ext.data.Store', {
    fields: ['filter' , 'text'],
    data: [
        { 'filter': 'L',     'text': 'L (luminancja)' },
        { 'filter': 'Red',   'text': 'R (red)' },
        { 'filter': 'Green', 'text': 'G (green)' },
        { 'filter': 'Blue',  'text': 'B (blue)' },
        { 'filter': 'Ha',    'text': 'H-alpha' },
        { 'filter': 'V',     'text': 'V (fotometryczny)' },
        { 'filter': 'B',     'text': 'B (fotometryczny)' },
        { 'filter': 'none',  'text': 'bez filtra' }
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
            // Wybor teleskopu: @todo: wyciagac te dane z tabeli telescopes
            fieldLabel: 'Teleskop',
            name: 'scope_id',
            value: "1",
            xtype: 'combobox',
            valueField: 'scope_id',
            displayField: 'text',
            queryMode: 'local',
            store: AddTaskScopes,
            width: 400
        },
        {
            // Wybor obiektu, jedno wielkie @todo trzeba te dane wyciagac z jakiejs bazy
            // danych, moze z simbada? Na razie wpisywane z reki
            fieldLabel: 'Obiekt',
            name: 'object',
            allowBlank: false
        },
        {
            // Rektascencja: od 0h0m0s do 23h59m59s
            fieldLabel: 'Rektascencja',
            name: 'ra',
            allowBlank: false
        },
        {
            // Wybor deklinacji, @todo wyciagac max. limity z tabeli telescopes,
            // na razie na sztywno od -20 do +90 dla CDK12.5" w Nerpio.
            fieldLabel: 'Deklinacja (-20 do +90)',
            labelWidth: 200,
            name: 'decl',
            allowBlank: false
        },
        {
            fieldLabel: 'Espozycja [s]',
            name: 'exposure',
            value: '10',
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
            fieldLabel: 'Opis zadania',
            name: 'descr'
        },
        {
            fieldLabel: 'Komentarz',
            name: 'comment',
            value: 'na'
        }
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
            width: 400
        },
        {
            fieldLabel: 'Binning',
            xtype: 'combobox',
            name: 'binning',
            store: AddTaskBinning,
            queryMode: 'local',
            valueField: 'binning',
            displayField: 'text',
            value: '2'
        },
        {
            fieldLabel: 'Defocus',
            xtype: 'checkbox',
            name: 'defocus',
            checked: false
        },
        {
            fieldLabel: 'Kalibracja zdjęć',
            xtype: 'checkbox',
            checked: true,
            name: 'calibrate'
        },
        {
            fieldLabel: 'Rozwiąż (pinpoint)',
            labelWidth: 150,
            xtype: 'checkbox',
            checked: true,
            name: 'solve'
        },
        {
            fieldLabel: 'Vphot',
            xtype: 'checkbox',
            checked: false,
            name: 'vphot'
        },
        {
            fieldLabel: 'Dodatkowe komendy',
            name: 'other_cmd'
        },
        {
            fieldLabel: 'Minimalna wysokość (w stopniach)',
            name: 'min_alt',
            value: '0'
        },
        {
            fieldLabel: 'Min. odległość od księżyca (w stopniach)',
            labelWidth: 300,
            name: 'moon_distance',
            value: '0'
        },
        {
            fieldLabel: 'Nie rozpoczynaj przed...',
            //xtype: 'datetimefield',
            //format: 'Y-m-d H:i',
            name: 'skip_before'
        },
        {
            fieldLabel: 'Nie rozpoczynaj po...',
            name: 'skip_after'
        },
        {
            fieldLabel: 'Nie wykonuj, jeżeli ostatnie zdjęcie było mniej X sekund temu',
            name: 'skip_interval'
        },
        {
            fieldLabel: 'Skip if X photos were done in last (Y) seconds',
            name: 'skip_period_seconds'
        },
        {
            fieldLabel: 'Skip if (X) photos were done in the last Y seconds',
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
                           Ext.Msg.alert('Success', action.result.msg);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result.msg);
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
    ]
});
