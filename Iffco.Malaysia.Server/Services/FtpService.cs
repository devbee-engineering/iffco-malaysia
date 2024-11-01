using Agoda.IoC.Core;
using System.Diagnostics;
using System.Net;

namespace Iffco.Malaysia.Server.Services
{
    public interface IFtpService
    {
        void UploadBase64File(string base64String, string remoteFileName);
    }

    [RegisterPerRequest]
    public class FtpService : IFtpService
    {
        private readonly string _ftpServer= "ftp://localhost";
        private readonly string _username="PC";
        private readonly string _password="musthak";
        //public FtpService()
        //{
        //    _ftpServer = ftpServer;
        //    _username = username;
        //    _password = password;
        //}
        public void UploadBase64File(string base64String, string remoteFileName)
        {
            // Decode the Base64 string into a byte array
            byte[] fileBytes = Convert.FromBase64String(base64String);

            var request = (FtpWebRequest)WebRequest.Create(new Uri($"{_ftpServer}/{remoteFileName}"));
            request.Method = WebRequestMethods.Ftp.UploadFile;
            request.Credentials = new NetworkCredential(_username, _password);
            request.ContentLength = fileBytes.Length;

            using (Stream requestStream = request.GetRequestStream())
            {
                requestStream.Write(fileBytes, 0, fileBytes.Length);
            }

            using var response = (FtpWebResponse)request.GetResponse();
            Console.WriteLine($"Upload File Complete, status {response.StatusDescription}");
        }
    }
}
