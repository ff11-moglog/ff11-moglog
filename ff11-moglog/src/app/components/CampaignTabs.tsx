"use client";
import React, { useState } from "react";

type CampaignItem = {
  name: string;
  url: string;
};

type CampaignTabsProps = {
  currentList: CampaignItem[];
  nextList: CampaignItem[];
  currentPeriod: string;
  nextPeriod: string;
};

export default function CampaignTabs({
  currentList,
  nextList,
  currentPeriod,
  nextPeriod,
}: CampaignTabsProps) {
  const [tab, setTab] = useState<"current" | "next">("current");
  const activeList = tab === "current" ? currentList : nextList;
  const period = tab === "current" ? currentPeriod : nextPeriod;

  return (
    <>
      {!(tab === "current" && activeList.length === 0) && (
        <div className="text-xs md:text-sm text-yellow-700 mb-2 font-semibold">開催期間：{period}</div>
      )}
      <ul className="list-disc pl-5 space-y-1 text-yellow-900 text-xs md:text-sm">
        {tab === "current" && activeList.length === 0 ? (
          <li className="text-yellow-400">キャンペーン未開催</li>
        ) : activeList.length === 0 ? (
          <li className="text-yellow-400">キャンペーン情報がありません</li>
        ) : (
          activeList.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-900 underline hover:text-yellow-700 hover:underline font-semibold transition-colors duration-150"
                title="FF11用語辞典で詳細を見る"
              >
                {item.name}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

// 見出し横にタブを出すためのUIをexport
export function CampaignTabButtons({ tab, setTab }: { tab: "current" | "next"; setTab: (t: "current" | "next") => void }) {
  return (
    <div className="flex gap-2 ml-2">
      <button
        className={`px-3 py-1 rounded-t-lg font-bold text-xs md:text-sm border-b-2 transition-colors duration-150 ${
          tab === "current"
            ? "bg-yellow-100 border-yellow-500 text-yellow-900"
            : "bg-yellow-50 border-transparent text-yellow-500 hover:bg-yellow-100"
        }`}
        onClick={() => setTab("current")}
        type="button"
      >
        現在開催中
      </button>
      <button
        className={`px-3 py-1 rounded-t-lg font-bold text-xs md:text-sm border-b-2 transition-colors duration-150 ${
          tab === "next"
            ? "bg-yellow-100 border-yellow-500 text-yellow-900"
            : "bg-yellow-50 border-transparent text-yellow-500 hover:bg-yellow-100"
        }`}
        onClick={() => setTab("next")}
        type="button"
      >
        次回予定
      </button>
    </div>
  );
}
