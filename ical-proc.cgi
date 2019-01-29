#!/usr/bin/env node

const process = require('process'),
      https = require('https');
      config = require('./config.json'),
      ij = require('ical2json'),
      jp = require('jsonpath'),
      filters = require('./filters.js');

const echo = process.stdout.write.bind(process.stdout)

function httpGetAsync(options) {
    return new Promise((resolve, reject) => {
        https.get(options, res => {
            res.setEncoding('utf8')
            let body = ''
            res.on('data', chunk => body += chunk)
            res.on('end', () => {
                resolve(body)
            });
        }).on('error', (e) => reject(e));
    });
}

(async function(){
    const icalData = await httpGetAsync(config.calendarUrl);

    echo("Content-Type: text/text; charset=utf-8\r\n")
    echo("Status: 200 Success\r\n")
    echo("\r\n")

    const ical = ij.convert(icalData)

    for (const filter of filters) {
        jp.apply(ical, filter[0], filter[1])
    }

    echo(ij.revert(ical))
})().catch((reason) => {
    echo("Content-Type: text/html; charset=utf-8\r\n")
    echo("Status: 500 Internal Server Error\r\n")
    echo("\r\n")
    echo("<html><head><title>500 Internal Server Error</title></head><body>")
    echo("<h1>500 Internal Server Error</h1>")
    echo("<p>Promise Failed:</p>")
    echo(`<code>${reason}</code>`)
    echo("</body></html>")
    echo("\r\n")
})
