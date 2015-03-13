var edge = require('edge');
var path = require('path');
var getCerts = edge.func(path.join(__dirname, 'get_certs.csx'));

exports.getPublicKeys = function (options, callback) {
  var params = {
    storeName: options.storeName || '',
    storeLocation: options.storeLocation || '',
    hasStoreName: !!options.storeName,
    hasStoreLocation: !!options.storeLocation
  };
  getCerts(params, callback);
};