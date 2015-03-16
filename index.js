var edge = require('edge');
var path = require('path');
var async = require('async');

var getCerts = edge.func(path.join(__dirname, 'get_certs.csx'));

function internal_get(options, callback) {
  var params = {
    storeName: options.storeName || '',
    storeLocation: options.storeLocation || '',
    hasStoreName: !!options.storeName,
    hasStoreLocation: !!options.storeLocation
  };
  getCerts(params, callback);
}

exports.get = function (options, callback) {
  if (options.storeName && Array.isArray(options.storeName)) {
    return async.map(options.storeName, function (storeName, done) {
      return internal_get({
        storeName: storeName,
        storeLocation: options.storeLocation
      }, done);
    }, function (err, results) {
      if (err) return callback(err);
      callback(null, results.reduce(function (a, b){
        return a.concat(b);
      }));
    });
  }
  internal_get(options, callback);
};