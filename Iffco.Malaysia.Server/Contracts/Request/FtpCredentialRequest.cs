namespace Iffco.Malaysia.Server.Contracts.Request
{
    public class FtpCredentialRequest
    {
        public string Server { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int UserId { get; set; }
    }
}
