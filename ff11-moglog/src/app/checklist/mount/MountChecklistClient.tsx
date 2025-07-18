"use client";
import * as React from "react";
import { mountList } from './mountList';
import Link from 'next/link';

const checklistTabs = [
  { label: 'フェイス', href: '/checklist/face' },
  { label: 'マウント', href: '/checklist/mount' },
];

type Props = object;

export default function MountChecklistClient({}: Props) {
  const [checkedMount, setCheckedMount] = React.useState<string[]>([]);
  const [filterChecked, setFilterChecked] = React.useState<'all' | 'checked' | 'unchecked'>('all');
  const [filterName, setFilterName] = React.useState('');

  // localStorageから復元・保存（初回のみ復元→以降は保存）
  const didInit = React.useRef(false);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!didInit.current) {
      try {
        const saved = localStorage.getItem('checkedMount');
        if (saved) {
          const arr = JSON.parse(saved);
          if (Array.isArray(arr) && arr.every(x => typeof x === 'string')) {
            setCheckedMount(arr);
          }
        }
      } catch {}
      didInit.current = true;
      return;
    }
    try {
      localStorage.setItem('checkedMount', JSON.stringify(checkedMount));
    } catch {}
  }, [checkedMount]);

  // フィルタ・進捗ロジック
  const filteredList = mountList.filter(mount => {
    if (filterChecked === 'checked' && !checkedMount.includes(mount.name)) return false;
    if (filterChecked === 'unchecked' && checkedMount.includes(mount.name)) return false;
    if (filterName && !mount.name.includes(filterName)) return false;
    return true;
  });
  // 進捗率は全件に対するチェック数で計算
  const progress = mountList.length > 0 ? Math.round(checkedMount.length / mountList.length * 100) : 0;

  return (
    <>
      {/* ヘッダーとタブの間にスマホ用余白 */}
      <div className="h-3 md:h-0" />
      <nav className="mb-6">
        <ul className="flex gap-2 border-b border-blue-200">
          {checklistTabs.map(tab => (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${tab.href === '/checklist/mount' ? 'bg-white border-x border-t border-blue-200 text-blue-700' : 'bg-blue-50 text-blue-500 hover:bg-white'}`}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <h1 className="text-2xl font-bold mb-6">マウント一覧 チェックリスト</h1>
      <div className="mb-2 text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-4">
        <span>進捗: {checkedMount.length} / {mountList.length}</span>
      </div>
      <div className="w-full max-w-md mb-2 relative">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden relative">
          <div className="h-3 bg-green-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-green-900 select-none" style={{textShadow:'0 1px 2px #fff,0 0 2px #fff'}}>{progress}%</span>
        </div>
        <div className="text-[10px] text-gray-400 mt-1 ml-1">※ チェック状況は端末ごと・ブラウザごとに自動保存されます（ローカルストレージ利用）</div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4 items-center text-xs md:text-sm">
        <label>
          <select
            className="border rounded px-2 py-1 mr-2"
            value={filterChecked}
            onChange={e => setFilterChecked(e.target.value as 'all' | 'checked' | 'unchecked')}
          >
            <option value="all">すべて</option>
            <option value="checked">チェック済</option>
            <option value="unchecked">未チェック</option>
          </select>
        </label>
        <label>
          <input
            type="text"
            className="border rounded px-2 py-1 mr-2"
            placeholder="マウント名で検索"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
          />
        </label>
      </div>
      <section className="bg-white/90 rounded-2xl border border-blue-100 p-4 md:col-span-2 shadow transition hover:shadow-lg duration-200">
        {/* モバイル：カード型リスト */}
        <div className="block md:hidden">
          <ul className="space-y-3">
            {filteredList.map((mount) => (
              <li
                key={mount.name}
                className={
                  `border rounded-xl p-3 flex flex-col gap-1 shadow-sm transition cursor-pointer` +
                  (checkedMount.includes(mount.name) ? ' bg-green-100/70 border-green-200' : ' bg-white')
                }
                onClick={() => setCheckedMount(prev => prev.includes(mount.name) ? prev.filter(x => x !== mount.name) : [...prev, mount.name])}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checkedMount.includes(mount.name)}
                    onClick={e => e.stopPropagation()}
                    onChange={() => setCheckedMount(prev => prev.includes(mount.name) ? prev.filter(x => x !== mount.name) : [...prev, mount.name])}
                    className="w-5 h-5"
                  />
                  <span className="font-bold text-base text-blue-900">
                    {mount.name_url ? (
                      <a href={mount.name_url} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900 break-words">{mount.name}</a>
                    ) : mount.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-lg text-gray-700">{mount.ticket}</span>
                  <span className="text-gray-500">【銀】チケ</span>
                </div>
                {mount.remarks && (
                  <div className="text-xs text-gray-700 break-words">
                    {mount.remarks_url ? (
                      <a href={mount.remarks_url} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900 break-words">{mount.remarks}</a>
                    ) : mount.remarks}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* PC：従来のテーブル */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="min-w-[600px] w-full table-auto border border-gray-300 text-xs md:text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-2 whitespace-nowrap w-8">✔</th>
                <th className="p-2 whitespace-nowrap w-40">マウント名</th>
                <th className="p-2 whitespace-nowrap w-16">【銀】チケ</th>
                <th className="p-2 whitespace-nowrap min-w-[180px]">備考</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((mount) => (
                <tr
                  key={mount.name}
                  className={
                    `border-t hover:bg-blue-50 transition cursor-pointer` +
                    (checkedMount.includes(mount.name) ? ' bg-green-100/70' : '')
                  }
                  onClick={() => setCheckedMount(prev => prev.includes(mount.name) ? prev.filter(x => x !== mount.name) : [...prev, mount.name])}
                >
                  <td className="p-2 text-center align-middle">
                    <input
                      type="checkbox"
                      checked={checkedMount.includes(mount.name)}
                      onClick={e => e.stopPropagation()}
                      onChange={() => setCheckedMount(prev => prev.includes(mount.name) ? prev.filter(x => x !== mount.name) : [...prev, mount.name])}
                      className="w-6 h-6 cursor-pointer rounded border-2 border-blue-300 text-green-500 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                      style={{ minWidth: 24, minHeight: 24, background: '#f8fafc' }}
                    />
                  </td>
                  <td className="p-2 align-middle">
                    {mount.name_url ? (
                      <a href={mount.name_url} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900 break-words">{mount.name}</a>
                    ) : mount.name}
                  </td>
                  <td className="p-2 align-middle text-center">
                    <span style={{ fontSize: '1.5em', fontWeight: 'bold', lineHeight: 1 }}>{mount.ticket}</span>
                  </td>
                  <td className="p-2 align-middle break-words">
                    {mount.remarks_url ? (
                      <a href={mount.remarks_url} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900 break-words">{mount.remarks}</a>
                    ) : mount.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* フッタ前の余白 */}
      <div className="h-8 md:h-12" />
    </>
  );
}
