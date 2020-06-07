import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpPageComponent } from './sing-up-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpHeaders } from '@angular/common/http';

describe('SingUpPageComponent', () => {
  let component: SingUpPageComponent;
  let fixture: ComponentFixture<SingUpPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ SingUpPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be defined', () => {
    let headers = {headers : new HttpHeaders({'Content-Type': 'application/json'})}
    expect(component.httpHeaders()).toBeDefined();
  });

  it('Should registr', () => {
    expect(component.registerNewUser()).toEqual(undefined);
  });

  it('singUp()', () => {
    expect(component.singUp()).toEqual(undefined);
  });
});
