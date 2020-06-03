import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RegistrationService } from './registration.service';
import { registerNewUser }  from './registrationService';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import  ValidateServ from '../services/ValidateServ';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-sing-up-page',
  templateUrl: './sing-up-page.component.html',
  styleUrls: [
    './sing-up-page.component.scss',
    '../login-page/login-page.component.scss'
  ],
  providers: [RegistrationService]
})
export class SingUpPageComponent implements OnInit {

  username: String = "";
  email: String = "";
  password: String = "";
  btnDisabled = false;

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json'})}}

  constructor(
    private http: HttpClient,
    private api: RegistrationService, 
    private token :TokenService,
    private router: Router) { }

  ngOnInit(): void {
  }

  registerNewUser(): void {
    var data = {
      "username" : this.username,
      "email" : this.email,
      "password": this.password,
    }
    registerNewUser(this.api, this.token, data, this.router)
  }

  /* here is some */
  singUp() {
    console.log(this.username);
    console.log(this.email);
    console.log(this.password);
    this.btnDisabled = true;
    
    

    this.makeUser().then((val) => {
      console.log(val);
      
    }, 
    (er) => {
      console.log(er);
      this.btnDisabled = false;
    });

  }

  makeUser(): Promise<any> {

    const body = {username: this.username, email: this.email, password: this.password}

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/user/', body, this.httpHeaders()).subscribe(value =>{
        console.log(value);
        resolve(value);

      }, er => {
        console.log("Network error");
        reject(er);
      })
    });

    return promise;
  }
  
}
