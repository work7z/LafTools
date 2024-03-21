<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - A programozók számára tervezett sokoldalú eszköztár következő generációja
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Tekintse meg a LafTools Insider verzióját</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Ezt az oldalt a LafTools belsőleg hozta létre.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

A funkciók gyors használatához stabil online webhelyet állítottunk be az Egyesült Államokban és a CN régióban. A legtöbb eszköz elérhető online webhelyeinken, kivéve néhány olyan eszközt, amelyek az operációs rendszer adott képességeire támaszkodnak.

- 🇺🇸 Egyesült Államok: [laftools.dev](https://laftools.dev)
- 🇨🇳 Csak Kína szárazföldi része: [laftools.cn](https://laftools.cn)

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

### Előnézet:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Elkezdeni

## 1. Rendszerkörnyezet beállítása

Az egyszerűség kedvéért tegyük fel, hogy klónozta ezt a tárolót a következőre: `C:\Usersjerry\project\laftools-repo` Windows rendszeren vagy `/Users/jerry/projects/laftools-repo` Linux/MacOS rendszeren, majd deklarálja az env-t, és állítsa be a konfigurációt alább a **~/.bashrc* fájlban. *, vagy egyszerűen futtassa őket, mielőtt bármilyen parancsot futtatna.

Ha Windows operációs rendszert használ, győződjön meg arról, hogy az összes parancsot a git-bash-ban hajtja végre. További információért olvassa el a [KÖZREHAJTÁS](/docs/hu/CONTRIBUTION.md) részt. Ezen kívül ajánlatos kerülni a szóközök vagy nem angol karakterek használatát a fájl elérési útjában, ahol a projekt található.

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
# telepítse a szükséges globális könyvtárat
npm i -g pnpm ts-node typescript

# projekt deps telepítése
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# run core service
npm run fe-web

```

## 3. Épít

```bash
cd pipeline
./build-all.sh "v1.9.9-beta"
```

# 🌱 Mi van a névvel?

#### _The Tools for Laffin' At Life_

A projekt nevét Chet Atkins 1987-es klasszikus countrydala, a „Laffin' At Life” ihlette, amely szintén különleges helyet foglal el a szerző szívében.

Remélhetőleg a LafTools megkönnyíti mindennapi feladatait, csökkenti a túlórák szükségességét, és segít fenntartani a munka és a magánélet egészséges egyensúlyát, hadd lazuljunk az életen!

# 📑 Más anyagok

Az alábbiakban további anyagok találhatók, amelyeket megtekinthet, ha többet szeretne megtudni erről a projektről:

- [GYIK](/docs/hu/FAQ.md)
- [HOZZÁJÁRULÁS](/docs/hu/CONTRIBUTION.md)
- [Kínai fejlesztőknek](/devtools/notes/common/issues.md)

# 💐 Icons

Nagyra értékelnénk azokat a tehetséges művészeket, akik az alábbi gyönyörű ikonokat mutatták be:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Köszönetnyilvánítás

Ez a projekt nem jöhetett volna létre fantasztikus nyílt forráskódú projektek nélkül, amelyekért személyesen szeretném kifejezni legmélyebb hálámat:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Az biztos, hogy vannak más nyílt forráskódú projektek is, amelyek hasznot húztak ennek a projektnek, és ezeket ebben a részben nem tudtam részletezni; E projektek és a tehetségfejlesztők erőfeszítései nélkül a LafTools nem jöhetett volna létre.

Thank you!

Ryan Laf  
2023. február 2

# 🪪 License

Ezt a projektet a GNU Affero General Public License védi, további részletekért tekintse meg a LICENC fájlt.
