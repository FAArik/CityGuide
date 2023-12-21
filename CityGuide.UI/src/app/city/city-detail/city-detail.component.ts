import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import { Photo } from 'src/app/models/photo.model';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
  providers: [CityService]
})
export class CityDetailComponent implements OnInit {
  
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
    })
  }
  getPhotosByCity(cityId: number) {
    this.cityService.getPhotosByCity(cityId).subscribe(data => {
      this.photos = data;
      //this.setGallery();
    })
  }
  getImages(){
    const imageUrls: { small: string; medium: string; big: string; }[]=[];
    this.city.photos.map((photo)=>imageUrls.push({
      small:photo.url,
      medium:photo.url,
      big:photo.url
    }))
    return imageUrls;
  }
  // setGallery() {
  //   this.galleryOptions = [
  //     {
  //       width: '600px',
  //       height: '400px',
  //       thumbnailsColumns: 4,
  //       imageAnimation: NgxGalleryAnimation.Slide
  //     },
  //     // max-width 800
  //     {
  //       breakpoint: 800,
  //       width: '100%',
  //       height: '600px',
  //       imagePercent: 80,
  //       thumbnailsPercent: 20,
  //       thumbnailsMargin: 20,
  //       thumbnailMargin: 20
  //     },
  //     // max-width 400
  //     {
  //       breakpoint: 400,
  //       preview: false
  //     }
  //   ];

  //   this.galleryImages = this.getImages();
  // }

}
