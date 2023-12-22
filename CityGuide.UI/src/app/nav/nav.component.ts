import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginUser } from '../models/loginuser.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   
  }
  login(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value);
    }
  }

  logout() {
    this.authService.logout();
  }

  get auth(){
    return this.authService.loggedIn();
  }


}
