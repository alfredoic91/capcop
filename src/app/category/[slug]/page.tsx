import CapGrid from '@/components/CapGrid'
import ContactSection from '@/components/ContactSection'
import Header from '@/components/Header'

export default async function CategoriaPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-white text-black p-4">
      <section>
        <Header />
      </section>
      <section>
        <CapGrid categorySlug={params.slug} />
      </section>
      <section>
        <ContactSection />
      </section>
    </main>
  )
}