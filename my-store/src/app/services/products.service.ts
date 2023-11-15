import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { catchError, map, retry, throwError, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/v1`

  constructor(private httpService: HttpClient) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams()
    if (limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.httpService.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          console.log(item.price)
          return {
            ...item,
            taxes: .16 * item.price
          }
        }))
      )
  }

  getProductsByPage(limit: number, offset: number) {
    return this.httpService.get<Product[]>(`${this.apiUrl}/products`, {
      params: {
        limit, offset
      }
    })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          console.log(item.price)
          return {
            ...item,
            taxes: .16 * item.price
          }
        }))
      )
  }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams()
    console.log(limit)
    console.log(offset)
    if (limit != null && offset != null) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }

    return this.httpService.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
  }

  getProduct(id: string) {
    return this.httpService.get<Product>(`${this.apiUrl}/products/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'Product not found')
        }

        if (error.status === HttpStatusCode.Forbidden) {
          return throwError(() => 'You do not have permission to access this product');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => 'You must be logged in to access this product');
        }

        return throwError(() => 'Product not found')
      }))
  }

  fetchAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  create(dto: CreateProductDTO) {
    return this.httpService.post<Product>(`${this.apiUrl}/products`, dto)
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.httpService.put<Product>(`${this.apiUrl}/products/${id}`, dto)
  }

  delete(id: string) {
    return this.httpService.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
