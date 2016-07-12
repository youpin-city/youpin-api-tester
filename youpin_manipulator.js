#!/usr/bin/env node

const api = require('./youpin_api_lib');

const program = require('commander');

var uriValue;

program
  .arguments('<uri>')
  .option('-f, --file <file>', 'data file to post')
  .option('-m, --method <method>', 'method to run')
  .option('-u, --username <username>', 'The user to authenticate as')
  .action(function(uri) {
    uriValue = uri;
  })
  .parse(process.argv);

if (!uriValue) {
  console.log('no <uri> given');
  process.exit(1);
}

switch(program.method) {
  case 'postPin': {
    const pinData = require(program.file);
    api(uriValue).postPin(pinData, function(body) {
      console.log(body);
    });
  } break;
  case 'postUser': {
    const userData = require(program.file);
    api(uriValue).postUser(userData, function(body) {
      console.log(body);
    });
  } break;
  default: {
    console.log('Default');
  }
}
