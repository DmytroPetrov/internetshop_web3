import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoginPageComponent } from './login-page/login-page.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: ErrorMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
