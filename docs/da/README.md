<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Den næste generation af en alsidig værktøjskasse designet til programmører
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Forhåndsvisning af Insider-versionen af ​​LafTools</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

# 💡 Introduktion

Du undrer dig måske over, hvorfor vi er fast besluttet på at udvikle denne værktøjskasse, da der er mange værktøjer, der kan bruges på internettet. Faktisk kan de fleste værktøjer, vi har leveret, nemt findes på internettet, såsom codec, formatering, oversættelse, QR-kode osv... Det er dog ikke den mest komfortable og effektive tilgang til at bruge disse værktøjer.

Har du nogensinde mødt nedenstående problemer, mens du brugte disse onlineværktøjer?

- Ingen offline tilgængelighed.
- Intet globalt mørkt tema.
- Ingen produktiv UI-stil.
- Dårlig netværksydelse.
- Foruroligende reklamer.
- Problem med datalækage.

Hvis svaret på noget af ovenstående er ja, så bør du overveje at prøve vores værktøjskasse. Det tilbyder følgende funktioner:

- FOSS for evigt
- Letvægts Runtime
- Fuld platformunderstøttelse (inklusive ARMv8)
- Fuld GPT-lignende support
- Meget integreret med produktiv brugergrænseflade
- Tilgængelige Docker-billeder og Portable Edition
- Ekstra hjælpere såsom noter, manualer osv...

# 🌠 Forhåndsvisning

> LafTools er stadig under udvikling, dets brugergrænseflade, afhængigheder eller forudsætninger kan ændres efter behov.

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Kom godt i gang

## 0. Refaktorering

For nylig har vi omstruktureret arkitekturen af ​​LafTools baseret på next.js, nedenstående trin kan ændres efter behov.

## 1. Opsæt systemmiljø

For nemheds skyld, lad os sige, at du har klonet dette lager til enten `C:\\Users\jerry\\project\\laftools-repo` på Windows eller `/Users/jerry/projects/laftools-repo` på Linux/MacOS, så skal du erklære env og indstille config nedenfor i din fil **~/.bashrc**, eller blot udføre dem, før du kører en kommando.

Hvis du bruger Windows OS, skal du sørge for, at alle kommandoer udføres i git-bash, få mere at vide, se venligst [BIDRAG](./docs/CONTRIBUTION.md). Bortset fra dette anbefales det at undgå at bruge mellemrum eller ikke-engelske tegn i filstien, hvor dette projekt er placeret.

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

## 2. Start Go Service (Refactoring)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

For at fejlsøge Go-tjenesten har vi konfigureret den i VSCode, du kan bare følge nedenstående trin:

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
- [CONTRIBUTION](./docs/da/CONTRIBUTION.md)
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
