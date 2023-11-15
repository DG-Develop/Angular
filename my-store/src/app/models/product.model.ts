export interface Category{
  id: string
  name: string
}

export interface Product{
  id: string
  title: string
  price: number
  images: string[]
  description: string
  category: Category
  taxes?: number
}


export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: number
}

// El Partial pone por defecto todos los atributos en posibles nulos ?
export type UpdateProductDTO = Partial<CreateProductDTO>
