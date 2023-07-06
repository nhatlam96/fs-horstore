import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { Favorite } from './models/favorite.model';
import { FavoriteService } from './services/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };
  favorite: Favorite = { items: [] };

  constructor(private cartService: CartService,
    private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
    this.favoriteService.favorite.subscribe((_favorite) => {
      this.favorite = _favorite;
    });
  }
}