using Agoda.IoC.Core;
using Iffco.Malaysia.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Data;

namespace Iffco.Malaysia.Server.Data
{
    public interface IFtpCredentialRepository
    {
        void InsertFtpCredential(FtpCredential ftpCredential);
        FtpCredential GetFtpCredentialByUserId(int userId);
    }
    [RegisterPerRequest]
    public class FtpCredentialRepository(Repository repository) : IFtpCredentialRepository
    {
        public void InsertFtpCredential(FtpCredential ftpCredential)
        {
            repository.FtpCredentials.Add(ftpCredential);
            repository.SaveChanges();
        }
        public FtpCredential GetFtpCredentialByUserId(int userId)
        {
            return repository.FtpCredentials.FirstOrDefault(x => x.UserId == userId);
        }
    }
}
