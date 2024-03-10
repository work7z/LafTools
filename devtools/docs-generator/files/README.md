<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - ${Dot("4BZFkrKZz","The next generation of a versatile toolbox designed for programmers")}
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">${Dot("SSjHemio0","Preview the Insider Version of LafTools")}</a>
</div>
</center> -->
<br><br>
</p>

NOTE_FOR_GEN

# 🪄 ${Dot("\_6C-FTONT","Quick View")}

${Dot("hDekkSd","To quickly use these functions, we're providing stable online websites for users in different locale to use. Except for minor tools that might need support from your local system, most tools are available in our online websites.")}

${Dot("hDdekkSd","Noted We have provided two LafTools online websites for different regions to enhance user experience. If you encounter instability while accessing, please ensure you have selected the correct website for your region. If the problem persists, do not hesitate to let us know. Thank you!")}

- 🇺🇸 ${Dot("usvss","United State")}: [laftools.dev](https://laftools.dev)
- 🇨🇳 ${Dot("cnvss","China Mainland Only")}: [laf-tools.com](https://laf-tools.com)

# 💡 ${Dot("JjpQy-eIq","Introduction")}

${Dot("iIq02l4vX","You may wonder why we are determined to develop this toolbox as there are numerous tools can be used on the Internet.")} ${Dot("ciP9qXH1I","Indeed, most tools we have provided can be easily found on the Internet, such as codec, formatter, translation, QR Code, etc… However, it is not the most comfortable and efficient approach to use these tools.")}

${Dot("YqgCZdzaS","Have you ever met the below issues while using those online tools?")}

- ${Dot("AKCG4Sy8U","No Offline Accessibility.")}
- ${Dot("iQxHIHZIL","No Global Dark Theme.")}
- ${Dot("LM-o4Yk6h","No Productive UI style.")}
- ${Dot("w5PSqC7jG","Poor Network Performance.")}
- ${Dot("mpQMZfbv6","Upsetting Advertisements.")}
- ${Dot("rR22PTMZc","Data Leakage Issue.")}

${Dot("U6zkVUPTq","If the answer to any of the above is yes, then you should consider trying our toolbox. It offers the following features:")}

- ${Dot("Ed4z058Cr","FOSS Forever")}
- ${Dot("Jh-LM4MG","Lightweight Runtime")}
- ${Dot("RXAzQfM2L","Full platform support(including ARMv8)")}
- ${Dot("4hth-woPf","Full GPT-alike support")}
- ${Dot("iz4ROzL3","Highly integrated with productive UI")}
- ${Dot("HIAvRJazO","Available Docker Images and Portable Edition")}
- ${Dot("yVPMfvWhi","Extra helpers such as notes, manuals, etc...")}

# 🌠 ${Dot("OjKP47hFt","Preview")}

> ${Dot("bIE-DVqmU","LafTools is still under development, its UI, dependencies or prerequisites may changed as needed.")}

### ${Dot("Gez25D19n","Preview")}:

[Online Preview](http://${previewURL})
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview${extraLang}.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark${extraLang}.png?raw=true)

# 🚀 ${Dot("AOKa_f9CC","Getting Started")}

## 0. ${Dot("71DMQ0cOr","Refactoring")}

${Dot("5B9rXHCzi","Recently, we are refactoring the architecture of LafTools based on next.js, below steps may changed as needed.")}

## 1. ${Dot("lmVW9z9oh","Setup System Environment")}

${Dot("dcOe3U","For the sake of simplicity, let's say that you've cloned this repository to either {0} on Windows or {1} on Linux/MacOS, then you should declare env and set config below in your file **~/.bashrc**, or simply execute them before running any command.",'`C:\\Users\jerry\\project\\laftools-repo`','`/Users/jerry/projects/laftools-repo`')}

${Dot("PLhTRM7Eqwk","If you're using Windows OS, please ensure that all commands are executed in git-bash, learn more please refer to [CONTRIBUTION]({0}). Apart from this, it is recommended to avoid using any whitespace or non-English characters in the file path where this project is located.","/docs/"+lang+"/CONTRIBUTION.md")}

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

## 2. ${Dot("RV6qQL8ox","Launch Go Service (Refactoring)")}

${Dot("KFgTmafOWE4U","To run Go service in terminal, you can execute below command:")}

```shell
go run ./core/app.go server
```

${Dot("Yay3_x9EV","To debug Go service, we have configured it in VSCode, you can just follow below steps:")}

1. ${Dot("qxRmL73lC","Enter {0}","Visual Studio Code")}
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. ${Dot("Fuacz5atn","Launch FrontEnd Module (Moved to web2)")}

```bash
# ${Dot("uh8JUYWzH","install required global library")}
npm i -g pnpm ts-node typescript

# ${Dot("YCteaVxTx","install project deps")}
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # ${Dot("0Guf1oGfh","It's for Windows Only, it will close all terminals and previous processes.")}

# ${Dot("8Yv_neS0T","run web service on terminal 1")}
npm run fe-web

# ${Dot("XHqxsRy9v","run CSS processor on terminal 2")}
npm run fe-css

# ${Dot("fp-FSQcA-","run extra jobs on terminal 3")}
npm run fe-extra

```

${Dot("hO_WdaThV","Note that you can use the '&' symbol for background execution if you don't want to alternatively run these commands in separate terminal instances.")}

## 4. ${Dot("mfVQaqTiZ","Start Developing")}

${Dot("O3eQBXxwY","Once the Go service is running, you should be able to see a link printed out in the terminal. Now, copy this URL and paste it into your browser to start developing, let's go!")}

${Dot("eNQDoICED","Example")}:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. ${Dot("QYPc87A2j","Build")}

```bash
cd pipeline
./build-all.sh
```

# 🌱 ${Dot("I-Zaii3HZ","What's with the name?")}

#### _The Tools for Laffin' At Life_

${Dot("3cXzYtfK","The name of this project is inspired by {0}, a classic country song from 1987 by Chet Atkins that also has a special place in the author's heart.","Laffin' At Life")}

${Dot("b3c7e3r77","Hopefully LafTools will make your daily tasks easier, reducing the need for overtime and helping you maintain a healthy work-life balance, let us just laffin' at life!")}

# 📑 ${Dot("wieewa7cq","Other Materials")}

${Dot("i2fk8l8pB","Below are further materials that you can have a look if you'd like to learn more detail about this project:")}

- [${Dot("Wyi852ml4","FAQ")}](/docs/${lang}/FAQ.md)
- [${Dot("65xgSMWmS","CONTRIBUTION")}](/docs/${lang}/CONTRIBUTION.md)
- [${Dot("uavuXKo4x","For China Developers")}](/devtools/notes/common/issues.md)

# 💐 Icons

${Dot("eI8YT-N_a","We would appreciate talent artists who provided below beautiful icons:")}
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 ${Dot("QzssXokGC","Acknowledgements")}

${Dot("oM2NCFSQ1","This project would not have been possible without awesome open source projects which I would like to personally express my deepest gratitude to:")}

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

${Dot("vWi9Y_HJ6","For sure, there are other open source projects that have benefited and facilitated this project, which I couldn't detail in this part; Without these projects and these talent developers' efforts, LafTools would not have been possible.")}

Thank you!

Ryan Laf  
${Dot("lzYX0DiPc","Feb. 2nd, 2023")}

# 🪪 License

${Dot("R1RzDLneG","This project is protected under the GNU Affero General Public License, please see the LICENSE file for more details.")}
