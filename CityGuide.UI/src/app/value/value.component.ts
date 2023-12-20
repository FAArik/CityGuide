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
   
  }
 


}
