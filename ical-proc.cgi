#!/usr/bin/env node

const process = require('process');

const echo = process.stdout.write.bind(process.stdout)

echo("Content-Type: text/html; charset=utf-8\r\n\r\n")
echo("Yo\n")
echo(process.env.HTTP_USER_AGENT)

process.exit(0);