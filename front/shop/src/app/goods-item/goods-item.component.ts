import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface GoodsItem {
  name: String,
  url: String
}

@Component({
  selector: 'app-goods-item',
  templateUrl: './goods-item.component.html',
  styleUrls: ['./goods-item.component.scss']
})
export class GoodsItemComponent implements OnInit {

  item: GoodsItem;

  constructor() { }

  ngOnInit(): void {
    
  }

  
}
