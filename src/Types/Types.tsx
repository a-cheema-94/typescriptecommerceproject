export type RatingType = {
  rate: number
  count: number
}

export type ProductItem = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: RatingType
}