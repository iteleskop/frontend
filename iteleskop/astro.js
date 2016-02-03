// Funkcja konwertuje rektascencje z formatu H:M:S do zapisu zmiennoprzecinkowego.
function RAhmsToFloat(h, m, s) {
    var ra = parseFloat(h) + parseFloat(m)/60 + parseFloat(s)/3600;
    return (ra.toFixed(6));
}

// Funkcja konwertuje rektascencje z formatu zmiennoprzecinkowego do stringa
// w postaci H:M:S, np. 12h34m56s
function RAfloatToHMS(ra) {
    if (ra == 0) {
        return ("-");
    }

    var h = Math.floor(ra); // hours
    var tmp = ra - (h);
    var m = Math.floor(tmp*60);
    tmp = tmp - (m/60); // remove minutes
    var s = Math.floor(tmp * 3600);

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

    var sign = "+";
    if (negative) {
        sign = "-";
    }

    if (superscript) {
        return (sign + deg + "<sup>o</sup> " + m + "\'" + s + "\"");
    } else {
        return (sign + deg + "deg. " + m + "m " + s + "s ");
    }
}


function DeclinationDMSToFloat(d, m, s) {
    var negative = false;
    if (d < 0) {
        negative = true;
        d = -d;
    }

    var decl = parseFloat(d) + parseFloat(m)/60 + parseFloat(s)/3600;
    if (negative) {
        decl = -decl;
    }
    return (decl.toFixed(8));
}
