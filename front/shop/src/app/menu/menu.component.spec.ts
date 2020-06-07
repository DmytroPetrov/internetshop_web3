import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent, MenuItem } from './menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let data = [{
    id: 1,
    img_url: 'url',
    isGroup: true,
    name: "name"
  },
  {
    id: 2,
    img_url: 'url',
    isGroup: false,
    name: "name"
  }];
  let expectedItems: MenuItem[];

  beforeEach(async(() => {
    expectedItems = [
      {name: 'name', id: 1, isGroup: true, imgUrl: 'url'},
      {name: 'name', id: 2, isGroup: false, imgUrl: 'url'}
    ] as MenuItem[];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('parseGroups shold parse groups', () => {
    component.parseGroups(data);
    fixture.detectChanges()
    expect(component.items).toEqual(expectedItems);
  });
});
