'use client';
import Link from 'next/link';
import { use, useState, useEffect } from 'react';

export default function ProductDetail({ params }) {
  // Normally we would fetch data based on params.id
  // For now, we mock the data based on the ID.
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [quantity, setQuantity] = useState(1);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const detailSection = document.getElementById('product-info');
      if (detailSection) {
        const detailRect = detailSection.getBoundingClientRect();
        if (detailRect.bottom < window.innerHeight) {
          setShowStickyCta(true);
        } else {
          setShowStickyCta(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productData = {
    'kopi-arabika': {
      title: 'Kopi Arabika Highland Speciality',
      tag: 'PREMIUM HIGHLAND COFFEE',
      desc: 'Ditanam pada ketinggian 1.600 mdpl di lereng subur Desa Wisata Alamendah. Kopi ini menawarkan profil rasa yang unik dengan sentuhan floral, citrus, dan bodi yang lembut, diproses secara hati-hati oleh kelompok tani lokal untuk menjaga kualitas terbaik.',
      price: 85000,
      priceLabel: 'Rp 85.000 / 250g',
      stock: 24,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg32A0sL1z22eAIQBBjU1Y9ZvLgtCZsoWEXpWQM3iIU-sAWXSuBc3tPdx26ArTiQLETsap2FS0qFGYNTYHVLpBnIxZQXDxzzMRBKAydPFEpGNnaTk9damw6HIckkNKFfwyS2f1QObG0dbPfZqFdrvRoRxaWl7VvP5tFZOGciQF7SkyRp82L46KkerSEEzaWb_ICCeDFIbn_zyjOoQ2wBJY-9SAu082SBz-CxRH8TAzQEs0hD8kUV8',
    },
    'stroberi-fresh': {
      title: 'Stroberi Fresh Grade A',
      tag: 'FRESH HARVEST',
      desc: 'Stroberi segar dipetik langsung dari kebun warga. Rasanya manis, ukurannya besar, dan sangat cocok untuk dikonsumsi langsung atau dibuat jus.',
      price: 35000,
      priceLabel: 'Rp 35.000 / 500g',
      stock: 15,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTozdKs0H922WyGp0zwuOq50VWTdJW6A9X4qvoQH1QNJSnUqRntUBNAAfmFlv46sD3pAsq6qDNL8xL70xtr_Lm_cejEhLJsd7V8jebJKP6mHovKUHnYxR-nTm1OTrMqMRDDiweqG1t9RH3MzQ_Nv5vCYWjQahFD4HZdU2fYZ_7zt8gZHcmAXPv3CHinHgRka-Y8FszSh9nYyhSUL_ek4OT_xJbH9lP6m2DEpg22yKBWMvy-vV4Fvc',
    }
  };

  const product = productData[id] || productData['kopi-arabika'];

  const handleWhatsApp = () => {
    const message = `Halo, saya tertarik untuk membeli produk ${product.title} sebanyak ${quantity} paket. Apakah stoknya masih tersedia?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pt-[100px] pb-12">
      <main className="w-full max-w-max-width mx-auto px-margin-desktop">
        <Link href="/agro" className="inline-flex items-center gap-2 text-primary hover:text-error transition-colors mb-8 font-label-caps tracking-widest text-sm">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          KEMBALI KE KATALOG
        </Link>
        <section id="product-info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Sticky Gallery */}
            <div className="lg:sticky lg:top-32 h-fit space-y-6">
              <div className="aspect-[4/5] border border-outline-variant rounded-sharp overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt={product.title}
                  src={product.image}
                />
              </div>
            </div>

            {/* Description & Buying */}
            <div className="space-y-10">
              <div>
                <span className="font-label-caps text-label-caps text-primary mb-4 block">
                  {product.tag}
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                  {product.title}
                </h2>
                <h3 className="font-headline-sm text-2xl text-tertiary mb-6">{product.priceLabel}</h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {product.desc}
                </p>
              </div>
              
              <div className="bg-surface-container-low p-8 rounded-sharp border border-outline-variant">
                <h3 className="font-label-caps text-label-caps text-on-surface mb-6">
                  JUMLAH PESANAN
                </h3>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center border border-outline-variant rounded-sharp bg-white">
                    <button 
                      className="w-12 h-12 flex items-center justify-center hover:bg-surface-container-highest transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      className="w-12 h-12 flex items-center justify-center hover:bg-surface-container-highest transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <span className="text-secondary font-label-caps tracking-widest">
                    Total: Rp {(product.price * quantity).toLocaleString('id-ID')}
                  </span>
                </div>
                
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] text-white py-4 rounded-sharp font-label-caps text-label-caps uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-colors shadow-lg hover:shadow-xl"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-6 h-6 invert" />
                  Hubungi Penjual
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-outline-variant pb-4">
                  <span className="font-body-md text-on-surface-variant">Stok Unit:</span>
                  <span className="font-bold text-tertiary">{product.stock} Paket Tersedia</span>
                </div>
                <div className="flex items-center justify-between border-b border-outline-variant pb-4">
                  <span className="font-body-md text-on-surface-variant">Pengiriman:</span>
                  <span className="font-bold text-on-surface">Dikirim dari Alamendah</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Bottom CTA */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-outline-variant transition-transform duration-500 z-[60] ${
          showStickyCta ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-max-width mx-auto px-margin-desktop py-4 flex items-center justify-between gap-6">
          <div className="hidden md:block">
            <p className="font-label-caps text-on-surface-variant text-[10px]">TOTAL PESANAN ({quantity} Item)</p>
            <p className="font-headline-sm text-on-surface">Rp {(product.price * quantity).toLocaleString('id-ID')}</p>
          </div>
          <button 
            onClick={handleWhatsApp}
            className="flex-grow md:flex-grow-0 md:min-w-[300px] bg-[#25D366] text-white py-4 rounded-sharp font-label-caps text-label-caps uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-colors"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5 invert" />
            Hubungi Penjual
          </button>
        </div>
      </div>
    </div>
  );
}
