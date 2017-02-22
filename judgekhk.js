const text_1 = ['点滴', 'スウィープ'], // true
      text_2 = ['氷', '瀑', 'ダイナソー'], // true
      text_3 = ['経口', 'エビ', 'カレー'], // true
      text_4 = ['手押し', 'マーガレット'], // false
      text_5 = ['リソース', '虎落笛'], // false
      text_6 = ['突撃', '☆', 'となり', 'の', 'ネイル', '屋', 'さん', '！']; //false 

module.exports = function (text_array, callback) {
    if (text_array.length < 2)
        return callback(false);
    else {
        return callback(main(text_array));
    }
}

function main(text_array) {
    if (text_array.length == 2) {
        // Text 1
        const flg_front = isKanji(text_array[0].substr(0, 1));
        const flg_behind = isKatakana(text_array[1].substr(0, 1));

        if (flg_front && flg_behind && text_array[0].length == 2)
            return true;
        else
            return false;
    } else {
        const flg_center = isKanji(text_array[1].substr(0, 1));
        if (flg_center) {
            // Text 2
            const flg_front = isKanji(text_array[0].substr(0, 1))
                && isKanji(text_array[1].substr(0, 1));
            let flg_behind = true;
            for (let i = 2; i < text_array.length; i++) {
                flg_behind = flg_behind && isKatakana(text_array[i].substr(0, 1));
            }

            if (flg_front && flg_behind &&
                text_array[0].length + text_array[1].length == 2)
                return true;
            else
                return false;
        } else {
            // Text 3
            const flg_front = isKanji(text_array[0].substr(0, 1));
            let flg_behind = true;
            for (let i = 1; i < text_array.length; i++) {
                flg_behind = flg_behind && isKatakana(text_array[i].substr(0, 1));
            }

            if (flg_front && flg_behind && text_array[0].length == 2)
                return true;
            else
                return false;
        }
    }
}

function isKanji(c, callback) { // c:判別したい文字
    const unicode = c.charCodeAt(0);
    if ((unicode >= 0x4e00 && unicode <= 0x9fcf) || // CJK統合漢字
        (unicode >= 0x3400 && unicode <= 0x4dbf) || // CJK統合漢字拡張A
        (unicode >= 0x20000 && unicode <= 0x2a6df) || // CJK統合漢字拡張B
        (unicode >= 0xf900 && unicode <= 0xfadf) || // CJK互換漢字
        (unicode >= 0x2f800 && unicode <= 0x2fa1f))  // CJK互換漢字補助
        return true;

    return false;
}

function isKatakana(c, callback) {
    const unicode = c.charCodeAt(0);
    if (unicode >= 0x30a0 && unicode <= 0x30ff)
        return true;

    return false;
}