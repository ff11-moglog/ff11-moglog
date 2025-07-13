'use client';

import * as React from "react";

import Head from 'next/head';

import { useState } from 'react';

type Face = {
  name: string;
  job: string;
  role: string;
  link: string;
  flag: string;
  remarks: string;
};

const faceList: Face[] = [
{name:'クリルラ',job:'ナイト／ナイト',role:'盾',link:'https://wiki.ffo.jp/html/2112.html',flag:'三国ミッション2-3',remarks:'ドラギーユ城(I-9)Curillaと話す'},
{name:'ラーアル',job:'ナイト／戦士',role:'盾',link:'https://wiki.ffo.jp/html/1924.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'三国個人戦績から交換(1000点)'},
{name:'トリオン',job:'ナイト／戦士',role:'盾',link:'https://wiki.ffo.jp/html/2110.html',flag:'三国ミッション5-2',remarks:'ドラギーユ城(H-7)Door:Prince Royal\'s Rmを調べる'},
{name:'ゲッショー',job:'忍者／戦士',role:'盾',link:'https://wiki.ffo.jp/html/1443.html',flag:'アトルガンミッション「泡沫の宝冠」',remarks:'アトルガン白門(J-12)Cushionを調べる'},
{name:'メネジン',job:'ナイト／ナイト',role:'盾',link:'https://wiki.ffo.jp/html/2003.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'アサルト作戦戦績と交換(3000点)'},
{name:'ルガジーン',job:'ナイト／ナイト',role:'盾',link:'https://wiki.ffo.jp/html/702.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ヴァレンラール',job:'ナイト／戦士',role:'盾',link:'https://wiki.ffo.jp/html/13966.html',flag:'エミネンス・レコード＞チュートリアル＞基礎編',remarks:'「フェイスを呼び出す」（またはアルタナ連合軍戦績と交換(2000点)）'},
{name:'アムチュチュ',job:'魔導剣士／戦士',role:'盾',link:'https://wiki.ffo.jp/html/27931.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'PCKワークスで同盟戦績と交換(2000ベヤルド)'},
{name:'オーグスト',job:'ナイト／戦士',role:'盾',link:'https://wiki.ffo.jp/html/27965.html',flag:'シニスターレインの報酬',remarks:'またはエミネンス・レコードクエスト3「もっともっと絆パワーですわ！」'},
{name:'アークEV',job:'ナイト／白魔道士',role:'盾',link:'https://wiki.ffo.jp/html/1989.html',flag:'エミネンス・レコードクエスト3「驕慢で腐らせろ」',remarks:''},
{name:'アークHM',job:'戦士／忍者',role:'盾',link:'https://wiki.ffo.jp/html/1990.html',flag:'エミネンス・レコードクエスト3「無知でうつろにしろ」',remarks:''},
{name:'エグセニミル',job:'ナイト／ナイト',role:'近接物理',link:'https://wiki.ffo.jp/html/10130.html',flag:'クエスト「新魔法フェイス（サンドリア）」',remarks:''},
{name:'ハルヴァー',job:'ナイト／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/4230.html',flag:'星唄ミッション第1章「第一の定め」',remarks:'ドラギーユ城のHalverと話す'},
{name:'アヤメ',job:'侍／侍',role:'近接物理',link:'https://wiki.ffo.jp/html/2977.html',flag:'三国ミッション2-3',remarks:'大工房2階(K-7)Ayameと話す'},
{name:'シド',job:'戦士／狩人',role:'近接物理',link:'https://wiki.ffo.jp/html/2719.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'エミネンス・レコード案内人から交換(500エミネンス)'},
{name:'アイアンイーター',job:'戦士／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/2956.html',flag:'フェイスを習得済（ナジ、アヤメ、フォルカー）',remarks:'大工房(J-8)Iron Eaterと話す'},
{name:'ナジ',job:'戦士／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/2980.html',flag:'クエスト「新魔法フェイス（バストゥーク）」',remarks:''},
{name:'フォルカー',job:'戦士／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/2972.html',flag:'三国ミッション5-2',remarks:'大工房(J-9)Luciusと話す'},
{name:'ザイド',job:'暗黒騎士／暗黒騎士',role:'近接物理',link:'https://wiki.ffo.jp/html/2975.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ザイドII',job:'暗黒騎士／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/2975.html',flag:'星唄ミッション第1章「使者ヴォルトオスクーロ」',remarks:''},
{name:'ナナー・ミーゴ',job:'シーフ／シーフ',role:'近接物理',link:'https://wiki.ffo.jp/html/1353.html',flag:'三国ミッション2-3クエスト「仲良くしたい？」',remarks:'ウィンダス森の区(J-3)Nanaa Mihgoと話す'},
{name:'アルド',job:'シーフ／忍者',role:'近接物理',link:'https://wiki.ffo.jp/html/3493.html',flag:'冒険者さんありがとうキャンペーン（期間限定）',remarks:'イベントモーグリ横の箱から入手'},
{name:'マート',job:'モンク',role:'近接物理',link:'https://wiki.ffo.jp/html/335.html',flag:'クエスト「星の輝きを手に」を6つのジョブでクリア',remarks:'ル・ルデの庭Maatと話す'},
{name:'ミルドリオン',job:'ナイト／侍',role:'近接物理',link:'https://wiki.ffo.jp/html/5461.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'プリッシュ',job:'モンク／白魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/698.html',flag:'プロマシアミッション「呪縛ほどけるとき」',remarks:'タブナジア地下壕(K-7)Walnut Doorを調べる'},
{name:'プリッシュII',job:'白魔道士／モンク',role:'近接物理',link:'https://wiki.ffo.jp/html/698.html',flag:'星唄ミッション第2章「候ふ者たち」',remarks:''},
{name:'セルテウス',job:'ナイト／侍',role:'近接物理',link:'https://wiki.ffo.jp/html/2005.html',flag:'星唄ミッション第2章「澄んだ空の下」',remarks:''},
{name:'スカリーZ',job:'竜騎士／白魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/10634.html',flag:'プロマシアミッション「みっつの道」',remarks:'ウィンダス森の区Perih Vashaiと話す'},
{name:'テンゼン',job:'侍／侍',role:'近接物理',link:'https://wiki.ffo.jp/html/3279.html',flag:'エミネンス・レコード＞チュートリアル＞基礎編',remarks:'「ミリ・アリアポーを呼び出す」（または三国個人戦績から交換(1000点)）'},
{name:'アブクーバ',job:'戦士／モンク',role:'近接物理',link:'https://wiki.ffo.jp/html/7229.html',flag:'星唄ミッション第2章「無頼な風 」',remarks:'アトルガン白門のAbquhbahと話す'},
{name:'ルザフ',job:'コルセア／忍者',role:'近接物理',link:'https://wiki.ffo.jp/html/4869.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ナジャ・サラヒム',job:'モンク／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/1355.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ナシュメラ',job:'からくり士／白魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/2000.html',flag:'アトルガンミッション「永遠の傭兵」',remarks:'アトルガン白門(L-9)Imperial Whitegateを調べる'},
{name:'ナシュメラII',job:'白魔道士／からくり士',role:'近接物理',link:'https://wiki.ffo.jp/html/2000.html',flag:'星唄ミッション第2章「無頼な風 」',remarks:''},
{name:'ロンジェルツ',job:'戦士／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/12549.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ザザーグ',job:'モンク／モンク',role:'近接物理',link:'https://wiki.ffo.jp/html/703.html',flag:'アトルガンクエスト「土噛みし拳」',remarks:'アトルガン白門(K-12)Fari-Wariと話す'},
{name:'アレヴァト',job:'戦士／ナイト',role:'近接物理',link:'https://wiki.ffo.jp/html/14811.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'エグセニミルII',job:'戦士／ナイト',role:'近接物理',link:'https://wiki.ffo.jp/html/10130.html',flag:'アルタナクエスト「それぞれの未来へ」だいじなもの「未完成のスクロールの束」',remarks:'南サンドリア〔Ｓ〕(E-7)Rholontと話す'},
{name:'クララ',job:'戦士／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/13986.html',flag:'アルタナクエスト「己の行く先に」だいじなもの「未完成のスクロールの束」',remarks:'バストゥーク商業区〔Ｓ〕(H-6)Gentle Tigerと話す'},
{name:'レコ・ハボッカ',job:'シーフ／黒魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/14817.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ルー・マカラッカ',job:'獣使い／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/13879.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'ウィンダス水の区〔Ｓ〕(G-7)Shuvoから連合軍戦績と交換(1000点)'},
{name:'リリゼット',job:'踊り子／踊り子',role:'近接物理',link:'https://wiki.ffo.jp/html/15338.html',flag:'アルタナクエスト「禁断の再会」',remarks:'アルタナミッションとクエスト「暁よりの使者、再び」のクリアが必要'},
{name:'リリゼットII',job:'踊り子／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/15338.html',flag:'星唄ミッション第2章「仮面の一味」',remarks:''},
{name:'マクシミリアン',job:'シーフ／忍者',role:'近接物理',link:'https://wiki.ffo.jp/html/14391.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'バストゥーク商業区〔Ｓ〕(F-9)Shenniから連合軍戦績と交換(1000点)'},
{name:'マヤコフ',job:'踊り子／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/15335.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ノユリ',job:'侍／ナイト',role:'近接物理',link:'https://wiki.ffo.jp/html/13883.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'南サンドリア〔Ｓ〕(F-9)Shixoから連合軍戦績と交換(1000点)'},
{name:'ライニマード',job:'赤魔道士／ナイト',role:'近接物理',link:'https://wiki.ffo.jp/html/3980.html',flag:'だいじなもの「未完成のスクロールの束」',remarks:'バタリア丘陵〔Ｓ〕(J-7)Shaneneと話す'},
{name:'バラモア',job:'暗黒騎士／黒魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/31742.html',flag:'星唄ミッション第2章「面汚し」',remarks:''},
{name:'ロマー・ミーゴ',job:'シーフ／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/2099.html',flag:'アルタナクエスト「魂の果て」だいじなもの「未完成のスクロールの束」',remarks:'ウィンダス水の区〔Ｓ〕北(G-11)Romaa Mihgoと話す。'},
{name:'チャチャルン',job:'シーフ／狩人',role:'近接物理',link:'https://wiki.ffo.jp/html/31662.html',flag:'クエスト「チャチャルンの試練」',remarks:'モグガーデンのモンスター飼育ランク3が必要'},
{name:'ダラクァルン',job:'戦士／赤魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/30958.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'イングリッドII',job:'白魔道士／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/30112.html',flag:'シニスターレインの報酬',remarks:'またはエミネンス・レコードクエスト3「もっと絆パワーですわ！」'},
{name:'レイ・ランガヴォ',job:'モンク／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/27981.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'モリマー',job:'獣使い／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/31458.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'PCKワークスで同盟戦績と交換(2000ベヤルド)'},
{name:'テオドール',job:'黒魔道士／暗黒騎士',role:'近接物理',link:'https://wiki.ffo.jp/html/29090.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'アベンツィオ',job:'モンク／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/32069.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'アークGK',job:'侍／竜騎士',role:'近接物理',link:'https://wiki.ffo.jp/html/1992.html',flag:'エミネンス・レコードクエスト3「憎悪で焼きこがせ」',remarks:''},
{name:'アークMR',job:'獣使い／シーフ',role:'近接物理',link:'https://wiki.ffo.jp/html/1991.html',flag:'エミネンス・レコードクエスト3「嫉妬でかじりとれ」',remarks:''},
{name:'ウェイレア',job:'モンク／モンク',role:'近接物理',link:'https://wiki.ffo.jp/html/14456.html',flag:'イベント「サンシャインシーカー」（期間限定）',remarks:''},
{name:'ファブリニクス',job:'シーフ／赤魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/22808.html',flag:'冒険者さんありがとうキャンペーン（期間限定）',remarks:'イベントモーグリ横の箱から入手'},
{name:'ギルガメッシュ',job:'侍／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/1174.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'エミネンス・レコード案内人から交換(500エミネンス)'},
{name:'イロハ',job:'侍／白魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/33746.html',flag:'星唄ミッション第3章「雲ひとつなし」',remarks:''},
{name:'イロハII',job:'侍／白魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/33746.html',flag:'星唄ミッション第3章「すべてが星の唄となる」',remarks:''},
{name:'ライオン',job:'シーフ／シーフ',role:'近接物理',link:'https://wiki.ffo.jp/html/4352.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ライオンII',job:'シーフ／忍者',role:'近接物理',link:'https://wiki.ffo.jp/html/4352.html',flag:'星唄ミッション第1章「時のない世界」',remarks:''},
{name:'ミュモル',job:'踊り子／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/15683.html',flag:'イベント「ミュモル★ヒロインショー」（期間限定）',remarks:''},
{name:'ウカ・トトゥリン',job:'踊り子／戦士',role:'近接物理',link:'https://wiki.ffo.jp/html/17850.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'マツイP',job:'忍者／黒魔道士',role:'近接物理',link:'https://wiki.ffo.jp/html/38112.html',flag:'期間限定',remarks:''},
{name:'セミ・ラフィーナ',job:'狩人／戦士',role:'遠隔物理',link:'https://wiki.ffo.jp/html/1845.html',flag:'星唄ミッション第1章「第一の定め」',remarks:'天の塔のKupipiと話す'},
{name:'マッキーチェブキー',job:'狩人／黒魔道士',role:'遠隔物理',link:'https://wiki.ffo.jp/html/5258.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'三国個人戦績から交換(1000点)'},
{name:'テンゼンII',job:'侍／狩人',role:'遠隔物理',link:'https://wiki.ffo.jp/html/3279.html',flag:'星唄ミッション第2章「波の向こうに」',remarks:''},
{name:'ナジュリス',job:'狩人／狩人',role:'遠隔物理',link:'https://wiki.ffo.jp/html/704.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'エリヴィラ',job:'狩人／戦士',role:'遠隔物理',link:'https://wiki.ffo.jp/html/14392.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'バストゥーク商業区〔Ｓ〕(F-9)Shenniから連合軍戦績と交換(1000点)'},
{name:'マルグレート',job:'狩人／シーフ',role:'遠隔物理',link:'https://wiki.ffo.jp/html/27983.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'PCKワークスで同盟戦績と交換(2000ベヤルド)'},
{name:'アジドマルジド',job:'黒魔道士／赤魔道士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/1643.html',flag:'三国ミッション5-2',remarks:'ウィンダス森の区(H-9)Apururuと話す。WM6-1～9-1進行中は不可'},
{name:'シャントット',job:'黒魔道士／黒魔道士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/34935.html',flag:'三国ミッション5-2ウィンダスクエスト「ゴーレムのまなざし」フェイスを習得済（クリルラ、アヤメ、ナナー・ミーゴ）フェイスを習得済（トリオン、フォルカー、アジドマルジド）',remarks:'ウィンダス石の区(K-7)Shantottoと話す'},
{name:'シャントットII',job:'黒魔道士／白魔道士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/34935.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'クッキーチェブキー',job:'黒魔道士／黒魔道士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/7856.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'三国個人戦績から交換(1000点)'},
{name:'ガダラル',job:'黒魔道士／黒魔道士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/701.html',flag:'アトルガンクエスト「炎熾す鎌」',remarks:'アトルガン白門(K-12)Fari-Wariと話す'},
{name:'アヴゼン',job:'赤魔道士／黒魔道士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/8609.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'アサルト作戦戦績と交換(3000点)'},
{name:'アーデルハイト',job:'学者／黒魔道士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/14393.html',flag:'エミネンス・レコード＞チュートリアル＞基礎編',remarks:'「テンゼンを呼び出す」（またはアルタナ連合軍戦績と交換(2000点)）'},
{name:'カイルパイル',job:'黒魔道士／召喚士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/13200.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'ウィンダス水の区〔Ｓ〕(G-7)Shuvoから連合軍戦績と交換(1000点)'},
{name:'レオノアーヌ',job:'黒魔道士／ナイト',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/13956.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'南サンドリア〔Ｓ〕(F-9)Shixoから連合軍戦績と交換(1000点)'},
{name:'ロベルアクベル',job:'黒魔道士／召喚士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/13632.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'イングリッド',job:'白魔道士／白魔道士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/30112.html',flag:'アドゥリンミッション「イングリッド」',remarks:'東アドゥリン(J-7)Rigobertineと話す'},
{name:'ロスレーシャ',job:'黒魔道士／暗黒騎士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/29315.html',flag:'シニスターレインの報酬',remarks:'またはエミネンス・レコードクエスト3「絆パワーですわ！」'},
{name:'アークTT',job:'黒魔道士／暗黒騎士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/1988.html',flag:'エミネンス・レコードクエスト3「怯懦で押しつぶせ」',remarks:''},
{name:'D.シャントット',job:'黒魔道士／暗黒騎士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/18249.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ミュモルII',job:'黒魔道士／踊り子',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/15683.html',flag:'イベント「ミュモル★ヒロインショー」（期間限定）',remarks:''},
{name:'ウルゴア',job:'黒魔道士／暗黒騎士',role:'魔法攻撃',link:'https://wiki.ffo.jp/html/17859.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'クピピ',job:'白魔道士／白魔道士',role:'回復',link:'https://wiki.ffo.jp/html/3995.html',flag:'クエスト「新魔法フェイス（ウィンダス）」',remarks:''},
{name:'モンブロー',job:'ナイト／魔導剣士',role:'回復',link:'https://wiki.ffo.jp/html/4379.html',flag:'プロマシアミッション「鎖と絆」',remarks:'ル・ルデの庭(I-7)Taillegeasと話す'},
{name:'チェルキキ',job:'白魔道士／黒魔道士',role:'回復',link:'https://wiki.ffo.jp/html/7857.html',flag:'ディード480の報酬',remarks:''},
{name:'ミリ・アリアポー',job:'白魔道士／白魔道士',role:'回復',link:'https://wiki.ffo.jp/html/272.html',flag:'エミネンス・レコード＞チュートリアル＞基礎編',remarks:'「ヴァレンラールを呼び出す」（またはアトルガン皇国軍戦績と交換(2000点)）'},
{name:'フェリアスコフィン',job:'白魔道士／戦士',role:'回復',link:'https://wiki.ffo.jp/html/15877.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'エミネンス・レコード案内人から交換(500エミネンス)'},
{name:'カラハバルハ',job:'白魔道士／召喚士',role:'回復',link:'https://wiki.ffo.jp/html/1645.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'ユグナス',job:'白魔道士／ナイト',role:'回復',link:'https://wiki.ffo.jp/html/27930.html',flag:'エミネンス・レコードクエスト2「アシェラ激励指令」',remarks:'アドゥリンミッション・クエストの全クリアが必要'},
{name:'キング・オブ・ハーツ',job:'赤魔道士／白魔道士',role:'支援',link:'https://wiki.ffo.jp/html/4307.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'エミネンス・レコード案内人から交換(500エミネンス)'},
{name:'コルモル',job:'赤魔道士／白魔道士',role:'支援',link:'https://wiki.ffo.jp/html/1867.html',flag:'エミネンス・レコード＞チュートリアル＞応用編',remarks:'「アイテムレベルを117にする」（またはField Manualから交換(300葉)）'},
{name:'ウルミア',job:'吟遊詩人／吟遊詩人',role:'支援',link:'https://wiki.ffo.jp/html/4752.html',flag:'プロマシアミッション「暁」',remarks:'ミザレオ海岸(I-11)Dilapidated Gateを調べる'},
{name:'クルタダ',job:'コルセア／狩人',role:'支援',link:'https://wiki.ffo.jp/html/3352.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'エミネンス・レコード案内人から交換(500エミネンス)'},
{name:'アシェラ',job:'赤魔道士／ナイト',role:'支援',link:'https://wiki.ffo.jp/html/28624.html',flag:'アドゥリンミッション「若き指導者」',remarks:'ケイザック古戦場(J-10)Sandy Overlookを調べる'},
{name:'アシェラII',job:'赤魔道士／黒魔道士',role:'支援',link:'https://wiki.ffo.jp/html/28624.html',flag:'星唄ミッション第3章「遺跡の奥に」',remarks:''},
{name:'ヨアヒム',job:'吟遊詩人／白魔道士',role:'支援',link:'https://wiki.ffo.jp/html/20829.html',flag:'エミネンス・レコード＞チュートリアル＞基礎編',remarks:'「アーデルハイトを呼び出す」（またはアビセアでクルオと交換(5000クルオ)）'},
{name:'ブリジッド',job:'-',role:'支援(特殊)',link:'https://wiki.ffo.jp/html/4474.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'星の神子',job:'-',role:'支援(特殊)',link:'https://wiki.ffo.jp/html/1391.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'クイン・ハスデンナ',job:'-',role:'支援(特殊)',link:'https://wiki.ffo.jp/html/29309.html',flag:'ログインキャンペーン（期間限定）',remarks:''},
{name:'クポフリート',job:'-',role:'支援(特殊)',link:'https://wiki.ffo.jp/html/20475.html',flag:'冒険者さんありがとうキャンペーン（期間限定）',remarks:'イベントモーグリ横の箱から入手'},
{name:'モーグリ',job:'-',role:'支援(特殊)',link:'https://wiki.ffo.jp/html/15690.html',flag:'冒険者さんありがとうキャンペーン（期間限定）',remarks:'イベントモーグリ横の箱から入手'},
{name:'サクラ',job:'-',role:'支援(特殊)',link:'https://wiki.ffo.jp/html/11544.html',flag:'フェイスゲットキャンペーン（期間限定）',remarks:'Field Manualから交換(300葉)'},
{name:'コーネリア',job:'-',role:'支援(特殊)',link:'https://wiki.ffo.jp/html/2094.html',flag:'期間限定',remarks:''},

];
export default function Checklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const [filterChecked, setFilterChecked] = useState<'all' | 'checked' | 'unchecked'>('all');
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [restored, setRestored] = React.useState(false);

  // localStorageから復元（初回のみ）
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ff11-moglog-face-checked');
      if (saved) {
        try {
          const arr = JSON.parse(saved);
          if (Array.isArray(arr)) {
            setChecked(arr);
          }
        } catch {}
      }
      setRestored(true);
    }
  }, []);

  // localStorageへ保存（復元前は保存しない）
  React.useEffect(() => {
    if (typeof window !== 'undefined' && restored) {
      localStorage.setItem('ff11-moglog-face-checked', JSON.stringify(checked));
    }
  }, [checked, restored]);

  const toggle = (f: string) =>
    setChecked(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );

  // 絞り込み処理
  const filteredList = faceList.filter(face => {
    // チェック状態
    if (filterChecked === 'checked' && !checked.includes(face.name)) return false;
    if (filterChecked === 'unchecked' && checked.includes(face.name)) return false;
    // フェイス名
    if (filterName && !face.name.includes(filterName)) return false;
    // 戦闘タイプ
    if (filterRole && face.role !== filterRole) return false;
    return true;
  });

  // 戦闘タイプ一覧を自動生成
  const roleOptions = Array.from(new Set(faceList.map(f => f.role))).filter(Boolean);

  return (
    <>
        <Head>
          <title>モグログ | FF11プレイヤーのための便利サイト</title>
          <meta name="description" content="FF11（ファイナルファンタジーXI）プレイヤー向けサイト『モグログ』。最新キャンペーン、クエスト・ミッションの進捗管理、装備・マウントのチェックリストを提供。" />
          <meta name="keywords" content="FF11,ファイナルファンタジー11,モグログ,クエスト,ミッション,チェックリスト" />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="モグログ | FF11便利サイト" />
          <meta property="og:site_name" content="Moglog"></meta>
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
          <div className="w-full max-w-7xl px-2 md:px-6 mt-0 md:mt-6">

            {/* News */}
            <section className="bg-white/90 rounded-2xl border border-blue-100 p-4 md:col-span-2 shadow transition hover:shadow-lg duration-200">
 
                <h1 className="text-2xl font-bold mb-6">フェイス一覧 チェックリスト</h1>
                {/* 進捗表示 */}
                <div className="mb-2 text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-4">
                  <span>
                    進捗: {checked.length} / {faceList.length}（{faceList.length > 0 ? Math.round(checked.length / faceList.length * 100) : 0}%）
                  </span>
                </div>
                {/* 進捗バー */}
                <div className="w-full max-w-md mb-2">
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-green-400 transition-all duration-300"
                      style={{ width: `${faceList.length > 0 ? (checked.length / faceList.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                {/* フィルタUI */}
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
                      {filteredList.map(face => (
                        <tr
                          key={face.name}
                          className={
                            `border-t hover:bg-blue-50 transition cursor-pointer` +
                            (checked.includes(face.name) ? ' bg-green-100/70' : '')
                          }
                          onClick={() => toggle(face.name)}
                        >
                          <td className="p-2 text-center align-middle">
                            <input
                              type="checkbox"
                              checked={checked.includes(face.name)}
                              onClick={e => e.stopPropagation()}
                              onChange={() => toggle(face.name)}
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
                            {face.remarks && (
                              <>
                                <br />
                                <span className="text-gray-600">{face.remarks}</span>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </section>
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
