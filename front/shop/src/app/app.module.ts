import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SingUpPageComponent } from './sing-up-page/sing-up-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { GoodsPageComponent } from './goods-page/goods-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { HttpClientModule } from '@angular/common/http';
import { GoodsItemComponent } from './goods-item/goods-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ErrorMessageComponent,
    LoginPageComponent,
    NavBarComponent,
    SingUpPageComponent,
    UserPageComponent,
    GoodsPageComponent,
    ArticlePageComponent,
    ShopPageComponent,
    GoodsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
