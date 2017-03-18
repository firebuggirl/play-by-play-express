var r = require('request').defaults({
    json: true
});
var async = require('async');
var redis = require('redis');//key/value caching..installed globally via homebrew and locally via npm

var client = redis.createClient(6379, '127.0.0.1');


    module.exports = function(app) {

        /* Read */
        app.get('/pets',  function (req, res) {

            async.parallel({
                cat: function(callback){
                    r({uri: 'http://localhost:3000/cat'}, function(error, response, body) {
                        if (error) {
                            callback({service: 'cat', error: error});
                            return;
                        }
                        if (!error && response.statusCode === 200) {
                            callback(null, body);
                        } else {
                            callback(response.statusCode);
                        }
                    });
                },
                dog: function(callback){
                  client.get('http://localhost:3001/dog', function(err, dog) {//check redis to see if this in in cache
                    r({uri: 'http://localhost:3001/dog'}, function(error, response, body) {
                        if (error) {
                            callback({service: 'dog', error: error});
                            return;
                        }
                        if (!error && response.statusCode === 200) {
                            callback(null, body.data);
                            //client.set('http://localhost:3001/dog', JSON.stringify(body.data), function (error){//have to stringify when pushing to redis
                             client.setex('http://localhost:3001/dog', 10, JSON.stringify(body.data), function(error) {//set 10 sec expiration on cache, but first have to purge what has already been set via flushdb in redis-cli, then retype KEYS * and will get empty list, refresh http://localhost:3002/pets to get key back
                              if(error){
                                throw error;
                              }
                            });
                        } else {
                            callback(response.statusCode);
                        }
                    });


                    }
                );
              }
            },
            function(error, results) {
                res.json({
                    error: error,
                    results: results
                });
            });

        });
      };
// client.setex(req.params.id, 10, JSON.stringify(body), function (error) {
