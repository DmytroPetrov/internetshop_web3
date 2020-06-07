import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

describe('TokenService', () => {
  let service: TokenService;
  let cookieServiceStub: Partial<CookieService>;
  let fakeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkxNTM0NTc0LCJqdGkiOiI4Y2RiMzgyMGFiNDk0MGQ0OTUwYTFkNDZkZDc5NDA5YSIsInVzZXJfaWQiOjE4fQ.i70TPuR8SdcpqanVHxIIds5stg3plq2upDPogSjAhpM'; 
  let data = {
    access: fakeToken,  
    refresh: fakeToken
  }

  beforeEach(() => {
    cookieServiceStub = {
        get(name: string): string {
          return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkxNTM0NTc0LCJqdGkiOiI4Y2RiMzgyMGFiNDk0MGQ0OTUwYTFkNDZkZDc5NDA5YSIsInVzZXJfaWQiOjE4fQ.i70TPuR8SdcpqanVHxIIds5stg3plq2upDPogSjAhpM'
        },
        set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: "Lax" | "None" | "Strict"): void {
        }
      };
    
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            {provide: CookieService, useValue: cookieServiceStub}
        ]
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('getAccess should return token', () => {
    expect(service.getAccess()).toEqual(fakeToken);
  });

  it('getRefresh should return token', () => {
    expect(service.getRefresh()).toEqual(fakeToken);
  });

  it('setCookie should return token', () => {
    expect(service.setCookie(data)).toBe();
  });

  it('refreshTokenSubs should return promise', () => {
      let pr = new Promise((resolve, reject)=> {})
    expect(typeof(service.refreshTokenSubs())).toBe(typeof(pr));
  });
});

describe('TokenService deep', () => {
    let service: TokenService;
    let cookieServiceStub: Partial<CookieService>;
    let fakeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkxNTM0NTc0LCJqdGkiOiI4Y2RiMzgyMGFiNDk0MGQ0OTUwYTFkNDZkZDc5NDA5YSIsInVzZXJfaWQiOjE4fQ.i70TPuR8SdcpqanVHxIIds5stg3plq2upDPogSjAhpM'; 
    let data = {
      access: fakeToken,  
      refresh: fakeToken
    }
  
    beforeEach(() => {
      cookieServiceStub = {
          get(name: string): string {
            return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkxNTM0NTc0LCJqdGkiOiI4Y2RiMzgyMGFiNDk0MGQ0OTUwYTFkNDZkZDc5NDA5YSIsInVzZXJfaWQiOjE4fQ.i70TPuR8SdcpqanVHxIIds5stg3plq2upDPogSjAhpM'
          },
          set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: "Lax" | "None" | "Strict"): void {
          }
        };
      

      TestBed.configureTestingModule({
          imports: [
              HttpClientTestingModule
          ],
          providers: [
              {provide: CookieService, useValue: cookieServiceStub}
          ]
      });
      service = TestBed.inject(TokenService);
    
      spyOn(service, 'refreshToken');

      service.refreshTokenSubs();
    });
  
    it('refreshTokenSubs deep', () => {
        
    expect(service.refreshToken).toHaveBeenCalled();
  });
  });
  
