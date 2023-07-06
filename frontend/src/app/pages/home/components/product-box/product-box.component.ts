import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AES, enc } from 'crypto-js';

import { Product } from 'src/app/models/product.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: '[app-product-box]',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter();
  @Output() addToFavorite = new EventEmitter();
  private key: string = 'my_secret_key'; // Replace with your secret key

  encodedProductName: string | undefined;
  encryptedId: string | undefined;

  constructor(
    private storeService: StoreService,
    private favService: FavoriteService
  ) {}

  ngOnInit() {
    this.generateURLParams();
    //this.initFav();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && !changes['product'].firstChange) {
      this.generateURLParams();
    }
  }
  generateURLParams() {
    if (this.product) {
      this.encodedProductName = this.generateProductNameURL(this.product.title);
      this.encryptedId = this.encryptId(this.product.id.toString()).toString();
    }
  }
  generateProductNameURL(productName: string): string {
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

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onAddToFavorite(product: Product): void {
    console.log("1efwefwef",product.isFavorite);
    product.isFavorite = !product.isFavorite;
    this.addToFavorite.emit(product);
    console.log("2",this.product.isFavorite);
  }

}
