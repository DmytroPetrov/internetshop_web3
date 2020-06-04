import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

export interface MenuItem {
  id: number,
  name: String,
  isGroup: Boolean,
  imgUrl: String,
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json'})}}
  items: MenuItem[];

  public groupsUrl = 'goods/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getGroups().then((val) => {
      console.log(val);
      this.parseGroups(val);
      console.log('Here:\n' + this.items);
      
    }, 
    (er)=> {
    console.log('Network problems');
    });
  }

  getGroups(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.get(this.baseUrl + '/groups/', this.httpHeaders()).subscribe(value => {
        resolve(value['groups']);
      }, error => {
        
        console.log("There is a prob with network");
        reject();
      });
    });
    return promise;
  }

  parseGroups(data) {
    data.forEach(it => {
      console.log(it);
      var one: MenuItem = {
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
