import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShopingCart: Product[] = []

  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  // constructor() { }

  addProduct(product: Product){
    this.myShopingCart.push(product)

    this.myCart.next(this.myShopingCart)
  }

  getMyShopingCart(){
    return this.myShopingCart
  }


  getTotal(){
    return this.myShopingCart.reduce((sum, item) => sum + item.price, 0)
  }
}
