import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1F2E33] text-[#F0F3F2] relative overflow-hidden">
      {/* Bamboo Weave Pattern Overly (6% Opacity) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/bamboo-weave.png')",
        }}
      ></div>
      <div className="relative z-10 max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-24">
        <div className="col-span-1 md:col-span-1">
          <h2 className="font-headline-md text-[#F0F3F2] font-bold mb-6">Alamendah</h2>
          <p className="font-body-md text-[#F0F3F2]/60 mb-8 leading-relaxed">
            Heritage of the Highlands. Desa Agrowisata unggulan dengan kearifan lokal yang mendunia.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-sm">public</span>
            </Link>
            <Link href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-sm">share</span>
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-label-caps uppercase tracking-widest mb-8 text-white">Navigasi</h4>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="text-[#F0F3F2]/80 hover:text-white transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/wisata" className="text-[#F0F3F2]/80 hover:text-white transition-colors">
                Wisata
              </Link>
            </li>
            <li>
              <Link href="/webgis" className="text-[#F0F3F2]/80 hover:text-white transition-colors">
                WebGIS
              </Link>
            </li>
            <li>
              <Link href="/artikel" className="text-[#F0F3F2]/80 hover:text-white transition-colors">
                Artikel
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-caps uppercase tracking-widest mb-8 text-white">Layanan</h4>
          <ul className="space-y-4">
            <li>
              <Link href="/kesehatan" className="text-[#F0F3F2]/80 hover:text-white transition-colors">
                Kesehatan
              </Link>
            </li>
            <li>
              <Link href="/agro" className="text-[#F0F3F2]/80 hover:text-white transition-colors">
                Agro Bisnis
              </Link>
            </li>
            <li>
              <Link href="#" className="text-[#F0F3F2]/80 hover:text-white transition-colors">
                Pemerintahan
              </Link>
            </li>
            <li>
              <Link href="#" className="text-[#F0F3F2]/80 hover:text-white transition-colors">
                Pengaduan
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-caps uppercase tracking-widest mb-8 text-white">Kontak</h4>
          <p className="text-[#F0F3F2]/60 mb-4 leading-relaxed">
            Jl. Raya Ciwidey - Patengan No. 456, Desa Alamendah, Kec. Rancabali, Kab. Bandung
          </p>
          <p className="text-white font-bold mb-2">info@desa-alamendah.id</p>
          <p className="text-white font-bold">(022) 123-4567</p>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10 py-10 px-margin-desktop max-w-max-width mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-label-caps text-[#F0F3F2]/40 text-[10px] tracking-[0.2em] uppercase">
          © 2024 Desa Alamendah. Heritage of the Highlands.
        </p>
        <div className="flex gap-12">
          <Link href="#" className="font-label-caps text-[#F0F3F2]/40 hover:text-white text-[10px] tracking-[0.2em] uppercase transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="font-label-caps text-[#F0F3F2]/40 hover:text-white text-[10px] tracking-[0.2em] uppercase transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
