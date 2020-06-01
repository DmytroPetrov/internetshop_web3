import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})


export class ArticlePageComponent implements OnInit {

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json'})}}

  constructor(private http: HttpClient) { }

  public price = 'no price';
  public description = 'no description';
  public behavior = 'no behavior';

  ngOnInit(): void {
    this.http.get(this.baseUrl + '/goods/' + 1).subscribe(value =>{
      console.log(value);
      this.parseArticle(value);
    }, er => {
      console.log("Network error");
      
    })
  }

  parseArticle(data) {
    this.price = data['price'];
    this.description = data['description'];
    this.behavior = data['behavior']
  }

}
