import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.categoryId = params.get('id')

          if (this.categoryId) {
            return this.productService.getByCategory(this.categoryId, this.limit, this.offset)
          }

          return [];
        })
      )
      .subscribe(products => {
        this.products = [...this.products, ...products]
        this.offset += this.limit
      })
  }

  loadMore() {
    if (this.categoryId) {
      this.productService.getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe(products => {
          this.products = [...this.products, ...products]
          this.offset += this.limit
        })
    }

  }
}
