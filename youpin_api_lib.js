const request = require('superagent');

module.exports = (uri) => {
  return {
    postUser: function(json, callback) {
      request
        .post(uri + '/users')
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
    },
    postPin: function(json, callback) {
      request
        .post(uri + '/pins')
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
};
