using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography.X509Certificates;

public static class MyExtensions
{
    public static string SplitLines(this string str)
    {
        var chunkSize = 64;
        var chunksCount = (int)Math.Ceiling((decimal)str.Length / chunkSize);

        var chunks = Enumerable.Range(0, chunksCount)
            .Select(i =>
            {
                return i == chunksCount - 1 ? str.Substring(i * chunkSize) :
                                              str.Substring(i * chunkSize, chunkSize);
            })
            .ToList();

        return String.Join("\n", chunks);
    }

    public static string ExportPEMEncoded(this X509Certificate2 cert)
    {
        return "-----BEGIN CERTIFICATE-----\n" +
               Convert.ToBase64String(cert.Export(X509ContentType.Cert)).SplitLines() +
               "\n-----END CERTIFICATE-----";
    }
}

public class Startup
{

    public async Task<object> Invoke(object input)
    {

        dynamic options = (dynamic)input;
        X509Store store;

        if (options.hasStoreName && options.hasStoreLocation) {
            var storeName = Enum.Parse(typeof(StoreName), options.storeName);
            var storeLocation = Enum.Parse(typeof(StoreLocation), options.storeLocation);
            store = new X509Store(storeName, storeLocation);
        } else if (options.hasStoreName) {
            var storeName = Enum.Parse(typeof(StoreName), options.storeName);
            store = new X509Store(storeName);
        } else if (options.hasStoreLocation) {
            var storeLocation = Enum.Parse(typeof(StoreLocation), options.storeLocation);
            store = new X509Store(storeLocation);
        } else {
            store = new X509Store();
        }

        store.Open(OpenFlags.ReadOnly);

        var result = store.Certificates.Cast<X509Certificate2>().Select(cert => new {
            pem = cert.ExportPEMEncoded(),
            subject = cert.SubjectName.Name,
            thumbprint = cert.Thumbprint,
            issuer = cert.IssuerName.Name
        });

        return result;
    }

}
