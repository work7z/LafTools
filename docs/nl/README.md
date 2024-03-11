<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - De volgende generatie van een veelzijdige toolbox ontworpen voor programmeurs
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Bekijk een voorbeeld van de Insider-versie van LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Deze pagina wordt intern gegenereerd vanuit LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

Om deze functies snel te kunnen gebruiken, hebben we een stabiele online website in de regio CN en de VS beschikbaar gesteld die u kunt gebruiken. De meeste tools zijn beschikbaar op onze online websites, met uitzondering van enkele tools die afhankelijk zijn van specifieke mogelijkheden van het besturingssysteem.

- 🇺🇸 Verenigde staat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Alleen het vasteland van China: [laf-tools.com](https://laf-tools.com)

# 💡 Invoering

U vraagt ​​zich misschien af ​​waarom we vastbesloten zijn deze toolbox te ontwikkelen, aangezien er op internet talloze tools kunnen worden gebruikt. De meeste door ons geleverde tools zijn inderdaad gemakkelijk te vinden op internet, zoals codec, formatter, vertaling, QR-code, enz. Het is echter niet de meest comfortabele en efficiënte manier om deze tools te gebruiken.

Bent u ooit de onderstaande problemen tegengekomen tijdens het gebruik van deze online tools?

- Geen offline toegankelijkheid.
- Geen mondiaal donker thema.
- Geen productieve UI-stijl.
- Slechte netwerkprestaties.
- Verontrustende advertenties.
- Probleem met gegevenslekken.

Als het antwoord op een van de bovenstaande vragen ja is, kunt u overwegen onze toolbox te proberen. Het biedt de volgende functies:

- FOSS voor altijd
- Lichtgewicht looptijd
- Volledige platformondersteuning (inclusief ARMv8)
- Volledige GPT-achtige ondersteuning
- Sterk geïntegreerd met productieve gebruikersinterface
- Beschikbare Docker-images en Portable Edition
- Extra hulpmiddelen zoals notities, handleidingen, enz...

# 🌠 Voorbeeld

> LafTools is nog in ontwikkeling, de gebruikersinterface, afhankelijkheden of vereisten kunnen indien nodig worden gewijzigd.

### Voorbeeld:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Aan de slag

## 0. Refactoring

Onlangs hebben we de architectuur van LafTools opnieuw ingericht op basis van next.js. De onderstaande stappen kunnen indien nodig worden gewijzigd.

## 1. Systeemomgeving instellen

Laten we voor de eenvoud zeggen dat je deze repository hebt gekloond naar `C:\Usersjerry\project\laftools-repo` op Windows of naar `/Users/jerry/projects/laftools-repo` op Linux/MacOS, dan moet je env declareren en config hieronder instellen in je bestand **~/.bashrc* *, of voer ze eenvoudigweg uit voordat u een opdracht uitvoert.

Als je Windows OS gebruikt, zorg er dan voor dat alle opdrachten worden uitgevoerd in git-bash. Voor meer informatie raadpleeg je [CONTRIBUTION](/docs/nl/CONTRIBUTION.md). Daarnaast wordt aanbevolen om geen spaties of niet-Engelse tekens te gebruiken in het bestandspad waar dit project zich bevindt.

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

## 2. Go-service starten (refactoring)

Om de Go-service in de terminal uit te voeren, kunt u de onderstaande opdracht uitvoeren:

```shell
go run ./core/app.go server
```

Om de Go-service te debuggen, hebben we deze in VSCode geconfigureerd. U kunt gewoon de onderstaande stappen volgen:

1. Voer Visual Studio Code in
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. FrontEnd-module starten (verplaatst naar web2)

```bash
# installeer de vereiste globale bibliotheek
npm i -g pnpm ts-node typescript

# projectdepartementen installeren
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Het is alleen voor Windows, het sluit alle terminals en eerdere processen.

# voer de webservice uit op terminal 1
npm run fe-web

# voer de CSS-processor uit op terminal 2
npm run fe-css

# voer extra taken uit op terminal 3
npm run fe-extra

```

Merk op dat u het '&'-symbool kunt gebruiken voor uitvoering op de achtergrond als u deze opdrachten niet alternatief in afzonderlijke terminalinstanties wilt uitvoeren.

## 4. Begin met ontwikkelen

Zodra de Go-service actief is, zou u een link moeten kunnen zien die in de terminal wordt afgedrukt. Kopieer nu deze URL en plak deze in uw browser om te beginnen met ontwikkelen, laten we gaan!

Voorbeeld:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Bouwen

```bash
cd pipeline
./build-all.sh
```

# 🌱 Wat is er met de naam?

#### _The Tools for Laffin' At Life_

De naam van dit project is geïnspireerd op 'Laffin' At Life', een klassiek countrynummer uit 1987 van Chet Atkins dat eveneens een speciaal plekje in het hart van de auteur heeft.

Hopelijk zal LafTools uw dagelijkse taken gemakkelijker maken, de behoefte aan overwerk verminderen en u helpen een gezond evenwicht tussen werk en privéleven te behouden, laten we gewoon genieten van het leven!

# 📑 Andere materialen

Hieronder vindt u nog meer materialen die u kunt bekijken als u meer details over dit project wilt weten:

- [FAQ](/docs/nl/FAQ.md)
- [BIJDRAGE](/docs/nl/CONTRIBUTION.md)
- [Voor Chinese ontwikkelaars](/devtools/notes/common/issues.md)

# 💐 Icons

We zouden talentkunstenaars op prijs stellen die onderstaande prachtige iconen aanleveren:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Dankbetuigingen

Dit project zou niet mogelijk zijn geweest zonder geweldige open source-projecten waarvoor ik persoonlijk mijn diepste dankbaarheid wil uiten:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Zeker, er zijn andere open source-projecten die dit project hebben geprofiteerd en gefaciliteerd, die ik in dit deel niet in detail kon beschrijven; Zonder deze projecten en de inspanningen van deze talentontwikkelaars zou LafTools niet mogelijk zijn geweest.

Thank you!

Ryan Laf  
2 februari 2023

# 🪪 License

Dit project is beschermd onder de GNU Affero General Public License. Zie het LICENSE-bestand voor meer details.
