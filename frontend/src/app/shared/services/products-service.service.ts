import { UserService } from './User.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsServiceService {

  constructor(private http: HttpClient, private userService: UserService) { }
  getCategories() {
    return this.http.get(environment.serverUrl + '/getCategories');
  }
  getType() {
    return this.http.get(environment.serverUrl + '/getType')
  }

  searchProducts(params: any = {}) {
    return this.http.get(environment.serverUrl + '/searchProducts', { params });
  }

  createProduct(product: any) {
    return this.http.post(environment.serverUrl + '/createProduct', product);
  }
  deleteProduct(id: number) {
    return this.http.delete(environment.serverUrl + '/deleteProduct/' + id);
  }
  productsCount() {
    return this.http.get(environment.serverUrl + '/productsCount');
  }
  getProductById(id: number) {
    return this.http.get(environment.serverUrl + '/getProductById/' + id);

  }
  addToCart(productId: number) {
    return this.http.post(environment.serverUrl + '/addToCart/', { productId, userId: this.userService.loggedUser.id })
  }
  getProductFromCard() {
    return this.http.get(environment.serverUrl + '/getProductFromCard/' + this.userService.loggedUser.id);

  }

  updateProduct(id: number, editedProduct: any) {
    return this.http.put(environment.serverUrl + '/updateProduct/' + id, editedProduct)
  }

  buyProducts(id: any) {
    return this.http.delete(environment.serverUrl + '/clearCart/' + id)
  }
}
