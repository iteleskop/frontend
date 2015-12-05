// Ta klasa definuje nowy panel odpowiedzialny za dodawanie nowych zadan.

/// @todo: Wyciagac to z serwera, z tabeli telescopes
var AddTaskScopes = Ext.create('Ext.data.Store', {
    fields: [ 'telescope_id', 'text'],
    data: [
        { 'telescope_id': 1, 'text': '1: CDK 12.5" (Nerpio)' },
        { 'telescope_id': 2, 'text': '2: symulator teleskopu' }
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
            name: 'telescope_id',
            value: "1",
            xtype: 'combobox',
            valueField: 'telescope_id',
            displayField: 'text',
            queryMode: 'local',
            store: AddTaskScopes,
            width: 400
        },
        {
            // Wybor obiektu, jedno wielkie @todo trzeba te dane wyciagac z jakiejs bazy
            // danych, moze z simbada? Na razie wpisywane z reki
            fieldLabel: 'Obiekt',
            name: 'object'
        },
        {
            // Rektascencja: od 0h0m0s do 23h59m59s
            fieldLabel: 'Rektascencja',
            name: 'ra'
        },
        {
            // Wybor deklinacji, @todo wyciagac max. limity z tabeli telescopes,
            // na razie na sztywno od -20 do +90 dla CDK12.5" w Nerpio.
            fieldLabel: 'Deklinacja (-20 do +90)',
            labelWidth: 200,
            name: 'decl'
        },
        {
            fieldLabel: 'Opis zadania',
            name: 'descr'
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
        },
        {
            fieldLabel: 'Komentarz',
            name: 'comment'
        },
        {
            xtype: 'button',
            text: 'Sprawdź dane'
        },
        {
            xtype: 'displayfield',
            value: '',
            fieldLabel: 'Wygenerowane zadanie'
        }
    ]
});
