import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginBusinessPage } from './login-business';

@NgModule({
  declarations: [
    LoginBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginBusinessPage),
  ],
  exports: [
    LoginBusinessPage
  ]
})
export class LoginBusinessPageModule {}
