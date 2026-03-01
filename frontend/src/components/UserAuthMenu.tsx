"use client";

import { getCurrentUser, logoutUser } from "@/lib/api";
import { clearUserAuthToken, getUserAuthToken } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type UserState = {
  name: string;
  email: string;
};

export function UserAuthMenu() {
  const router = useRouter();
  const [token] = useState<string | null>(() => getUserAuthToken());
  const [user, setUser] = useState<UserState | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(Boolean(token));
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    getCurrentUser(token)
      .then((currentUser) => {
        if (currentUser.is_admin) {
          clearUserAuthToken();
          setUser(null);
          return;
        }

        setUser({
          name: currentUser.name,
          email: currentUser.email,
        });
      })
      .catch(() => {
        clearUserAuthToken();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!menuRef.current) {
        return;
      }

      if (event.target instanceof Node && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", onDocumentClick);
    }

    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
    };
  }, [open]);

  async function handleLogout() {
    const token = getUserAuthToken();

    if (token) {
      await logoutUser(token).catch(() => undefined);
    }

    clearUserAuthToken();
    setOpen(false);
    setUser(null);
    router.refresh();
  }

  if (loading) {
    return <div className="hidden h-10 w-36 animate-pulse rounded bg-slate-200/70 lg:block" />;
  }

  if (!user) {
    return (
      <div className="hidden items-center gap-4 lg:flex">
        <Link href="/login" className="text-[13px] font-semibold text-[#4f46e5]">
          Login
        </Link>
        <Link href="/signup" className="rounded-sm bg-[#4f46e5] px-7 py-2.5 text-[13px] font-semibold text-white">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div ref={menuRef} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-sm border border-[#dfe3f3] bg-white px-3 py-2 text-sm font-semibold text-[#1f2a44]"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#eef2ff] text-xs font-bold text-[#4f46e5]">
          {user.name.slice(0, 1).toUpperCase()}
        </span>
        {user.name}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-[#e5e8f6] bg-white p-3 shadow-[0_20px_40px_rgba(31,42,68,0.16)]">
          <p className="text-sm font-semibold text-[#1f2a44]">{user.name}</p>
          <p className="mt-0.5 text-xs text-slate-500">{user.email}</p>

          <div className="mt-3 space-y-2 border-t border-[#edf0fa] pt-3">
            <Link href="/jobs" className="block rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-[#f3f4fb] hover:text-[#1f2a44]" onClick={() => setOpen(false)}>
              Browse Jobs
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-lg px-2 py-1.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
