using AutoMapper;
using CityGuide.API.Data;
using CityGuide.API.Dto;
using CityGuide.API.Dtos;
using CityGuide.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CityGuide.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CitiesController : ControllerBase
{
    private IAppRepository _appRepository;
    private IMapper _mapper;

    public CitiesController(IAppRepository appRepository, IMapper mapper)
    {
        _appRepository = appRepository;
        _mapper = mapper;
    }

    [HttpGet]
    public ActionResult GetCities()
    {
        var cities = _appRepository.GetCities();
         var citiestoreturn=_mapper.Map<List<CityForListDto>>(cities);
        return Ok(citiestoreturn);
    }
    [HttpPost("[action]")]
    public ActionResult AddCity(City newCity)
    {
        _appRepository.Add(newCity);
        _appRepository.SaveAll(); 
        return Ok(newCity);
    }

    [HttpGet("GetDetails")]
    public ActionResult GetCityById(int cityId)
    {
        var city = _appRepository.GetCityById(cityId);
        var citytoreturn = _mapper.Map<CityForDetailDto>(city);
        return Ok(citytoreturn);
    }

    [HttpGet("Photos")]
    public ActionResult GetPhotosByCity(int cityId)
    {
        var photos = _appRepository.GetPhotosByCityId(cityId);
        return Ok(photos);
    }
}
