<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - The next generation of a versatile toolbox designed for programmers
</span>
<br><br>
</p>

# 💡 Introduction

You may wonder why we are determined to develop this toolbox if there are numerous commonly used tools exist on online websites.

Indeed, most tools in our toolbox can be found on any online website and you also can collect them easily into your favorites in the browser, such as common encryption and decryption, translation tools, generating QR codes, etc…

However, it’s not the simplest and quickest approach to access these conversion tools, in other words, not the most comfortable and efficient way.

Have you ever met the below issues while using those online tools?

- No Offline Accessibility.
- No Global Dark Theme.
- No Productive UI style.
- Poor Network Performance.
- Upsetting Advertisements
- Data Leakage Issue.

If the answer to any of the above is yes, then you should consider trying our toolbox. It offers the following features:

- Fully open-source code with no malicious logic
- Lightweight runtime (requires only 6MB of RAM)
- Full platform support (including ARMv8)
- Native AI support (similar to ChatGPT)
- Highly integrated with a productive UI
- Continuous addition of new tools in the future
- Can be used over the web and with Docker
- Extra helpers such as notes, manuals, etc...

Example Preview:
Here are some screenshots for you to preview how this toolbox works.

# 🌠 Preview

> LafTools is still under development, its dependencies, UI or prerequisites may changed as needed.

Preview(English):
![](https://github.com/work7z/LafTools/blob/dev/dev/images/preview-1.png?raw=true)

Preview(Simplified Chinese|简体中文):
![](https://github.com/work7z/LafTools/blob/dev/dev/images/preview-3.png?raw=true)

# 🍀 Getting Started

## 1. Setup System Environment

Let's say that you've cloned this repository to `C:\\Users\jerrylai\\project\\laftools-repo` on Windows or `/Users/jerry/projects/laftools-repo` on Linux/MacOS, then you should declare env and set config below in your file **~/.bashrc**, or just simply execute them before running any command.

If you're using Windows, please ensure that all commands are executed in git-bash, learn more please refer to [CONTRIBUTION](CONTRIBUTION.md). Apart from this, it is recommended to avoid using any whitespace or non-English characters in the file path where this project is located.

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

**Web Part**:

```bash
# install required global library
npm i -g pnpm ts-node typescript

# install project deps
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/dev/scripts/scan && pnpm install

# terminate previous processes if you're on Windows OS. (It's normal if your terminal is also terminated, just open new terminal to be continue)
npm run win-clean

# run web service on [Terminal - 1]
npm run fe-web

# run CSS processor on [Terminal - 2]
npm run fe-css

# run extra jobs on [Terminal - 3]
npm run fe-extra

```

Note that you can use the '&' symbol for background execution if you don't want to alternatively run these commands in separate terminal instances.

**Scan Part**:

```bash
cd dev/scripts/scan
npm i -g pnpm # can skip if it's installed
pnpm install --no-frozen-lockfile
npm run scan # start scanning files to provide translate service
```

## 4. Start Developing

Once the Go service is running, you should see a URL in the output. Copy this URL and paste it into your browser to start developing, let us Go!

Examples:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh_CN users)
請復製下方鏈接並在瀏覽器端打開(for zh_HK users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Build

```bash
cd pipeline
./build-all.sh
```

# 📑 Other Materials

Below are further materials that you can have a look if you'd like to learn more detail about this project:

- [FAQ](./FAQ.md)
- [CONTRIBUTION](./CONTRIBUTION.md)
- [For China Developers](dev/notes/common/issues.md)

# 🎷 Inspiration

This project is primarily inspired by the following musicians:

- Joe Pass
- The Manhattan Transfer
- Khalil Fong
- Li Rong Hao
- Chet Atkins
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

Specifically, the performance of **"Satin Doll"** by the virtuoso **Joe Pass** in "An Evening With Joe Pass" (1994) has been a source of strength and confidence for me, empowering me to face any dilemma in life.

Thank you.

Mar. 20th, 2021  
Ryan Laf

# 🪪 License

This project is protected under the GNU Affero General Public License.  
Please see the LICENSE file for more details.
