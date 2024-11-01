using Agoda.IoC.Core;
using Iffco.Malaysia.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Data;

namespace Iffco.Malaysia.Server.Data
{
    public interface IFtpCredentialRepository
    {
        void InsertFtpCredential(FtpCredential ftpCredential);
    }
    [RegisterPerRequest]
    public class FtpCredentialRepository(Repository repository) : IFtpCredentialRepository
    {
        public void InsertFtpCredential(FtpCredential ftpCredential)
        {
            repository.FtpCredentials.Add(ftpCredential);
            repository.SaveChanges();
        }
    }
}
