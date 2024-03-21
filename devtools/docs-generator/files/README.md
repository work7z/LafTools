<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - ${Dot("4BZFkrKZz","The next generation of a versatile toolbox designed for programmers")}
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">${Dot("SSjHemio0","Preview the Insider Version of LafTools")}</a>
</div>
</center> -->
<br><br>
</p>

NOTE_FOR_GEN

# 🪄 ${Dot("\_6C-FTONT","Quick View")}

${Dot("hDdqkdxkSd","To quickly use these functions, we've deployed stable online website in US and CN region for you to use. Most tools are available in our online websites except for some tools that rely on specific OS capablities.")}

- 🇺🇸 ${Dot("usvss","United State")}: [laftools.dev](https://laftools.dev)
- 🇨🇳 ${Dot("cnvss","China Mainland")}: [laftools.cn](https://laftools.cn)

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

## 2. ${Dot("Fuacdtn","Compile and Run")}

```bash
# ${Dot("uh8JUYWzH","install required global library")}
npm i -g pnpm ts-node typescript

# ${Dot("YCteaVxTx","install project deps")}
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# ${Dot("ypvuIXEcb","run core service")}
npm run fe-web

```

## 3. ${Dot("QYPc87A2j","Build")}

```bash
cd pipeline
./build-all.sh "v1.9.9-beta"
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
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

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
