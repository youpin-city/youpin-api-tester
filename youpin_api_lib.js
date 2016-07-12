const request = require('superagent');

const feathers = require('feathers/client');
const rest  = require('feathers-rest/client');
const hooks  = require('feathers-hooks');
const authentication  = require('feathers-authentication/client');

class Api {
  // initialise and do authentication
  constructor(uri, doAuth) {
    this.uri = uri;
    this.token;
    const app = feathers()
      .configure(hooks())
      .configure(rest(uri).superagent(request))
      .configure(authentication());
    return new Promise(resolve => {
      if(doAuth) {
        app.authenticate({
          type: 'local',
          'email': 'theeraphol.wat@gmail.com',
          'password': 'theeraphol.wat'
        }).then(result => {
          this.token = app.get('token');
          resolve(this);
        }).catch(error => {
          console.log(error);
        });
      } else {
        resolve(this);
      }
    });
  }

  getUser(callback) {
    console.log('Get user...');
    request
      .get(this.uri+ '/users')
      .set('Authorization', 'Bearer ' + this.token)
      .end(function(err, resp) {
        if (err || !resp.ok) {
          console.log('Unable to get user');
          return callback(err);
        }
        callback(resp.body);
      });
  }

  postUser(json, callback) {
    console.log('Post user...');
    request
      .post(this.uri + '/users')
      .send(json)
      .end(function(err, resp) {
        if (err || !resp.ok) {
          console.log('Unable to post user');
          //console.log(resp);
          console.log(err);
          return;
        }
        return callback(resp.body);
      });
  }
  postPin(json, callback) {
    console.log('Post pin...');
    request
      .post(this.uri + '/pins')
      .send(json)
      .end(function(err, resp) {
        if (err || !resp.ok) {
          console.log('Unable to post pin');
          //console.log(resp);
          console.log(err);
          return;
        }
        return callback(resp.body);
      });
  }
};
module.exports = Api;
