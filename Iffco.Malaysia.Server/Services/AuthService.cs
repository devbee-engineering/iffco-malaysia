using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Data;
using Mauritius.EInvoicing.Server.Data.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Mauritius.EInvoicing.Server.Services
{
    public interface IAuthService
    {
        string Login(string userName, string password);
    }

    [RegisterPerRequest]

    public class AuthService(IUserRepository userRepository) : IAuthService
    {
        public string Login(string userName, string password)
        {
            if(string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
            {
                throw new Exception("Username and password are required");
            }
            var user = userRepository.GetUserByUserName(userName) ?? throw new Exception("User not found");

            var hashedPassword = HashHelper.ComputeSha256Hash(password);

            if (user.Password != hashedPassword)
            {
                throw new Exception("Invalid password");
            }

            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(User user)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(JwtConfig.key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserName),
                    new Claim(ClaimTypes.Name, user.DisplayName),
                    new Claim("UserId", user.UserId.ToString()),
                    new Claim("MfaStatus", user.IsMfaEnabled.ToString().ToLower()),
                }),

                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = JwtConfig.Issuer,
                Audience = JwtConfig.Audience
            };
            if (user.IsAdmin)
            {
                tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
            }

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
