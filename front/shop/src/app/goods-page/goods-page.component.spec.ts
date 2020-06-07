import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsPageComponent } from './goods-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoodsItem } from '../goods-item/goods-item.component';

describe('GoodsPageComponent', () => {
  let component: GoodsPageComponent;
  let fixture: ComponentFixture<GoodsPageComponent>;
  let data = [{
    amount: 1,
    behavior: "Behavior",
    description: "Description",
    id: 1,
    img_url: "url",
    name: "name",
    price: "1.00"
  },
  {
    amount: 2,
    behavior: "Behavior",
    description: "Description",
    id: 2,
    img_url: "url",
    name: "name",
    price: "2.00"
  }];
  let expectedItems: GoodsItem[];


  beforeEach(async(() => {
    expectedItems = [
      {name: 'name', imgUrl: 'url', id: 1, price: '1.00'},
      {name: 'name', imgUrl: 'url', id: 2, price: '2.00'}
    ] as GoodsItem[];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ GoodsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse and write article to local variable', () => {
    component.parseArticles(data);
    fixture.detectChanges();
    expect(component.items).toEqual(expectedItems);
  });
});
