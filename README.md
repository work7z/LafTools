<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - The next generation of a versatile toolbox designed for programmers
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Preview the Insider Version of LafTools</a>
</div>
</center>
<br><br>
</p>

# 💡 Introduction

You may wonder why we are determined to develop this toolbox as there are numerous tools can be used on the Internet.

Indeed, most tools we have provided can be easily found on the Internet, such as codec, formatter, translation, QR Code, etc… However, it’s not the most comfortable and efficient approach to use these tools.

Have you ever met the below issues while using those online tools?

- No Offline Accessibility.
- No Global Dark Theme.
- No Productive UI style.
- Poor Network Performance.
- Upsetting Advertisements
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

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/dev/images/preview-enus.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/dev/images/preview-1.png?raw=true)

### Preview(Simplified Chinese|简体中文):

[在线预览](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/dev/images/preview-zhcn.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/dev/images/preview-dark-jan.png?raw=true)

# 🍀 Getting Started

## 0. Refactoring

Recently, we are refactoring the architecture of LafTools based on next.js, below steps may changed as needed.

## 1. Setup System Environment

For the sake of simplicity, let's say that you've cloned this repository to either `C:\\Users\jerry\\project\\laftools-repo` on Windows or `/Users/jerry/projects/laftools-repo` on Linux/MacOS, then you should declare env and set config below in your file **~/.bashrc**, or simply execute them before running any command.

If you're using Windows OS, please ensure that all commands are executed in git-bash, learn more please refer to [CONTRIBUTION](CONTRIBUTION.md). Apart from this, it is recommended to avoid using any whitespace or non-English characters in the file path where this project is located.

**Env for Windows:**

```bash
git config core.ignorecase false
export LAFTOOLS_ROOT="C:\\users\\jerry\\project\\laftools-repo"
export PATH=$PATH:$LAFTOOLS_ROOT\\dev\\source\\windows-bin
```

**Env for Linux/MacOS:**

```bash
export LAFTOOLS_ROOT=/users/jerry/projects/laftools-repo
```

## 2. Launch Go Service

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

To debug Go service, we have configured it in VSCode, you can just follow below steps:

1. Enter Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Launch FrontEnd Module

```bash
# install required global library
npm i -g pnpm ts-node typescript

# install project deps
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/dev/scripts/scan && pnpm install

npm run win-clean # It's for Windows Only, it will close all terminals and previous processes.

# run web service on [Terminal - 1]
npm run fe-web

# run CSS processor on [Terminal - 2]
npm run fe-css

# run extra jobs on [Terminal - 3]
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

- [FAQ](./FAQ.md)
- [CONTRIBUTION](./CONTRIBUTION.md)
- [For China Developers](dev/notes/common/issues.md)

# 🎷 Inspiration

This project is primarily inspired by the following musicians:

- Joe Pass
- The Manhattan Transfer
- Laura Shigihara
- Asleep at the Wheel
- Khalil Fong
- Li Rong Hao
- Chet Atkins
- Les Paul
- Tommy Emmanuel
- Martin Taylor
- Frédéric Chopin
- Claude Debussy
- Oscar Peterson
- Hugo Strasser
- Jay Chou
- Stefanie Sun
- David Tao
- Jacky Cheung
- Teresa Teng
- Jack Johnson
- Harry Styles(As It Was)
- Lovebugs

Specifically, the performance of **"Satin Doll"** by the virtuoso **Joe Pass** in "An Evening With Joe Pass" (1994) has been a source of strength and confidence for me, empowering me to face any dilemma in life.

Thank you!

Ryan Laf  
Mar. 20th, 2021

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

## License in English

This project is protected under the GNU Affero General Public License, please see the LICENSE file for more details.

In addition, based on this AGPLv3 license, there's an additional condition which is that if your website is publicly accessible, you must prominently display the name and the URL of this repository as reference on your website.

If you do not wish to comply with this License and its additional conditions, please obtain extra authorization by emailing work7z@outlook.com.

We reserve the right to enforce legal actions against violations of this License and its additional conditions.

## 许可证 - 简体中文 (Simplified Chinese Version)

本项目受 GNU Affero General Public License 保护，请查看 LICENSE 文件以获取更多详情。

此外，基于这个 AGPLv3 许可证，有一个额外的条件，那就是如果你的网站是对外公开的，你必须在你的网站上显著位置显示本仓库的 名称 和 URL 作为参考。

如果你不希望遵守这个许可证及其附加条件，请通过邮件 work7z@outlook.com 获取额外授权。

我们保留对违反此许可证以及额外条件行为进行法律维权的权利。
