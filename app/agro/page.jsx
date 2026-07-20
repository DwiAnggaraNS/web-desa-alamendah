import Link from 'next/link';

export default function AgroShowcase() {
  const products = [
    {
      id: 'kopi-arabika',
      title: 'Kopi Arabika Highland',
      price: 'Rp 85.000 / 250g',
      category: 'Kopi',
      stock: 'Tersedia',
      desc: 'Kopi arabika spesial dari ketinggian pegunungan Alamendah dengan citarasa asam manis buah yang khas.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPVulUC-f6ZFMLOY4o4ShBuXV71N5DDw67Mgm4zrD-DtLfgaBxIJmef7BlIvn90wda4fSjwl6YswN9ojAIhBJ6SFRcO6ga-DwdVmqhdErcC5NrEOhwaDseCMQBXh7d1jNB2xNF86POHT62nwAD7APL5pQQK2H0mCsUUWE4tFgVcV6tY61rv2ZAuUQuA4Q0C4e-p5O0PHhhm34vCmILNQUsWzQuWfplZaJQuLY0ZWlgwOcwMQRdlTQ',
    },
    {
      id: 'stroberi-fresh',
      title: 'Stroberi Fresh Grade A',
      price: 'Rp 35.000 / 500g',
      category: 'Buah',
      stock: 'Tersedia',
      desc: 'Stroberi segar dipetik langsung pagi hari dari kebun holtikultura masyarakat lokal.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTozdKs0H922WyGp0zwuOq50VWTdJW6A9X4qvoQH1QNJSnUqRntUBNAAfmFlv46sD3pAsq6qDNL8xL70xtr_Lm_cejEhLJsd7V8jebJKP6mHovKUHnYxR-nTm1OTrMqMRDDiweqG1t9RH3MzQ_Nv5vCYWjQahFD4HZdU2fYZ_7zt8gZHcmAXPv3CHinHgRka-Y8FszSh9nYyhSUL_ek4OT_xJbH9lP6m2DEpg22yKBWMvy-vV4Fvc',
    },
    {
      id: 'susu-murni',
      title: 'Susu Murni Highland',
      price: 'Rp 22.000 / Liter',
      category: 'Susu',
      stock: 'Tersedia',
      desc: 'Susu segar steril dari peternakan sapi perah koperasi desa Alamendah yang higienis.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZbupHjM9aLeVic7gE-1IyiJlnPvnHpfMBLAOT0fCkmASfF8WyvB0phy2fJVLVUaSEoFyybLQTdNmRDMJ2uVOsXFjmloEONMbPTPQcutVSuGM4J1_PJpJUjzuvPmb4JlCOfifArbSf06lbr_CzsgAmA_4lDgVIt-eVNmG5uPnwpPGS1LK4-ujJ4szm0d6iIoMxuq6SwZPIeLQnoiQjTFugl4hOlD8Gpi0jqDg2WW8IrPrepc8xMVc',
    },
    {
      id: 'wortel-organik',
      title: 'Wortel Organik',
      price: 'Rp 12.000 / kg',
      category: 'Sayur',
      stock: 'Habis',
      desc: 'Wortel segar kaya vitamin A ditanam tanpa pupuk kimia berbahaya di tanah vulkanik subur.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdGsAn5894_xuhhUPNRVvEdpZreidb3wms_eNCfIcz21ih-wXHVwvzZR6cP_Ed4YN-n7JrWzcB0HVLYOCcwtXkbvx-_dXBG2qP2vLJC8gwyV_h4gD7W1kJe_6Zlh8C1Mi22tR2_sE0hQTm5gO4eI2v_XnkytUiHBWmCr8ex02jxrmI_yECrVhlKD4o6AJ7fTpBAjx0Xs2JUXWbPrwCgai8C6OJna1RyBxfdk8Ipwco21YgLsbD4_0',
    }
  ];

  return (
    <div className="bg-[#F0F3F2] text-[#1B2426] font-body-md overflow-x-hidden min-h-screen">
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-[120px] pb-12">
        {/* Header & Filter */}
        <section className="mb-16">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-8 text-[#1B2426]">
            Agro &amp; UMKM Alamendah
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#5E7A78] text-[#F0F3F2] px-6 py-3 border border-[#5E7A78] font-label-caps text-label-caps tracking-widest transition-all hover:bg-[#5E7A78]/90">
                SEMUA
              </button>
              <button className="bg-transparent text-[#1B2426] px-6 py-3 border border-[#D4DAD8] font-label-caps text-label-caps tracking-widest transition-all hover:border-[#5E7A78]">
                KOPI
              </button>
              <button className="bg-transparent text-[#1B2426] px-6 py-3 border border-[#D4DAD8] font-label-caps text-label-caps tracking-widest transition-all hover:border-[#5E7A78]">
                BUAH &amp; SAYUR
              </button>
              <button className="bg-transparent text-[#1B2426] px-6 py-3 border border-[#D4DAD8] font-label-caps text-label-caps tracking-widest transition-all hover:border-[#5E7A78]">
                TERNAK
              </button>
            </div>
            <div className="relative w-full md:w-72 group">
              <input
                className="w-full bg-[#F0F3F2] border border-[#D4DAD8] py-3 px-4 focus:ring-0 focus:border-[#5E7A78] transition-colors placeholder:text-[#D4DAD8]/80"
                placeholder="Cari produk..."
                type="text"
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#D4DAD8] group-focus-within:text-[#5E7A78]">
                search
              </span>
            </div>
          </div>
        </section>

        {/* Indeks Produk (Grid style like Artikel) */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-12 border-b border-[#D4DAD8] pb-4">
            <h3 className="font-headline-sm text-headline-sm uppercase tracking-tighter">
              Indeks Produk Lokal
            </h3>
            <span className="text-[#1B2426]/60 font-label-caps text-label-caps">
              {products.length} PRODUK TERSEDIA
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {products.map((product) => (
              <Link key={product.id} href={`/agro/${product.id}`} className="group cursor-pointer">
                <div>
                  <div className="border border-[#D4DAD8] bg-white p-1 mb-6 overflow-hidden relative">
                    <img
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={product.title}
                      src={product.image}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border bg-white ${product.stock === 'Tersedia' ? 'text-[#6F8F5E] border-[#6F8F5E]' : 'text-[#B23A3A] border-[#B23A3A]'}`}>
                        {product.stock}
                      </span>
                    </div>
                  </div>
                  <span className="text-[#1B2426]/70 font-label-caps text-label-caps tracking-widest mb-2 block">
                    {product.category.toUpperCase()} — {product.price}
                  </span>
                  <h4 className="font-headline-sm text-xl mb-4 group-hover:text-[#B23A3A] transition-colors">
                    {product.title}
                  </h4>
                  <p className="text-[#1B2426]/75 font-body-md line-clamp-3 leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Koperasi/Mitra Section */}
        <div className="mt-32 border-t border-[#D4DAD8] pt-16 flex flex-col items-center text-center">
          <p className="text-[#5E7A78] font-bold text-[11px] uppercase tracking-widest mb-4">Ingin Menjadi Mitra?</p>
          <h3 className="text-3xl md:text-4xl text-[#1B2426] font-bold mb-8">Dukung Pertanian Lokal Alamendah</h3>
          <button className="bg-[#1F2E33] text-white px-8 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#5E7A78] transition-colors">
            Hubungi Koperasi Desa
          </button>
        </div>
      </main>
    </div>
  );
}
