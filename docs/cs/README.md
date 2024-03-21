<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Nová generace všestranného toolboxu určeného pro programátory
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Náhled Insider verze LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Tato stránka je generována interně z LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

Pro rychlé použití těchto funkcí jsme pro vás nasadili stabilní online web v regionu USA a CN. Většina nástrojů je k dispozici na našich online webových stránkách s výjimkou některých nástrojů, které se spoléhají na konkrétní funkce operačního systému.

- 🇺🇸 spojený stát: [laftools.dev](https://laftools.dev)
- 🇨🇳 Pouze pevninská Čína: [laftools.cn](https://laftools.cn)

# 💡 Úvod

Možná se divíte, proč jsme se rozhodli vyvinout tuto sadu nástrojů, protože na internetu lze použít mnoho nástrojů. Většinu nástrojů, které poskytujeme, lze skutečně snadno najít na internetu, jako je kodek, formátovač, překlad, QR kód atd... Není to však nejpohodlnější a nejefektivnější přístup k používání těchto nástrojů.

Setkali jste se někdy při používání těchto online nástrojů s níže uvedenými problémy?

- Žádná přístupnost offline.
- Žádné globální temné téma.
- Žádný produktivní styl uživatelského rozhraní.
- Špatný výkon sítě.
- Rozčilující reklamy.
- Problém s únikem dat.

Pokud je odpověď na kteroukoli z výše uvedených otázek ano, měli byste zvážit vyzkoušení naší sady nástrojů. Nabízí následující funkce:

- FOSS navždy
- Lehký běhový čas
- Plná podpora platformy (včetně ARMv8)
- Plná podpora GPT
- Vysoce integrovaný s produktivním uživatelským rozhraním
- Dostupné Docker Images a Portable Edition
- Extra pomocníci jako poznámky, manuály atd...

# 🌠 Náhled

> LafTools je stále ve vývoji, jeho uživatelské rozhraní, závislosti nebo předpoklady se mohou podle potřeby měnit.

### Náhled:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Začínáme

## 1. Nastavení prostředí systému

Pro zjednodušení řekněme, že jste toto úložiště naklonovali buď do `C:\Usersjerry\project\laftools-repo` na Windows nebo `/Users/jerry/projects/laftools-repo` na Linux/MacOS, pak byste měli deklarovat env a nastavit konfiguraci níže ve vašem souboru **~/.bashrc* *, nebo je jednoduše spusťte před spuštěním jakéhokoli příkazu.

Pokud používáte operační systém Windows, ujistěte se, že jsou všechny příkazy prováděny v git-bash, další informace naleznete v [PŘÍSPĚVEK](/docs/cs/CONTRIBUTION.md). Kromě toho se doporučuje nepoužívat žádné mezery nebo neanglické znaky v cestě k souboru, kde je tento projekt umístěn.

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
# nainstalovat požadovanou globální knihovnu
npm i -g pnpm ts-node typescript

# nainstalovat zast
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# run core service
npm run fe-web

```

## 3. Stavět

```bash
cd pipeline
./build-all.sh "v1.9.9-beta"
```

# 🌱 Jak je to se jménem?

#### _The Tools for Laffin' At Life_

Název tohoto projektu je inspirován „Laffin' At Life“, klasickou country písní z roku 1987 od Cheta Atkinse, která má také zvláštní místo v srdci autora.

Doufejme, že LafTools vám usnadní každodenní úkoly, sníží potřebu přesčasů a pomůže vám udržet zdravou rovnováhu mezi pracovním a soukromým životem.

# 📑 Jiné materiály

Níže jsou uvedeny další materiály, které si můžete prohlédnout, pokud se chcete o tomto projektu dozvědět více podrobností:

- [FAQ](/docs/cs/FAQ.md)
- [PŘÍSPĚVEK](/docs/cs/CONTRIBUTION.md)
- [Pro čínské vývojáře](/devtools/notes/common/issues.md)

# 💐 Icons

Ocenili bychom talentované umělce, kteří poskytli níže krásné ikony:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Poděkování

Tento projekt by nebyl možný bez úžasných open source projektů, kterým bych rád osobně vyjádřil své nejhlubší poděkování:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Jistě existují další projekty s otevřeným zdrojovým kódem, které tomuto projektu prospěly a usnadnily jej, což jsem v této části nemohl podrobně popsat; Bez těchto projektů a úsilí těchto talentovaných vývojářů by LafTools nebylo možné.

Thank you!

Ryan Laf  
2. února 2023

# 🪪 License

Tento projekt je chráněn pod licencí GNU Affero General Public License, další podrobnosti naleznete v souboru LICENSE.
