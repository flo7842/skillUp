import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutoPage } from './tuto.page';

const routes: Routes = [
  {
    path: '',
    component: TutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutoPageRoutingModule {}
