"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { FileText, Leaf, LogOut, X, Images } from "lucide-react";

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const menuItems = [
    {
      name: "Articles",
      href: "/admin/articles",
      icon: FileText,
      active: pathname === "/admin/articles" || pathname.startsWith("/admin/articles"),
    },
    {
      name: "Agro-UMKM",
      href: "/admin/umkm",
      icon: Leaf,
      active: pathname === "/admin/umkm" || pathname.startsWith("/admin/umkm"),
    },
    {
      name: "Agro-UMKM Images",
      href: "/admin/agro_product_images",
      icon: Images,
      active: pathname === "/admin/agro_product_images" || pathname.startsWith("/admin/agro_product_images"),
    },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`w-64 bg-surface-container-lowest border-r border-secondary-container flex flex-col h-screen fixed inset-y-0 left-0 z-50 transform lg:translate-x-0 transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:sticky lg:top-0`}
      >
        <div className="p-6 border-b border-secondary-container flex justify-between items-center">
          <div>
            <h1 className="font-headline-sm text-primary">Admin Panel</h1>
            <p className="text-xs text-secondary mt-1">Desa Alamendah</p>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-secondary hover:text-on-surface cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-primary text-white"
                    : "text-secondary hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-secondary-container">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-medium text-error hover:bg-error-container/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
