"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { href: '/', label: 'ニュース', icon: '📰' },
    { href: '/checklist', label: 'チェックリスト', icon: '✅' },
  ];
  return (
    <header className="w-full bg-[#0097a7] border-b border-[#0097a7] shadow-sm fixed top-0 left-0 right-0 z-50">

      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-0.5">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/moglogicon.png" alt="Moglog" width={32} height={32} className="w-8 h-auto drop-shadow transition-transform group-hover:scale-105" />
            <span className="text-2xl font-bold text-[#ffd600] font-sans rounded drop-shadow-sm tracking-wide group-hover:text-[#fff9c4]" style={{letterSpacing: '0.08em'}}>Moglog</span>
          </Link>
        </div>
        {/* PCナビ */}
        <nav className="hidden md:flex gap-4 text-sm font-medium">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={
                (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
                  ? 'text-[#fffde7] bg-[#ffd600] rounded px-2 py-1 font-bold flex items-center gap-1 shadow transition'
                  : 'text-[#ffd600] hover:text-[#fff9c4] transition flex items-center gap-1'
              }
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        {/* ハンバーガーアイコン（モバイル用） 非表示中 */}
        
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd600]"
          aria-label="メニューを開く"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`block w-5 h-0.5 bg-cyan-700 mb-1 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-cyan-700 mb-1 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-cyan-700 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
       
      </div>
      {/* モバイルメニュー 非表示中 */}
      
      {menuOpen && (
        <nav className="md:hidden bg-white bg-opacity-95 border-b border-cyan-200 shadow-sm px-6 py-4 animate-fade-in-down">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={
                (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
                  ? 'block py-2 text-cyan-900 font-bold bg-cyan-100 rounded flex items-center gap-1'
                  : 'block py-2 text-cyan-900 hover:text-cyan-600 transition flex items-center gap-1'
              }
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
     
    </header>
  );
}
