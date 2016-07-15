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
var doAuth = false;

switch(program.method) {
  case 'postPin': {}
  case 'getUser': {
    doAuth = true;
  }; break;
  default: doAuth = false;
};
new api(uriValue, doAuth).then(function(agent) {
  switch(program.method) {
    case 'postPin': {
      const pinData = require(program.file);
      agent.postPin(pinData, function(body) {
        console.log(body);
      });
    } break;
    case 'postUser': {
      const userData = require(program.file);
      agent.postUser(userData, function(body) {
        console.log(body);
      })
    } break;
    case 'getUser': {
      agent.getUser(function(body) {
        console.log(body);
      });
    } break;
    case 'createApp3rd': {
      const appData = require(program.file);
      agent.createApp3rd(appData, function(body) {
        console.log(body);
      });
    }
    default: {
      console.log('Default');
    }
  }
});
