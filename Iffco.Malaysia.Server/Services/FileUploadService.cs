using Agoda.IoC.Core;
using Iffco.Malaysia.Server.Contracts;
using Iffco.Malaysia.Server.Data;
using Iffco.Malaysia.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Services;

namespace Iffco.Malaysia.Server.Services
{
    public interface IFileUploadservice
    {
        void UploadFile(FileUploadRequest fileUpload);
    }

    [RegisterPerRequest]
    public class FileUploadService(IHttpContextService httpContextService, IFileUploadRepository fileUploadRepository) : IFileUploadservice
    {
        private readonly IHttpContextService _httpContextService = httpContextService;
        private readonly IFileUploadRepository _fileUploadRepository = fileUploadRepository;

        public void UploadFile(FileUploadRequest fileUpload)
        {
            if (string.IsNullOrWhiteSpace(fileUpload.File))
                throw new ArgumentException("File is not valid.");

            var uploadedBy = _httpContextService.GetCurrentUserName();
            var newFileUpload = new FileUpload
            {
                FileName = fileUpload.FileName,
                UploadDate = DateTime.UtcNow,
                UploadedBy = uploadedBy,
                File = fileUpload.File,
            };

            _fileUploadRepository.UploadFile(newFileUpload);
        }
    }
}