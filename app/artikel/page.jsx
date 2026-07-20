'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Artikel() {
  const [showDetail, setShowDetail] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const detailRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (detailRef.current) {
        const winScroll = detailRef.current.scrollTop;
        const height = detailRef.current.scrollHeight - detailRef.current.clientHeight;
        const scrolled = (winScroll / height) * 100;
        setScrollProgress(scrolled);
      }
    };
    
    const detailEl = detailRef.current;
    if (detailEl) {
      detailEl.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (detailEl) {
        detailEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, [showDetail]);

  const openDetail = () => {
    setShowDetail(true);
    document.body.style.overflow = 'hidden';
    if (detailRef.current) {
      detailRef.current.scrollTo(0, 0);
    }
  };

  const closeDetail = () => {
    setShowDetail(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-mist-white text-fog-ink font-body-md overflow-x-hidden min-h-screen">
      
      {/* Reading Progress Bar (Visible on Detail) */}
      <div
        className={`fixed top-[72px] md:top-[64px] left-0 w-full h-[2px] z-[60] transition-opacity duration-300 ${
          showDetail ? 'opacity-100' : 'opacity-0'
        }`}
        id="progress-container"
      >
        <div
          className="h-full bg-berry-red"
          id="reading-progress"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-[120px] pb-12">
        {/* Header & Filter */}
        <section className="mb-16">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-8 text-fog-ink">
            Warta &amp; Inspirasi Desa
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-4">
              <button className="bg-mist-teal text-mist-white px-6 py-3 border border-mist-teal font-label-caps text-label-caps tracking-widest transition-all hover:bg-mist-teal/90">
                SEMUA
              </button>
              <button className="bg-transparent text-fog-ink px-6 py-3 border border-fog-grey font-label-caps text-label-caps tracking-widest transition-all hover:border-mist-teal">
                TATANÉN
              </button>
              <button className="bg-transparent text-fog-ink px-6 py-3 border border-fog-grey font-label-caps text-label-caps tracking-widest transition-all hover:border-mist-teal">
                ÉKONOMI
              </button>
              <button className="bg-transparent text-fog-ink px-6 py-3 border border-fog-grey font-label-caps text-label-caps tracking-widest transition-all hover:border-mist-teal">
                KABAR PAMONG
              </button>
            </div>
            <div className="relative w-full md:w-72 group">
              <input
                className="w-full bg-mist-white border border-fog-grey py-3 px-4 focus:ring-0 focus:border-mist-teal transition-colors placeholder:text-fog-grey/80"
                placeholder="Cari artikel..."
                type="text"
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-fog-grey group-focus-within:text-mist-teal">
                search
              </span>
            </div>
          </div>
        </section>

        {/* Highlight Artikel (Asymmetrical Grid Pattern A) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-24 items-center">
          <div className="md:col-span-7 relative group cursor-pointer" onClick={openDetail}>
            <div className="overflow-hidden border border-fog-grey p-1 bg-white">
              <img
                className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Coffee farmer in Desa Alamendah"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgbV9UDDVpA0ANI2ggElkOL0-_199TtgnfKG9RwqSbmXgfiFDcZ_TEN4dakIp1sJZgHKPnAv1570OgjNCgGkfJldk6Wl1L6E94yt7vFGy4oHYQ0a3Aj_V-yscztGZELKqKwURv4jEQgLAL-d1eGN6-lop4JQ3pjsd5SYfg4Xt9Y5YMTomPt-UJf4s5fmSLMImqRQWBSIyk1K73QdiTb_fl0-8JZj4YT23kaFOIAb6VHgT_FBm5bLU"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:-ml-12 z-10 bg-mist-white md:bg-transparent pt-6 md:pt-0">
            <div className="bg-white/80 backdrop-blur-sm p-8 border border-fog-grey md:shadow-none">
              <span className="text-berry-red font-label-caps text-label-caps mb-4 block tracking-widest">
                SOROTAN UTAMA
              </span>
              <h2 className="font-headline-md text-headline-md text-fog-ink mb-6 leading-tight">
                Melestarikan Tradisi Kopi di Kaki Gunung Tilu
              </h2>
              <p className="text-mist-teal italic font-headline-sm text-lg border-l-4 border-mist-teal pl-4 mb-6">
                "Kopi bukan hanya komoditas, melainkan detak jantung ekonomi dan budaya yang telah
                mendarah daging di tanah Alamendah."
              </p>
              <p className="text-on-surface-variant font-body-md mb-8">
                Menjelajahi bagaimana generasi muda Desa Alamendah kembali ke akar untuk
                mengembangkan agrowisata berbasis kopi berkelanjutan...
              </p>
              <button
                className="inline-flex items-center gap-2 group text-berry-red font-label-caps text-label-caps tracking-widest"
                onClick={openDetail}
              >
                BACA SELENGKAPNYA
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Indeks Artikel */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-12 border-b border-fog-grey pb-4">
            <h3 className="font-headline-sm text-headline-sm uppercase tracking-tighter">
              Indeks Terkini
            </h3>
            <span className="text-on-surface-variant/60 font-label-caps text-label-caps">
              18 ARTIKEL TERSEDIA
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1 */}
            <article className="group cursor-pointer">
              <div className="border border-fog-grey bg-white p-1 mb-6 cool-graded overflow-hidden">
                <img
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Irigasi Pintar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMMqDKUvlL8SOgxCcCBsn1h9hLA7gHbHOnKxBBN_tj4HBa5DHH9_ih_IZnsJviTHsI14ENjkdu6f9GJ0WrWR6rU43Mqo7n0EN4xoYuaZ47A2tcelgomxKGoDok19Cu6VcQ8pkjXbI35dgy3sHL-C6o_tirRv22yMOc5wB3qfuDKDV_IwwzSFP6DCk-XxHce89oRl4OlU8dPiWiqh6Y9HBBo2a-RtrIHfoJrxx_5CbZ4N4EuqX88zk"
                />
              </div>
              <span className="text-on-surface-variant/70 font-label-caps text-label-caps tracking-widest mb-2 block">
                TATANÉN — 12 OKT
              </span>
              <h4 className="font-headline-sm text-xl mb-4 group-hover:text-berry-red transition-colors">
                Inovasi Irigasi Pintar untuk Lahan Miring
              </h4>
              <p className="text-on-surface-variant font-body-md line-clamp-3">
                Penerapan teknologi IoT sederhana oleh kelompok tani muda Alamendah berhasil menghemat
                penggunaan air hingga 40%...
              </p>
            </article>

            {/* Card 2 */}
            <article className="group cursor-pointer">
              <div className="border border-fog-grey bg-white p-1 mb-6 cool-graded overflow-hidden">
                <img
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Digitalisasi Layanan"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlC2VoFPV1ScjXPOnLBoOkfX1iJnzAz12kmIezh3HaysbZJVd_eLLNyXapq1td9T-zPjNXSxCpbAqXIhzgTuSm6has5LiAycWvCF0uDhLA-GJAIgDleBOGu2GZlPMaCmP-bhBFc8Dh-gtxiesSuBabiJLd_IvQfHNiNinQZ6g-0bEyGFuVdRrYp5ItfgzDvF1uHmlKOka8Dlg-3k0XYx212ycr0w0eM4tV0RDXNu__EN-LCWyrONs"
                />
              </div>
              <span className="text-on-surface-variant/70 font-label-caps text-label-caps tracking-widest mb-2 block">
                KABAR PAMONG — 08 OKT
              </span>
              <h4 className="font-headline-sm text-xl mb-4 group-hover:text-berry-red transition-colors">
                Digitalisasi Layanan Administrasi Desa
              </h4>
              <p className="text-on-surface-variant font-body-md line-clamp-3">
                Kini warga dapat mengurus surat keterangan hanya melalui aplikasi pesan singkat,
                memangkas waktu birokrasi secara signifikan...
              </p>
            </article>

            {/* Card 5 */}
            <article className="group cursor-pointer">
              <div className="border border-fog-grey bg-white p-1 mb-6 cool-graded overflow-hidden">
                <img
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Kerajinan Bambu"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBojyCFWAC5u5ZHHIYXkXfRR3IuevRJxNHBjI4wuvam9Gq4FqHGOdIMD5kVX3EBpEbHzyL3E4uHI-LMUQjciYb97-nZoG49Rix8XvvEI0A4rEGbyhH7p9r1pk85I0Itdxo9rorqMf2LmJ_tYv80Sc_kxwm6GTr-wURdHbNms5NyORY_IT4HpVNuXtgIKvvzMpxIOoDTiFZGlouKGfgoQaxEuZJgUOorMclF6pxvmcDByb5VjDfsNPY"
                />
              </div>
              <span className="text-on-surface-variant/70 font-label-caps text-label-caps tracking-widest mb-2 block">
                ÉKONOMI — 01 OKT
              </span>
              <h4 className="font-headline-sm text-xl mb-4 group-hover:text-berry-red transition-colors">
                Kebangkitan Kerajinan Bambu Alamendah
              </h4>
              <p className="text-on-surface-variant font-body-md line-clamp-3">
                Sentuhan desain modern pada anyaman bambu tradisional mulai menembus pasar ekspor di
                Asia Tenggara dan Eropa...
              </p>
            </article>
          </div>
          <div className="mt-16 flex justify-center">
            <button className="bg-transparent border border-fog-grey text-fog-ink px-10 py-4 font-label-caps text-label-caps tracking-widest hover:border-berry-red hover:text-berry-red transition-all">
              LIHAT SEMUA INDEKS
            </button>
          </div>
        </section>
      </main>

      {/* Detail Section / Modal Simulated */}
      <div
        className={`fixed inset-0 z-[100] bg-mist-white overflow-y-auto ${
          showDetail ? 'block' : 'hidden'
        }`}
        id="article-detail"
        ref={detailRef}
      >
        <button
          className="fixed top-8 right-8 z-[110] bg-white border border-fog-grey w-12 h-12 flex items-center justify-center hover:text-berry-red transition-colors"
          onClick={closeDetail}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="w-full h-96 relative">
          <img
            className="w-full h-full object-cover grayscale-[10%]"
            alt="Misty mountain range"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgbV9UDDVpA0ANI2ggElkOL0-_199TtgnfKG9RwqSbmXgfiFDcZ_TEN4dakIp1sJZgHKPnAv1570OgjNCgGkfJldk6Wl1L6E94yt7vFGy4oHYQ0a3Aj_V-yscztGZELKqKwURv4jEQgLAL-d1eGN6-lop4JQ3pjsd5SYfg4Xt9Y5YMTomPt-UJf4s5fmSLMImqRQWBSIyk1K73QdiTb_fl0-8JZj4YT23kaFOIAb6VHgT_FBm5bLU"
          />
          <div className="absolute inset-0 bg-fog-ink/30"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-24 bg-gradient-to-t from-mist-white to-transparent">
            <div className="max-w-[680px] mx-auto">
              <span className="bg-berry-red text-white px-3 py-1 font-label-caps text-[10px] tracking-widest mb-4 inline-block">
                SOROTAN UTAMA
              </span>
              <h2 className="font-display-lg-mobile md:text-5xl font-bold text-fog-ink mb-2">
                Melestarikan Tradisi Kopi di Kaki Gunung Tilu
              </h2>
              <p className="font-label-caps text-on-surface-variant/60">
                OLEH REDAKSI ALAMENDAH • 14 OKT 2024
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 relative">
          {/* Sticky Shares */}
          <div className="hidden lg:flex flex-col gap-4 sticky top-32 float-left -ml-24">
            <button className="w-10 h-10 border border-fog-grey flex items-center justify-center hover:bg-mist-teal hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
            <button className="w-10 h-10 border border-fog-grey flex items-center justify-center hover:bg-mist-teal hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">bookmark</span>
            </button>
            <button className="w-10 h-10 border border-fog-grey flex items-center justify-center hover:bg-mist-teal hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">print</span>
            </button>
          </div>
          <article className="prose prose-slate max-w-[680px] mx-auto font-body-lg text-fog-ink">
            <p className="mb-8 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-mist-teal">
              Desa Alamendah, yang terletak di hamparan perbukitan sejuk Kabupaten Bandung, telah lama dikenal sebagai lumbung kopi berkualitas tinggi. Namun, tantangan perubahan iklim dan pergeseran minat generasi muda menjadi ancaman nyata bagi keberlangsungan tradisi ini.
            </p>
            <h3 className="font-headline-sm mb-6 mt-12">Filosofi 'Sabilulungan' dalam Bertani</h3>
            <p className="mb-6">
              Bagi para petani di Gunung Tilu, menanam kopi bukan sekadar aktivitas ekonomi. Ini adalah bentuk pengabdian terhadap alam. Dengan filosofi *Sabilulungan*, warga bekerja sama memastikan setiap butir ceri merah dipetik pada kematangan yang tepat, diproses dengan metode alami, dan dikemas dengan kebanggaan lokal.
            </p>
            <blockquote className="border-l-4 border-mist-teal pl-6 py-4 italic text-2xl font-headline-sm text-mist-teal my-12">
              "Tanah ini memberi kita kehidupan, maka kita berikan dedikasi terbaik kita kembali padanya lewat setiap pohon yang kita rawat."
            </blockquote>
            <p className="mb-6">
              Kini, Alamendah tidak hanya menjual biji kopi mentah. Melalui inisiatif Agro Desa, pengunjung dapat mengikuti tur panen, belajar teknik *roasting* tradisional, hingga mencicipi seduhan manual di tengah kebun yang berkabut. Langkah ini terbukti meningkatkan pendapatan petani hingga tiga kali lipat dibanding penjualan komoditas biasa.
            </p>
            <div className="my-16 border-y border-fog-grey py-8 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-mist-teal text-white flex items-center justify-center font-bold">
                  RA
                </div>
                <div>
                  <p className="font-bold text-sm">Redaksi Alamendah</p>
                  <p className="text-xs text-on-surface-variant/60">Tim Publikasi Digital Desa</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span
                  className="material-symbols-outlined text-berry-red"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
                <span className="font-label-caps text-xs">2.4k</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
