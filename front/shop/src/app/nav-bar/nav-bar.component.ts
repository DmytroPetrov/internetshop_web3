import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';
import { UserService } from '../user-page/user.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private cookiesService: CookieService,
    private serv: UserService) { }

  private user;

  public username = 'Log in';
  public hideOut = true;

  ngOnInit(): void {
    
    if(this.cookiesService.get('refresh')) {
      this.user = jwt_decode(this.tokenService.getAccess());
      if(this.user != null) {
        this.hideOut = false;
        console.log(this.cookiesService.get('username'));
        
        if (!this.cookiesService.get('username')){
          this.serv.getUserInfo(this.user.user_id).then(
            (val) => {
              this.parseUserName(val);
            },
            (err) => {
              console.log('No user');
              
            }
          );
        } else {
          this.username = this.cookiesService.get('username');
        }
      }
    }

  }

  parseUserName(data) {
    console.log('Pasing');
    
    this.username = data['username'];
    this.cookiesService.set('username', data['username']);
  }

  logOut() {
    this.cookiesService.delete('access');
    this.cookiesService.delete('refresh');
    this.cookiesService.delete('username')
  }

}
