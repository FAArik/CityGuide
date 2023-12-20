import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Value from '../models/value.model';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  constructor(private _http: HttpClient) { }

  values!:Value[];
  ngOnInit(): void {
    this.getValues().subscribe((respoonse)=>{
      this.values=respoonse;
      console.log(this.values)
    });
  }
  getValues(){
    return this._http.get<Value[]>("https://localhost:7138/api/Values");
  }


}
