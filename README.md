**DEPRECATED** Please use [win-ca](https://github.com/ukoloff/win-ca) which is smaller, works in node 8 and has less dependencies than this module.

Read certificates from the Windows Cert Store from node.js.

## Installation

```
npm i windows-certs
```

## Usage

```javascript
var certs = require('windows-certs');

certs.get({
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

See also MSDN documentation on:

* [StoreName](https://msdn.microsoft.com/en-us/library/system.security.cryptography.x509certificates.storename(v=vs.110).aspx)
* [StoreLocation](https://msdn.microsoft.com/en-us/library/system.security.cryptography.x509certificates.storelocation(v=vs.110).aspx)

## License

MIT 2015 - José F. Romaniello
