import { Component, OnInit, Input} from '@angular/core';
import { registerNewUser }  from './registrationService'
import { RegistrationService } from './registration.service';
import { TokenService } from '../token.service'
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import  ValidateServ from '../services/ValidateServ';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {
  
  @Input() myvalidator:ValidatorFn;
  registrationForm : any;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(private api: RegistrationService, private token :TokenService,
    private router: Router) {}

  ngOnInit(): void {
    this.initFormControl()
  }

  initFormControl(): void {
    this.username = new FormControl('', ValidateServ.validateUsername)
    this.email =  new FormControl('', ValidateServ.validateEmail)
    this.password  = new FormControl('', ValidateServ.validatePassword)
    this.confirmPassword = new FormControl('', ValidateServ.validatePassword)

    this.registrationForm = new FormGroup({
      inputGroup: new FormGroup({
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
    })
  }

  registerNewUser(): void {
    var data = {
      "username" : this.username.value,
      "email" : this.email.value,
      "password": this.password.value,
    }
    registerNewUser(this.api, this.token, data, this.router)
  }
}
