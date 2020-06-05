import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import ValidateServ from '../services/ValidateServ'

import { GoodsItem } from '../goods-item/goods-item.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  providers: [UserService]
})
export class UserPageComponent implements OnInit {

  baseUrl = 'http://127.0.0.1:8000'

  httpHeaders = ()=>{ 
      return {
        headers : new HttpHeaders({
          'Content-Type': 'application/json'
      })
    }
  }

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private router: Router,
    private cookiesService: CookieService) { }

  username: String = "";
  email: String = "";
  password: String = "";

  req: UserService;

  items: GoodsItem[];

  private user = jwt_decode(this.tokenService.getAccess())

  ngOnInit(): void {
    console.log(this.user.user_id);
    if (this.user != null){
      this.getUserInfo(this.user.user_id).then(
        (val) => {
          console.log(val);
          this.parseUser(val);
        }, 
        (err) => {
          console.log("Shit");
          
        }
      );

        this.showOrders()

    }else {
      this.router.navigate(['']);
    }
  }

  patchUser() {
    if (this.username) {
      this.patchRequest(this.user.user_id).then(
        (val) => {
          console.log(val);
          
          this.cookiesService.delete('username');
          
        },
        (err) => {
          console.log(err);
          
        }
      );
    }
  }

  patchRequest(user_id): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      const body = {username: this.username};
      const url = this.baseUrl + '/user/' + user_id ;
      
      this.http.patch(url, body, this.httpHeaders()).subscribe(value => {
        resolve(value);
      }, error => {
        console.log("There is a prob with network");
        if (error.status == 401) {
          //this.refreshToken();
          console.log('Unauthorazed');
        }
        reject(error);
      });
    });
    return promise;
  }

  deleteUser() {
    this.deleteRequest(this.user.user_id).then(
      (val) => {
        console.log(val);
        this.cookiesService.delete('access');
        this.cookiesService.delete('refresh');
        this.cookiesService.delete('username');
        this.router.navigate(['']);
      }
    );
  }

  deleteRequest(user_id): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      const url = this.baseUrl + '/user/' + user_id 
      
      this.http.delete(url, this.httpHeaders()).subscribe(value => {
        resolve(value);
      }, error => {
        console.log("There is a prob with network");
        if (error.status == 401) {
          //this.refreshToken();
          console.log('Unauthorazed');
        }
        reject(error);
      });
    });
    return promise;
  }

  parseUser(data) {
    this.username = data['username'];
    this.email = data['email'];
  }

  getUserInfo(user_id): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      const url = this.baseUrl + '/user/' + user_id 
      
      this.http.get(url, this.httpHeaders()).subscribe(value => {
        resolve(value);
      }, error => {
        console.log("There is a prob with network");
        if (error.status == 401) {
          //this.refreshToken();
          console.log('Unauthorazed');
          
        }
        reject(error);
      });
    });
    return promise;
  }

  showOrders() {
    
    this.getOrders().then((val) => {
      console.log(val);
      this.parseArticles(val);
      console.log('Here:\n' + this.items);
      
    }, 
    (er)=> {
    console.log('Network problems');
    });
  }

  getOrders(): Promise<any> {
    
    let promise = new Promise((resolve, reject) =>{
      this.http.get(this.baseUrl + '/user/' + this.user.user_id + '/order', this.httpHeaders()).subscribe(value => {
        resolve(value['articles']);
      }, error => {
        
        console.log("There is a prob with network");
        reject(error);
      });
    });
    return promise;
  }

  parseArticles(data) {
    data.forEach(it => {
      console.log(it);
      var one: GoodsItem = {
        id: it['id'],
        name: it['name'],
        imgUrl: it['img_url'],
        price: it['price']
      };

      if (!this.items)
        this.items = [one];
      else { 
        this.items.push(one);
      }
    });
  }

}
