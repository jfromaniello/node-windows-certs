Read certificates from the Windows Cert Store from node.js.

## Installation

```
npm i windows-certs
```

## Usage

```javascript
var certs = require('windows-certs');

certs.getPublicKeys({
  storeName: 'CertificateAuthority',
  storeLocation: 'LocalMachine'
}, function (err, certs) {
   console.log(certs);
});
```

The returned object `certs` is a object like this:

```json
{
  "subject": "CN=hello.com, O=Internet Widgits Pty Ltd, S=Some-State, C=AU",
  "issuer": "foo bar",
  "thumbprint": "...",
  "pem": "-----BEGIN CERTIFICATE-----\nMIID9DCCAtygAwIBAgIJANWBEUdUZOlPMA0GCSqGSIb3DQEBBQUAMFkxCzAJBgNV..."
}
```

## License

MIT 2015 - José F. Romaniello