import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams} from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { ​​HttpClientModule​​ } from '@angular/common/http';

import { ForgotPasswordComponent } from './modals/forgot-password/forgot-password.component';
import { EditComponent } from './modals/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { CartPage } from './pages/cart/cart.page';
import { PayPal } from '@ionic-native/paypal/ngx';
import { UpdatePasswordComponent } from './modals/update-password/update-password.component';
import { TutoDetailsComponent } from './modals/tuto-details/tuto-details.component';



@NgModule({
  declarations: [AppComponent, ForgotPasswordComponent, EditComponent, UpdatePasswordComponent, TutoDetailsComponent],
  entryComponents: [ForgotPasswordComponent, EditComponent, UpdatePasswordComponent, TutoDetailsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ​​HttpClientModule​​, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NativeStorage, CartPage, PayPal, NavParams],
  bootstrap: [AppComponent],
})
export class AppModule {}
