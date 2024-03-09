<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Den neste generasjonen av en allsidig verktøykasse designet for programmerere
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Forhåndsvis Insider-versjonen av LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Denne siden er generert fra LafTools internt.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 💡 Introduksjon

Du lurer kanskje på hvorfor vi er fast bestemt på å utvikle denne verktøykassen, siden det er mange verktøy som kan brukes på Internett. De fleste verktøyene vi har levert kan faktisk enkelt finnes på Internett, for eksempel kodek, formatering, oversettelse, QR-kode, osv... Det er imidlertid ikke den mest komfortable og effektive tilnærmingen til å bruke disse verktøyene.

Har du noen gang møtt problemene nedenfor mens du brukte disse nettverktøyene?

- Ingen frakoblet tilgjengelighet.
- Ikke noe globalt mørkt tema.
- Ingen produktiv UI-stil.
- Dårlig nettverksytelse.
- Opprørende annonser.
- Problem med datalekkasje.

Hvis svaret på noen av de ovennevnte er ja, bør du vurdere å prøve verktøykassen vår. Den tilbyr følgende funksjoner:

- FOSS for alltid
- Lett kjøretid
- Full plattformstøtte (inkludert ARMv8)
- Full GPT-lignende støtte
- Svært integrert med produktivt brukergrensesnitt
- Tilgjengelige Docker Images og Portable Edition
- Ekstra hjelpere som notater, manualer osv...

# 🌠 Forhåndsvisning

> LafTools er fortsatt under utvikling, brukergrensesnittet, avhengighetene eller forutsetningene kan endres etter behov.

### Forhåndsvisning:

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Starter

## 0. Refaktorering

Nylig refaktoriserer vi arkitekturen til LafTools basert på next.js, trinnene nedenfor kan endres etter behov.

## 1. Sett opp systemmiljø

For enkelhets skyld, la oss si at du har klonet dette depotet til enten `C:\Usersjerry\project\laftools-repo` på Windows eller `/Users/jerry/projects/laftools-repo` på Linux/MacOS, så bør du erklære env og angi config nedenfor i filen **~/.bashrc* *, eller bare kjør dem før du kjører en kommando.

Hvis du bruker Windows OS, sørg for at alle kommandoer utføres i git-bash, les mer, se [BIDRAG](/docs/no/CONTRIBUTION.md). Bortsett fra dette, anbefales det å unngå å bruke mellomrom eller ikke-engelske tegn i filbanen der dette prosjektet er plassert.

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

For å kjøre Go-tjeneste i terminal, kan du utføre kommandoen nedenfor:

```shell
go run ./core/app.go server
```

For å feilsøke Go-tjenesten har vi konfigurert den i VSCode, du kan bare følge trinnene nedenfor:

1. Skriv inn Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Start FrontEnd-modulen (flyttet til web2)

```bash
# installer det nødvendige globale biblioteket
npm i -g pnpm ts-node typescript

# installere prosjektdeps
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Det er kun for Windows, det vil lukke alle terminaler og tidligere prosesser.

# kjøre webtjeneste på terminal 1
npm run fe-web

# kjør CSS-prosessor på terminal 2
npm run fe-css

# kjøre ekstrajobber på terminal 3
npm run fe-extra

```

Merk at du kan bruke '&'-symbolet for bakgrunnskjøring hvis du ikke ønsker å kjøre disse kommandoene alternativt i separate terminalforekomster.

## 4. Begynn å utvikle

Når Go-tjenesten kjører, skal du kunne se en lenke skrevet ut i terminalen. Nå, kopier denne URL-en og lim den inn i nettleseren din for å begynne å utvikle, la oss gå!

Eksempel:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Bygge

```bash
cd pipeline
./build-all.sh
```

# 🌱 Hva er det med navnet?

#### _The Tools for Laffin' At Life_

Navnet på dette prosjektet er inspirert av «Laffin' At Life», en klassisk countrysang fra 1987 av Chet Atkins som også har en spesiell plass i forfatterens hjerte.

Forhåpentligvis vil LafTools gjøre de daglige oppgavene dine enklere, redusere behovet for overtid og hjelpe deg med å opprettholde en sunn balanse mellom arbeid og privatliv.

# 📑 Andre materialer

Nedenfor er ytterligere materialer som du kan ta en titt på hvis du ønsker å lære mer detaljer om dette prosjektet:

- [FAQ](/docs/no/FAQ.md)
- [BIDRAG](/docs/no/CONTRIBUTION.md)
- [For Kina-utviklere](/devtools/notes/common/issues.md)

# 💐 Icons

Vi vil sette pris på talentartister som har gitt under vakre ikoner:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Anerkjennelser

Dette prosjektet ville ikke vært mulig uten fantastiske åpen kildekode-prosjekter som jeg personlig vil uttrykke min dypeste takknemlighet til:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Sikkert er det andre åpen kildekode-prosjekter som har vært til nytte og tilrettelagt for dette prosjektet, som jeg ikke kunne beskrive i denne delen; Uten disse prosjektene og disse talentutviklernes innsats hadde ikke LafTools vært mulig.

Thank you!

Ryan Laf  
2. februar 2023

# 🪪 License

Dette prosjektet er beskyttet under GNU Affero General Public License, vennligst se LICENSE-filen for flere detaljer.
