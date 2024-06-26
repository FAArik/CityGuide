import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { GALLERY_CONFIG, GalleryConfig, GalleryModule } from 'ng-gallery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { CityComponent } from './city/city.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityAddComponent } from './city/city-add/city-add.component';
import { AlertifyService } from './services/alertify.service';
import { RegisterComponent } from './register/register.component';
<<<<<<< HEAD
import { PhotoComponent } from './photo/photo.component';
import { NgxEditorModule } from 'ngx-editor';
import { FileUploadModule } from "ng2-file-upload";
=======
>>>>>>> f5aea375bda4f7eaedd1fe657229de7ab6a16ffa

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    CityComponent,
    CityDetailComponent,
    CityAddComponent,
    RegisterComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    GalleryModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    FileUploadModule

  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    },
    AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
