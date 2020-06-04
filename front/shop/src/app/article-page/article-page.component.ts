import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private location: Location) { }

  public price = 'no price';
  public description = 'no description';
  public behavior = 'no behavior';
  public img_url = '';

  private article_id;

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

  parseArticle(data) {
    this.price = data['price'];
    this.description = data['description'];
    this.behavior = data['behavior'];
    this.img_url = data['img_url'];
  }

  backClick() {
    this.location.back();
  }

}
