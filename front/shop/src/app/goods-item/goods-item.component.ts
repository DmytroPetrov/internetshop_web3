import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    
  }

  toItem() {
    
  }

  
}
