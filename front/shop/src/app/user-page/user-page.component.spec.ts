import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from '../token.service';
import { GoodsItem } from '../goods-item/goods-item.component';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;
  let tokenServiceStub: Partial<TokenService>;
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
    tokenServiceStub = {
      getAccess: () => {return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkxNTM0NTc0LCJqdGkiOiI4Y2RiMzgyMGFiNDk0MGQ0OTUwYTFkNDZkZDc5NDA5YSIsInVzZXJfaWQiOjE4fQ.i70TPuR8SdcpqanVHxIIds5stg3plq2upDPogSjAhpM'},
      getRefresh: () => {return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5NDEyNjQ1NCwianRpIjoiZDA0ZDNjMDRlOWE3NGQ0ZjhlMjA2ZTA0ZjBiNGQxNGIiLCJ1c2VyX2lkIjoxOH0.odPzTUzi7X_pJiy2SJyrt4q1AVZFckVSvPhYtNYmqIU'}
    };

    expectedItems = [
      {name: 'name', imgUrl: 'url', id: 1, price: '1.00'},
      {name: 'name', imgUrl: 'url', id: 2, price: '2.00'}
    ] as GoodsItem[];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ UserPageComponent ],
      providers: [{provide: TokenService, useValue: tokenServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageComponent);
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
