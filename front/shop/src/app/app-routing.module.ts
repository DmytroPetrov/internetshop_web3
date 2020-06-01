import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoginPageComponent } from './login-page/login-page.component'
import { SingUpPageComponent } from './sing-up-page/sing-up-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { GoodsPageComponent } from './goods-page/goods-page.component';
import { ShopPageComponent } from './shop-page/shop-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShopPageComponent
  },
  {
    path: 'goods',
    component: GoodsPageComponent
  },
  {
    path: 'article',
    component: ArticlePageComponent
  },
  {
    path: 'user',
    component: UserPageComponent
  },
  {
    path: 'singUp',
    component: SingUpPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    component: ErrorMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
