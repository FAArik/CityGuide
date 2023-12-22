import { Component, OnDestroy, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { City } from 'src/app/models/city.model';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers: [CityService]
})
export class CityAddComponent implements OnInit, OnDestroy {

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder
  ) { }
  editor: Editor;
  city: City;
  cityAddForm: FormGroup;

  createCityForm() {
    this.cityAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
    })
  }
  ngOnInit(): void {
    this.createCityForm();
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  add() {
    
    if (this.cityAddForm.valid) {
      console.log(this.cityAddForm)
      this.city = Object.assign({}, this.cityAddForm.value)
      this.city.userId = 1;
      this.cityService.addCity(this.city)

    }
  }

}
