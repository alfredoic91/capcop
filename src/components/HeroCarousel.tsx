'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Carousel } from '@/types/Carousel' // Asegurate de que este archivo exista

export default function HeroCarousel() {
  const [carousel, setCarousel] = useState<Carousel[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 8000, stopOnInteraction: true })]
  )

  useEffect(() => {
    const fetchCarousel = async () => {
      const { data, error } = await supabase
        .from('carousel')
        .select('*')
        .eq('active', true)
        .order('item_order', { ascending: true })

      if (error) {
        console.error(error)
        return
      }
      else{
        console.log(data)
      }
      setCarousel(data as Carousel[])
    }

    fetchCarousel()
  }, [])

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl shadow-md" ref={emblaRef}>
        <div className="flex transition-transform duration-100 ease-in-out">
          {carousel.map((item) => (
            <div className="min-w-full relative" key={item.id}>
              <Image
                src={item.image_url}
                alt={item.title ?? 'Imagen del carrusel'}
                width={1200}
                height={500}
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
                priority
              />
              {(item.title || item.subtitle) && (
                <div className="absolute inset-0 bg-black/40 text-white p-4 flex flex-col justify-center items-center text-center">
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-sm">{item.subtitle}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
        <button
          onClick={scrollPrev}
          className="bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition"
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          onClick={scrollNext}
          className="bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition"
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>
    </div>
  )
}