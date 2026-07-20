'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WebGIS() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  return (
    <main className="relative w-full h-screen flex pt-[72px]">
      {/* Section 1: Map Canvas */}
      <div className="absolute inset-0 z-0 bg-[#D4DAD8]" id="map-canvas">
        <div
          className="w-full h-full bg-cover bg-center grayscale-[20%] contrast-[1.1]"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGdMc7yerP_J_HY8JkPnXU8VVh5Kd7bVkCaWcxviou-zQSadfcMbN9aRD4qnIQq-nPhPySrjM0zcQF3U_IjpRQR3tk80G2-n3XJcx38VU8Kb4POQDDse8S0mQtLBgp3z_s3fdWuydK80I196gpQHm4QbFA9jkebOhU0Hk5EFZW85s1em3zUQmgdXHXdZUnFfbndjOuJFocQBj9PiLfpXvUF3seyT6iwCYP3a9dPP45Ytnw-RkHs5c')",
          }}
        ></div>
        {/* Overlay for Map Texture */}
        <div className="absolute inset-0 pointer-events-none bg-primary/5 mix-blend-multiply"></div>
      </div>

      {/* Section 2: Sidebar Collapsible */}
      <aside
        className="relative z-20 w-80 h-full bg-surface-container-lowest border-r border-outline-variant flex flex-col transition-transform duration-300"
        style={{ transform: isSidebarCollapsed ? 'translateX(-100%)' : 'translateX(0)' }}
      >
        <div className="p-8">
          <h1 className="font-headline-sm text-headline-sm text-on-surface mb-2">
            Alamendah Spatial
          </h1>
          <p className="text-secondary text-sm leading-relaxed mb-8">
            Eksplorasi tata ruang dan potensi geografis Desa Alamendah dalam resolusi tinggi.
          </p>
          <div className="space-y-6">
            <div className="group border-b border-outline-variant pb-4">
              <span className="text-label-caps text-secondary uppercase tracking-widest block mb-4">
                Statistik Desa
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-outline block">Luas Wilayah</span>
                  <span className="text-lg font-bold text-on-surface">2.450 Ha</span>
                </div>
                <div>
                  <span className="text-xs text-outline block">Ketinggian</span>
                  <span className="text-lg font-bold text-on-surface">1.200 mdpl</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-label-caps text-secondary uppercase tracking-widest block">
                Fitur Utama
              </span>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low border border-outline-variant cursor-pointer hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <span className="text-body-md text-on-surface">Analisis Topografi</span>
              </div>
              <div className="flex items-center gap-3 p-3 border border-outline-variant cursor-pointer hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-secondary">agriculture</span>
                <span className="text-body-md text-on-surface">Potensi Komoditas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kujang Watermark */}
        <div className="mt-auto p-8 relative overflow-hidden h-48 opacity-[0.08] pointer-events-none kujang-watermark">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-64 bg-on-surface"
            style={{
              maskImage: "url('https://api.iconify.design/fluent-emoji-high-contrast:dagger.svg')",
              WebkitMaskImage: "url('https://api.iconify.design/fluent-emoji-high-contrast:dagger.svg')",
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
            }}
          ></div>
        </div>

        {/* Toggle Sidebar Handle */}
        <button
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-surface-container-lowest border border-outline-variant border-l-0 w-6 h-12 flex items-center justify-center cursor-pointer hover:bg-surface-container transition-colors"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          style={{ transform: isSidebarCollapsed ? 'translateX(100%)' : 'translateX(0)' }}
        >
          <span className="material-symbols-outlined text-sm">
            {isSidebarCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </aside>

      {/* Section 3: Layer Control */}
      <div className="absolute top-8 right-8 z-20 w-64 bg-[#1F2E33] text-[#F0F3F2] p-6 border border-outline/20">
        <h3 className="font-label-caps text-label-caps tracking-widest uppercase mb-6 opacity-60">
          Data Layers
        </h3>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">SIGAB</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer switch-input" type="checkbox" />
              <div className="w-10 h-5 bg-[#D4DAD8]/20 border border-outline/30 peer-focus:outline-none transition-all switch-track">
                <div className="absolute top-1 left-1 bg-white w-3 h-3 transition-all switch-knob"></div>
              </div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">RuangDesa</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input className="sr-only peer switch-input" type="checkbox" />
              <div className="w-10 h-5 bg-[#D4DAD8]/20 border border-outline/30 peer-focus:outline-none transition-all switch-track">
                <div className="absolute top-1 left-1 bg-white w-3 h-3 transition-all switch-knob"></div>
              </div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">SejukDesa</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer switch-input" type="checkbox" />
              <div className="w-10 h-5 bg-[#D4DAD8]/20 border border-outline/30 peer-focus:outline-none transition-all switch-track">
                <div className="absolute top-1 left-1 bg-white w-3 h-3 transition-all switch-knob"></div>
              </div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">TaniHijau</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input className="sr-only peer switch-input" type="checkbox" />
              <div className="w-10 h-5 bg-[#D4DAD8]/20 border border-outline/30 peer-focus:outline-none transition-all switch-track">
                <div className="absolute top-1 left-1 bg-white w-3 h-3 transition-all switch-knob"></div>
              </div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">StayMap</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input className="sr-only peer switch-input" type="checkbox" />
              <div className="w-10 h-5 bg-[#D4DAD8]/20 border border-outline/30 peer-focus:outline-none transition-all switch-track">
                <div className="absolute top-1 left-1 bg-white w-3 h-3 transition-all switch-knob"></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Section 4: Popup & Legend */}
      {showPopup && (
        <div
          className="absolute top-1/2 left-[45%] z-10 w-56 bg-surface-container-lowest border border-outline-variant p-4 animate-spring"
          id="map-popup"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-label-caps text-[10px] text-error font-bold uppercase tracking-wider">
              Titik Pantau
            </span>
            <button
              className="text-outline hover:text-on-surface"
              onClick={() => setShowPopup(false)}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <h4 className="font-bold text-on-surface text-sm mb-1">Zona Siaga Bencana 04</h4>
          <p className="text-xs text-secondary leading-normal mb-3">
            Area rawan pergerakan tanah pada kemiringan &gt;40 derajat.
          </p>
          <button className="w-full py-1.5 border border-outline-variant text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container transition-colors">
            Detail Analisis
          </button>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface-container-lowest border-r border-b border-outline-variant rotate-45"></div>
        </div>
      )}

      {/* Legend Overlay */}
      <div className="absolute bottom-8 left-[340px] z-20 bg-surface-container-lowest border border-outline-variant p-5 w-52">
        <h3 className="font-label-caps text-[11px] tracking-widest uppercase mb-4 text-secondary">
          Legenda Spasial
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 border-2 border-error"></div>
            <span className="text-xs font-medium text-on-surface">SIGAB (Risiko)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-tertiary-container/40 border border-tertiary"></div>
            <span className="text-xs font-medium text-on-surface">RuangDesa (Publik)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-primary/20 border border-primary"></div>
            <span className="text-xs font-medium text-on-surface">Hutan Lindung</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#1F2E33]"></div>
            <span className="text-xs font-medium text-on-surface">Kawasan Komersil</span>
          </div>
        </div>
      </div>

      {/* Map Controls (Floating) */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-2">
        <button className="w-10 h-10 bg-surface-container-lowest border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined">add</span>
        </button>
        <button className="w-10 h-10 bg-surface-container-lowest border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined">remove</span>
        </button>
        <button className="w-10 h-10 bg-surface-container-lowest border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors mt-4">
          <span className="material-symbols-outlined">my_location</span>
        </button>
      </div>
    </main>
  );
}
