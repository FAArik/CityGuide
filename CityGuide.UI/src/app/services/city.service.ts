import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _http: HttpClient) { }
  path = "https://localhost:7138/api/"

  getCities(): Observable<City[]> {
    return this._http.get<City[]>(this.path + "cities");
  }
  getCityById(cityId: number): Observable<City> {
    return this._http.get<City>(this.path + "cities/getdetails/?cityId=" + cityId);
  }
  getPhotosByCity(cityId:number):Observable<Photo[]>{
    return this._http.get<Photo[]>(this.path+"cities/photos/?cityId="+cityId)
  }
}