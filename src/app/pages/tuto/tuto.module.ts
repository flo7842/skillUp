import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutoPageRoutingModule } from './tuto-routing.module';

import { TutoPage } from './tuto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutoPageRoutingModule
  ],
  declarations: [TutoPage]
})
export class TutoPageModule {}
