import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    category: {
      id: '',
      name: ''
    },
    description: ''
  }

  @Output() addedProduct = new EventEmitter<Product>()
  @Output() showProduct = new EventEmitter<string>()

  addToCart(){
    this.addedProduct.emit(this.product)
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id)
  }
}
