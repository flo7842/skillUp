import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutoDetailsComponent } from './modals/tuto-details/tuto-details.component';

const routes: Routes = [{

    path: '', 
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },  
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./pages/catalog/catalog.module').then( m => m.CatalogPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'paypal',
    loadChildren: () => import('./pages/paypal/paypal.module').then( m => m.PaypalPageModule)
  },
  {
    path: 'tuto',
    loadChildren: () => import('./pages/tuto/tuto.module').then( m => m.TutoPageModule)
  },
  {
    path : 'tuto-component', component : TutoDetailsComponent
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
