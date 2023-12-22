import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginUser } from '../models/loginuser.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private authService: AuthService) { }


  login(form: NgForm) {
    if (form.valid) {
      this.authService.login({ userName: form.value.userName, password: form.value.loginpassword });
    }
  }

  logout() {
    this.authService.logout();
  }

  get auth() {
    return this.authService.loggedIn();
  }


}
