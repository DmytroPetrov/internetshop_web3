import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GoodsItem } from '../goods-item/goods-item.component';

@Component({
  selector: 'app-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrls: [
    './goods-page.component.scss',
    '../shop-page/shop-page.component.scss'
  ]
})

export class GoodsPageComponent implements OnInit {

  public name = "no name";

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json'})}}
  items: GoodsItem[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getArticles().then((val) => {
      console.log(val);
      
    }, 
    (er)=> {
    console.log('Network problems');
    });
  }


  getArticles(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.get(this.baseUrl + '/goods/group/' + 2, this.httpHeaders()).subscribe(value => {
        resolve(value['articles']);
      }, error => {
        
        console.log("There is a prob with network");
        reject();
      });
    });
    return promise;
  }

  parseArticles(data) {
    this.name = data['name']
  }
}
