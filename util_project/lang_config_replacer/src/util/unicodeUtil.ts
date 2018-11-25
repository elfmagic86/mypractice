
export function encode(str: string): string {
    const unicode_str = toUnicode(str);
    return unicode_str;
}
export function decode(unicode_str: string): string {
    const str = decodeURIComponent(JSON.parse(`"${unicode_str}"`));
    return str;
}

function toUnicode(theString) {
    var unicodeString = '';
    for (var i=0; i < theString.length; i++) {
        var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
        while (theUnicode.length < 4) {
        theUnicode = '0' + theUnicode;
        }
        theUnicode = '\\u' + theUnicode;
        unicodeString += theUnicode;
    }
    return unicodeString;
}

