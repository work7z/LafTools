<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - A programozók számára tervezett sokoldalú eszköztár következő generációja
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Tekintse meg a LafTools Insider verzióját</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

# 💡 Bevezetés

Felmerülhet benned a kérdés, miért vagyunk eltökéltek ennek az eszköztárnak a fejlesztése mellett, mivel az interneten számos eszköz használható. Valójában a legtöbb általunk biztosított eszköz könnyen megtalálható az interneten, például kodek, formázó, fordítás, QR-kód stb. Ezeknek az eszközöknek azonban nem ez a legkényelmesebb és leghatékonyabb módja.

Találkozott már az alábbi problémákkal az online eszközök használata közben?

- Nincs offline kisegítő lehetőség.
- Nincs globális sötét téma.
- Nincs produktív felhasználói felület stílus.
- Gyenge hálózati teljesítmény.
- Felkavaró reklámok.
- Adatszivárgási probléma.

Ha a fentiek bármelyikére igen a válasz, akkor fontolja meg eszköztárunk kipróbálását. A következő funkciókat kínálja:

- FOSS Forever
- Könnyű futásidő
- Teljes platform támogatás (beleértve az ARMv8-at is)
- Teljes GPT-szerű támogatás
- Erősen integrált a produktív felhasználói felülettel
- Elérhető Docker képek és Portable Edition
- Extra segítők, mint jegyzetek, kézikönyvek stb...

# 🌠 Előnézet

> A LafTools még fejlesztés alatt áll, felhasználói felülete, függőségei vagy előfeltételei szükség szerint módosulhatnak.

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Elkezdeni

## 0. Refaktorálás

A közelmúltban a LafTools next.js-en alapuló architektúráját átdolgoztuk, az alábbi lépések szükség szerint változhatnak.

## 1. Rendszerkörnyezet beállítása

Az egyszerűség kedvéért tegyük fel, hogy klónozta ezt a tárolót a `C:\\Users\jerry\\project\\laftools-repo` mappába Windows rendszeren vagy a `/Users/jerry/projects/laftools-repo` mappába. Linux/MacOS, akkor deklarálja az env-t, és állítsa be a konfigurációt alább a **~/.bashrc** fájlban, vagy egyszerűen futtassa őket, mielőtt bármilyen parancsot futtatna.

Ha Windows operációs rendszert használ, győződjön meg arról, hogy az összes parancsot a git-bash-ben hajtja végre. További információ: [CONTRIBUTION](./docs/CONTRIBUTION.md). Ezen kívül ajánlatos kerülni a szóközök vagy nem angol karakterek használatát a fájl elérési útjában, ahol a projekt található.

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

## 2. Go szolgáltatás indítása (újrafaktorálás)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

A Go szolgáltatás hibakereséséhez a VSCode-ban konfiguráltuk, csak kövesse az alábbi lépéseket:

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
- [CONTRIBUTION](./docs/hu/CONTRIBUTION.md)
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
