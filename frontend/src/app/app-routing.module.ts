
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
  },
  { path: 'product/:category/:name/:id', component: ProductDetailComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}