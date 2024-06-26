﻿using AutoMapper;
using CityGuide.API.Dto;
using CityGuide.API.Dtos;
using CityGuide.API.Models;

namespace CityGuide.API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<City, CityForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            });
        CreateMap<City, CityForDetailDto>();
        CreateMap<Photo, PhotoForUploadDto>();
        CreateMap<PhotoForReturnDto, Photo>();
    }
}
