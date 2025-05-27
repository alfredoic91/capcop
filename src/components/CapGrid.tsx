'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Cap } from '@/types/Cap'
import { CapGridProps } from '@/types/CapGridProps '

export default function CapGrid({ categorySlug }: CapGridProps) {
    const [caps, setCaps] = useState<Cap[]>([])
    const [selectedCap, setSelectedCap] = useState<Cap | null>(null)

    useEffect(() => {
        const fetchCaps = async () => {
        let categoryId: string | null = null

        if (categorySlug) {
            const { data: category, error: categoryError } = await supabase
                .from('categories')
                .select('id')
                .eq('slug', categorySlug)
                .single()

            if (categoryError) {
                console.error('Error cargando categoría:', categoryError)
                return
            }

            categoryId = category?.id
        }

        const query = supabase
        .from('caps')
        .select(`
            id, name, price, image, description,
            category:category_id (
            id, name, slug
            )
        `)

        if (categoryId) {
        query.eq('category_id', categoryId)
        }

        const { data, error } = await query

        if (error) {
        console.error('Error cargando gorras:', error)
        return
        }

        setCaps(data as unknown as Cap[])
    }

    fetchCaps()
    }, [categorySlug])


    return (
        <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
            {categorySlug ? `Gorras ${categorySlug}` : 'Todas las gorras'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {caps.map((cap) => (
            <div
                key={cap.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
                <Image
                src={cap.image}
                alt={cap.name}
                width={500}
                height={400}
                className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{cap.name}</h3>
                <p className="text-gray-600">${cap.price.toFixed(2)}</p>
                <button
                    onClick={() => setSelectedCap(cap)}
                    className="mt-2 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    Ver más
                </button>
                </div>
            </div>
            ))}
        </div>

        {/* MODAL */}
        {selectedCap && (
        <div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedCap(null)}
        >
            <div
            className="bg-white p-8 rounded-xl max-w-4xl w-full relative shadow-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            >
            <button
                onClick={() => setSelectedCap(null)}
                className="absolute top-4 right-4 text-3xl font-bold hover:text-red-600 transition"
                aria-label="Cerrar modal"
            >
                ×
            </button>

            <Image
                src={selectedCap.image}
                alt={selectedCap.name}
                width={800}
                height={600}
                className="w-full h-[600px] object-cover rounded-xl"
            />

            <h3 className="text-3xl font-bold mt-6">{selectedCap.name}</h3>
            <p className="text-xl text-gray-700 font-semibold">${selectedCap.price.toFixed(2)}</p>
            <p className="text-md text-gray-500 italic">{selectedCap.category?.name}</p>

            <p className="mt-4 text-gray-800 leading-relaxed">{selectedCap.description}</p>
            </div>
        </div>
        )}
        </section>
    )
}
