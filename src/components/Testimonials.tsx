'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Testimonial } from '@/types/Testimonial'

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error al cargar testimonios:', error)
        return
      }

      setTestimonials(data as Testimonial[])
    }

    fetchTestimonials()
  }, [])

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3)

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonios</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-700 italic mb-4">&quot;{t.message}&quot;</p>
              <p className="font-semibold">{t.name}</p>
              {t.role && <p className="text-sm text-gray-500">{t.role}</p>}
            </div>
          ))}
        </div>

        {testimonials.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
            >
              {showAll ? 'Ver menos' : 'Ver más'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
