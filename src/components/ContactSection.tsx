'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ContactInfo } from '@/types/ContactInfo'
import Image from 'next/image'

export default function ContactSection() {
  const [contact, setContact] = useState<ContactInfo | null>(null)

  useEffect(() => {
    async function fetchContact() {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single()

      if (error) {
        console.error('Error al cargar contacto:', error)
      } else {
        setContact(data)
      }
    }

    fetchContact()
  }, [])

  if (!contact) return <p>Cargando información de contacto...</p>

  return (
    <section className="w-full bg-gray-100 py-12 px-6 mt-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Contacto</h2>

        <div className="space-y-3 text-base text-gray-800">
            <p><strong>Dirección:</strong> {contact.address}</p>
            <p>
            <strong>Teléfono:</strong>{' '}
            <a href={`tel:${contact.phone}`} className="text-black hover:text-red-500 transition">
                {contact.phone}
            </a>
            </p>
            <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${contact.email}`} className="text-black hover:text-red-500 transition">
                {contact.email}
            </a>
            </p>
        </div>
        </div>

        <div className="flex-1">
        <h3 className="text-2xl font-semibold mb-4 text-black">Redes Sociales</h3>
        <div className="flex flex-wrap gap-4">
            {contact.facebook_url && (
            <a href={contact.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Image src="/icons/social/facebook.png" alt="Facebook" width={36} height={36} />
            </a>
            )}
            {contact.instagram_url && (
            <a href={contact.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Image src="/icons/social/instagram.png" alt="Instagram" width={36} height={36} />
            </a>
            )}
            {contact.tiktok_url && (
            <a href={contact.tiktok_url} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <Image src="/icons/social/tiktok.png" alt="TikTok" width={36} height={36} />
            </a>
            )}
            {contact.twitter_url && (
            <a href={contact.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Image src="/icons/social/twitter.png" alt="Twitter" width={36} height={36} />
            </a>
            )}
        </div>
        </div>
    </div>
    </section>
  )
}
