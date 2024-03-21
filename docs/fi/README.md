<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Monipuolisen työkalupakin seuraavan sukupolven ohjelmoijille
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Esikatsele LafToolsin sisäpiiriversiota</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Tämä sivu on luotu sisäisesti LafToolsista.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

Jotta voit käyttää näitä toimintoja nopeasti, olemme ottaneet käyttöön vakaan online-sivuston Yhdysvalloissa ja CN-alueella. Useimmat työkalut ovat saatavilla online-sivustoillamme lukuun ottamatta joitakin työkaluja, jotka perustuvat tiettyihin käyttöjärjestelmän ominaisuuksiin.

- 🇺🇸 Yhdysvallat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Vain Manner-Kiina: [laftools.cn](https://laftools.cn)

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

### Esikatselu:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Päästä alkuun

## 1. Määritä järjestelmäympäristö

Oletetaan yksinkertaisuuden vuoksi, että olet kloonannut tämän arkiston joko osoitteeseen `C:\Usersjerry\project\laftools-repo` Windowsissa tai `/Users/jerry/projects/laftools-repo` Linuxissa/MacOS:ssä, niin sinun tulee ilmoittaa env ja asettaa asetukset alla tiedostossasi **~/.bashrc* * tai yksinkertaisesti suorita ne ennen minkään komennon suorittamista.

Jos käytät Windows-käyttöjärjestelmää, varmista, että kaikki komennot suoritetaan git-bashissa. Lisätietoja on kohdassa [CONTRIBUTION](/docs/fi/CONTRIBUTION.md). Tämän lisäksi on suositeltavaa välttää välilyöntien tai muiden kuin englanninkielisten merkkien käyttöä tiedostopolussa, jossa tämä projekti sijaitsee.

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
# asenna vaadittu globaali kirjasto
npm i -g pnpm ts-node typescript

# asenna projektideps
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# run core service
npm run fe-web

```

## 3. Rakentaa

```bash
cd pipeline
./build-all.sh "v1.9.9-beta"
```

# 🌱 Mitä nimeä vaivaa?

#### _The Tools for Laffin' At Life_

Tämän projektin nimi on saanut inspiraationsa Chet Atkinsin klassisesta kantrilaulusta 'Laffin' At Life' vuodelta 1987, jolla on myös erityinen paikka kirjoittajan sydämessä.

Toivottavasti LafTools tekee päivittäisistä tehtävistäsi helpompaa, vähentää ylitöiden tarvetta ja auttaa sinua ylläpitämään tervettä työ- ja perhe-elämän tasapainoa, anna meidän vain levätä elämässä!

# 📑 Muut materiaalit

Alla on muita materiaaleja, joita voit katsoa, ​​jos haluat saada lisätietoja tästä projektista:

- [FAQ](/docs/fi/FAQ.md)
- [AMOITUS](/docs/fi/CONTRIBUTION.md)
- [Kiinan kehittäjille](/devtools/notes/common/issues.md)

# 💐 Icons

Arvostamme lahjakkaita taiteilijoita, jotka toimittivat alla kauniita kuvakkeita:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Kiitokset

Tämä projekti ei olisi ollut mahdollinen ilman mahtavia avoimen lähdekoodin projekteja, joista haluan henkilökohtaisesti ilmaista syvimmän kiitokseni:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Varmasti on muitakin avoimen lähdekoodin projekteja, jotka ovat hyötyneet ja helpottaneet tätä projektia, joita en tässä osiossa pystynyt erittelemään; Ilman näitä projekteja ja lahjakkuuksien kehittäjien ponnisteluja LafTools ei olisi ollut mahdollinen.

Thank you!

Ryan Laf  
2. helmikuuta 2023

# 🪪 License

Tämä projekti on suojattu GNU Affero General Public License -lisenssillä, katso lisätietoja LICENSE-tiedostosta.
