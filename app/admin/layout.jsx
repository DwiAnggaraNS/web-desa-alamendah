"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden bg-surface-container-lowest border-b border-secondary-container p-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 text-secondary hover:text-on-surface cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold text-primary">Admin Panel</span>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
