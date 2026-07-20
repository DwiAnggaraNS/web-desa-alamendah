'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Wisata', path: '/wisata' },
    { name: 'WebGIS', path: '/webgis' },
    { name: 'Artikel', path: '/artikel' },
    { name: 'Agro', path: '/agro' },
    { name: 'Kesehatan', path: '/kesehatan' },
  ];

  return (
    <nav
      id="top-nav"
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-margin-desktop h-[72px] flex justify-between items-center left-0 right-0 ${
        isScrolled || pathname === '/webgis'
          ? 'bg-white border-b border-outline-variant shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="flex items-center">
        <Link href="/">
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface cursor-pointer">
            Alamendah
          </span>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
          return (
            <Link key={link.name} href={link.path}>
              <span
                className={`font-body-md text-body-md cursor-pointer transition-colors ${
                  isActive
                    ? 'text-primary border-b-2 border-error pb-1'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
      <button className="bg-primary text-on-primary px-6 py-2 font-label-caps uppercase tracking-widest text-[11px] border border-primary hover:bg-error hover:border-error transition-all duration-300">
        Hubungi Kami
      </button>
    </nav>
  );
}
