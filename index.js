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
  return getCerts(params, callback);
}

exports.get = function (options, callback) {
  if (typeof callback === 'undefined') {
    callback = true;
  }

  if (!options.storeName || !Array.isArray(options.storeName)) {
    return internal_get(options, callback);
  }

  if (callback === true) {
    return options.storeName.map(function (storeName) {
      return internal_get({
        storeName: storeName,
        storeLocation: options.storeLocation
      }, true);
    }).reduce(function (prev, curr) {
      return prev.concat(curr);
    });
  }

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

};