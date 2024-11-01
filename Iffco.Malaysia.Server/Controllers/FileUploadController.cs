using Iffco.Malaysia.Server.Contracts;
using Iffco.Malaysia.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Iffco.Malaysia.Server.Controllers
{
    [ApiController]
    [Route("FileUpload")]
    public class FileUploadController(IFileUploadservice fileUploadService) : ControllerBase
    {
        private readonly IFileUploadservice _fileUploadService = fileUploadService;

        [HttpPost]
        [Route("Upload")]
        public IActionResult Upload([FromBody] FileUploadRequest fileUploadRequest)
        {
            try
            {
                _fileUploadService.UploadFile(fileUploadRequest);
                return Ok(new { Message = "File uploaded successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAllFiles")]
        public IActionResult GetAllFiles([FromQuery] int page=1, [FromQuery] int limit=10)
        {
            try
            {
                var files = _fileUploadService.GetAllFiles(page, limit);
                return Ok(files);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
