import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Favorite, FavoriteItem} from '../models/favorite.model';
import { StoreService } from './store.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {
  favorite = new BehaviorSubject<Favorite>({items: []})

  constructor(private _snackBar: MatSnackBar, private storeService: StoreService, private router: Router) {}

  addToFavorite(item: FavoriteItem, code?: number): void {
    const items = [...this.favorite.value.items];
    console.log("6fsfsfsf",items);

    const itemInFavorite = items.find((_item) => _item.id === item.id);
    if (itemInFavorite && code != 1) {
      //const index = items.indexOf(item);
      //(items.splice(index, 1);
      // test
      this._snackBar.open('Item removed in Favorite.', 'Ok', { duration: 2000 });
      items.forEach(element => {
        if(element.id == item.id){
          items.splice(items.indexOf(element), 1);
        }
      })
      console.log("6fsdsdsdsdfsfsf",items);

    
    }if (itemInFavorite && code == 1) {
      //const index = items.indexOf(item);
      //(items.splice(index, 1);
      // test
      this._snackBar.open('Item already in Favorite.', 'Ok', { duration: 2000 });
      
    } else {
      items.push(item);
      this._snackBar.open('1 item added to Favorite.', 'Ok', { duration: 2000 });
      console.log("6fsdsdsdsdf    sfsf",items);

    }
    
    console.log("7",items);

    this.favorite.next({ items });
    console.log(this.favorite.value);
  }

  addSet(item: FavoriteItem): void {
    const items = [...this.favorite.value.items];
    console.log("6fsfs ggggggggg fsf",items);

    const itemInFavorite = items.find((_item) => _item.id === item.id);
    if (!itemInFavorite) {
      items.push(item);

    
    } else {
      console.log("6fsdsds ddd2222222 dsdf    sfsf",items);

    }

    this.favorite.next({ items });
    console.log(this.favorite.value);
  }


  

  clearFavorite(): void {
    const items = [...this.favorite.value.items];
    for (let index = 0; index < items.length; index++) {
      this.storeService.updateById(items[index].id, false).subscribe(
        (response: Array<Product>) => {
          // Handle the successful response here
          console.log('Product updated:', response);
        },
        (error: any) => {
          // Handle any errors that occurred during the request
          console.error('Error updating product:', error);
        }
      );
    this.favorite.next({ items: [] });
    this._snackBar.open('Favorite is cleared.', 'Ok', {
      duration: 2000,
    });
  }
}

  removeFromFavorite(item: FavoriteItem, updateCart = true): FavoriteItem[] {
    const filteredItems = this.favorite.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (updateCart) {
      this.favorite.next({ items: filteredItems });
      this._snackBar.open('1 item removed from favorite.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }


}