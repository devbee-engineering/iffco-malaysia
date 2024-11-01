using Mauritius.EInvoicing.Server.Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Iffco.Malaysia.Server.Data.Entities
{
    public class FtpCredential
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public string Server { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
