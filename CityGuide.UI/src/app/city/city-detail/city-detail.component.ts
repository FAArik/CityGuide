import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import { Photo } from 'src/app/models/photo.model';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';


@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
  providers: [CityService]
})
export class CityDetailComponent implements OnInit {

  images: GalleryItem[];
  photos: Photo[];
  city: City;
  constructor(private actRoute: ActivatedRoute, private cityService: CityService) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      this.getCityById(params["cityId"])
    })
  }
  getCityById(cityId: number) {
    this.cityService.getCityById(cityId).subscribe(data => {
      this.city = data;
      this.getPhotosByCity(cityId);
    })
  }
  getPhotosByCity(cityId: number) {
    this.cityService.getPhotosByCity(cityId).subscribe(data => {
      this.photos = data;
      this.setGallery();
    })
  }
  getImages() {
    const imageUrls: ImageItem[] = [];
    this.city.photos.map((photo) =>
      imageUrls.push(new ImageItem({
        src: photo.url,
        thumb: photo.url
      }))
    );
    return imageUrls;
  }
  setGallery() {
    this.images = this.getImages();
  }

}
