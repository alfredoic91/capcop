export interface Category {
  id: string
  name: string
  slug: string
}

export interface Cap {
  id: number
  name: string
  price: number
  description: string
  image: string
  category_id: string
  created_at: Date
  category?: Category  // Esto debe ser un objeto con esas propiedades
}
