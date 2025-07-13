import * as React from "react";
import Head from "next/head";
import Parser from "rss-parser";
import CampaignTabsHeaderAndBody from "./components/CampaignTabsHeaderAndBody";

const MONTHLY_ANBAS={
  ambu1: "ヤグード族",
  ambu2: "キノコ族",
  ambu1_url: "https://wiki.ffo.jp/html/35653.html",
  ambu2_url: "https://wiki.ffo.jp/html/38360.html",
};

const MONTHLY_LOGINPOINT={
  loginPointGrantPeriod: "8月4日（月）23:00頃",
  loginPointExchangePeriod: "2025年8月11日（月）23:59頃",
};

// --- 月次更新用定数 ---
const MONTHLY_CAMPAIGN = {
  currentPeriod: "2025年7月11日（金）17:00頃 ～ 7月17日（木）23:59頃",
  nextCampaignPeriod: "未定",
  currentCampaignList: [
    {
      name: "経験値ステップアップキャンペーン",
      url: "https://wiki.ffo.jp/html/35289.html",
    },
    {
      name: "キャパシティポイントステップアップキャンペーン",
      url: "https://wiki.ffo.jp/html/35288.html",
    },
    {
      name: "モンストロスプレッジ経験値ステップアップキャンペーン",
      url: "https://wiki.ffo.jp/html/35290.html",
    },
    {
      name: "同盟戦績ボーナスキャンペーン",
      url: "https://wiki.ffo.jp/html/32342.html",
    },
    {
      name: "合成スキルアップ確率2倍キャンペーン",
      url: "https://wiki.ffo.jp/html/30078.html",
    },
    {
      name: "A.M.A.N. トローブ オリジナル装備品入手確率アップキャンペーン",
      url: "https://wiki.ffo.jp/html/38970.html",
    },
  ],
  nextCampaignList: [
  ],
};


export const revalidate = 3600;



function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  // JSTなどのタイムゾーン略称を+09:00に変換（大文字小文字両対応）
  let fixedStr = dateStr.replace(/\bJST\b/i, "+09:00").replace(/\bGMT\b/i, "+00:00");
  let d = new Date(fixedStr);
  // それでもパースできない場合、+0900形式も試す
  if (isNaN(d.getTime())) {
    fixedStr = dateStr.replace(/\bJST\b/i, "+0900").replace(/\bGMT\b/i, "+0000");
    d = new Date(fixedStr);
  }
  // それでもパースできない場合、曜日やタイムゾーンを除去してみる
  if (isNaN(d.getTime())) {
    // 例: Tue, 08 Jul 2025 14:00:25 JST → 08 Jul 2025 14:00:25
    fixedStr = dateStr.replace(/^\w{3},\s*/, "").replace(/\s([A-Z]{3,4})$/, "");
    d = new Date(fixedStr);
  }
  if (isNaN(d.getTime())) return dateStr; // 最後までダメならそのまま返す
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
}

async function getNewsList() {
  const parser = new Parser();
  const feed = await parser.parseURL("http://www.playonline.com/ff11/polnews/news.xml");
  return (feed.items || []).slice(0, 5).map(item => ({
    title: item.title || "",
    url: item.link || "",
    date: formatDate(item.isoDate || item.pubDate || item["dc:date"] || ""),
    description: item.contentSnippet || item.content || item.description || "",
  }));
}

async function getTopicsList() {
  const parser = new Parser();
  const feed = await parser.parseURL("http://www.playonline.com/pcd/topics/ff11/topics.xml");
  return (feed.items || []).slice(0, 5).map(item => ({
    title: item.title || "",
    url: item.link || "",
    date: formatDate(item.isoDate || item.pubDate || item["dc:date"] || ""),
    description: item.contentSnippet || item.content || item.description || "",
  }));
}

