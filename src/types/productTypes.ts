export type ProductDimensions = {
  width: number
  height: number
  depth: number
}

export type ProductReview = {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  weight: number
  dimensions: ProductDimensions
  reviews: ProductReview[]
  images: string[]
  thumbnail: string
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
}

export type ProductsQuery = {
  page: number
}

export type ProductsSearchQuery = ProductsQuery & { search: string }

export type ProductsByCategoryQuery = ProductsQuery & { category: string }
