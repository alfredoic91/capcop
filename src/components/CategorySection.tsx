'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
  slug: string
  image: string
}

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*')
      if (error) {
        console.error('Error al cargar categorías:', error)
        return
      }
      setCategories(data as Category[])
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (slug: string) => {
    router.push(`/category/${slug}`)
  }

  return (
    <section className="py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Categorías</h2>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-7xl">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            className="flex flex-col items-center bg-white rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer px-4 py-2 text-sm md:text-base w-[100px] h-[100px] md:w-60 md:h-auto md:rounded-xl md:overflow-hidden"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={60}
              height={60}
              className="w-12 h-12 object-cover rounded-full md:w-full md:h-32 md:rounded-none"
            />
            <span className="mt-2 md:mt-4 font-medium text-center">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
