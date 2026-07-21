'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Kesehatan() {
  const [odometerValue, setOdometerValue] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    // Intersection Observer for Odometer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateOdometer(22000);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    const odometerEl = document.getElementById('odometer-container');
    if (odometerEl) {
      observer.observe(odometerEl);
    }
    
    return () => {
      if (odometerEl) observer.unobserve(odometerEl);
    };
  }, []);

  const animateOdometer = (target) => {
    let current = 0;
    const increment = Math.ceil(target / 100);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setOdometerValue(target);
        clearInterval(timer);
      } else {
        setOdometerValue(current);
      }
    }, 20);
  };

  return (
    <div className="bg-mist-white text-fog-ink font-body-md min-h-screen">
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-[120px] pb-16">
        {/* Section 1: Data Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-24">
          <div
            id="odometer-container"
            className="lg:col-span-8 relative h-[500px] overflow-hidden editorial-border"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvY5buZBYccs2w4GtfKq4rxSet0QTK866u6PRWblok9KsWRpBNLs_NBlfqZDGYb6v4ZGuDLWvCo02QdXd63sbD1HrU2ozPv1sKLW3ocUCap6YzKg7cDHgkBsMy15368FJlstGvc1pr5lsychqe5JprMrFmjrfDSMj72yvf-GTKRzyXGscVs-zkrbVrB7bQGyn-8sHPzI4DKumHRJmBO6tu9Vhq0cvhcWTHfZPtm6vh5g0dSeeqiVI')",
              }}
            ></div>
            <div className="absolute inset-0 misty-overlay flex flex-col justify-end p-12">
              <h2 className="text-white font-display-lg text-display-lg-mobile md:text-display-lg">
                {odometerValue === 22000 ? '22,000+' : odometerValue.toLocaleString()}
              </h2>
              <p className="text-white font-headline-sm text-headline-sm opacity-90 uppercase tracking-widest">
                Jiwa Terlayani
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 bg-fog-navy p-10 flex flex-col justify-center text-mist-white editorial-border">
            <div className="mb-10">
              <p className="font-label-caps text-label-caps text-mist-teal mb-2">TINGKAT STUNTING</p>
              <h3 className="font-headline-md text-headline-md">4.2%</h3>
              <div className="w-full h-1 bg-white/10 mt-2">
                <div className="h-full bg-moss-green" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div className="mb-10">
              <p className="font-label-caps text-label-caps text-mist-teal mb-2">VAKSINASI DASAR</p>
              <h3 className="font-headline-md text-headline-md">98.5%</h3>
              <div className="w-full h-1 bg-white/10 mt-2">
                <div className="h-full bg-mist-teal" style={{ width: '98.5%' }}></div>
              </div>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-mist-teal mb-2">
                FASILITAS KESEHATAN
              </p>
              <h3 className="font-headline-md text-headline-md">12 Unit</h3>
              <p className="font-body-md text-sm mt-2 opacity-70 italic">Terakreditasi Paripurna</p>
            </div>
          </div>
        </section>

        {/* Section 2: Chart Visualization */}
        <section className="mb-24">
          <div className="mb-12">
            <h2 className="font-headline-md text-headline-md text-fog-ink">
              Laporan Transparansi Kesehatan
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
              Visualisasi data berkala untuk memantau perkembangan kesejahteraan masyarakat Desa
              Alamendah secara objektif dan terbuka.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Bar Chart Stunting */}
            <div className="p-8 bg-white editorial-border flex flex-col h-full">
              <h4 className="font-headline-sm text-headline-sm mb-8">Tren Penurunan Stunting</h4>
              <div className="flex-1 flex items-end justify-between gap-4 h-64 border-b border-fog-grey pb-2">
                <div className="relative group w-full">
                  <div className="bg-moss-green h-[80%] w-full transition-all duration-300 group-hover:opacity-80"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-fog-ink text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    8.4% (2021)
                  </div>
                  <span className="block text-center text-xs mt-4 font-label-caps">2021</span>
                </div>
                <div className="relative group w-full">
                  <div className="bg-moss-green h-[65%] w-full transition-all duration-300 group-hover:opacity-80"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-fog-ink text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    6.1% (2022)
                  </div>
                  <span className="block text-center text-xs mt-4 font-label-caps">2022</span>
                </div>
                <div className="relative group w-full">
                  <div className="bg-moss-green h-[45%] w-full transition-all duration-300 group-hover:opacity-80"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-fog-ink text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    4.8% (2023)
                  </div>
                  <span className="block text-center text-xs mt-4 font-label-caps">2023</span>
                </div>
                <div className="relative group w-full">
                  <div className="bg-moss-green h-[30%] w-full transition-all duration-300 group-hover:opacity-80"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-fog-ink text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    4.2% (2024)
                  </div>
                  <span className="block text-center text-xs mt-4 font-label-caps">Skrg</span>
                </div>
              </div>
            </div>
            {/* Pie Chart Demographics */}
            <div className="p-8 bg-white editorial-border flex flex-col h-full">
              <h4 className="font-headline-sm text-headline-sm mb-8">Demografi Penerima Layanan</h4>
              <div className="flex flex-col md:flex-row items-center gap-12 flex-1 justify-center">
                <div className="w-48 h-48 rounded-full border-[32px] border-l-mist-teal border-t-moss-green border-r-berry-red border-b-mist-teal/30 rotate-45 relative group cursor-pointer transition-transform hover:scale-105">
                  <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                    <span className="font-bold text-lg">HUB</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 bg-mist-teal"></span>
                    <span className="text-sm font-label-caps">Balita (45%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 bg-moss-green"></span>
                    <span className="text-sm font-label-caps">Lansia (30%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 bg-berry-red"></span>
                    <span className="text-sm font-label-caps">Ibu Hamil (25%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Edukasi JKN (Slider) */}
        <section className="mb-24">
          <div className="mb-12 border-l-4 border-mist-teal pl-6">
            <h2 className="font-headline-md text-headline-md text-fog-ink">
              Edukasi Jaminan Kesehatan (JKN)
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-2">
              Panduan praktis pendaftaran dan pemanfaatan fasilitas BPJS bagi seluruh warga desa.
            </p>
          </div>
          <div className="relative group overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" id="slider">
              {/* Slide 1 */}
              <div className="min-w-full grid grid-cols-1 md:grid-cols-2 bg-white editorial-border h-[400px]">
                <div className="p-12 flex flex-col justify-center">
                  <span className="font-label-caps text-berry-red mb-4">LANGKAH 01</span>
                  <h3 className="font-headline-sm text-3xl mb-6">Pendaftaran Peserta Mandiri</h3>
                  <p className="text-body-lg text-on-surface-variant mb-8">
                    Bagi warga yang ingin mendaftar mandiri, harap siapkan KTP, KK, dan buku rekening
                    aktif untuk autodebet iuran bulanan.
                  </p>
                  <button
                    className="self-start px-6 py-2 border border-fog-ink text-fog-ink font-label-caps hover:bg-fog-ink hover:text-white transition-all uppercase tracking-widest"
                    onClick={() => setShowLightbox(true)}
                  >
                    Lihat Detail Poster
                  </button>
                </div>
                <div
                  className="bg-surface-variant overflow-hidden cursor-zoom-in"
                  onClick={() => setShowLightbox(true)}
                >
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAC_yAKbA95J3zElYatnxMI0zyLkhPSqyjduzNPC7wpzxzsQWW8dzlpKwEjT8x2jFmbIwBYjKHKEcRaPJRBpEsJJ5fpFnUR4lzPIwpl-HkcMIsKSqB3yCS6HKlDTNyvijp61sOxfBeVNc9YnKE_3ongoWnwX4O-cx71Hh1q8bZTlOr7flt3RMxeM-jcrkXWiF-zwQ2Amw2hdDobhQRtGJbMKXVtJcVPNtCuhlCuGtGTxwgnKgSTCg4')",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Kontak Darurat */}
        <section className="mb-12">
          <h2 className="font-headline-md text-headline-md text-center mb-12">Kontak Darurat 24 Jam</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-white p-8 editorial-border flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-berry-red/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-berry-red text-3xl">ambulance</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm mb-2">Ambulans Desa</h4>
              <p className="font-body-md text-on-surface-variant mb-8">
                Siaga 24 jam untuk rujukan ke RSUD atau Puskesmas terdekat.
              </p>
              <a
                className="w-full py-4 border-2 border-berry-red text-berry-red font-bold uppercase tracking-tighter relative overflow-hidden group"
                href="tel:08123456789"
              >
                <span className="relative z-10">Telepon Ayeuna</span>
                <div className="absolute inset-0 bg-berry-red/5 pulse-ring"></div>
              </a>
            </div>
            <div className="bg-white p-8 editorial-border flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-mist-teal/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-mist-teal text-3xl">
                  medical_services
                </span>
              </div>
              <h4 className="font-headline-sm text-headline-sm mb-2">Puskesmas Siaga</h4>
              <p className="font-body-md text-on-surface-variant mb-8">
                Konsultasi medis awal dan penanganan luka ringan.
              </p>
              <a
                className="w-full py-4 border border-fog-ink text-fog-ink font-bold uppercase tracking-tighter hover:bg-fog-ink hover:text-white transition-all"
                href="tel:08123456790"
              >
                Hubungi Petugas
              </a>
            </div>
            <div className="bg-white p-8 editorial-border flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-moss-green/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-moss-green text-3xl">
                  local_fire_department
                </span>
              </div>
              <h4 className="font-headline-sm text-headline-sm mb-2">Satgas Kebencanaan</h4>
              <p className="font-body-md text-on-surface-variant mb-8">
                Koordinasi evakuasi dan pertolongan pertama bencana alam.
              </p>
              <a
                className="w-full py-4 border border-fog-ink text-fog-ink font-bold uppercase tracking-tighter hover:bg-fog-ink hover:text-white transition-all"
                href="tel:08123456791"
              >
                Panggil Bantuan
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <div
        className={`fixed inset-0 z-[100] bg-fog-navy/95 flex items-center justify-center p-8 backdrop-blur-sm ${
          showLightbox ? 'block' : 'hidden'
        }`}
        onClick={() => setShowLightbox(false)}
      >
        <button className="absolute top-8 right-8 text-white text-4xl">×</button>
        <div
          className="max-w-5xl w-full h-[80vh] bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbnbon0T_--6hwm9ZbhF6sG8Lb8P-pVmRMYOLhvBHrwPw0DQ9uhXts2SbXeyoSHFJgUak_fmDvgWZsNU63qWez0mx_nggbxyfTKTeXWQKFAVSrKUZyCytMT8EDvJ9qluYrFm0Ik0d6sJ60XTiuwhOOsImU-FKVHUbXHk_r_AlvO-DVFabJ68TDucXzLqqR8rhl2Wf-sfoDNPCPy4nOnNKB8twGK7F1P3ly1AW1P24pYpWKjhS93ic')",
          }}
        ></div>
      </div>
    </div>
  );
}
