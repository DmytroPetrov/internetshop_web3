import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';
import { UserService } from '../user-page/user.service'

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})


export class ArticlePageComponent implements OnInit {

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json'})}}

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private tokenService: TokenService,
    private cookiesService: CookieService,
    private serv: UserService) { }

  public price = 'no price';
  public description = 'no description';
  public behavior = 'no behavior';
  public img_url = '';
  public warning: boolean = false;
  
  public buyBtnImg = '../../assets/svg/commerce-and-shopping.svg';

  private article_id;
  private user;


  ngOnInit(): void {
    this.article_id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.article_id);
    

    this.http.get(this.baseUrl + '/goods/' + this.article_id).subscribe(value =>{
      console.log(value);
      this.parseArticle(value);
    }, er => {
      console.log("Network error");
      
    });
  }

  getUser(): boolean {
    if(this.cookiesService.get('access')) {
      this.user = jwt_decode(this.tokenService.getAccess());
      if(this.user != null) {
        // loged in
        return true;
      }
    } else {
      this.warning = true;
    }
    return false;
  }

  parseArticle(data) {
    this.price = data['price'];
    this.description = data['description'];
    this.behavior = data['behavior'];
    this.img_url = data['img_url'];
  }

  backClick() {
    this.location.back();
  }

  buyClick() {
    if (this.getUser()) {
      this.postOrder().then((val) => {
        console.log(val);
      
        this.buyBtnImg = '../../assets/svg/accept.svg';
        setTimeout(() => {
          this.buyBtnImg = '../../assets/svg/commerce-and-shopping.svg';
        }, 2000);
        
      }, 
      (er)=> {
      console.log('Network problems');
      });
    }
  }

  postOrder(): Promise<any> {
    const body = {status: 1, payment: 1, article: this.article_id}

    let promise = new Promise((resolve, reject) =>{
      this.http.post(this.baseUrl + '/user/' + this.user.user_id + '/order', body, this.httpHeaders()).subscribe(value => {
        resolve(value['msg']);
      }, error => {
        
        console.log("There is a prob with network");
        reject(error);
      });
    });
    return promise;
  }
}
