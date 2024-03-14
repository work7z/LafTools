<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Nästa generation av en mångsidig verktygslåda designad för programmerare
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Förhandsgranska Insider-versionen av LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Den här sidan är genererad från LafTools internt.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

För att snabbt kunna använda dessa funktioner har vi distribuerat en stabil onlinewebbplats i USA och CN-regionen som du kan använda. De flesta verktyg är tillgängliga på våra onlinewebbplatser förutom vissa verktyg som är beroende av specifika OS-funktioner.

- 🇺🇸 USA: [laftools.dev](https://laftools.dev)
- 🇨🇳 Endast fastlandet i Kina: [laf-tools.com](https://laf-tools.com)

# 💡 Introduktion

Du kanske undrar varför vi är fast beslutna att utveckla denna verktygslåda eftersom det finns många verktyg som kan användas på Internet. De flesta verktyg vi har tillhandahållit kan faktiskt lätt hittas på Internet, såsom codec, formatterare, översättning, QR-kod, etc... Det är dock inte det mest bekväma och effektiva sättet att använda dessa verktyg.

Har du någonsin stött på problemen nedan när du använde dessa onlineverktyg?

- Ingen offlinetillgänglighet.
- Inget globalt mörkt tema.
- Ingen produktiv UI-stil.
- Dålig nätverksprestanda.
- Upprörande reklam.
- Problem med dataläckage.

Om svaret på något av ovanstående är ja, bör du överväga att prova vår verktygslåda. Den erbjuder följande funktioner:

- FOSS för alltid
- Lättvikts körtid
- Fullständigt plattformsstöd (inklusive ARMv8)
- Fullständigt GPT-liknande stöd
- Mycket integrerad med produktivt användargränssnitt
- Tillgängliga Docker-bilder och Portable Edition
- Extra hjälpmedel såsom anteckningar, manualer, etc...

# 🌠 Förhandsvisning

> LafTools är fortfarande under utveckling, dess användargränssnitt, beroenden eller förutsättningar kan ändras vid behov.

### Förhandsvisning:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Komma igång

## 0. Refaktorering

Nyligen omarbetar vi arkitekturen för LafTools baserat på next.js, nedanstående steg kan ändras vid behov.

## 1. Konfigurera systemmiljön

För enkelhetens skull, låt oss säga att du har klonat det här arkivet till antingen `C:\Usersjerry\project\laftools-repo` på Windows eller `/Users/jerry/projects/laftools-repo` på Linux/MacOS, då bör du deklarera env och ställa in config nedan i din fil **~/.bashrc* *, eller helt enkelt köra dem innan du kör något kommando.

Om du använder Windows OS, se till att alla kommandon körs i git-bash, läs mer se [BIDRAG](/docs/sv/CONTRIBUTION.md). Bortsett från detta rekommenderas det att undvika att använda blanksteg eller icke-engelska tecken i filsökvägen där detta projekt finns.

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

## 2. Starta Go Service (refaktorering)

För att köra Go-tjänst i terminal kan du köra följande kommando:

```shell
go run ./core/app.go server
```

För att felsöka Go-tjänsten har vi konfigurerat den i VSCode, du kan bara följa nedanstående steg:

1. Ange Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Starta FrontEnd-modul (Flyttad till web2)

```bash
# installera det globala biblioteket
npm i -g pnpm ts-node typescript

# installera projektdeps
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Det är endast för Windows, det kommer att stänga alla terminaler och tidigare processer.

# kör webbtjänst på terminal 1
npm run fe-web

# kör CSS-processor på terminal 2
npm run fe-css

# köra extrajobb på terminal 3
npm run fe-extra

```

Observera att du kan använda '&'-symbolen för bakgrundsexekvering om du inte vill köra dessa kommandon alternativt i separata terminalinstanser.

## 4. Börja utveckla

När Go-tjänsten körs bör du kunna se en länk utskriven i terminalen. Nu, kopiera denna URL och klistra in den i din webbläsare för att börja utveckla, låt oss köra!

Exempel:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Bygga

```bash
cd pipeline
./build-all.sh
```

# 🌱 Vad är det med namnet?

#### _The Tools for Laffin' At Life_

Namnet på det här projektet är inspirerat av 'Laffin' At Life', en klassisk countrylåt från 1987 av Chet Atkins som också har en speciell plats i författarens hjärta.

Förhoppningsvis kommer LafTools att göra dina dagliga sysslor enklare, minska behovet av övertid och hjälpa dig att upprätthålla en hälsosam balans mellan arbete och privatliv, låt oss bara njut av livet!

# 📑 Andra material

Nedan finns ytterligare material som du kan ta en titt på om du vill veta mer om detta projekt:

- [FAQ](/docs/sv/FAQ.md)
- [BIDRAG](/docs/sv/CONTRIBUTION.md)
- [För utvecklare i Kina](/devtools/notes/common/issues.md)

# 💐 Icons

Vi skulle uppskatta talangartister som tillhandahåller nedanstående vackra ikoner:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>

# 🙏 Erkännanden

Detta projekt hade inte varit möjligt utan fantastiska projekt med öppen källkod som jag personligen skulle vilja uttrycka min djupaste tacksamhet till:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

För visst finns det andra projekt med öppen källkod som har gynnat och underlättat detta projekt, som jag inte kunde beskriva i den här delen; Utan dessa projekt och dessa talangutvecklares insatser hade LafTools inte varit möjligt.

Thank you!

Ryan Laf  
2 februari 2023

# 🪪 License

Detta projekt är skyddat under GNU Affero General Public License, se LICENS-filen för mer information.
