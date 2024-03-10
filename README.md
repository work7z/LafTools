<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - The next generation of a versatile toolbox designed for programmers
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Preview the Insider Version of LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i> <br/> English  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

To quickly use these functions, we've provided stable online website in CN and US region for you to use. Most tools are available in our online websites except for some tools that rely on specific OS capablities.

Noted We have provided two LafTools online websites for different regions to enhance user experience. If you encounter instability while accessing, please ensure you have selected the correct website for your region. If the problem persists, do not hesitate to let us know. Thank you!

- 🇺🇸 United State: [laftools.dev](https://laftools.dev)
- 🇨🇳 China Mainland: [laf-tools.com](https://laf-tools.com)

# 💡 Introduction

You may wonder why we are determined to develop this toolbox as there are numerous tools can be used on the Internet. Indeed, most tools we have provided can be easily found on the Internet, such as codec, formatter, translation, QR Code, etc… However, it is not the most comfortable and efficient approach to use these tools.

Have you ever met the below issues while using those online tools?

- No Offline Accessibility.
- No Global Dark Theme.
- No Productive UI style.
- Poor Network Performance.
- Upsetting Advertisements.
- Data Leakage Issue.

If the answer to any of the above is yes, then you should consider trying our toolbox. It offers the following features:

- FOSS Forever
- Lightweight Runtime
- Full platform support(including ARMv8)
- Full GPT-alike support
- Highly integrated with productive UI
- Available Docker Images and Portable Edition
- Extra helpers such as notes, manuals, etc...

# 🌠 Preview

> LafTools is still under development, its UI, dependencies or prerequisites may changed as needed.

### Preview:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Getting Started

## 0. Refactoring

Recently, we are refactoring the architecture of LafTools based on next.js, below steps may changed as needed.

## 1. Setup System Environment

For the sake of simplicity, let's say that you've cloned this repository to either `C:\Usersjerry\project\laftools-repo` on Windows or `/Users/jerry/projects/laftools-repo` on Linux/MacOS, then you should declare env and set config below in your file **~/.bashrc**, or simply execute them before running any command.

If you're using Windows OS, please ensure that all commands are executed in git-bash, learn more please refer to [CONTRIBUTION](/docs/en_US/CONTRIBUTION.md). Apart from this, it is recommended to avoid using any whitespace or non-English characters in the file path where this project is located.

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

## 2. Launch Go Service (Refactoring)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

To debug Go service, we have configured it in VSCode, you can just follow below steps:

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

The name of this project is inspired by Laffin' At Life, a classic country song from 1987 by Chet Atkins that also has a special place in the author's heart.

Hopefully LafTools will make your daily tasks easier, reducing the need for overtime and helping you maintain a healthy work-life balance, let us just laffin' at life!

# 📑 Other Materials

Below are further materials that you can have a look if you'd like to learn more detail about this project:

- [FAQ](/docs/en_US/FAQ.md)
- [CONTRIBUTION](/docs/en_US/CONTRIBUTION.md)
- [For China Developers](/devtools/notes/common/issues.md)

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
