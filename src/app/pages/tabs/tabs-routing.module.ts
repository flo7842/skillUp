import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = 
[
  {
    path: '',
    component: TabsPage,
    children: 
    [
      {
        path: 'home',
        children: [
          {
            path:'',
            loadChildren: () => 
              import('../../pages/home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'catalog',
        children: [
          {
            path: '',
            loadChildren: () => 
              import('../catalog/catalog.module').then( m => m.CatalogPageModule)
          }
        ]
      },
      {
        path: 'tuto',
        children: [
          {
            path: '',
            loadChildren: () => 
              import('../../pages/tuto/tuto.module').then( m => m.TutoPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => 
              import('../../pages/profile/profile.module').then( m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }, 
    ],
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
