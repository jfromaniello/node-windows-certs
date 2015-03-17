var store = require('../');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var fixture = fs.readFileSync(path.join(__dirname, 'cert_fixture.crt'), 'utf8');
var subject = "CN=hello.com, O=Internet Widgits Pty Ltd, S=Some-State, C=AU";

describe('windows-certs.get', function () {
  it('should work', function (done) {
    store.get({
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

  it('should work synchronous', function () {
    var certs = store.get({
      storeName: 'CertificateAuthority',
      storeLocation: 'LocalMachine'
    }, true);
    var cert = certs.filter(function (c) {
      return c.subject === subject;
    })[0];
    assert.equal(cert.pem, fixture.replace(/\r\n/ig, '\n'));
  });

  it('should work with multiple stores', function (done) {
    store.get({
      storeName: ['CertificateAuthority', 'TrustedPeople'],
      storeLocation: 'LocalMachine'
    }, function (err, certs) {
      var cert = certs.filter(function (c) {
        return c.subject === subject;
      })[0];
      assert.equal(cert.pem, fixture.replace(/\r\n/ig, '\n'));
      done();
    });
  });

  it('should work with multiple stores (sync)', function () {
    var certs = store.get({
      storeName: ['CertificateAuthority', 'TrustedPeople'],
      storeLocation: 'LocalMachine'
    });
    var cert = certs.filter(function (c) {
      return c.subject === subject;
    })[0];
    assert.equal(cert.pem, fixture.replace(/\r\n/ig, '\n'));
  });
});