import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from 'rxjs';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent{

  myShopingCart: Product[] = []
  total = 0
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input() set productId(id: string | null){
    if(id){
      this.onShowDetail(id)
    }
  }
  @Output() loadMoreProducts = new EventEmitter<void>();
  today = new Date();
  date = new Date(2023, 1, 21)
  showProductDetail = false
  productChosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    category: {
      id: '',
      name: ''
    },
    description: ''
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'

  constructor(private storeService: StoreService, private productsService: ProductsService) {
    this.myShopingCart = this.storeService.getMyShopingCart()
  }


  onAddToShopingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal()
  }

  toogleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading'

    if(!this.showProductDetail){
      this.showProductDetail = true
    }

    this.productsService.getProduct(id)
      .subscribe({
        next: data => {

          this.productChosen = data
          this.statusDetail = 'success'
        },
        error: (err) => {
          console.log(err)
          this.statusDetail = 'error'
        }
      })
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
      .pipe(
        switchMap(product => this.productsService.update(product.id, { title: 'change' }))
      )
      .subscribe(rtaUpdate => {
        console.log(rtaUpdate)
      })

    this.productsService.fetchAndUpdate(id, { title: 'new' })
      .subscribe(response => {
        const [product, productUpdate] = response;
        console.log(product)
        console.log(productUpdate)
      })
  }

  createNewProduct() {
    const randomUrlImage = Math.floor(Math.random() * (1084 - 0 + 1) + 0)
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Descripcion del proucto',
      categoryId: 2,
      images: [`https://picsum.photos/id/${randomUrlImage}/640/640`],
      price: 1000
    }

    this.productsService.create(product)
      .subscribe(data => {
        this.products.unshift(data)
      })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'change title'
    }

    const id = this.productChosen.id

    this.productsService.update(id, changes)
      .subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
        this.products[productIndex] = data
        this.productChosen = data
      })
  }

  deleteProduct() {
    const id = this.productChosen.id

    this.productsService.delete(id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)

        this.products.splice(productIndex, 1);
        this.showProductDetail = false
      })
  }

  onClikMore() {
    this.loadMoreProducts.emit()
  }

}
