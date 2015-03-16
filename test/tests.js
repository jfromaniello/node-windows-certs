var store = require('../');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var fixture = fs.readFileSync(path.join(__dirname, 'cert_fixture.crt'), 'utf8');
var subject = "CN=hello.com, O=Internet Widgits Pty Ltd, S=Some-State, C=AU";

describe('windows-certs', function () {
  it('getPublicKeys should work', function (done) {
    store.getPublicKeys({
      storeName: 'CertificateAuthority',
      storeLocation: 'LocalMachine'
    }, function (err, certs) {
      var cert = certs.filter(function (c) {
        return c.subject === subject;
      })[0];
      assert.equal(cert.pem, fixture.replace(/\r\n/ig, '\n'));
      done();
    });
  });
});