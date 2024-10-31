using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Data.Entities;
using Microsoft.AspNetCore.Components.Web;

namespace Mauritius.EInvoicing.Server.Data
{
    public interface IUserRepository
    {
        void Add(User user);
        User? GetUserByUserName(string userName);
        User? GetUserById(int userId);
        void Update(User user);
        IEnumerable<User> GetAll();
        void UpdateMfaSecretKey(int userId, string mfaSecretKey);
        void UpdateMfaStatus(int userId);
        bool GetMfaStatusByUserId(int userId);
    }
    [RegisterPerRequest]

    public class UserRepository(Repository repository) : IUserRepository
    {
        public void Add(User user)
        {
            repository.Users.Add(user);
            repository.SaveChanges();
        }

        public User? GetUserByUserName(string userName)
        {
            var user = repository.Users.FirstOrDefault(u => u.UserName == userName);
            return user;
        }

        public User? GetUserById(int userId)
        {
            var user = repository.Users.FirstOrDefault(u => u.UserId == userId);
            return user;
        }

        public void Update(User user)
        {
            repository.Users.Update(user);
            repository.SaveChanges();
        }

        public IEnumerable<User> GetAll()
        {
            return repository.Users.ToList();

        }
        public void UpdateMfaSecretKey(int userId,string mfaSecretKey)
        {
            var user = repository.Users.FirstOrDefault(u => u.UserId == userId);
            user.MfaSecretKey = mfaSecretKey;
            repository.SaveChanges();
        }

        public void UpdateMfaStatus(int userId)
        {
            var user = repository.Users.FirstOrDefault(u => u.UserId == userId);
            user.IsMfaEnabled = true;
            repository.SaveChanges();
        }

        public bool GetMfaStatusByUserId(int userId)
        {
            var user = repository.Users.FirstOrDefault(u => u.UserId == userId);
            return user.IsMfaEnabled;
        }
    }
}
