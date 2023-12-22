using CityGuide.API.Data;
using CityGuide.API.Dtos;
using CityGuide.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CityGuide.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private IAuthRepository _authRepository;
    private IConfiguration _configuration;

    public AuthController(IAuthRepository authRepository, IConfiguration configuration)
    {
        _authRepository = authRepository;
        _configuration = configuration;
    }

    // GET: api/<AuthController>
    [HttpPost("[action]")]
    public async Task<IActionResult> Register(UserForRegisterDto register)
    {
        if (await _authRepository.UserExists(register.UserName))
        {
            ModelState.AddModelError("UserName", "Username already exists");
        }
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var userToCreate = new User
        {
            UserName = register.UserName
        };
        var createdUser = await _authRepository.Register(userToCreate, register.Password);

        return StatusCode(201);
    }
    [HttpPost("[action]")]
    public async Task<IActionResult> Login([FromBody] UserForLoginDto userlogin)
    {
        var user = await _authRepository.Login(userlogin.UserName, userlogin.Password);
        if (user == null)
        {
            return Unauthorized();
        }
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            }),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenstring = tokenHandler.WriteToken(token);
        return Ok(JsonConvert.SerializeObject(tokenstring));
    }

}
