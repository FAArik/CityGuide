using CityGuide.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CityGuide.API.Data;

public class AppRepository : IAppRepository
{
    private DataContext _context;

    public AppRepository(DataContext context)
    {
        _context = context;
    }
    public void Add<T>(T entity) where T : class
    {
        _context.Add(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
        _context.Remove(entity);
    }

    public List<City> GetCities()
    {
        return _context.Cities.Include(c => c.Photos).ToList();
    }

    public City GetCityById(int cityId)
    {
        return _context.Cities.Include(x => x.Photos).FirstOrDefault(x => x.Id == cityId);
    }

    public Photo GetPhoto(int id)
    {
        return _context.Photos.FirstOrDefault(x => x.Id == id);
    }

    public List<Photo> GetPhotosByCityId(int id)
    {
        return _context.Photos.Where(p => p.CityId == id).ToList();
    }

    public bool SaveAll()
    {
        return Convert.ToBoolean(_context.SaveChanges());
    }
}
