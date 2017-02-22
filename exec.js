const client = require('cheerio-httpcli'),
      async = require('async'),
      morph = require('./morph.js'),
      judge = require('./judgekhk.js');

// コンソール出力の色分け用
const red = '\u001b[31m',
      blue = '\u001b[34m',
      reset = '\u001b[0m';

let tcount = 0,
    fcount = 0;

function fetchTitle(pageNum) {
    const url = `http://ameblo.jp/ricca0227/entrylist-${pageNum}.html`;
    client.fetch(url, function (err, $, res, body) {
        // console.log(url);
        for (let j = 0; j < 20; j++) {
            const title = $('.contentTitleArea').eq(j).text()
                .trim().replace(/NEW !/g, "");
            // console.log(j + ': ' + title);
            async.waterfall([
                function (callback) {
                    morph(title, function (err, res) {
                        if (err) callback(err, null);
                        else callback(null, res)
                    });
                },
                function (title, callback) {
                    judge(title, function (res) {
                        if (res) {
                            console.log(red  + ++tcount + '\t: ' + title + reset);
                        } else {
                            console.log(blue + ++fcount + '\t: ' + title + reset);
                        }
                        callback(null);
                    });
                }
            ], function (err, res) { if (err) console.log(err) });
        }
    });
}

// exec
let pageNum = 1;
let interval = setInterval(() => {
    console.log('===== page ' + pageNum + ' =====');
    fetchTitle(pageNum);
    if (pageNum >= 50) clearInterval(interval);
    pageNum++;
}, 1000);