<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Den næste generation af en alsidig værktøjskasse designet til programmører
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Forhåndsvisning af Insider-versionen af ​​LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Denne side er genereret fra LafTools internt.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

For hurtigt at bruge disse funktioner har vi implementeret en stabil online hjemmeside i USA og CN-regionen, som du kan bruge. De fleste værktøjer er tilgængelige på vores online-websteder med undtagelse af nogle værktøjer, der er afhængige af specifikke OS-funktioner.

- 🇺🇸 forenet stat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Kun Kinas fastland: [laftools.cn](https://laftools.cn)

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

## 2. Compile and Run

```bash
# installere det nødvendige globale bibliotek
npm i -g pnpm ts-node typescript

# installere projekt deps
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# run core service
npm run fe-web

```

## 3. Byg

```bash
cd pipeline
./build-all.sh "v1.9.9-beta"
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
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

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