export default async function Home() {
  const [newsList, topicsList] = await Promise.all([
    getNewsList(),
    getTopicsList(),
  ]);

  return (
    <>
      <Head>
        <title>モグログ | FF11プレイヤーのための便利サイト</title>
        <meta name="description" content="FF11（ファイナルファンタジーXI）プレイヤー向けサイト『モグログ』。最新キャンペーン、クエスト・ミッションの進捗管理、装備・マウントのチェックリストを提供。" />
        <meta name="keywords" content="FF11,ファイナルファンタジー11,モグログ,クエスト,ミッション,チェックリスト" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="モグログ | FF11便利サイト" />
        <meta property="og:site_name" content="Moglog" />
        <meta property="og:description" content="FF11プレイヤー向けのチェックリスト＆キャンペーン情報サイト。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ff11-moglog.vercel.app/" />
        <meta property="og:title" content="モグログ | FF11便利情報サイト" />
        <meta property="og:image" content="https://ff11-moglog.vercel.app/moglogicon.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f5f8fa] to-[#e6f0f5] w-full">
        {/* タイトル・メニュー分の余白 */}
        <div className="h-[52px] md:h-[52px]" />

        {/* 今月の注目帯（やや黄色っぽいグレー・固定表示） */}
        <div className="w-full bg-[#f7f3e7] border-y border-[#e0e0c0] shadow-sm mb-4 sticky top-[52px] z-30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1 px-2 md:px-0 min-h-0">
            
            <div className="flex flex-col text-yellow-900 text-xs md:text-sm font-semibold leading-tight">
              <div className="flex items-center gap-1 min-h-0">
                <span className="text-base md:text-lg">🛡️</span>
                <span>アンバス1章：</span>
                <a
                  href={MONTHLY_ANBAS.ambu1_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 font-bold underline hover:text-yellow-900"
                  title="FF11用語辞典でアンバスケードを見る"
                >
                  {MONTHLY_ANBAS.ambu1}
                </a>
              </div>
              <div className="flex items-center gap-1 min-h-0">
                <span className="text-base md:text-lg">🛡️</span>
                <span>アンバス2章：</span>
                <a
                  href={MONTHLY_ANBAS.ambu2_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 font-bold underline hover:text-yellow-900"
                  title="FF11用語辞典でアンバスケードを見る"
                >
                  {MONTHLY_ANBAS.ambu2}
                </a>
              </div>
            </div>

            <div className="flex flex-col text-yellow-900 text-xs md:text-sm font-semibold leading-tight">
              <div className="flex items-center gap-1 min-h-0">
                <span className="text-base md:text-lg">💎</span>
                <span>ログポ付与期限：</span>
                <a
                  href="http://www.playonline.com/ff11/campaign/login/login144.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 font-bold underline hover:text-yellow-900"
                  title="公式ログインポイントページ"
                >
                  {MONTHLY_LOGINPOINT.loginPointGrantPeriod}
                </a>
              </div>
              <div className="flex items-center gap-1 min-h-0">
                <span className="text-base md:text-lg">💎</span>
                <span>ログポ交換期限：</span>
                <a
                  href="http://www.playonline.com/ff11/campaign/login/login144.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 font-bold underline hover:text-yellow-900"
                  title="公式ログインポイントページ"
                >
                  {MONTHLY_LOGINPOINT.loginPointExchangePeriod}
                </a>
              </div>
            </div>

            <div className="flex flex-col text-yellow-900 text-xs md:text-sm font-semibold leading-tight">
              <div className="flex items-center gap-1 min-h-0">
                <span className="text-base md:text-lg">🎉</span>
                <span>キャンペーン期間：</span>
                {MONTHLY_CAMPAIGN.currentCampaignList.length > 0 ? (
                  <a
                    href="http://www.playonline.com/pcd/topics/ff11/detail/22616/detail.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-700 font-bold underline hover:text-yellow-900"
                    title="公式キャンペーンページ"
                  >
                    {`${MONTHLY_CAMPAIGN.currentPeriod}`}
                  </a>
                ) : (
                  <span className="text-yellow-700 font-bold">未開催</span>
                )}
              </div>
              <div className="flex items-center gap-1 min-h-0 ">
                <span className="text-base md:text-lg">⬆️</span>
                <span>バージョンアップ：</span>
                <a
                  href="https://forum.square-enix.com/ffxi/threads/62998-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 font-bold underline hover:text-yellow-900"
                  title="公式バージョンアップ情報"
                >
                  2025年7月10日（木）
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl px-2 md:px-6 mt-0 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-3">

            {/* News */}
            <section className="bg-white/90 rounded-2xl border border-blue-100 p-4 md:col-span-2 shadow transition hover:shadow-lg duration-200">
              <h2 className="text-lg md:text-xl font-bold text-blue-800 mb-3 flex items-center gap-3 relative">
                <span className="text-xl">📰</span>News
                <a href="http://www.playonline.com/ff11/info/info_top.shtml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 hover:text-blue-900 transition font-semibold shadow-sm ml-1">
                  公式
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
                <span className="absolute left-0 -bottom-2 w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full opacity-70" />
              </h2>
              <ul className="divide-y divide-blue-100">
                {newsList.length === 0 ? (
                  <li className="py-2 text-blue-300 text-center text-xs">ニュースがありません</li>
                ) : (
                  newsList.map((news, idx) => (
                    <li key={idx} className="py-2 group">
                      <div className="flex items-center justify-between gap-2">
                        <a href={news.url} className="text-blue-900 group-hover:text-blue-700 font-semibold transition-colors duration-150 underline-offset-2 hover:underline text-xs md:text-sm truncate" target="_blank" rel="noopener noreferrer">{news.title}</a>
                        <span className="text-[10px] text-blue-500 font-mono ml-2 whitespace-nowrap">{news.date}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </section>
            
            {/* キャンペーン */}
            <section className="bg-white/90 rounded-2xl border md:col-span-2 border-yellow-100 p-4 shadow transition hover:shadow-lg duration-200">
              <CampaignTabsHeaderAndBody
                currentList={MONTHLY_CAMPAIGN.currentCampaignList}
                nextList={MONTHLY_CAMPAIGN.nextCampaignList}
                currentPeriod={MONTHLY_CAMPAIGN.currentPeriod}
                nextPeriod={MONTHLY_CAMPAIGN.nextCampaignPeriod}
              />
            </section>

            {/* Topics */}
            <section className="bg-white/90 rounded-2xl border border-green-100 p-4 md:col-span-4 shadow transition hover:shadow-lg duration-200">
              <h2 className="text-lg md:text-xl font-bold text-green-800 mb-3 flex items-center gap-3 relative">
                <span className="text-xl">📝</span>Topics
                <a href="http://www.playonline.com/ff11/index.shtml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-green-700 bg-green-50 rounded-full hover:bg-green-100 hover:text-green-900 transition font-semibold shadow-sm ml-1">
                  公式
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
                <span className="absolute left-0 -bottom-2 w-16 h-1 bg-gradient-to-r from-green-400 to-green-200 rounded-full opacity-70" />
              </h2>
              <ul className="divide-y divide-green-100">
                {topicsList.length === 0 ? (
                  <li className="py-2 text-green-300 text-center text-sm">トピックスがありません</li>
                ) : (
                  topicsList.map((topic, idx) => (
                    <li key={idx} className="py-2 group">
                      <div className="flex items-center gap-2 min-w-0">
                        <a href={topic.url} className="text-green-900 group-hover:text-green-700 font-semibold transition-colors duration-150 underline-offset-2 hover:underline text-sm md:text-base truncate max-w-full" target="_blank" rel="noopener noreferrer">{topic.title}</a>
                        <span className="text-xs text-green-500 font-mono whitespace-nowrap flex-shrink-0">{topic.date}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 whitespace-pre-line">{topic.description}</div>
                    </li>
                  ))
                )}
              </ul>
            </section>
          </div>
        </div>
        {/* 下部余白 */}
        <div className="h-12 md:h-16" />

        {/* フッター */}
        <footer className="w-full bg-[#f7f3e7] border-t border-[#e0e0c0] text-yellow-900 text-xs md:text-sm py-4 flex flex-col items-center font-semibold">
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-2 px-4">
            <span>© 2025 Moglog / FINAL FANTASY XI Community Fan Project</span>
            <span>
              <a href="https://www.playonline.com/ff11/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-700">公式サイト</a>
              <span className="mx-2">|</span>
              <a href="https://wiki.ffo.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-700">FF11用語辞典</a>
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
