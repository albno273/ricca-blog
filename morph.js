Mecab = require('mecab-async');
let mecab = new Mecab();
Mecab.command =
    "mecab -d /usr/local/lib/mecab/dic/mecab-ipadic-neologd";

module.exports = function (title, callback) {
    let words_arr = [];

    mecab.wakachi(title, function (err, items) {
        if (err) return callback(err, null);
        else {
            items.forEach(function (value, index, array) {
                words_arr.push(value);
            });
            return callback(null, words_arr);
        }
    });
}