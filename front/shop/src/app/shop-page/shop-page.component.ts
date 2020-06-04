import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

export interface GroupItem {
  id: number,
  name: String,
  isGroup: Boolean,
  imgUrl: String,
}

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json'})}}
  items: GroupItem[];

  public groupsUrl = 'group/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getArticles().then((val) => {
      console.log(val);
      this.parseArticles(val);
      console.log('Here:\n' + this.items);
      
    }, 
    (er)=> {
    console.log('Network problems');
    });
  }

  getArticles(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.get(this.baseUrl + '/goods/groups/', this.httpHeaders()).subscribe(value => {
        resolve(value['groups']);
      }, error => {
        
        console.log("There is a prob with network");
        reject();
      });
    });
    return promise;
  }

  parseArticles(data) {
    data.forEach(it => {
      console.log(it);
      var one: GroupItem = {
        id: it['id'],
        name: it['name'],
        isGroup: it['isGroup'],
        imgUrl: it['img_url']
      };

      if (!this.items)
        this.items = [one];
      else { 
        this.items.push(one);
      }
    });
  }

}
