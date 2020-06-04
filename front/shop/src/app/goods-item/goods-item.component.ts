import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

export interface GoodsItem {
  name: String,
  imgUrl: String,
  id: number,
  price: String
}

@Component({
  selector: 'app-goods-item',
  templateUrl: './goods-item.component.html',
  styleUrls: ['./goods-item.component.scss']
})
export class GoodsItemComponent implements OnInit {

  @Input() item: GoodsItem;
  public itemUrl = 'article/';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  toItem() {
    
  }

  
}
