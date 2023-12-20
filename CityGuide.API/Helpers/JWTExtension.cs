namespace CityGuide.API.Helpers;

public static class JWTExtension
{
    public static void AddApplicationError(this HttpResponse response, string Message)
    {
        response.Headers.Add("Application-Error", Message);
        response.Headers.Add("Access-Control-Allow-Origin", "*");
        response.Headers.Add("Access-Control-Expose-Header", "Application-Error");
    }
}
