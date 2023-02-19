import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Product } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private productSubject: BehaviorSubject<Product | null>;
    public product: Observable<Product | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.productSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('product')!));
        this.product = this.productSubject.asObservable();
    }

    public get productValue() {
        return this.productSubject.value;
    }


    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/products`);
    }

    getById(id: string) {
        return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
    }
    addProduct(product: Product) {
      return this.http.post(`${environment.apiUrl}/products/registerProduct`, product);
    }
    updateProduct(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/products/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.productValue?.id) {
                    // update local storage
                    const user = { ...this.productValue, ...params };
                    localStorage.setItem('product', JSON.stringify(this.product));

                    // publish updated user to subscribers
                    this.productSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/products/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.productValue?.id) {
                }
                return x;
            }));
    }
}
