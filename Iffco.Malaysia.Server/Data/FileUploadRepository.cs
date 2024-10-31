using Agoda.IoC.Core;
using Iffco.Malaysia.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Data;

namespace Iffco.Malaysia.Server.Data
{
    public interface IFileUploadRepository
    {
        void UploadFile(FileUpload fileUpload);
        List<FileUpload> GetAllFiles(int limit, int offset);
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

        public List<FileUpload> GetAllFiles(int limit, int offset)
        {
            return _dbContext.FileUpload.Skip(offset).Take(limit).OrderByDescending(x=>x.Id).ToList();
        }
    }
}
