using Iffco.Malaysia.Server.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Iffco.Malaysia.Server.Data.Entities
{
    public class FileUpload
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public required string FileName { get; set; }
        public DateTime UploadDate { get; set; }
        public required string UploadedBy { get; set; }
        public required string? File { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public FileUploadStatusValue? UploadStatus { get; set; }
    }
}
