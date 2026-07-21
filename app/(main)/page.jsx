'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const products = [
    {
      title: 'Stroberi Alamendah',
      desc: 'Stroberi segar grade A kualitas ekspor yang dipetik langsung dari kebun warga di lereng gunung.',
      price: 'Rp 35.000 / kg',
      tag: 'Grade A Export Quality',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCuERzyT1UrpfU0KOuozcITZnld3aEwLqw3O5QzY_28jA3UaIsF9dQ4qjvd577ZEaJ-Y1TCL5KxsAFGUb31qJhPPIsLY5JXuj7tQ9G5Nyzkizlkk5C4K0Zfz1hL5JHm9TYLoFXJiY7HQjfy314I2zMZVum2s8xrCiny28-BY9yhCwwGjI0Y0VGKWdGgErhyEiT_sxlwmm3rwvAJjb3JJzvsUARltMjEAbf-CTVAw2bkb_jVN1xueg',
    },
    {
      title: 'Kopi Arabika',
      desc: 'Kopi Arabika asli pegunungan Alamendah dengan cita rasa khas yang diolah secara tradisional.',
      price: 'Rp 85.000 / 250g',
      tag: 'Heritage Highland Roast',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuq39ctTsHYhGSL-YQ9s09iArhLjUvtpvCOqSiC6Bpg86hVfoeU5NpPRYPrFH6k0m5imPrrFGdIKZOTR-CRkQuEz8XhFNY0DiPFxC7WL3wdyszJduOsq1hgwGtnlM8PLyzdOlzC-yORAOUVD3ZQvW3d1w6v_X0FvPxLhKQNlNdLLEh8Ua1jyheui7bNnIRlxS3ifq7XjoY4pEdt9xt4HlJ3DyQcQbt0N1fefssQ82SnGLfMo6E0Do',
    },
    {
      title: 'Susu Murni',
      desc: 'Susu sapi perah murni yang dihasilkan setiap pagi oleh peternak lokal Desa Alamendah.',
      price: 'Rp 22.000 / Liter',
      tag: 'Fresh Morning Harvest',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlAcWZLOdLK-KJPuSI1djhIZCas2kTXyr6mXneM-5bgH400aqXYN3NeuXgEHrz2EBNRXj-7X4wJzAkEKx7HcCub4cLsgHKKDA-7tAHGXdehkt40hVUiXQE5GWko9g300-cF5lmlhWN2LNqLeWxwgVPgI9fS5SjYyn13ZoRGWYoAaT7kcFH21EIbc-YUTzDiXXa1XkLa0HPc8TC4XLN6u_fs-6pCqly1zHG4mW4p9P2Prj9RV1UOiw',
    },
    {
      title: 'Sayuran Organik',
      desc: 'Sayuran segar bebas pestisida, ditanam dengan penuh cinta oleh petani lokal Alamendah.',
      price: 'Rp 15.000 / pack',
      tag: '100% Organik',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdGsAn5894_xuhhUPNRVvEdpZreidb3wms_eNCfIcz21ih-wXHVwvzZR6cP_Ed4YN-n7JrWzcB0HVLYOCcwtXkbvx-_dXBG2qP2vLJC8gwyV_h4gD7W1kJe_6Zlh8C1Mi22tR2_sE0hQTm5gO4eI2v_XnkytUiHBWmCr8ex02jxrmI_yECrVhlKD4o6AJ7fTpBAjx0Xs2JUXWbPrwCgai8C6OJna1RyBxfdk8Ipwco21YgLsbD4_0',
    }
  ];

  // Tripled list for infinite scrolling
  const displayProducts = [...products, ...products, ...products];
  const [activeProduct, setActiveProduct] = useState(products.length + 1); // Start at 5 (index 1 of the middle set)
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextProduct = () => {
    setTransitionEnabled(true);
    setActiveProduct((prev) => prev + 1);
  };

  const prevProduct = () => {
    setTransitionEnabled(true);
    setActiveProduct((prev) => prev - 1);
  };

  useEffect(() => {
    // Jump when reaching outer limits to simulate infinite loop
    if (activeProduct >= products.length * 2) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveProduct(activeProduct - products.length);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (activeProduct < products.length) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveProduct(activeProduct + products.length);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeProduct, products.length]);

  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  return (
    <main>
      {/* 1. Hero Section */}
      <header className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#D4DAD8]">
          <div
            className="w-full h-full bg-cover bg-center editorial-filter"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjNG2Uxc3462TjWB5sRkRjK95lc8vlSj_vMcyP2pA5krg1NZB_8wvqF1trgWtNHb5KdVwKf0Sg49NXE8c79OmMGSE-kT4LX0JGJAU--snL6xAVwQeIXznQyi3Eew6iyunaDn-6HdU4hsOz5EEkB4PE9yP9OKiWXpf72oUJBdNqMOkZzsWs7ZNpIfP-m_SOAKQMyKru2n688_oe_q122K3IgBvQxw67k4yG2c-TnLKOIDAzzIXj3wo')",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 alpine-gradient"></div>
        </div>
        <div className="relative z-10 px-margin-desktop max-w-[900px]">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8">
            Wilujeng Sumping di Alamendah
          </h1>
          <button className="px-10 py-4 border border-on-surface text-on-surface font-label-caps tracking-[0.2em] uppercase hover:bg-error hover:text-white hover:border-error transition-all duration-500 rounded-[2px]">
            Jelajahi Desa
          </button>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-label-caps text-on-surface uppercase tracking-widest text-[10px]">
            Scroll Down
          </span>
          <span className="material-symbols-outlined animate-bounce">expand_more</span>
        </div>
      </header>

      {/* 2. Overlapping Intro */}
      <section className="relative z-20 mt-16 px-margin-desktop max-w-max-width mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
          <div className="md:col-span-6 relative group">
            <div className="aspect-[4/5] overflow-hidden border border-[#D4DAD8]">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-1000 editorial-filter"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZKgEmucAKp-GXgzQPzYA2S1fXJF5nff_E5rGYPY11wcPnaEF6PCaHOgRZSHOx1FkFCH8mVWcjvdlmCQ7EkvJi2oHuYq2_Qu7ESe_UHwGAEsK6Q483GsMOx3aj_k3ctREx423flUNX-wVGf2X68RPg8a4Uim74Ng2IdZt9SIWI5yAfMFqMVfjY4XgZwlwsGVP7xptIZlxlzwgUwlGSeU1V1nRkWA1g95EheGCmzFAPAiFwT2njX_4')",
                }}
              ></div>
            </div>
            {/* Caption card overlap */}
            <div className="absolute -bottom-8 -right-8 bg-white border border-[#D4DAD8] p-8 max-w-xs transition-all-custom">
              <span className="font-label-caps text-tertiary uppercase tracking-widest text-[11px] mb-2 block">
                Pesan Kepala Desa
              </span>
              <p className="font-body-md text-on-surface italic text-lg leading-relaxed">
                "Alamendah bukan sekadar tempat tinggal, melainkan warisan luhur yang kami jaga
                dengan penuh cinta dan inovasi."
              </p>
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8 pb-12 mt-16 md:mt-0">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
              Harmoni Alam &amp; Tradisi
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mb-8 leading-relaxed">
              Terletak di ketinggian pegunungan Bandung Selatan, Desa Alamendah menyuguhkan kesegaran
              udara pegunungan yang berpadu dengan kearifan lokal masyarakatnya. Sebagai destinasi
              agrowisata unggulan, kami mengundang Anda merasakan kehangatan keramah-tamahan warga
              kami.
            </p>
            <Link
              href="/wisata"
              className="inline-flex items-center gap-4 text-primary font-bold group"
            >
              <span className="font-label-caps tracking-widest uppercase">Selengkapnya</span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Pamong Desa */}
      <section className="bg-[#F1FBFD] py-32 px-margin-desktop border-y border-[#D4DAD8]">
        <div className="max-w-max-width mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-label-caps text-tertiary uppercase tracking-widest mb-4 block">
                Pelayanan Publik
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Pamong Desa</h2>
            </div>
            <div className="hidden md:block h-px bg-[#D4DAD8] flex-1 mx-12 mb-4"></div>
            <span className="font-body-md text-secondary">Amanah &amp; Melayani</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Kades */}
            <div className="md:col-span-7 bg-white border border-[#D4DAD8] p-4 hover:scale-[1.02] transition-all-custom group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden mb-8">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 editorial-filter"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAi6YtbviykogiLoh5C0lMigKosBnEfuonMh8II7OCvRHKwMLIFC0l2hYYkAsLOmfe1AS1ZEX_N27rZoYw5Fywu87qrV2148gsFy1m--DGbXVq2eGIqDlm1xjsPqCisllJfqNWYMzGDjcFNntlG_zLdzHzo5XChvII4oJJJl-2SzeD31AhuVbl-0dbAadJbZjT29YKb7gcwc2Iw38GHVB68Lst0RMaAUpnoKXYhxPjsnY-TdS3eKrQ')",
                  }}
                ></div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="font-headline-sm text-headline-sm mb-1">H. Awan Rukmawan</h3>
                <p className="font-label-caps text-secondary uppercase tracking-widest text-[11px]">
                  Kepala Desa Alamendah
                </p>
              </div>
            </div>
            {/* Sekdes + BPD */}
            <div className="md:col-span-5 flex flex-col gap-gutter">
              <div className="flex-1 bg-white border border-[#D4DAD8] p-4 flex gap-6 items-center hover:scale-[1.02] transition-all-custom cursor-pointer">
                <div className="w-1/3 aspect-square overflow-hidden bg-[#D4DAD8]">
                  <div
                    className="w-full h-full bg-cover bg-center editorial-filter"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSyR_mXZfdQAPdg9ZDpMjXs3Q3FDzvgI4pLaaAmRaSuerOqT9UNy0e9pfbXa3vE9Q-5ybMg4FT-lGGLsnF4qAFQITOePZQLuptHyAKnv_cJL4hfvCXzCCU5FSsV1rdaOS_08MfU4YwE7edqtheObOEA6seCIQb_-baJp4Utk1_lT8R3Sv079cmynVPlNWZKn4hUym8SUMw5VQjW7QrB3nlwpkseKu2Y6mUohtgUPf8J1CHXcTth0M')",
                    }}
                  ></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1">Deny Rusmayadi</h4>
                  <p className="font-label-caps text-secondary uppercase tracking-widest text-[10px]">
                    Sekretaris Desa
                  </p>
                </div>
              </div>
              <div className="flex-1 bg-white border border-[#D4DAD8] p-4 flex gap-6 items-center hover:scale-[1.02] transition-all-custom cursor-pointer">
                <div className="w-1/3 aspect-square overflow-hidden bg-[#D4DAD8]">
                  <div
                    className="w-full h-full bg-cover bg-center editorial-filter"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzxb5m40jEdPC9FQNT50h3pnSLkl3IRIea9X_JdWzQ0RPm92nLqVeFBS86WBsrdBfbKQpSFb5S-2bIxSXUwDL5KYhUgXbgzXHf44jadwRkTnKrdSeWs9i7rLDbvBXk4acb25LYk7keqzy52ycIZFknoTsUTlIpxVPFRecs9g5Sqpsl9-dABCBcS4E3f7NYxL6st2j8Z7VmwPD3iozBB1H6E-mv-84Jhm3xV-4OcUQ93yczYt3MRFU')",
                    }}
                  ></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1">Maman Sulaeman</h4>
                  <p className="font-label-caps text-secondary uppercase tracking-widest text-[10px]">
                    Ketua BPD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Karya ti Alamendah (Center‑Focused Carousel) */}
      <section className="py-32 bg-[#F0F3F2]">
        {/* Section header */}
        <div className="max-w-max-width mx-auto px-margin-desktop mb-16 flex items-center justify-center">
          <h2 className="font-headline-md text-headline-md text-[#1B2426]">Karya ti Alamendah</h2>
        </div>

        {/* Responsive carousel parameters */}
        {(() => {
          const isMobile = windowWidth < 768;
          const cardWidth = isMobile ? Math.min(windowWidth - 32, 480) : 480;
          const gap = isMobile ? 0 : 24;
          const step = cardWidth + gap;
          const offset = cardWidth / 2;

          return (
            <div className="relative w-full overflow-hidden">
              <div
                className={`flex items-start transition-transform duration-700 ease-out will-change-transform`}
                style={{
                  gap: `${gap}px`,
                  transform: `translateX(calc(50vw - ${offset}px - ${activeProduct} * ${step}px))`,
                }}
              >
                {displayProducts.map((product, idx) => {
                  const isActive = activeProduct === idx;
                  return (
                    <div
                      key={idx}
                      className="flex-shrink-0 transition-all duration-700 ease-out cursor-pointer"
                      style={{
                        width: `${cardWidth}px`,
                        transform: isActive ? 'scale(1)' : 'scale(0.87)',
                        opacity: isActive ? 1 : (isMobile ? 0 : 0.5),
                        pointerEvents: isActive ? 'auto' : (isMobile ? 'none' : 'auto'),
                      }}
                      onClick={() => setActiveProduct(idx)}
                    >
                      {/* Polaroid Frame Container (wrapped/styled with bg-white & border only when active) */}
                      <div className={`w-full transition-all duration-700 ease-out ${isActive ? 'bg-white p-4 pb-8 border border-[#D4DAD8] shadow-sm' : 'bg-transparent p-0 border-transparent shadow-none'}`}>
                        {/* Image inside polaroid border */}
                        <div className={`w-full aspect-square overflow-hidden transition-all duration-700 ${isActive ? 'border border-[#D4DAD8]/60' : 'border-transparent'}`}>
                          <img
                            src={product.img}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            style={{
                              filter: isActive
                                ? 'none'
                                : 'grayscale(20%) brightness(0.95)',
                              transition: 'filter 0.7s ease-out',
                            }}
                          />
                        </div>

                        {/* Polaroid Bottom & Info Panel (only visible/height-expanded for active card) */}
                        <div
                          className="overflow-hidden transition-all duration-700 ease-out"
                          style={{
                            maxHeight: isActive ? '450px' : '0px',
                            opacity: isActive ? 1 : 0,
                          }}
                        >
                          {/* Polaroid label */}
                          <div className="text-center mt-4 mb-4 border-b border-[#D4DAD8]/45 pb-4">
                            <span className="font-serif italic text-xs text-[#1B2426]/50">
                              Desa Wisata Alamendah
                            </span>
                          </div>

                          {/* Info panel contents */}
                          <div className="pt-2 pb-2 text-left">
                            <span className="text-[#6F8F5E] text-[11px] uppercase font-bold tracking-widest block mb-2">
                              {product.tag}
                            </span>
                            <h3 className="font-serif text-[#1B2426] text-2xl font-bold mb-2 leading-snug">
                              {product.title}
                            </h3>
                            <p className="text-[#1B2426]/70 text-sm leading-relaxed mb-3">
                              {product.desc}
                            </p>
                            <p className="text-[#1B2426] font-bold text-lg mb-5">{product.price}</p>
                            <button
                              className="bg-[#B23A3A] text-[#F0F3F2] px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-[2px] hover:opacity-90 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Hubungi Penjual
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Navigation row — centred below slider */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            className="w-11 h-11 flex items-center justify-center border border-[#D4DAD8] text-[#1B2426] rounded-[2px] hover:bg-[#B23A3A] hover:text-[#F0F3F2] hover:border-[#B23A3A] transition-colors"
            onClick={prevProduct}
            aria-label="Previous"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTransitionEnabled(true);
                  setActiveProduct(products.length + idx);
                }}
                style={{
                  width: (activeProduct % products.length) === idx ? '20px' : '8px',
                  height: '8px',
                  background: (activeProduct % products.length) === idx ? '#B23A3A' : '#D4DAD8',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            className="w-11 h-11 flex items-center justify-center border border-[#D4DAD8] text-[#1B2426] rounded-[2px] hover:bg-[#B23A3A] hover:text-[#F0F3F2] hover:border-[#B23A3A] transition-colors"
            onClick={nextProduct}
            aria-label="Next"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>

      {/* 5. Warta Desa */}
      <section className="py-32 px-margin-desktop max-w-max-width mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-20">
          <div className="md:col-span-4">
            <h2 className="font-headline-md text-headline-md leading-tight">
              Kabar Desa Paling Anyar
            </h2>
            <p className="font-body-md text-secondary mt-6">
              Berita terkini seputar pembangunan, prestasi, dan kegiatan masyarakat Desa Alamendah.
            </p>
            <div className="mt-8">
              <Link href="/artikel">
                <button className="px-8 py-3 bg-primary text-white font-label-caps tracking-widest uppercase hover:bg-error transition-all duration-300">
                  Semua Berita
                </button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col border-t border-[#D4DAD8]">
            <article className="flex items-start gap-12 py-10 border-b border-[#D4DAD8] group cursor-pointer transition-all duration-300 hover:pl-6 border-l-0 hover:border-l-[4px] hover:border-l-error">
              <div className="hidden md:block">
                <span className="font-display-lg text-4xl block text-primary group-hover:text-error transition-colors">
                  12
                </span>
                <span className="font-label-caps uppercase text-secondary tracking-widest">Okt</span>
              </div>
              <div>
                <span className="font-label-caps text-tertiary uppercase tracking-widest text-[10px] mb-2 block">
                  Pembangunan
                </span>
                <h3 className="font-headline-sm text-2xl mb-3 group-hover:text-primary transition-colors">
                  Peresmian Jembatan Gantung Wisata Curug Awi Seuhah
                </h3>
                <p className="font-body-md text-secondary line-clamp-2">
                  Infrastruktur pendukung wisata baru ini diharapkan mampu meningkatkan kunjungan
                  wisatawan hingga 40% pada akhir tahun ini...
                </p>
              </div>
            </article>
            <article className="flex items-start gap-12 py-10 border-b border-[#D4DAD8] group cursor-pointer transition-all duration-300 hover:pl-6 border-l-0 hover:border-l-[4px] hover:border-l-error">
              <div className="hidden md:block">
                <span className="font-display-lg text-4xl block text-primary group-hover:text-error transition-colors">
                  08
                </span>
                <span className="font-label-caps uppercase text-secondary tracking-widest">Okt</span>
              </div>
              <div>
                <span className="font-label-caps text-tertiary uppercase tracking-widest text-[10px] mb-2 block">
                  Ekonomi
                </span>
                <h3 className="font-headline-sm text-2xl mb-3 group-hover:text-primary transition-colors">
                  BUMDes Alamendah Raih Penghargaan Desa Mandiri Nasional
                </h3>
                <p className="font-body-md text-secondary line-clamp-2">
                  Prestasi ini diraih atas keberhasilan dalam mengelola unit usaha pengolahan kopi dan
                  agrowisata secara berkelanjutan...
                </p>
              </div>
            </article>
            <article className="flex items-start gap-12 py-10 border-b border-[#D4DAD8] group cursor-pointer transition-all duration-300 hover:pl-6 border-l-0 hover:border-l-[4px] hover:border-l-error">
              <div className="hidden md:block">
                <span className="font-display-lg text-4xl block text-primary group-hover:text-error transition-colors">
                  05
                </span>
                <span className="font-label-caps uppercase text-secondary tracking-widest">Okt</span>
              </div>
              <div>
                <span className="font-label-caps text-tertiary uppercase tracking-widest text-[10px] mb-2 block">
                  Lingkungan
                </span>
                <h3 className="font-headline-sm text-2xl mb-3 group-hover:text-primary transition-colors">
                  Gerakan Tanam Seribu Pohon Endemik di Lereng Pegunungan
                </h3>
                <p className="font-body-md text-secondary line-clamp-2">
                  Menjaga resapan air dan kelestarian ekosistem hutan lindung di sekitar wilayah
                  administratif Desa Alamendah...
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 6. Map Block */}
      <section className="w-full px-margin-desktop max-w-max-width mx-auto mb-32">
        <div className="mb-10 text-center">
          <h2 className="font-headline-md text-3xl mb-4 text-on-surface">Kunjungi Desa Kami</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Temukan lokasi Desa Wisata Alamendah melalui peta interaktif di bawah ini. Kami siap menyambut kedatangan Anda dengan kehangatan warga lokal dan pesona alam yang asri.
          </p>
        </div>
        <div className="border border-[#D4DAD8] p-4 bg-white relative shadow-sm">
          <div className="w-full aspect-[21/9] bg-[#E6F0F2] relative overflow-hidden group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15078.567045193733!2d107.426404901068!3d-7.1256106990206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e688bce5daa2ed1%3A0x8255c337130666d2!2sRancabali%2C%20Alamendah%2C%20Kec.%20Rancabali%2C%20Kabupaten%20Bandung%2C%20Jawa%20Barat!5e1!3m2!1sid!2sid!4v1784535871874!5m2!1sid!2sid" 
              className="w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
