export interface Carousel {
  id: string
  title?: string
  subtitle?: string
  image_url: string
  link?: string | null
  order: number
  active: boolean
  created_at: Date
}
