import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShopPageComponent, GroupItem } from './shop-page.component';

describe('ShopPageComponent', () => {
  let component: ShopPageComponent;
  let fixture: ComponentFixture<ShopPageComponent>;
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

  let expectedItems: GroupItem[];

  beforeEach(async(() => {
    expectedItems = [
      {name: 'name', id: 1, isGroup: true, imgUrl: 'url'},
      {name: 'name', id: 2, isGroup: false, imgUrl: 'url'}
    ] as GroupItem[];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ ShopPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse and save groups', () => {
    component.parseGroups(data);
    fixture.detectChanges();
    expect(component.items).toEqual(expectedItems);
  });
});
