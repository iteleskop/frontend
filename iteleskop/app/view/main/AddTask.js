// Ta klasa definuje nowy panel odpowiedzialny za dodawanie nowych zadan.

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
        padding: 0,
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
            value: "1 (Nerpio CDK12.5\")"
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
            name: 'decl'
        },
        {
            fieldLabel: 'Opis zadania',
            name: 'descr'
        },
        {
            fieldLabel: 'Filtr',
            name: 'filter'
        },
        {
            fieldLabel: 'Binning',
            name: 'binning'
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
