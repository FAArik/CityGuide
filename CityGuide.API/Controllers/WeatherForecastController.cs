using CityGuide.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CityGuide.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ValuesController : ControllerBase
{
    private DataContext _context;

    public ValuesController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> GetValues()
    {
        var values = await _context.Values.ToListAsync();
        return Ok(values);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult> Get(int id)
    {
        var values = await _context.Values.FirstOrDefaultAsync(x=>x.Id==id);
        return Ok(values);
    }
}