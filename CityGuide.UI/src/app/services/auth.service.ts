import { Injectable, OnInit } from '@angular/core';
import { LoginUser } from '../models/loginuser.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router, private alertifyService: AlertifyService) { }

  path = "https://localhost:7138/api/auth/";
  userToken: any;
  decodedToken: any;
  headers = new HttpHeaders();
  TOKEN_KEY: string = "Token";

  login(loginUser: LoginUser) {
    this.headers.append("Content-Type", "application/json")
    this.httpClient.post<string>(this.path + "login", loginUser, { headers: this.headers }).subscribe(data => {
      this.saveToken(data)
      this.userToken = data
      this.decodedToken = jwtDecode(data);
      this.alertifyService.success("Sisteme giriş yapıldı!");
      this.router.navigateByUrl("/city");
    })
  }

  saveToken(Token: string) {
    localStorage.setItem(this.TOKEN_KEY, Token);
  }

  register(registerUser: RegisterUser) {
    this.headers.append("Content-Type", "application/json")
    this.httpClient.post<any>(this.path + "register", registerUser, { headers: this.headers }).subscribe(data => {

    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY)
  }
  loggedIn() {
    if (this.decodedToken) {
      return this.decodedToken.exp * 1000 > new Date().getTime();
    }
    else if (localStorage.getItem(this.TOKEN_KEY)) {
      return jwtDecode<any>(localStorage.getItem(this.TOKEN_KEY).toString())['exp'] * 1000 > new Date().getTime();
    }
    return false
  }
  getCurrentUserId() {
    return jwtDecode<any>(localStorage.getItem(this.TOKEN_KEY).toString())['unique_name']
  }
}
