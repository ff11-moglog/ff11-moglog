"use client";
import Link from "next/link";
import Head from "next/head";

export default function ChecklistTopPage() {
  return (
    <>
      <Head>
        <title>チェックリストTOP | モグログ</title>
        <meta name="description" content="FF11のフェイス・マウントなどの取得チェックリストTOPページ" />
      </Head>
      <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f5f8fa] to-[#e6f0f5] w-full">
        <div className="h-[52px] md:h-[52px]" />
        <div className="w-full max-w-2xl px-2 md:px-6 mt-0 md:mt-6">
          <h1 className="text-2xl font-bold mb-8 text-center">チェックリストTOP</h1>
          <div className="flex flex-col gap-6 items-center">
            <Link href="/checklist/face" className="block w-full max-w-xs py-4 px-6 rounded-lg bg-white shadow hover:bg-blue-50 text-center text-lg font-semibold border border-blue-200 transition">フェイス チェックリスト</Link>
            <Link href="/checklist/mount" className="block w-full max-w-xs py-4 px-6 rounded-lg bg-white shadow hover:bg-blue-50 text-center text-lg font-semibold border border-blue-200 transition">マウント チェックリスト</Link>
          </div>
        </div>
      </main>
    </>
  );
}
