using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mauritius.EInvoicing.Server.Data.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public string? Email { get; set; }
        public required string DisplayName { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsMfaEnabled { get; set; }
        public string? MfaSecretKey { get; set; } // Store the TOTP secret key
    }
}
