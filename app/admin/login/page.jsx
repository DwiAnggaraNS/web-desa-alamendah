"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsPending(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Login form card */}
      <div className="max-w-md w-full border border-secondary-container bg-surface-container-lowest p-8 rounded-lg shadow-md">
        <h1 className="font-display-lg-mobile text-primary text-center mb-6">Login Admin</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-label-md text-secondary mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-secondary-container rounded focus:outline-none focus:border-primary text-sm"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-label-md text-secondary mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-secondary-container rounded focus:outline-none focus:border-primary text-sm"
            />
          </div>
          {error && (
            <p className="text-error text-xs font-label-md text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 rounded font-label-md text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Memverifikasi..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}
