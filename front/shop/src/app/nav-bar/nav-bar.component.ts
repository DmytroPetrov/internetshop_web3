import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private cookiesService: CookieService) { }

  private user;

  public hideOut = true;

  ngOnInit(): void {
    
    if(this.cookiesService.get('refresh')) {
      this.user = jwt_decode(this.tokenService.getAccess());
      if(this.user != null) {
        this.hideOut = false;
      }
    }

  }

  logOut() {
    this.cookiesService.delete('access');
    this.cookiesService.delete('refresh');
  }

}
