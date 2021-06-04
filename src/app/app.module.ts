import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { ​​HttpClientModule​​ } from '@angular/common/http';

import { ForgotPasswordComponent } from './modals/forgot-password/forgot-password.component';
import { EditComponent } from './modals/edit/edit.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, ForgotPasswordComponent, EditComponent],
  entryComponents: [ForgotPasswordComponent, EditComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ​​HttpClientModule​​, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NativeStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
