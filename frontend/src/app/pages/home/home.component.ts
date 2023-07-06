import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 350, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  count = '20';
  sort = 'ASC';
  category: string | undefined;
  productsSubscription: Subscription | undefined;

  products2: string[] = [
    'Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5',
    'Product 6', 'Product 7', 'Product 8', 'Product 9', 'Product 10',
    'Product 11', 'Product 12', 'Product 13', 'Product 14', 'Product 15',
    'Product 16', 'Product 17', 'Product 18', 'Product 19', 'Product 20',
    'Product 21', 'Product 22', 'Product 23', 'Product 24', 'Product 25'
  ];
  currentPage = 1;
  pageSize = 6;
  max_product: number = 0;
  totalPages: number | undefined;
  // 

  private subscription: Subscription | undefined;


  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private favService: FavoriteService,
    private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const specificCategory = params['class'];
      const search = params['search'];
      this.setMaxProduct();

      if (specificCategory) {
        this.getProducts2(specificCategory);
        // Redirect to localhost:3000/home
      }
      else if(search){
        this.getProducts2("f43",search);
      }
      else{
        this.getProducts();
        this.subscription = this.storeService.triggerFunction$.subscribe(({ class1, class2, class3, class4 }) => {
          this.getProducts2(class1, class2, class3, class4);
        });
      }
    });
   
    

    
  }

  executeFunction(): void {
    console.log('hello');
    alert("Hello You");
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onSetFilters(filters: { min: number, max: number, favorite: boolean }): void {
    const { min, max, favorite } = filters;

    this.productsSubscription = this.storeService
      .setFilters(min, max, favorite)
      .subscribe((_products) => {
        this.products = _products;
        if (this.products) {
          this.totalPages = Math.ceil(this.products.length / this.pageSize);
          this.currentPage = 1;
        }
      });
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  // note underscore
  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
        this.initFav(_products);

        if(this.products){
          this.totalPages = Math.ceil(this.products.length/this.pageSize);
          this.currentPage = 1;
        }
      });
  }

  // note underscore
  getProducts2(class1? : string,
    class2? : string,
    class3? : string,
    class4? : string): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, class1, class2, class3, class4)
      .subscribe((_products) => {
        this.products = _products;
        this.initFav(_products);

        if(this.products){
          this.totalPages = Math.ceil(this.products.length/this.pageSize);
          this.currentPage = 1;
        }
      });
  }

  setMaxProduct():void{
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
          this.max_product = _products.length;
          this.initFav(_products);

      });
  }
  

  
  //
  getCurrentPageProducts() {
    // Handle the case when products is undefined
    if (!this.products) {
      return [];
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Ensure endIndex does not exceed the array length
    const slicedProducts = this.products.slice(startIndex, endIndex);
    
    return slicedProducts;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage && this.totalPages && this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
      category: product.category
    });
  }

  onAddToFavorite(product: Product): void {
    this.favService.addToFavorite({
      product: product.image,
      name: product.title,
      price: product.price,
      id: product.id,
    });
    console.log("I am rungninn",product.isFavorite);
    this.storeService.updateById(product.id, product.isFavorite).subscribe(
      (response: Array<Product>) => {
        // Handle the successful response here
        console.log('Product updated:', response);
      },
      (error: any) => {
        // Handle any errors that occurred during the request
        console.error('Error updating product:', error);
      }
    );
    console.log("5",product.isFavorite);

  }

  initFav(products: Array<Product>): void{
    console.log("6fsdsdsddsdsd sdsds sdsdfsfsf", products);

    for (let index = 0; index < products.length; index++) {
      if(products[index].isFavorite == true){
        this.favService.addSet({
          product: products[index].image,
          name: products[index].title,
          price: products[index].price,
          id: products[index].id,
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
     // Unsubscribe to avoid memory leaks
     if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}