import CapGrid from '@/components/CapGrid'
import CategorySection from '@/components/CategorySection'
import ContactSection from '@/components/ContactSection'
import Header from '@/components/Header'
import HeroCarousel from '@/components/HeroCarousel'
import TestimonialsSection from '@/components/Testimonials'

//1. Hero con carrusel de gorras destacadas
//2. Sección de categorías (si hay distintos estilos o tipos)
//3. Grid de productos (todas las gorras con imagen + precio + CTA)
//4. Testimonios / Reviews / Garantía
//5. Contacto o llamada a la acción final (botón de compra o WhatsApp)

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black p-4">
      <section>
        <Header />
      </section>
      <section>
        <HeroCarousel />
      </section>
      <section>
        <CategorySection />
      </section>
      <section>
        <CapGrid />
      </section>
      <section>
        <TestimonialsSection />
      </section>
      <section>
        <ContactSection />
      </section>
    </main>
)
}