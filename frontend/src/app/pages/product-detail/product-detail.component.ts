import { Component, OnInit, OnDestroy, Inject, AfterViewInit, HostListener, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { Product } from 'app/models/product.model';
import { CartService } from 'app/services/cart.service';
import { FavoriteService } from 'app/services/favorite.service';
import { StoreService } from 'app/services/store.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Dialog1Component } from './dialog1/dialog1.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  product: Product = {} as Product;
  productSubscription: Subscription | undefined;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  private key: string = 'my_secret_key'; // Replace with your secret key

  category: string | null | undefined;
  name: string | null | undefined;
  decryptedId: string | null | undefined;
  decryptedIdInt: number | undefined;
  TwoProducts: Array<Product> = [];

  productsSubscription: Subscription | undefined;
  // ----------------------
  encodedProductName1: string | undefined;
  encryptedId1: string | undefined;
  product1: Product | null | undefined;

  encodedProductName2: string | undefined;
  encryptedId2: string | undefined;
  product2: Product | null | undefined;

  // -----------------------------



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');
      const name = params.get('name');

      const encryptedId = params.get('id');
      this.name = this.generateProductNameURL(name);

      if (encryptedId) {
        const decodedId = decodeURIComponent(encryptedId);
        this.decryptedId = this.decryptId(decodedId);
        console.log("Decrypted ID:", this.decryptedId);
        if (this.decryptedId) {
          this.decryptedIdInt = parseInt(this.decryptedId, 10);

          this.getProductById1(this.decryptedIdInt + 1);
          this.getProductById2(this.decryptedIdInt + 2);
          this.getProductById(this.decryptedIdInt);

          console.log("csdcs sdcsdcs: ", this.product1);
          console.log("csdcs sdcsdcs: ", this.product2);

          console.log("Decrypted ID as integer:", this.decryptedIdInt);
        }
      }
      // Convert decryptedId to an integer

    });





  }
  // ----------------------------
  ngOnChanges(changes: SimpleChanges) {
    if (changes['product1'] && !changes['product1'].firstChange) {
      this.generateURLParams1();
    }
    if (changes['product2'] && !changes['product2'].firstChange) {
      this.generateURLParams2();
    }
  }

  generateURLParams1() {
    if (this.product1) {
      this.encodedProductName1 = this.generateProductNameURL1(this.product1.title);
      this.encryptedId1 = this.encryptId(this.product1.id.toString()).toString();
      console.log("sdsdsd", this.product1);
    }
    console.log("sdsdsd", this.product1);

  }
  generateURLParams2() {
    if (this.product2) {
      this.encodedProductName2 = this.generateProductNameURL2(this.product2.title);
      this.encryptedId2 = this.encryptId(this.product2.id.toString()).toString();
    }
  }
  generateProductNameURL1(productName: string): string {
    if (productName) {
      return encodeURIComponent(productName);
    }
    return '';
  }
  generateProductNameURL2(productName: string): string {
    if (productName) {
      return encodeURIComponent(productName);
    }
    return '';
  }
  public encryptId(id: string): string {
    const encrypted = AES.encrypt(id, this.key).toString();
    console.log("id was:", id, "end:", encrypted);

    return encodeURIComponent(encrypted);
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

  // -------------------------------------
  generateProductNameURL(productName: string | null): string | null {
    if (productName) {
      const originalProductName = decodeURIComponent(productName);
      // Use the encoded value as needed

      return originalProductName;
    }

    return '';
  }


  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private favService: FavoriteService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  private decryptId(encryptedId: string | null): string | null {
    if (encryptedId) {
      try {
        const decrypted = AES.decrypt(encryptedId, this.key).toString(enc.Utf8);

        return decrypted;
      } catch (error) {
        console.error('Error decrypting id:', error);
      }
    }
    console.error('Error decrypting dadadada:');
    return null;
  }

  openDialog() {
    this.dialog.open(Dialog1Component, {
      minWidth: '300px',
    });
  }




  getProductById(id: number): void {
    this.productSubscription = this.storeService.getProductById(id).subscribe(
      (product: Product) => { // Update the parameter type to 'Product' instead of 'Product[]'
        this.product = product;
      },
      (error) => {
        console.log('Error fetching product:', error);
      }
    );
  }

  getProductById1(id: number): void {
    this.storeService.getProductById(id).subscribe(
      (product: Product) => { // Update the parameter type to 'Product' instead of 'Product[]'
        this.product1 = product;
        this.encodedProductName1 = this.generateProductNameURL1(this.product1.title);
        this.encryptedId1 = this.encryptId(this.product1.id.toString()).toString();
        console.log("sdsdsd", this.product1);
      },
      (error) => {
        console.log('Error fetching product:', error);
      }
    );
  }
  getProductById2(id: number): void {
    this.storeService.getProductById(id).subscribe(
      (product: Product) => { // Update the parameter type to 'Product' instead of 'Product[]'
        this.product2 = product;
        this.encodedProductName2 = this.generateProductNameURL2(this.product2.title);
        this.encryptedId2 = this.encryptId(this.product2.id.toString()).toString();
        console.log("sdsdsd", this.product2);
      },
      (error) => {
        console.log('Error fetching product:', error);
      }
    );
  }

  getProductHelp(id: number): Observable<Product> {
    return this.storeService.getProductById(id);
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }


  isSticky = false;

  ngAfterViewInit() {
    this.checkSticky();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkSticky();
  }

  checkSticky() {
    const leftElement = document.getElementById('left');
    const rightElement = document.getElementById('right');
    const bigImageElement = document.getElementById('big-image');

    if (leftElement && rightElement && bigImageElement) {
      const leftRect = leftElement.getBoundingClientRect();
      const rightRect = rightElement.getBoundingClientRect();
      const bigImageRect = bigImageElement.getBoundingClientRect();

      const leftBottom = leftRect.top + leftRect.height;
      const rightBottom = rightRect.top + rightRect.height;
      const bigImageBottom = bigImageRect.top + bigImageRect.height;

      this.isSticky = rightBottom < bigImageBottom && leftBottom < rightBottom;
    }
  }
}