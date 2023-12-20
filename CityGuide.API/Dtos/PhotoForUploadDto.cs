namespace CityGuide.API.Dtos;

public class PhotoForUploadDto
{
    public PhotoForUploadDto()
    {
        DateAdded = DateTime.Now;
    }
    public string Url { get; set; }
    public IFormFile File { get; set; }
    public string Description { get; set; }
    public DateTime DateAdded { get; set; }
    public string PublicId { get; set; }
}
