using Agoda.IoC.Core;
using Iffco.Malaysia.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Data;

namespace Iffco.Malaysia.Server.Data
{
    public interface IFileUploadRepository
    {
        void UploadFile(FileUpload fileUpload);
    }
    [RegisterPerRequest]

    public class FileUploadRepository(Repository dbContext) : IFileUploadRepository
    {
        private readonly Repository _dbContext = dbContext;

        public void UploadFile(FileUpload fileUpload)
        {
            _dbContext.FileUpload.Add(fileUpload);
            _dbContext.SaveChanges();
        }
    }
}
