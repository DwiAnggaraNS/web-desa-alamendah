'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Wisata() {
  useEffect(() => {
    // Hero Word Reveal Animation
    const heading = document.getElementById('hero-heading');
    if (heading) {
      const text = 'Ulin ka Alamendah';
      heading.innerHTML = text
        .split(' ')
        .map((word, i) => `<span style="transition-delay: ${i * 150}ms">${word}</span>`)
        .join(' ');

      setTimeout(() => {
        heading.classList.add('active');
        const sub = document.querySelector('.hero-sub');
        if (sub) {
          sub.classList.remove('opacity-0', 'translate-y-4');
        }
      }, 300);
    }
  }, []);

  const openLightbox = () => {
    const lightbox = document.getElementById('map-lightbox');
    if (lightbox) {
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    const lightbox = document.getElementById('map-lightbox');
    if (lightbox) {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  const setActiveTab = (e) => {
    const activeLine = document.getElementById('active-line');
    const container = document.getElementById('tab-container');

    document.querySelectorAll('.category-tab').forEach((tab) => {
      tab.classList.remove('text-berry-red');
      tab.classList.add('text-on-surface-variant');
    });

    const element = e.currentTarget;
    element.classList.add('text-berry-red');
    element.classList.remove('text-on-surface-variant');

    if (activeLine && container) {
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      activeLine.style.width = `${rect.width}px`;
      activeLine.style.left = `${rect.left - containerRect.left}px`;
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-neutral-50 group/design-root overflow-x-hidden font-body-md">
      {/* Section 1: Hero */}
      <section className="relative min-h-[614px] flex items-center justify-center bg-mist-white px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-pAlaFyXZt7nZc9fS_ad5T0pjSB4LK-I78qmC00eDL7D-4w-DFyQ2It7a6fjQ2spjFYGibADHQr_tp6tx-FrG7EjJ_XFOd6y9PmAoi5p0VvTHsDFrJhr5mB9Mf9CEjxS1KHshCMF5MQ0KiFGi-6somGNfRL2tIBcz1Tmt4IKCZruleGE5Fb4tEtQJKWrIOpgNE7oL9JkEM4RfoDN6PHzbHRCbY8VdXn0j4lQ4CIz1WM_eOHVs3WusE82ptwchaQgKS_VPTfnXopOB')",
            }}
          ></div>
        </div>
        <div className="max-w-4xl text-center z-10 relative bg-white/30 backdrop-blur-md p-10 rounded-2xl border border-white/20 shadow-xl">
          <h1 className="font-display-lg text-5xl md:text-8xl text-on-surface word-reveal active" id="hero-heading">
            <span style={{transitionDelay: '0ms'}}>Ulin</span>{' '}
            <span style={{transitionDelay: '150ms'}}>ka</span>{' '}
            <span style={{transitionDelay: '300ms'}}>Alamendah</span>
          </h1>
          <p className="mt-6 text-on-surface-variant text-lg font-body-md max-w-xl mx-auto transition-all duration-700 delay-500 hero-sub text-black drop-shadow-md">
            Menjelajahi harmoni alam, budaya, dan kearifan lokal di kaki Gunung Patuha.
          </p>
        </div>
      </section>

      {/* Section 2: Peta Galeri */}
      <section className="py-12 px-4 md:px-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 border-b border-fog-grey pb-4">
            <h3 className="font-headline-sm text-on-surface">Peta Jelajah Alamendah</h3>
            <button
              className="flex items-center gap-2 text-primary hover:text-berry-red transition-colors"
              onClick={openLightbox}
            >
              <span className="material-symbols-outlined" data-icon="zoom_in">
                zoom_in
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider">Perbesar Peta</span>
            </button>
          </div>
          <div
            className="relative group cursor-pointer overflow-hidden border border-fog-grey rounded-sharp"
            onClick={openLightbox}
          >
            <div
              className="w-full h-[400px] md:h-[600px] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8cnzMs_Opm8Y-mTjT21WZj-giwRRnqVfrd-Bx_1dii3LKeMU-Y-q0UxV3gU9sFkZGiHw3F8lFI1du2wY-FcbNLh5h5-vzuDVk-stbV91eRTpqv6q4PfZhdvCSxv2BZdfYmn0GJKss3dy7KKMYx3obaecgVMdZTIQbaPte0Rv5o8v10wLqHooqMWlnUJ2QhqLmSJ11CL_FckMTBl8B2ArKufIsBkbe__Ue79ZMLT3yujjAjVxWrXQ')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
          </div>
        </div>
      </section>

      {/* Section 3: Sticky Category Tabs */}
      <nav className="sticky-tabs border-y border-fog-grey">
        <div className="max-w-7xl mx-auto flex items-center justify-center overflow-x-auto hide-scrollbar relative px-4">
          <div className="flex items-center gap-12 py-6 relative" id="tab-container">
            <button
              className="category-tab text-sm font-bold tracking-widest uppercase text-berry-red"
              onClick={setActiveTab}
            >
              Semua
            </button>
            <button
              className="category-tab text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-on-surface"
              onClick={setActiveTab}
            >
              Agrowisata
            </button>
            <button
              className="category-tab text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-on-surface"
              onClick={setActiveTab}
            >
              Eduwisata
            </button>
            <button
              className="category-tab text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-on-surface"
              onClick={setActiveTab}
            >
              Religi
            </button>
            <button
              className="category-tab text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-on-surface"
              onClick={setActiveTab}
            >
              Alam
            </button>
            <div className="active-indicator" id="active-line"></div>
          </div>
        </div>
      </nav>

      {/* Section 4: Destination Masonry Grid */}
      <main className="py-24 px-4 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-y-24 gap-x-6">
          {/* Destination 1: Pola A (col-span 7) */}
          <div className="col-span-12 md:col-span-7 destination-card group">
            <div className="relative overflow-hidden border border-fog-grey rounded-sharp">
              <div className="aspect-[4/3] w-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Kebun Stroberi"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDxhqKYTypjR4eY_rU5cIwXdAEoSPON3drs4c7lN4wClbkxZGbhIH2m7gFL1bk95vN1FmwNjAARr_fqr0pS2N9g-tZzkEjiCpuEuzS12mzMby2EzTA_8OZetztHPsLsKEoJBdm8ilQqUoz-fhJSACMMq0wKv4YHCdH0FpvCxyt8qZYOxC-P9TddUe11xWoS_KeFtdeU4x-FEYUVZ1XuQHK_NqLFhYfpFIZVyoUJn5ZH26Z8cxnhus"
                />
              </div>
            </div>
            <div className="relative -mt-8 ml-8 mr-4 bg-white p-6 border border-fog-grey rounded-sharp shadow-sm z-10">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 border border-moss-green text-moss-green text-[10px] font-bold uppercase tracking-widest rounded-sharp">
                  Buka
                </span>
                <span className="text-on-surface-variant text-xs uppercase tracking-widest">
                  Agrowisata
                </span>
              </div>
              <h4 className="font-headline-sm text-2xl mb-1">Kebun Stroberi Petik Sendiri</h4>
              <p className="text-on-surface-variant text-sm mb-4">
                Nikmati sensasi memetik buah segar langsung dari pohonnya dengan pemandangan
                pegunungan yang asri.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-berry-red font-bold text-sm group/link">
                Jelajahi Detail
                <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1" style={{ fontSize: '18px' }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Destination 2: Pola B (col-span 5) */}
          <div className="col-span-12 md:col-span-5 destination-card group md:mt-24">
            <div className="relative overflow-hidden border border-fog-grey rounded-sharp">
              <div className="aspect-[3/4] w-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Pine Forest Camp"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA57ZwWiWD3kx04Nu2R1oO_qcX5wPFum5KBVKWoSB8CluvGG5aJ-Sffk54aB_wdVHgCrFfp5tEMXfWsAhqIHryB67Zcip1SPDgeieoNAH0muxzd9x4siPGf1MdwUwHLwj-YpMBtQ_Hox1PcR9MWzIEfSPGubGxb2mdQo1ztts3VsdaeiRXFX8gV4vc9T2HRcAEurLfdrK0vuQreT0QSTxjPbcl5NCm50huXecVDuy-IhfFrOPlbaP4"
                />
              </div>
            </div>
            <div className="relative -mt-8 ml-8 mr-4 bg-white p-6 border border-fog-grey rounded-sharp shadow-sm z-10">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 border border-moss-green text-moss-green text-[10px] font-bold uppercase tracking-widest rounded-sharp">
                  Buka
                </span>
                <span className="text-on-surface-variant text-xs uppercase tracking-widest">
                  Alam
                </span>
              </div>
              <h4 className="font-headline-sm text-2xl mb-1">Pine Forest Camp</h4>
              <p className="text-on-surface-variant text-sm mb-4">
                Bermalam di bawah rimbunnya hutan pinus dengan udara pegunungan yang menyegarkan.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-berry-red font-bold text-sm group/link">
                Jelajahi Detail
                <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1" style={{ fontSize: '18px' }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
          
          {/* Destination 3: Pola A (col-span 7) */}
          <div className="col-span-12 md:col-span-7 destination-card group">
            <div className="relative overflow-hidden border border-fog-grey rounded-sharp">
              <div className="aspect-[16/9] w-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Sundanese Homestay"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0qtrzgC3b57NV9h4nPw_DxMIvD6WN1iU3UUPxZaCTUv1z85zPMYvB_WlVbSF8ByoEvi6Zswn0unhdPTkihmO7qOVLhOFLzaBIXiTVBLSIQb82GrQ9U44eK8LhT4xrwyYjC9jTFBkmTcVRM-bKO1sRV78VcovV9xGcu3vS9x3Dj7AHqAqnQI28iypLcY_GUIyHhjn8JaaX7mEnHGE5fj6KXGtYF-PbwZKppdZeGRJ-CFZg_DcWP5g"
                />
              </div>
            </div>
            <div className="relative -mt-8 ml-8 mr-4 bg-white p-6 border border-fog-grey rounded-sharp shadow-sm z-10">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 border border-fog-grey text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-sharp">
                  Tutup
                </span>
                <span className="text-on-surface-variant text-xs uppercase tracking-widest">
                  Budaya
                </span>
              </div>
              <h4 className="font-headline-sm text-2xl mb-1">Sundanese Homestay</h4>
              <p className="text-on-surface-variant text-sm mb-4">
                Rasakan keramahan warga lokal dan menginap di hunian tradisional Sunda yang otentik.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-berry-red font-bold text-sm group/link">
                Jelajahi Detail
                <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1" style={{ fontSize: '18px' }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Destination 4: Pola B (col-span 5) */}
          <div className="col-span-12 md:col-span-5 destination-card group md:mt-24">
            <div className="relative overflow-hidden border border-fog-grey rounded-sharp">
              <div className="aspect-square w-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Kebun Kopi"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUhHawvUm1AVPmfNF1_5mvVgFmbodVQ6Y0NfR9qEjw8zaHlhgCQZXHirZqjwb2aSS5EsZrUEQNAolhEqNm8VBaar5cHkq5beQV8BaCXt2KX6fTpn4EjagLG2o9Vzvh9q7wYw8FTvgMy3ayMIyijeb041dEWAVezFM05d6o9Oolj6qHCjNwn3_3jlk2ReN0Maqb9m1vtBy9XYvqUYtq5hACeHAEvIJKfKqqlP2KVYfkVGd0vu8Jmus"
                />
              </div>
            </div>
            <div className="relative -mt-8 ml-8 mr-4 bg-white p-6 border border-fog-grey rounded-sharp shadow-sm z-10">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 border border-moss-green text-moss-green text-[10px] font-bold uppercase tracking-widest rounded-sharp">
                  Buka
                </span>
                <span className="text-on-surface-variant text-xs uppercase tracking-widest">
                  Eduwisata
                </span>
              </div>
              <h4 className="font-headline-sm text-2xl mb-1">Kebun Kopi Arabika</h4>
              <p className="text-on-surface-variant text-sm mb-4">
                Mengenal proses pengolahan kopi dari hulu ke hilir sambil menikmati aroma kopi
                Rancabali.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-berry-red font-bold text-sm group/link">
                Jelajahi Detail
                <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1" style={{ fontSize: '18px' }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Lightbox for Map */}
      <div
        className="fixed inset-0 bg-black/90 z-[100] hidden flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
        id="map-lightbox"
        onClick={closeLightbox}
      >
        <button className="absolute top-8 right-8 text-white">
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
            close
          </span>
        </button>
        <div
          className="w-full max-w-5xl aspect-video bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBucylFXpDABrGrRHG_ObTexboJUi3jH03kgHXxra3y8aJJmHzKvvFoBIfs0OAeknv5rYQNqxowVKI469sgwNsshcGN8FNiICSAelWRzmTBju8zIdDvXglHPD7BdvTZjiNhV56L0M5y0RUnEnId1UnlN60_ghWIMtjamaofLqRJKMU6JtSRJJJBSemzSruyM3Ps3JR-wnwVtLgOWJ-_cBwBl4Wls3btEepBPlGLTo1fFl9K0hDGQ2c')",
          }}
        ></div>
      </div>

    </div>
  );
}
