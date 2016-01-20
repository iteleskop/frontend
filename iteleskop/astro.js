// Funkcja konwertuje rektascencje z formatu H:M:S do zapisu zmiennoprzecinkowego.
function RAhmsToFloat(h, m, s) {
    var ra = parseFloat(h)*15 + parseFloat(m)/4 + parseFloat(s)/240;
    return (ra.toFixed(6));
}

// Funkcja konwertuje rektascencje z formatu zmiennoprzecinkowego do stringa
// w postaci H:M:S, np. 12h34m56s
function RAfloatToHMS(ra) {
    if (ra == 0) {
        return ("-");
    }

    var h = Math.floor(ra/15); // hours
    var tmp = ra - (15*h);
    var m = Math.floor(tmp*4);
    tmp = tmp - (m/4);
    var s = Math.floor(tmp * 2400)/10;

    return (h + "h" + m + "m" + s + "s");
}

// Fukcja konwertuje deklinacje z formatu zmiennoprzecinkowego na
// stopnie, minuty, sekundy
function DeclinationFloatToDMS(dec, superscript) {
    if (dec == 0) {
        return ("-");
    }

    var superscript = typeof superscript !== 'undefined' ? superscript : true;

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

    if (superscript) {
        return (deg + "<sup>o</sup> " + m + "\'" + s + "\"");
    } else {
        return (deg + "deg. " + m + "m " + s + "s ");
    }
}


function DeclinationDMSToFloat(d, m, s) {
    var ra = parseFloat(d) + parseFloat(m)/60 + parseFloat(s)/3600;
    return (ra.toFixed(8));
}
