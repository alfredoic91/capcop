export interface Cap {
  [x: string]: string | number | Date
  id: number
  name: string
  price: number
  description: string
  image: string
  category_id: string
  created_at: Date
}
