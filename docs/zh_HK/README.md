<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - 專為程式設計師設計的下一代多功能工具箱
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">預覽LafTools工具箱的 Insider 版本</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: 該頁面是由LafTools工具箱內部產生的。</i> <br/> [English](/docs/en_US)  |  [简体中文](/docs/zh_CN)  |  繁體中文  |  [Deutsch](/docs/de)  |  [Español](/docs/es)  |  [Français](/docs/fr)  |  [日本語](/docs/ja)  |  [한국어](/docs/ko) | [More](/docs/) <br/>

# 💡 介紹

您可能想知道為什麼我們決心開發這個工具箱，因為網路上有很多工具可以使用。 確實，我們提供的大多數工具都可以在互聯網上輕鬆找到，例如編解碼器、格式化程式、翻譯、二維碼等……但是，使用這些工具並不是最舒適和最有效的方法。

您在使用這些線上工具時是否遇到以下問題？

- 無法離線存取。
- 沒有全域黑暗主題。
- 沒有高效率的 UI 風格。
- 網路效能差。
- 令人不安的廣告。
- 資料外洩問題。

如果以上任一問題的答案是肯定的，那麼您應該考慮嘗試我們的工具箱。它具有以下功能：

- 永遠的自由軟體
- 輕量級運轉時
- 全平台支援（包括ARMv8）
- 完全類似 GPT 的支持
- 與高效的 UI 高度集成
- 可用的 Docker 映像和便攜式版本
- 額外的幫助，如註釋、手冊等......

# 🌠 預覽

> LafTools工具箱仍在開發中，其 UI、相依性或先決條件可能會根據需要進行變更。

### 預覽:

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 入門

## 0. 重構

最近，我們正在基於next.js重構LafTools工具箱的架構，以下步驟可能會根據需要進行變更。

## 1. 設定係統環境

為了簡單起見，假設您已將此儲存庫克隆到 Windows 上的 `C:\Usersjerry\project\laftools-repo` 或 Linux/MacOS 上的 `/Users/jerry/projects/laftools-repo`，那麼您應該在檔案 **~/.bashrc* 中聲明 env 並在下方設定設定* ，或者只是在運行任何命令之前執行它們。

如果您使用的是 Windows 作業系統，請確保所有指令都在 git-bash 中執行，以了解更多資訊請參閱 [CONTRIBUTION](./docs/CONTRIBUTION.md)。除此之外，建議避免在該項目所在的檔案路徑中使用任何空格或非英文字元。

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

## 2. 啟動Go服務（重構）

若要在終端機中執行 Go 服務，您可以執行以下命令：

```shell
go run ./core/app.go server
```

為了調試Go服務，我們已經在VSCode中配置了它，您可以按照以下步驟操作：

1. 輸入Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. 啟動前端模組（移至 web2）

```bash
# 安裝所需的全域庫
npm i -g pnpm ts-node typescript

# 安裝專案依賴
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # 它僅適用於 Windows，它將關閉所有終端和先前的進程。

# 在終端機 1 上執行 Web 服務
npm run fe-web

# 在終端機 2 上運行 CSS 處理器
npm run fe-css

# 在終端機 3 上執行額外作業
npm run fe-extra

```

請註意，如果您不想在單獨的終端實例中執行這些命令，則可以使用“&”符號進行後台執行。

## 4. 開始開發

Go 服務運行後，您應該可以看到終端機中列印出一個連結。現在，複製此 URL 並將其貼上到瀏覽器中開始開發，讓我們開始吧！

例子:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. 構建(Build)

```bash
cd pipeline
./build-all.sh
```

# 🌱 名字是怎麼回事？

#### _The Tools for Laffin' At Life_

這個項目的名稱靈感來自於 Chet Atkins 於 1987 年創作的一首經典鄉村歌曲《Laffin' At Life》，這首歌曲在作者心中也佔有特殊的地位。

希望LafTools工具箱能讓您的日常工作變得更輕鬆，減少加班的需要，幫助您保持健康的工作與生活平衡，讓我們盡情享受生活吧！

# 📑 其他材料

如果您想了解有關該項目的更多詳細信息，可以查看以下更多材料：

- [常見問題](/docs/zh_HK/FAQ.md)
- [貢獻](/docs/zh_HK/CONTRIBUTION.md)
- [對於中國開發者](/devtools/notes/common/issues.md)

# 💐 Icons

我們非常感謝提供以下精美圖標的才華橫溢的藝術家：
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 致謝

如果沒有出色的開源項目，這個項目就不可能實現，我想親自向以下項目表示最深切的謝意：

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

當然，還有其他開源項目受益並促進了這個項目，我無法在這一部分中詳細介紹；如果沒有這些專案和這些人才開發人員的努力，LafTools工具箱就不可能實現。

Thank you!

Ryan Laf  
2023年2月2日

# 🪪 License

此專案受 GNU Affero 通用公共授權保護，請參閱授權文件以了解更多詳細資訊。
