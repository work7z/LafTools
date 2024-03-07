<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Monipuolisen työkalupakin seuraavan sukupolven ohjelmoijille
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Esikatsele LafToolsin sisäpiiriversiota</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

# 💡 Johdanto

Saatat ihmetellä, miksi olemme päättäneet kehittää tätä työkalupakkia, koska Internetissä voidaan käyttää lukuisia työkaluja. Useimmat tarjoamamme työkalut, kuten koodekki, muotoilija, käännös, QR-koodi jne., ovat todellakin helposti löydettävissä Internetistä... Se ei kuitenkaan ole mukavin ja tehokkain tapa käyttää näitä työkaluja.

Oletko koskaan törmännyt alla oleviin ongelmiin käyttäessäsi näitä verkkotyökaluja?

- Ei offline-käyttöä.
- Ei globaalia tummaa teemaa.
- Ei tuottavaa käyttöliittymätyyliä.
- Huono verkon suorituskyky.
- Järkyttävät mainokset.
- Tietovuotoongelma.

Jos vastaus johonkin yllä olevista on kyllä, sinun kannattaa kokeilla työkalupakkiamme. Se tarjoaa seuraavat ominaisuudet:

- FOSS Ikuisesti
- Kevyt käyttöaika
- Täysi alustatuki (mukaan lukien ARMv8)
- Täysi GPT-kuten tuki
- Erittäin integroitu tuottavaan käyttöliittymään
- Saatavilla Docker-kuvat ja Portable Edition
- Ylimääräisiä apuvälineitä, kuten muistiinpanoja, käsikirjoja jne...

# 🌠 Esikatselu

> LafTools on edelleen kehitteillä, sen käyttöliittymä, riippuvuudet tai edellytykset voivat muuttua tarpeen mukaan.

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Päästä alkuun

## 0. Refaktorointi

Olemme äskettäin muokkaamassa LafToolsin arkkitehtuuria next.js:n perusteella, alla olevia vaiheita voidaan muuttaa tarpeen mukaan.

## 1. Määritä järjestelmäympäristö

Oletetaan yksinkertaisuuden vuoksi, että olet kloonannut tämän arkiston joko `C:\\Users\jerry\\project\\laftools-repo`:ksi Windowsissa tai `/Users/jerry/projects/laftools-repo`. Linux/MacOS, sinun tulee ilmoittaa env ja määrittää asetukset alla tiedostossasi **~/.bashrc** tai yksinkertaisesti suorittaa ne ennen minkään komennon suorittamista.

Jos käytät Windows-käyttöjärjestelmää, varmista, että kaikki komennot suoritetaan git-bashissa. Lisätietoja on kohdassa [CONTRIBUTION](./docs/CONTRIBUTION.md). Tämän lisäksi on suositeltavaa välttää välilyöntien tai muiden kuin englanninkielisten merkkien käyttöä tiedostopolussa, jossa tämä projekti sijaitsee.

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

## 2. Käynnistä Go-palvelu (refaktorointi)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

Go-palvelun virheenkorjausta varten olemme määrittäneet sen VSCodessa, voit seurata alla olevia ohjeita:

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
- [CONTRIBUTION](./docs/fi/CONTRIBUTION.md)
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
