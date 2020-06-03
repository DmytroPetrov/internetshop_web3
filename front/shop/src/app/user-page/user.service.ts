import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient, private cookieService: CookieService, private tokenService: TokenService) { }

  httpHeaders = ()=>{ 
      return {
        headers : new HttpHeaders({
          'Content-Type': 'application/json'
      })
    }
  }

  getUserInfo(user_id): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      const url = this.baseUrl + '/user/' + user_id 
      
      this.http.get(this.baseUrl + '/user/'+ user_id, this.httpHeaders()).subscribe(value => {
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

  getUser(user_id): Observable<any> {
    const url = this.baseUrl + '/user/' + user_id 

    return this.http.get(url, this.httpHeaders())
  }

}
