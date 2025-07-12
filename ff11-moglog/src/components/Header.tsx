"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  // const [menuOpen, setMenuOpen] = useState(false); // 未使用のためコメントアウト
  return (
    <header className="w-full bg-[#0097a7] border-b border-[#0097a7] shadow-sm fixed top-0 left-0 right-0 z-50">
      {/* サイト説明: 検索にひっかかりやすいキーワードを含める */}

      <title>モグログ | FF11プレイヤーのための便利サイト</title>
      <meta name="description" content="FF11（ファイナルファンタジーXI）プレイヤー向けサイト『モグログ』。最新キャンペーン、クエスト・ミッションの進捗管理、装備・マウントのチェックリストを提供。" />
      <meta name="keywords" content="FF11,ファイナルファンタジー11,モグログ,クエスト,ミッション,チェックリスト" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="モグログ | FF11便利サイト" />
      <meta property="og:description" content="FF11プレイヤー向けのチェックリスト＆キャンペーン情報サイト。" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ff11-moglog.vercel.app/" />

      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-0.5">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/moglogicon.png" alt="Moglog" width={32} height={32} className="w-8 h-auto drop-shadow transition-transform group-hover:scale-105" />
            <span className="text-2xl font-bold text-[#ffd600] font-sans rounded drop-shadow-sm tracking-wide group-hover:text-[#fff9c4]" style={{letterSpacing: '0.08em'}}>Moglog</span>
          </Link>
        </div>
        {/* PCナビ */}
        {/* <nav className="hidden md:flex gap-4 text-sm font-medium">
          <Link href="/news" className="text-[#ffd600] hover:text-[#fff9c4] transition">ニュース</Link>
          <Link href="/campaign" className="text-[#ffd600] hover:text-[#fff9c4] transition">キャンペーン</Link>
          <Link href="/checklist" className="text-[#ffd600] hover:text-[#fff9c4] transition">チェックリスト</Link>
        </nav> */}
        {/* ハンバーガーアイコン（モバイル用） 非表示中 */}
        {/*
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd600]"
          aria-label="メニューを開く"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`block w-5 h-0.5 bg-cyan-700 mb-1 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-cyan-700 mb-1 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-cyan-700 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        */}
      </div>
      {/* モバイルメニュー 非表示中 */}
      {/*
      {menuOpen && (
        <nav className="md:hidden bg-white bg-opacity-95 border-b border-cyan-200 shadow-sm px-6 py-4 animate-fade-in-down">
          <Link href="/news" className="block py-2 text-cyan-900 hover:text-cyan-600 transition">ニュース</Link>
          <Link href="/campaign" className="block py-2 text-cyan-900 hover:text-cyan-600 transition">キャンペーン</Link>
          <Link href="/checklist" className="block py-2 text-cyan-900 hover:text-cyan-600 transition">チェックリスト</Link>
        </nav>
      )}
      */}
    </header>
  );
}
