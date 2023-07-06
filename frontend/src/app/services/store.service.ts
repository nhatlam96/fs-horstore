import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { Image } from '../models/image.model';

const STORE_BASE_URL = 'http://localhost:9000';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) { }

  /* private triggerFunctionSource = new Subject<void>();

  triggerFunction$ = this.triggerFunctionSource.asObservable();

  executeFunction(): void {
    // Emit the event to notify subscribers (e.g., HomeComponent)
    this.triggerFunctionSource.next();
  } */

  private triggerFunctionSubject = new Subject<{
    class1?: string,
    class2?: string,
    class3?: string,
    class4?: string
  }>();

  triggerFunction$ = this.triggerFunctionSubject.asObservable();

  triggerFunction(class1?: string, class2?: string, class3?: string, class4?: string): void {
    const params = { class1, class2, class3, class4 };
    this.triggerFunctionSubject.next(params);
  }


  getAllProducts(
    limit = '30',
    sort = 'asc',
    category?: string,
    class2?: string,
    class3?: string,
    class4?: string,
  ): Observable<Array<Product>> {

    if (category == 'f43' && class2) {
      class2 = encodeURIComponent(class2);
      return this.httpClient.get<Array<Product>>(
        `${STORE_BASE_URL}/products/category/${class2}?limit=${limit}&sort=${sort}`
      );
    }
    else if (!category) {
      return this.httpClient.get<Array<Product>>(
        `${STORE_BASE_URL}/products?limit=${limit}&sort=${sort}`
      );
    }
    else if (!class2) {
      category = encodeURIComponent(category);
      return this.httpClient.get<Array<Product>>(
        `${STORE_BASE_URL}/products/category/${category}?limit=${limit}&sort=${sort}`
      );
    }
    else if (!class3) {
      category = encodeURIComponent(category);
      class2 = encodeURIComponent(class2);
      console.log("adaddd", class2);
      return this.httpClient.get<Array<Product>>(
        `${STORE_BASE_URL}/products/category/${category}/${class2}?limit=${limit}&sort=${sort}`
      );
    }
    else if (!class4) {
      category = encodeURIComponent(category);
      class2 = encodeURIComponent(class2);
      class3 = encodeURIComponent(class3);
      return this.httpClient.get<Array<Product>>(
        `${STORE_BASE_URL}/products/category/${category}/${class2}/${class3}?limit=${limit}&sort=${sort}`
      );
    }
    else {
      category = encodeURIComponent(category);
      class2 = encodeURIComponent(class2);
      class3 = encodeURIComponent(class3);
      class4 = encodeURIComponent(class4);
      return this.httpClient.get<Array<Product>>(
        `${STORE_BASE_URL}/products/category/${category}/${class2}/${class3}/${class4}?limit=${limit}&sort=${sort}`
      );
    }
  }


  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }

  getCategory(category?: string,
    class2?: string,
    class3?: string,
    class4?: string,
  ): Observable<Array<string>> {
    if (!class2 && category) {
      category = encodeURIComponent(category);
      return this.httpClient.get<Array<string>>(
        `${STORE_BASE_URL}/products/categories?category=${category}`
      );
    }
    else if (!category) {
      return this.httpClient.get<Array<string>>(
        `${STORE_BASE_URL}/products/categories`
      );
    } else if (!class3 && class2 && category) {
      category = encodeURIComponent(category);
      class2 = encodeURIComponent(class2);
      return this.httpClient.get<Array<string>>(
        `${STORE_BASE_URL}/products/categories?category=${category}&class2=${class2}`
      );
    }
    else if (!class4 && class3 && class2 && category) {
      category = encodeURIComponent(category);
      class2 = encodeURIComponent(class2);
      class3 = encodeURIComponent(class3);
      return this.httpClient.get<Array<string>>(
        `${STORE_BASE_URL}/products/categories?category=${category}&class2=${class2}&class3=${class3}`
      );
    }
    else if (class4 && class3 && class2 && category) {
      category = encodeURIComponent(category);
      class2 = encodeURIComponent(class2);
      class3 = encodeURIComponent(class3);
      class4 = encodeURIComponent(class4);

      return this.httpClient.get<Array<string>>(
        `${STORE_BASE_URL}/products/categories?category=${category}&class2=${class2}&class3=${class3}&class4=${class4}`
      );
    } else {
      return this.httpClient.get<Array<string>>(
        `${STORE_BASE_URL}/products/categories`
      );
    }

  }

  getSuggestions(): Observable<string[]> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/suggestions`
    );
  }
  addSuggestion(query: string): Observable<string[]> {
    const suggestion = encodeURIComponent(query);
    return this.httpClient.post<Array<string>>(
      `${STORE_BASE_URL}/products/suggestions`,
      { suggestion }
    );
  }
  updateById(id: number, isFavorite: boolean): Observable<Array<Product>> {
    return this.httpClient.put<Array<Product>>(
      `${STORE_BASE_URL}/product/update/${id}?isFavorite=${isFavorite}`, {});
  }


  getProductById(id: number = 1): Observable<Product> {
    return this.httpClient.get<Product>(
      `${STORE_BASE_URL}/product/id/${id}`
    );
  }
  getImageById(id: number = 1): Observable<Image> {
    return this.httpClient.get<Image>(
      `${STORE_BASE_URL}/products/images/${id}`
    );
  }
  setFilters(minValue: number = 0, maxValue: number = 0, isFavorite: boolean = false): Observable<Product[]> {
    const url = `${STORE_BASE_URL}/products/filters?minValue=${minValue}&maxValue=${maxValue}&isFavorite=${isFavorite}`;

    return this.httpClient.get<Product[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of([]); // Return an empty array of products
        }
        return throwError(error);
      })
    );
  }
}