"use client";
import * as React from "react";
import { faceList } from './faceList';
import Link from 'next/link';

const checklistTabs = [
  { label: 'フェイス', href: '/checklist/face' },
  { label: 'マウント', href: '/checklist/mount' },
];

type Props = {
  roleOptions: string[];
};

export default function FaceChecklistClient({ roleOptions }: Props) {
  const [checkedFace, setCheckedFace] = React.useState<string[]>([]);
  const [filterChecked, setFilterChecked] = React.useState<'all' | 'checked' | 'unchecked'>('all');
  const [filterName, setFilterName] = React.useState('');
  const [filterRole, setFilterRole] = React.useState('');

  // localStorageから復元・保存（初回のみ復元→以降は保存）
  const didInit = React.useRef(false);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!didInit.current) {
      try {
        const saved = localStorage.getItem('checkedFace');
        if (saved) {
          const arr = JSON.parse(saved);
          if (Array.isArray(arr) && arr.every(x => typeof x === 'string')) {
            const valid = arr.filter(name => faceList.some(f => f.name === name));
            setCheckedFace(valid);
          }
        }
      } catch {}
      didInit.current = true;
      return;
    }
    try {
      localStorage.setItem('checkedFace', JSON.stringify(checkedFace));
    } catch {}
  }, [checkedFace]);

  // フィルタ・進捗ロジック
  const filteredList = faceList.filter(face => {
    if (filterChecked === 'checked' && !checkedFace.includes(face.name)) return false;
    if (filterChecked === 'unchecked' && checkedFace.includes(face.name)) return false;
    if (filterName && !face.name.includes(filterName)) return false;
    if (filterRole && face.role !== filterRole) return false;
    return true;
  });
  // 進捗率は全件に対するチェック数で計算
  const progress = faceList.length > 0 ? Math.round(checkedFace.length / faceList.length * 100) : 0;

  return (
    <>
      <nav className="mb-6">
        <ul className="flex gap-2 border-b border-blue-200">
          {checklistTabs.map(tab => (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${tab.href === '/checklist/face' ? 'bg-white border-x border-t border-blue-200 text-blue-700' : 'bg-blue-50 text-blue-500 hover:bg-white'}`}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <h1 className="text-2xl font-bold mb-6">フェイス一覧 チェックリスト</h1>
      <div className="mb-2 text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-4">
        <span>進捗: {checkedFace.length} / {faceList.length}（{progress}%）</span>
      </div>
      <div className="w-full max-w-md mb-2">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-3 bg-green-400 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
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
            placeholder="フェイス名で検索"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
          />
        </label>
        <label>
          <select
            className="border rounded px-2 py-1"
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
          >
            <option value="">戦闘タイプ指定なし</option>
            {roleOptions.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </label>
      </div>
      <section className="bg-white/90 rounded-2xl border border-blue-100 p-4 md:col-span-2 shadow transition hover:shadow-lg duration-200">
        <div className="overflow-x-auto w-full">
          <table className="min-w-[700px] w-full table-auto border border-gray-300 text-xs md:text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-2 whitespace-nowrap w-8">✔</th>
                <th className="p-2 whitespace-nowrap w-32">フェイス名</th>
                <th className="p-2 whitespace-nowrap w-24">戦闘タイプ</th>
                <th className="p-2 whitespace-nowrap min-w-[180px]">備考</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((face) => (
                <tr
                  key={face.name}
                  className={
                    `border-t hover:bg-blue-50 transition cursor-pointer` +
                    (checkedFace.includes(face.name) ? ' bg-green-100/70' : '')
                  }
                  onClick={() => setCheckedFace(prev => prev.includes(face.name) ? prev.filter(x => x !== face.name) : [...prev, face.name])}
                >
                  <td className="p-2 text-center align-middle">
                    <input
                      type="checkbox"
                      checked={checkedFace.includes(face.name)}
                      onClick={e => e.stopPropagation()}
                      onChange={() => setCheckedFace(prev => prev.includes(face.name) ? prev.filter(x => x !== face.name) : [...prev, face.name])}
                    />
                  </td>
                  <td className="p-2 align-middle">
                    {face.link ? (
                      <a href={face.link} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900 break-words">{face.name}</a>
                    ) : face.name}
                  </td>
                  <td className="p-2 align-middle break-words">{face.role}</td>
                  <td className="p-2 align-middle break-words">
                    <span className="font-semibold text-gray-700">{face.flag}</span>
                    {face.remarks && <><br /><span className="text-gray-600">{face.remarks}</span></>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
