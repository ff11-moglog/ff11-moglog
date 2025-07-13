import { faceList } from './faceList';
import FaceChecklistClient from './FaceChecklistClient';

export const metadata = {
  title: '【FF11】フェイス一覧 チェックリスト | モグログ',
  description: 'FF11のフェイス取得状況を管理できるチェックリスト。入手方法や戦闘タイプで絞り込みも可能。あなたのコレクション進捗を可視化！',
  alternates: {
    canonical: 'https://moglog.jp/checklist/face',
  },
  openGraph: {
    type: 'website',
    title: '【FF11】フェイス一覧 チェックリスト | モグログ',
    description: 'FF11のフェイス取得状況を管理できるチェックリスト。入手方法や戦闘タイプで絞り込みも可能。あなたのコレクション進捗を可視化！',
    url: 'https://moglog.jp/checklist/face',
    siteName: 'モグログ',
    images: ['https://moglog.jp/moglogicon.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: '【FF11】フェイス一覧 チェックリスト | モグログ',
    description: 'FF11のフェイス取得状況を管理できるチェックリスト。入手方法や戦闘タイプで絞り込みも可能。あなたのコレクション進捗を可視化！',
    images: ['https://moglog.jp/moglogicon.png'],
  },
};


export default function FaceChecklistPage() {
  const roleOptions = Array.from(new Set(faceList.map(f => f.role))).filter(Boolean);
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f5f8fa] to-[#e6f0f5] w-full">
      <div className="h-[52px] md:h-[52px]" />
      <div className="w-full max-w-7xl px-2 md:px-6 mt-0 md:mt-6">
        <FaceChecklistClient roleOptions={roleOptions} />
      </div>
    </main>
  );
}
