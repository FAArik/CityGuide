import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import { Photo } from '../models/photo.model';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _http: HttpClient, private alertifyService: AlertifyService,
    private router: Router, private auth:AuthService) { }
  path = "https://localhost:7138/api/"

  getCities(): Observable<City[]> {
    return this._http.get<City[]>(this.path + "cities");
  }
  getCityById(cityId: number): Observable<City> {
    return this._http.get<City>(this.path + "cities/getdetails/?cityId=" + cityId);
  }
  getPhotosByCity(cityId: number): Observable<Photo[]> {
    return this._http.get<Photo[]>(this.path + "cities/photos/?cityId=" + cityId)
  }
  addCity(city: City) {
    return this._http.post<City>(this.path + "cities/AddCity", city).subscribe(data => {
      this.alertifyService.success("Şehir başarıyla eklendi!")
      this.router.navigateByUrl('/cityDetail/'+data["id"])
    });
  }
}
