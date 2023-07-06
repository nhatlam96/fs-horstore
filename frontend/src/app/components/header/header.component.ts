import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { Observable, Subscription, map, startWith, switchMap } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { Favorite, FavoriteItem } from 'src/app/models/favorite.model';
import { Product } from 'src/app/models/product.model';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent {
  static filterChicking(): any {
      throw new Error("Method not implemented.");
  }
  private _cart: Cart = { items: [] };
  private _favorite: Favorite = { items: [] };
  itemsQuantity = 0;
  favNumber = 0;
  itemsF: FavoriteItem[] | undefined;

  showDialog = false;
  showDialog2 = false;
  showDiv: boolean = false;

  category1: string[] | undefined;
  category2: string[][] = [];
  category3: string[][][] = [];
  categoriesSubscription: Subscription | undefined;
  myControl = new FormControl('');
  options: string[] | undefined;
  filteredOptions: Observable<string[]> | undefined;
  productsSubscription: Subscription | undefined;
  check: boolean = false;
  
  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    this.check = true;
    return this.storeService.getSuggestions().pipe(
      map((response: Array<string>) => {
        this.options = response;
        return response.filter(option => option.toLowerCase().includes(filterValue));
      })
    );
  }

  public filterChicking(){
      return this.check
  }
  
  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getCategory()
      .subscribe((response: Array<string>) => {
        this.category1 = response;
        this.categori(this.category1);
      });
  
    this.myControl = new FormControl();
  
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filter(value || ''))
    );
  }
  
  search(option: string) : void {
    if(option){
      this.changeCategory("f43", option);
    }
  }
  search2(option: string) : void {
    const queryParams = { search: option };
    this.router.navigate(['/home'], { queryParams: queryParams });
  }

  addSuggestion(query: string): void{
    this.storeService.addSuggestion(query).subscribe((response: Array<string>) => {
    });
  }
  onDeleteCart(): void {
    const confirmDelete = window.confirm("Are you sure you want to delete the cart items?");
  
    if (confirmDelete) {
      // Perform the deletion logic here
      this.onClearCart();
    }
  }

  onDeleteFavorites(): void {
    const confirmDelete = window.confirm("Are you sure you want to delete the favorite items?");
  
    if (confirmDelete) {
      // Perform the deletion logic here
      this.onClearFavorite();
      // Refresh the page
    //window.location.reload();
    }
  }
  
  
  getSuggestion() : void{
    this.storeService.getSuggestions().subscribe((response: Array<string>) => {
      this.options = response;
      console.log("adada", this,this.options);
    });
  }

  changeCategory2(class1: string): void {
    const queryParams = { class: class1 };
    this.router.navigate(['/home'], { queryParams: queryParams });
  }

  changeCategory(class1? : string,
    class2? : string,
    class3? : string,
    class4? : string): void {
    this.storeService.triggerFunction(class1, class2, class3, class4);
  }

  constructor(private cartService: CartService,
    private favoriteService: FavoriteService, private storeService: StoreService, private router: Router, private route: ActivatedRoute) {}

  categori(category1: string[]): void {
    for (let index = 0; index < category1.length; index++) {
      this.categoriesSubscription = this.storeService
        .getCategory(category1[index])
        .subscribe((response: Array<string>) => {
          // Ensure category2 has enough elements
          if (this.category2.length <= index) {
            this.category2.push([]);
          }
          this.category2[index] = response;
          const subCategory2 = this.category2[index];
          for (let j = 0; j < subCategory2.length; j++) {
            this.categoriesSubscription = this.storeService
              .getCategory(category1[index], subCategory2[j])
              .subscribe((response: Array<string>) => {
                // Ensure category3 has enough elements
                if (this.category3.length <= index) {
                  this.category3.push([]);
                }
                if (!this.category3[index]) {
                  this.category3[index] = []; // Initialize as empty array if undefined
                }
                
                if (this.category3[index].length <= j) {
                  this.category3[index].push([]);
                }
                
                this.category3[index][j] = response;
                console.log("category3_r:", this.category3[index][j]);
              });
          }
        });
    }
  }
    
 /*  onShowCategory(category: string): void {
    this.homeComponent.getProducts2(category)
  } */

  toggleDialog() {
    this.showDialog = !this.showDialog;
  }
  toggleDialog2() {
    this.showDialog2 = !this.showDialog2;
  }


  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  @Input()
  get favorite(): Favorite {
    return this._favorite;
  }

  set favorite(favorite: Favorite) {
    this._favorite = favorite;

    this.favNumber = favorite.items.length;
    this.itemsF = favorite.items;
      
  }

  /* help(favorite: Favorite): number{
    let x = 0;
    favorite.items.forEach(element => {
      x += 1;
    });
    return x;
  }
 */
  
  // Shipping
  shipping(items: CartItem[]):number{
    if(this.getTotal(items) < 29.90){
      return 4.90
    }
    return 0
  }

 
  


  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onClearFavorite(): void {
    this.favoriteService.clearFavorite();
    window.location.reload();
  }

  

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
  onAddtoFavorite(item: FavoriteItem): void {
    this.favoriteService.addToFavorite(item, 1);
    this.storeService.updateById(item.id, true).subscribe(
      (response: Array<Product>) => {
        // Handle the successful response here
        console.log('Product updated:', response);
      },
      (error: any) => {
        // Handle any errors that occurred during the request
        console.error('Error updating product:', error);
      }
    );
    this.changeCategory("Damen");
    //window.location.reload();
  }


  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
  
}