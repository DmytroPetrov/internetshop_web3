import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsItemComponent, GoodsItem } from './goods-item.component';

describe('GoodsItemComponent', () => {
  let component: GoodsItemComponent;
  let fixture: ComponentFixture<GoodsItemComponent>;
  let goods: GoodsItem = {
    name: 'NVidia',
    imgUrl: '/someUrl',
    id: 1,
    price: '20200.00'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsItemComponent);
    component = fixture.componentInstance;

    component.item = goods;

    fixture.detectChanges();
  });

  it('should create', () => {
    
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
