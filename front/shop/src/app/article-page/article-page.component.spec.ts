import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePageComponent } from './article-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';
import { CookieService } from 'ngx-cookie-service';

describe('ArticlePageComponent', () => {
  let component: ArticlePageComponent;
  let fixture: ComponentFixture<ArticlePageComponent>;
  let tokenServiceStub: Partial<TokenService>;
  let cookieServiceStub: Partial<CookieService>;
  let data = {
    amount: 1,
    behavior: "Behavior",
    description: "Description",
    id: 1,
    img_url: "url",
    name: "name",
    price: "1.00"
  };
  let expectedItems;

  let price = '1.00';
  let description = 'Description';
  let behavior = 'Behavior';
  let img_url = 'url';

  beforeEach(async(() => {
    expectedItems = {name: 'name', imgUrl: 'url', id: 1, price: '1.00'};

    tokenServiceStub = {
      getAccess: () => {return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkxNTM0NTc0LCJqdGkiOiI4Y2RiMzgyMGFiNDk0MGQ0OTUwYTFkNDZkZDc5NDA5YSIsInVzZXJfaWQiOjE4fQ.i70TPuR8SdcpqanVHxIIds5stg3plq2upDPogSjAhpM'},
      getRefresh: () => {return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5NDEyNjQ1NCwianRpIjoiZDA0ZDNjMDRlOWE3NGQ0ZjhlMjA2ZTA0ZjBiNGQxNGIiLCJ1c2VyX2lkIjoxOH0.odPzTUzi7X_pJiy2SJyrt4q1AVZFckVSvPhYtNYmqIU'}
    };

    cookieServiceStub = {
      get(name: string): string {
        return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkxNTM0NTc0LCJqdGkiOiI4Y2RiMzgyMGFiNDk0MGQ0OTUwYTFkNDZkZDc5NDA5YSIsInVzZXJfaWQiOjE4fQ.i70TPuR8SdcpqanVHxIIds5stg3plq2upDPogSjAhpM'
      }
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ArticlePageComponent ],
      providers: [
        {provide: TokenService, useValue: tokenServiceStub},
        {provide: CookieService, useValue: cookieServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Shoul parse and display data', () => {
    component.parseArticle(data);

    fixture.detectChanges();

    expect(component.price).toEqual(price);
    expect(component.behavior).toEqual(behavior);
    expect(component.description).toEqual(description);
    expect(component.img_url).toEqual(img_url);
  });

  it('Should route back', () => {
    component.backClick();

    expect(component.backClick()).toBeUndefined();
  });

  it('Should return nothing', () => {
    component.buyClick();

    expect(component.buyClick()).toBeUndefined();
  });

  it('Should be defined', () => {
    let headers = {headers : new HttpHeaders({'Content-Type': 'application/json'})}
    
    expect(component.httpHeaders()).toBeDefined();
  });

  it('Should return promise', () => {
    let pr = new Promise<any>((res)=>{});
    expect(typeof(component.postOrder())).toEqual(typeof(pr));
  });

  it('Should return true with user and cookie', () => {
    fixture.detectChanges()
    expect(component.getUser()).toEqual(true);
  });
});
