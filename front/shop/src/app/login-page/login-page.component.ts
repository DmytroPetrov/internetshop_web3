import { Component, OnInit } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { loginUser }  from './loginService';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import  ValidateServ from '../services/ValidateServ';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [LoginService]
})

export class LoginPageComponent implements OnInit {

  email: String = "";
  password: String = "";
  btnDisabled = false;

  constructor(
    private http: HttpClient,
    private api: LoginService, 
    private token :TokenService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  loginUser(): void {
    var data = {
      "email" : this.email,
      "password": this.password,
    }
    loginUser(this.api, this.token, data, this.router)
  }

}
