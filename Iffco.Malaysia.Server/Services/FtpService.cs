using Agoda.IoC.Core;
using Iffco.Malaysia.Server.Data;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.Net;

namespace Iffco.Malaysia.Server.Services
{
    public interface IFtpService
    {
        void UploadBase64File(string base64String, string remoteFileName, int currentUserId);
    }

    [RegisterPerRequest]
    public class FtpService : IFtpService
    {
        private string _ftpServer= null;
        private string _username= null;
        private string _password= null;
        IFtpCredentialRepository _ftpCredentialRepository;
        public FtpService(IFtpCredentialRepository ftpCredentialRepository)
        {
            _ftpCredentialRepository = ftpCredentialRepository;
        }
        public void UploadBase64File(string base64String, string remoteFileName,int currentUserId)
        {
            var ftpCredential = _ftpCredentialRepository.GetFtpCredentialByUserId(currentUserId);
            if (ftpCredential == null)
            {
                throw new Exception("Ftp credential not found");
            }
            _ftpServer = ftpCredential.Server;
            _username = ftpCredential.Username;
            _password = ftpCredential.Password;
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
