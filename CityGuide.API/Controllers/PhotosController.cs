using AutoMapper;
using CityGuide.API.Data;
using CityGuide.API.Dtos;
using CityGuide.API.Helpers;
using CityGuide.API.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace CityGuide.API.Controllers;

[Route("api/[cities/{id}/photos]")]
[ApiController]
public class PhotosController : ControllerBase
{
    private IAppRepository _appRepository;
    private IMapper _mapper;
    private IOptions<CloudinarySettings> _cloudinaryoptions;
    private Cloudinary _cloudinary;
    public PhotosController(IAppRepository appRepository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryoptions)
    {
        _appRepository = appRepository;
        _mapper = mapper;
        _cloudinaryoptions = cloudinaryoptions;
        Account account = new Account
        {
            Cloud = _cloudinaryoptions.Value.CloudName,
            ApiKey = _cloudinaryoptions.Value.ApiKey,
            ApiSecret = _cloudinaryoptions.Value.ApiSecret
        };
        _cloudinary = new Cloudinary(account);
    }
    [HttpPost("[action]")]
    public ActionResult AddPhotoForCity(int cityId, [FromBody] PhotoForUploadDto uploadDto)
    {
        var city = _appRepository.GetCityById(cityId);
        if (city == null)
        {
            return BadRequest("Could not find the city");
        }
        var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        if (currentUserId!=city.UserId)
        {
            return Unauthorized("You do not have acces to that city");
        }
        var file = uploadDto.File;
        var uploadResult = new ImageUploadResult();
        if (file.Length>0)
        {
            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams
                {
                    File=new FileDescription(file.Name,stream)
                };
                uploadResult = _cloudinary.Upload(uploadParams);
            }
        }
        uploadDto.Url = uploadResult.Uri.ToString();
        uploadDto.PublicId = uploadResult.PublicId;
        var photo = _mapper.Map<Photo>(uploadDto);
        photo.City = city;
        if (!city.Photos.Any(p=>p.IsMain))
        {
            photo.IsMain = true;
        }
        city.Photos.Add(photo);
        if (_appRepository.SaveAll())
        {
            var photostoReturn = _mapper.Map<PhotoForReturnDto>(photo);
            return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photostoReturn);
        }
        return BadRequest("Could not add the photo");
    }
    [HttpGet("[action]/{id}")]
    public ActionResult GetPhoto(int  id)
    {
        var photoFromDb = _appRepository.GetPhoto(id);
        var photo = _mapper.Map<PhotoForReturnDto>(photoFromDb);
        return Ok(photo);
    }

}
