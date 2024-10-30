using Agoda.IoC.Core;
using Iffco.Malaysia.Server.Contracts;
using Iffco.Malaysia.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Data;
using Mauritius.EInvoicing.Server.Services;

namespace Iffco.Malaysia.Server.Services
{
    public interface IFileUploadservice
    {
        void UploadFile(FileUploadRequest fileUpload);
    }
    [RegisterPerRequest]
    public class FileUploadService(IHttpContextService httpContextService, Repository dbContext) : IFileUploadservice
    {
        private readonly IHttpContextService httpContextService = httpContextService;
        private readonly Repository dbContext = dbContext;

        public void UploadFile(FileUploadRequest fileUpload)
        {
            if (string.IsNullOrWhiteSpace(fileUpload.File))
                throw new ArgumentException("File is not valid.");
            var uploadedBy = httpContextService.GetCurrentUserName();
            var newFileUpload = new FileUpload
            {
                FileName = fileUpload.FileName,
                UploadDate = DateTime.UtcNow,
                UploadedBy = uploadedBy,
                File = fileUpload.File,
            };

            dbContext.FileUpload.Add(newFileUpload);
            dbContext.SaveChanges();
        }

    }
}
