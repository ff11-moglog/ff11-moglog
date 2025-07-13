import MountChecklistClient from './MountChecklistClient';

export const metadata = {
  title: '【FF11】マウント一覧 チェックリスト | モグログ',
  description: 'FF11のマウント取得状況を管理できるチェックリスト。入手方法や銀チケット有無で絞り込みも可能。あなたのコレクション進捗を可視化！',
  alternates: {
    canonical: 'https://moglog.jp/checklist/mount',
  },
  openGraph: {
    type: 'website',
    title: '【FF11】マウント一覧 チェックリスト | モグログ',
    description: 'FF11のマウント取得状況を管理できるチェックリスト。入手方法や銀チケット有無で絞り込みも可能。あなたのコレクション進捗を可視化！',
    url: 'https://moglog.jp/checklist/mount',
    siteName: 'モグログ',
    images: ['https://moglog.jp/moglogicon.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: '【FF11】マウント一覧 チェックリスト | モグログ',
    description: 'FF11のマウント取得状況を管理できるチェックリスト。入手方法や銀チケット有無で絞り込みも可能。あなたのコレクション進捗を可視化！',
    images: ['https://moglog.jp/moglogicon.png'],
  },
};


export default function MountChecklistPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f5f8fa] to-[#e6f0f5] w-full">
      <div className="h-[52px] md:h-[52px]" />
      <div className="w-full max-w-7xl px-2 md:px-6 mt-0 md:mt-6">
        <MountChecklistClient />
      </div>
    </main>
  );
}
