function setCookie(cname, cvalue, exdays = -1) {
    if(exdays === -1) {
        document.cookie = cname + "=" + cvalue + ";" + ";path=/";
    } else {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        document.cookie = cname + "=" + cvalue + ";" + "expires=" + d.toUTCString() + ";path=/";
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function loadAjaxDocToContainer(sourceDoc, params, targetContainerID) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                document.getElementById(targetContainerID).innerHTML = this.responseText;
            } catch (error) {}
        }
    };
    xhttp.open("POST", sourceDoc, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

function toGermanCurrency(n, dp) {
    n = n.replace('.', ',');
    var e = '', s = e+n, l = s.length, b = n < 0 ? 1 : 0,
        i = s.lastIndexOf(','), j = i == -1 ? l : i,
        r = e, d = s.substr(j+1, dp);
    while ( (j-=3) > b ) { r = '.' + s.substr(j, 3) + r; }
    return s.substr(0, j + 3) + r + 
        (dp ? ',' + d + ( d.length < dp ? 
            ('00000').substr(0, dp - d.length):e):e) + " €";
}

String.prototype.replaceAll = function(search, replace) {
    return (replace === undefined)? this.toString() : this.split(search).join(replace);
}

function replaceUmlaute(text) {
    return text.replaceAll("ö", "oe").replaceAll("ä", "ae").replaceAll("ü", "ue").replaceAll("Ö", "Oe").replaceAll("Ä", "Ae").replaceAll("Ü", "Ue");
}

function replaceCaseUrlFriendly(text) {
    return replaceUmlaute(text).toLowerCase().replaceAll(" / ", "-").replaceAll("+", "").replaceAll(" - ", "-").replaceAll(" ", "-").replaceAll("?", "-");
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function base64Decode(text) {
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    text = text.replaceAll("==", "");
    return Base64.decode(text);
}

function germanDateFormatToTime(date) {
    let time = 0;
    try {
        let numbers = date.split('.');
        numbers[0] = parseInt(numbers[0]);
        numbers[1] = parseInt(numbers[1]);
        numbers[2] = parseInt(numbers[2]);

        time = numbers[0]*24*60*60 + numbers[1]*30*24*60*60 + numbers[2]*12*30*24*60*60;
    } catch (error) {
        time = 0;
    }
    return isNaN(time) == true || time == null? 0 : time;
}
