import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { Photo } from '../models/photo.model';

import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver: boolean;
  baseurl = 'https://localhost:7138/api/';
  currentMain: Photo;
  currentCity: any;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.currentCity = params["cityId"]
    })
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseurl + 'cities/' + this.currentCity + '/photos/AddPhotoForCity',
      authToken: 'Bearer ' + localStorage.getItem(this.authService.TOKEN_KEY),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });
    
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
          cityId: res.cityId
        }
        this.photos.push(photo)
      }
    }
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

}
