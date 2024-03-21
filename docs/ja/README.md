<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - プログラマー向けに設計された次世代の多用途ツールボックス
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">LafTools の Insider バージョンをプレビューする</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: このページは LafTools から内部的に生成されます。</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  日本語  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

これらの機能をすぐに使用できるように、安定したオンライン Web サイトを米国および中国地域に展開しました。特定の OS 機能に依存する一部のツールを除き、ほとんどのツールはオンライン Web サイトで入手できます。

- 🇺🇸 合衆国: [laftools.dev](https://laftools.dev)
- 🇨🇳 中国本土のみ: [laftools.cn](https://laftools.cn)

# 💡 導入

インターネット上には多数のツールが使用できるのに、なぜこのツールボックスを開発することにしたのか疑問に思われるかもしれません。 実際、コーデック、フォーマッタ、翻訳、QR コードなど、当社が提供するほとんどのツールはインターネット上で簡単に見つけることができます。しかし、これらのツールを使用することは、最も快適で効率的なアプローチではありません。

これらのオンライン ツールを使用しているときに、以下の問題に遭遇したことはありますか?

- オフラインでのアクセシビリティはありません。
- グローバルダークテーマはありません。
- 生産的な UI スタイルがありません。
- ネットワークパフォーマンスが低い。
- 不快な広告。
- データ漏洩問題。

上記のいずれかの答えが「はい」の場合は、当社のツールボックスを試してみることを検討してください。次の機能を提供します。

- フォスフォーエバー
- 軽量ランタイム
- 完全なプラットフォームのサポート (ARMv8 を含む)
- GPT と同様の完全なサポート
- 生産性の高い UI と高度に統合
- 利用可能な Docker イメージとポータブル エディション
- メモやマニュアルなどの追加のヘルパー

# 🌠 プレビュー

> LafTools はまだ開発中であるため、その UI、依存関係、または前提条件は必要に応じて変更される可能性があります。

### プレビュー:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 はじめる

## 1. システム環境のセットアップ

わかりやすくするために、このリポジトリを Windows の `C:\Usersjerry\project\laftools-repo` または Linux/MacOS の `/Users/jerry/projects/laftools-repo` にクローンしたとします。その後、ファイル **~/.bashrc* で env を宣言し、以下の構成を設定する必要があります。 *、またはコマンドを実行する前に単にそれらを実行します。

Windows OS を使用している場合は、すべてのコマンドが git-bash で実行されていることを確認してください。詳細については、[貢献](/docs/ja/CONTRIBUTION.md) を参照してください。これとは別に、このプロジェクトが配置されているファイル パスでは空白文字や英語以外の文字を使用しないことをお勧めします。

**Env for Windows:**

```bash
git config core.ignorecase false
export LAFTOOLS_ROOT="C:\users\jerry\project\laftools-repo"
export PATH=$PATH:$LAFTOOLS_ROOT\dev\source\windows-bin
```

**Env for Linux/MacOS:**

```bash
export LAFTOOLS_ROOT=/users/jerry/projects/laftools-repo
```

## 2. Compile and Run

```bash
# 必要なグローバル ライブラリをインストールする
npm i -g pnpm ts-node typescript

# プロジェクトdepsをインストールする
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# run core service
npm run fe-web

```

## 3. 建てる

```bash
cd pipeline
./build-all.sh "v1.9.9-beta"
```

# 🌱 名前は何ですか？

#### _The Tools for Laffin' At Life_

このプロジェクトの名前は、チェット アトキンスによる 1987 年の古典的なカントリー ソング「Laffin' At Life」からインスピレーションを受けており、作者の心の中で特別な場所を占めています。

LafTools があなたの日常業務を簡素化し、残業の必要性を減らし、健康的なワークライフバランスの維持に役立つことを願っています。ただ、人生をのんびり過ごしましょう!

# 📑 その他の素材

このプロジェクトについてさらに詳しく知りたい場合は、以下の資料を参照してください。

- [よくある質問](/docs/ja/FAQ.md)
- [貢献](/docs/ja/CONTRIBUTION.md)
- [中国の開発者向け](/devtools/notes/common/issues.md)

# 💐 Icons

以下の美しいアイコンを提供してくださった才能あるアーティストに感謝します。
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 謝辞

このプロジェクトは、素晴らしいオープンソース プロジェクトがなければ実現しなかったでしょう。私は個人的に以下の方々に深く感謝の意を表したいと思います。

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

確かに、このプロジェクトに利益をもたらし、促進した他のオープンソース プロジェクトもありますが、このパートでは詳しく説明しませんでした。これらのプロジェクトと人材開発者の努力がなければ、LafTools は不可能でした。

Thank you!

Ryan Laf  
2023 年 2 月 2 日

# 🪪 License

このプロジェクトは GNU Affero General Public License の下で保護されています。詳細については、LICENSE ファイルを参照してください。
