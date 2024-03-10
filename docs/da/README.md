<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Den næste generation af en alsidig værktøjskasse designet til programmører
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Forhåndsvisning af Insider-versionen af ​​LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Denne side er genereret fra LafTools internt.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

For hurtigt at bruge disse funktioner tilbyder vi stabile onlinewebsteder, som brugere i forskellige lande kan bruge. Bortset fra mindre værktøjer, der muligvis har brug for support fra dit lokale system, er de fleste værktøjer tilgængelige på internettet.

Bemærket Vi har leveret to LafTools online-websteder til forskellige regioner for at forbedre brugeroplevelsen. Hvis du støder på ustabilitet under adgangen, skal du sikre dig, at du har valgt det korrekte websted for din region. Hvis problemet fortsætter, så tøv ikke med at give os besked. Tak skal du have!

- 🇺🇸 forenet stat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Kun Kinas fastland: [laf-tools.com](https://laf-tools.com)

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

### Forhåndsvisning:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Kom godt i gang

## 0. Refaktorering

For nylig har vi omstruktureret arkitekturen af ​​LafTools baseret på next.js, nedenstående trin kan ændres efter behov.

## 1. Opsæt systemmiljø

Lad os for nemheds skyld sige, at du har klonet dette lager til enten `C:\Usersjerry\project\laftools-repo` på Windows eller `/Users/jerry/projects/laftools-repo` på Linux/MacOS, så skal du erklære env og indstille config nedenfor i din fil **~/.bashrc* *, eller blot udføre dem, før du kører en kommando.

Hvis du bruger Windows OS, skal du sørge for, at alle kommandoer udføres i git-bash, læs mere, se venligst [BIDRAG](/docs/da/CONTRIBUTION.md). Bortset fra dette anbefales det at undgå at bruge mellemrum eller ikke-engelske tegn i filstien, hvor dette projekt er placeret.

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

For at køre Go-tjenesten i terminalen kan du udføre følgende kommando:

```shell
go run ./core/app.go server
```

For at fejlsøge Go-tjenesten har vi konfigureret den i VSCode, du kan bare følge nedenstående trin:

1. Indtast Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Start FrontEnd-modul (flyttet til web2)

```bash
# installere det nødvendige globale bibliotek
npm i -g pnpm ts-node typescript

# installere projekt deps
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Det er kun til Windows, det vil lukke alle terminaler og tidligere processer.

# køre webservice på terminal 1
npm run fe-web

# kør CSS-processor på terminal 2
npm run fe-css

# køre ekstrajob på terminal 3
npm run fe-extra

```

Bemærk, at du kan bruge '&'-symbolet til baggrundsudførelse, hvis du ikke ønsker at køre disse kommandoer alternativt i separate terminalforekomster.

## 4. Begynd at udvikle

Når Go-tjenesten kører, bør du kunne se et link udskrevet i terminalen. Kopier nu denne URL og indsæt den i din browser for at begynde at udvikle, lad os gå!

Eksempel:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Byg

```bash
cd pipeline
./build-all.sh
```

# 🌱 Hvad er der med navnet?

#### _The Tools for Laffin' At Life_

Navnet på dette projekt er inspireret af 'Laffin' At Life', en klassisk countrysang fra 1987 af Chet Atkins, som også har en særlig plads i forfatterens hjerte.

Forhåbentlig vil LafTools gøre dine daglige opgaver nemmere, reducere behovet for overarbejde og hjælpe dig med at opretholde en sund balance mellem arbejde og privatliv, lad os bare slappe af med livet!

# 📑 Andre materialer

Nedenfor er yderligere materialer, som du kan se, hvis du gerne vil vide mere om dette projekt:

- [FAQ](/docs/da/FAQ.md)
- [BIDRAG](/docs/da/CONTRIBUTION.md)
- [For udviklere i Kina](/devtools/notes/common/issues.md)

# 💐 Icons

Vi ville sætte pris på talentkunstnere, der leverede nedenstående smukke ikoner:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Anerkendelser

Dette projekt ville ikke have været muligt uden fantastiske open source-projekter, som jeg personligt vil udtrykke min dybeste taknemmelighed til:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Der er helt sikkert andre open source-projekter, der har gavnet og faciliteret dette projekt, som jeg ikke kunne beskrive i denne del; Uden disse projekter og disse talentudvikleres indsats havde LafTools ikke været mulig.

Thank you!

Ryan Laf  
2. februar 2023

# 🪪 License

Dette projekt er beskyttet under GNU Affero General Public License, se venligst LICENS-filen for flere detaljer.
