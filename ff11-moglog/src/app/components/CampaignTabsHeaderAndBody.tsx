"use client";
import React from "react";
import { CampaignTabButtons } from "./CampaignTabs";

type CampaignItem = {
  name: string;
  url: string;
};

type Props = {
  currentList: CampaignItem[];
  nextList: CampaignItem[];
  currentPeriod: string;
  nextPeriod: string;
};

export default function CampaignTabsHeaderAndBody({
  currentList,
  nextList,
  currentPeriod,
  nextPeriod,
}: Props) {
  const [tab, setTab] = React.useState<"current" | "next">("current");
  const activeList = tab === "current" ? currentList : nextList;
  const period = tab === "current" ? currentPeriod : nextPeriod;
  return (
    <>
      <h2 className="text-lg md:text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2 relative">
        <span className="text-xl">🎉</span>キャンペーン
        <CampaignTabButtons tab={tab} setTab={setTab} />
        <span className="absolute left-0 -bottom-2 w-14 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full opacity-70" />
      </h2>
      <div className="text-xs md:text-sm text-yellow-700 mb-2 font-semibold">開催期間：{period}</div>
      <ul className="list-disc pl-5 space-y-1 text-yellow-900 text-xs md:text-sm">
        {activeList.length === 0 ? (
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
