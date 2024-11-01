using Agoda.IoC.Core;
using Iffco.Malaysia.Server.Data;
using Iffco.Malaysia.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Data;
using Mauritius.EInvoicing.Server.Data.Entities;

namespace Mauritius.EInvoicing.Server.Services
{
    public interface IUserService
    {
        void AddUser(UserAddRequest user);
        void UpdatePassword(string currentPassword, string newPassword);
        User GetUserById(int Id);
        void UpdateMfaSecretKey(int userId, string mfaSecretKey);
        User GetUserByUserName(string userName);
        void UpdateMfaStatus(int userId);
        bool GetMfaStatusByUserId(int userId);
    }
    [RegisterPerRequest]
    public class UserService(IUserRepository userRepository, IHttpContextService httpContextService,IFtpCredentialRepository ftpCredentialRepository) : IUserService
    {

        public void AddUser(UserAddRequest user)
        {
            var currentUser = userRepository.GetUserByUserName(user.UserName);
            if (currentUser != null)
            {
                throw new Exception("User already exists");
            }


            var password = HashHelper.ComputeSha256Hash(user.Password);

            var userData = new User()
            {
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                Email = user.Email,
                Password = password,
                IsAdmin = user.IsAdmin
            };

            userRepository.Add(userData);

            if (user.FtpCredential != null)
            {
                var ftpCredential = new FtpCredential()
                {
                    Server = user.FtpCredential.Server,
                    Username = user.FtpCredential.UserName,
                    Password = user.FtpCredential.Password,
                    UserId = userData.UserId
                };
                ftpCredentialRepository.InsertFtpCredential(ftpCredential);
            }
        }

        public void UpdatePassword(string currentPassword, string newPassword)
        {
            var userName = httpContextService.GetCurrentUserName();
            var user = userRepository.GetUserByUserName(userName);


            if (user == null)
            {
                throw new Exception("user context not found, Please login again");
            }

            var hashedCurrentPassword = HashHelper.ComputeSha256Hash(currentPassword);

            if (user.Password != hashedCurrentPassword)
            {
                throw new Exception("Provided current password is wrong");
            }

            var hashedNewPassword = HashHelper.ComputeSha256Hash(newPassword);

            user.Password = hashedNewPassword;
            userRepository.Update(user);
        }

        public void UpdateMfaSecretKey(int userId, string mfaSecretKey)
        {
            userRepository.UpdateMfaSecretKey(userId, mfaSecretKey);
        }

        public User GetUserById(int Id)
        {
            return userRepository.GetUserById(Id);
        }

        public User GetUserByUserName(string userName)
        {
            return userRepository.GetUserByUserName(userName);
        }

        public void UpdateMfaStatus(int userId)
        {
            userRepository.UpdateMfaStatus(userId);
        }

        public bool GetMfaStatusByUserId(int userId)
        {
            return userRepository.GetMfaStatusByUserId(userId);
        }

    }
}
