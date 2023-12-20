using CityGuide.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace CityGuide.API.Data;

public class AuthRepository : IAuthRepository
{
    private DataContext _context;

    public AuthRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<User> Login(string userName, string password)
    {
        User user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
        if (user == null)
        {
            return null;
        }
        if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        {
            return null;
        }
        return user;
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512(passwordSalt))
        {
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            for (int i = 0; i < hash.Length; i++)
            {
                if (hash[i] != passwordHash[i])
                {
                    return false;
                }
            }
            return true;
        }

    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    public async Task<User> Register(User user, string password)
    {
        byte[] passwordHash, passwordSalt;
        CreatePasswordHash(password, out passwordHash, out passwordSalt);
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<bool> UserExists(string userName)
    {
        if (await _context.Users.AnyAsync(x => x.UserName == userName))
        {
            return true;
        }
        return false;
    }
}
