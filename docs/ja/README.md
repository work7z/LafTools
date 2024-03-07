<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - プログラマー向けに設計された次世代の多用途ツールボックス
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">LafTools の Insider バージョンをプレビューする</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

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

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 はじめる

## 0. リファクタリング

最近、next.js に基づいて LafTools のアーキテクチャをリファクタリングしています。以下の手順は必要に応じて変更される可能性があります。

## 1. システム環境のセットアップ

話を簡単にするために、このリポジトリを Windows の `C:\\Users\jerry\\project\\laftools-repo` または Windows の `/Users/jerry/projects/laftools-repo` に複製したとします。 Linux/MacOS の場合は、ファイル **~/.bashrc** で env を宣言し、以下の config を設定するか、コマンドを実行する前にそれらを実行する必要があります。

Windows OS を使用している場合は、すべてのコマンドが git-bash で実行されていることを確認してください。詳細については、[CONTRIBUTION](./docs/CONTRIBUTION.md) を参照してください。これとは別に、このプロジェクトが配置されているファイル パスでは空白文字や英語以外の文字を使用しないことをお勧めします。

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

## 2. Go サービスの起動 (リファクタリング)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

Go サービスをデバッグするには、VSCode で構成しました。次の手順に従うだけです。

1. Enter Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Launch FrontEnd Module (Moved to web2)

```bash
# install required global library
npm i -g pnpm ts-node typescript

# install project deps
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # It's for Windows Only, it will close all terminals and previous processes.

# run web service on terminal 1
npm run fe-web

# run CSS processor on terminal 2
npm run fe-css

# run extra jobs on terminal 3
npm run fe-extra

```

Note that you can use the '&' symbol for background execution if you don't want to alternatively run these commands in separate terminal instances.

## 4. Start Developing

Once the Go service is running, you should be able to see a link printed out in the terminal. Now, copy this URL and paste it into your browser to start developing, let's go!

Example:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Build

```bash
cd pipeline
./build-all.sh
```

# 🌱 What's with the name?

#### _The Tools for Laffin' At Life_

The name of this project is inspired by 'Laffin' At Life', a classic country song from 1987 by Chet Atkins that also has a special place in the author's heart.

Hopefully LafTools will make your daily tasks easier, reducing the need for overtime and helping you maintain a healthy work-life balance, let us just laffin' at life!

# 📑 Other Materials

Below are further materials that you can have a look if you'd like to learn more detail about this project:

- [FAQ](./docs/FAQ.md)
- [CONTRIBUTION](./docs/ja/CONTRIBUTION.md)
- [For China Developers](devtools/notes/common/issues.md)

# 💐 Icons

We would appreciate talent artists who provided below beautiful icons:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Acknowledgements

This project would not have been possible without awesome open source projects which I would like to personally express my deepest gratitude to:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

For sure, there are other open source projects that have benefited and facilitated this project, which I couldn't detail in this part; Without these projects and these talent developers' efforts, LafTools would not have been possible.

Thank you!

Ryan Laf  
Feb. 2nd, 2023

# 🪪 License

This project is protected under the GNU Affero General Public License, please see the LICENSE file for more details.
