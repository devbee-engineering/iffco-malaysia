using Agoda.IoC.Core;
using System.Security.Claims;

namespace Mauritius.EInvoicing.Server.Services
{
    public interface IHttpContextService
    {
        string GetCurrentUserName();
        string GetCurrentUserId();
    }
    [RegisterPerRequest]
    public class HttpContextService(IHttpContextAccessor contextAccessor) : IHttpContextService
    {
        public string GetCurrentUserName()
        {
            var claims = contextAccessor.HttpContext?.User;

            return claims?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new Exception("User not found");
        }
        public string GetCurrentUserId()
        {
            var claims = contextAccessor.HttpContext?.User;
            return claims?.FindFirst("UserId")?.Value ?? throw new Exception("User not found");
        }
    }
}
