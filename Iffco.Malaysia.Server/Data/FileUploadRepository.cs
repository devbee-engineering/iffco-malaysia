using Agoda.IoC.Core;
using Iffco.Malaysia.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Data;

namespace Iffco.Malaysia.Server.Data
{
    public interface IFileUploadRepository
    {
        void InsertFileInfo(FileUpload fileUpload);
        void UpdateFileInfo(FileUpload fileUpload);
        List<FileUpload> GetAllFiles(int limit, int offset);
    }
    [RegisterPerRequest]

    public class FileUploadRepository(Repository dbContext) : IFileUploadRepository
    {
        private readonly Repository _dbContext = dbContext;

        public void InsertFileInfo(FileUpload fileUpload)
        {
            _dbContext.FileUpload.Add(fileUpload);
            _dbContext.SaveChanges();
        }
        public void UpdateFileInfo(FileUpload fileUpload)
        {
            _dbContext.FileUpload.Update(fileUpload);
            _dbContext.SaveChanges();
        }
        public List<FileUpload> GetAllFiles(int limit, int offset)
        {
            return _dbContext.FileUpload.OrderByDescending(x => x.Id).Skip(offset).Take(limit).ToList();
        }
    }
}
