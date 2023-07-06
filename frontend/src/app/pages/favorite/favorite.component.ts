/* To create a component like favorite
ng g c favorite
add favorite.component.html favorite.component.css
add the rout in app-routing.module.ts so we get to the favorite page when we write i.e lacalhost:4200/favorite
add the templetaUrls and StyleUrls in favorite.component.ts
create a model in src/app/models. The model name is favorite.model.ts
We use the model to generate object of favorite-elements. 

---- Then in the .ts file of favorite we implement funkctions
favorite: Favorite = { items:  is the favorite object

*/


import { Component, OnInit } from '@angular/core';
import { Favorite, FavoriteItem } from 'src/app/models/favorite.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  // Dummy forite object
  favorite: Favorite = { items: [] };

  // the property we will use inside our table. This property reseve the favorite array
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'action'
  ]
  dataSource: FavoriteItem[] = [];
  favoriteSubscription: Subscription | undefined;
  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favoriteSubscription = this.favoriteService.favorite.subscribe((_favorite: Favorite) => {
      this.favorite = _favorite;
      this.dataSource = _favorite.items;
    });
  }

  onClearFavorite(): void {
    this.favoriteService.clearFavorite();
  }
  onRemoveFromFavorite(item: FavoriteItem): void {
    this.favoriteService.removeFromFavorite(item);
  }
  onCheckout(): void{

  }
  ngOnDestroy() {
    if (this.favoriteSubscription) {
      this.favoriteSubscription.unsubscribe();
    }
  }
}
