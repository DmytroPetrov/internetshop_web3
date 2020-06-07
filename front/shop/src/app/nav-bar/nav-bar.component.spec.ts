import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from '../token.service';
import { CookieService } from 'ngx-cookie-service';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ NavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('NavBarComponent with initial', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let tokenServiceStub: Partial<TokenService>;
  let cookieServiceStub: Partial<CookieService>;
  let data = {
    username: 'nastya'
  };
  let expectedUserName: string;

  beforeEach(async(() => {
    expectedUserName = 'nastya'; 

    tokenServiceStub = {
      getAccess: () => {return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkxNTM0NTc0LCJqdGkiOiI4Y2RiMzgyMGFiNDk0MGQ0OTUwYTFkNDZkZDc5NDA5YSIsInVzZXJfaWQiOjE4fQ.i70TPuR8SdcpqanVHxIIds5stg3plq2upDPogSjAhpM'},
      getRefresh: () => {return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5NDEyNjQ1NCwianRpIjoiZDA0ZDNjMDRlOWE3NGQ0ZjhlMjA2ZTA0ZjBiNGQxNGIiLCJ1c2VyX2lkIjoxOH0.odPzTUzi7X_pJiy2SJyrt4q1AVZFckVSvPhYtNYmqIU'}
    };

    cookieServiceStub = {
      get(name: string): string {
        return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkxNTM0NTc0LCJqdGkiOiI4Y2RiMzgyMGFiNDk0MGQ0OTUwYTFkNDZkZDc5NDA5YSIsInVzZXJfaWQiOjE4fQ.i70TPuR8SdcpqanVHxIIds5stg3plq2upDPogSjAhpM'
      },
      set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: "Lax" | "None" | "Strict"): void {
      },
      delete(name: string, path?: string, domain?: string, secure?: boolean, sameSite?: "Lax" | "None" | "Strict"): void {
      }
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ NavBarComponent ],
      providers: [
        {provide: TokenService, useValue: tokenServiceStub},
        {provide: CookieService, useValue: cookieServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('parseUserName should parse and save items', () => {
    component.parseUserName(data);
    fixture.detectChanges();
    expect(component.username).toEqual(expectedUserName);
  });

  it('logOut should be called', () => {
    component.isTest = true;
    fixture.detectChanges()
    expect(component.logOut()).toEqual(undefined);
  });
});