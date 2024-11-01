using Agoda.IoC.Core;
using OtpNet;
using QRCoder;

namespace Mauritius.EInvoicing.Server.Services
{
    public interface IMfaService
    {
        string SetupMfa();
        bool VerifyMfa(string otpCode);
    }

    [RegisterPerRequest]
    public class MfaService(IHttpContextService httpContextService,IUserService _userService) : IMfaService
    {
        public string SetupMfa()
        {
            var userName = httpContextService.GetCurrentUserName(); // Implement your method to get the current user
            var user = _userService.GetUserByUserName(userName);
            if (user.IsMfaEnabled)
            {
                throw new Exception("MFA is already enabled");
            }
            var secretKeyByte = KeyGeneration.GenerateRandomKey(20); // Using OtpNet for secret key generation
            var secretKey=Base32Encoding.ToString(secretKeyByte);

            _userService.UpdateMfaSecretKey(user.UserId, secretKey);
            // Provide a QR code URL for the authenticator app

          var uri = $"otpauth://totp/IFFCO-Malaysia:{user.Email}?secret={secretKey}&issuer=IFFCO-Malaysia";

            using (var qrGenerator = new QRCodeGenerator())
            {
                var qrCodeData = qrGenerator.CreateQrCode(uri, QRCodeGenerator.ECCLevel.Q);
                var qrCode = new Base64QRCode(qrCodeData);
                return qrCode.GetGraphic(20);
            }
        }
        public bool VerifyMfa(string otpCode)
        {
            var userName = httpContextService.GetCurrentUserName(); // Implement your method to get the current user
            var user = _userService.GetUserByUserName(userName);
            var isValid = new Totp(Base32Encoding.ToBytes(user.MfaSecretKey)).VerifyTotp(otpCode, out _);
            if(!isValid)
            {
                throw new Exception("Invalid OTP code");
            }
            _userService.UpdateMfaStatus(user.UserId);
            return true;
        }
    }
}
