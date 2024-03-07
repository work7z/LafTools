<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Nová generace všestranného toolboxu určeného pro programátory
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Náhled Insider verze LafTools</a>
</div>
</center>
<br><br>
</p>

 [English](/docs/en_US)  |  [简体中文](/docs/zh_CN)  |  [繁體中文](/docs/zh_HK)  |  [Deutsch](/docs/de)  |  [Español](/docs/es)  |  [Français](/docs/fr)  |  [日本語](/docs/ja)  |  [한국어](/docs/ko) | [More](/docs/) <br/> <i>Note: Tato stránka je generována interně z LafTools.</i> <br/>

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

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Začínáme

## 0. Refaktoring

Nedávno refaktorujeme architekturu LafTools založenou na next.js, níže uvedené kroky se mohou podle potřeby změnit.

## 1. Nastavení prostředí systému

Pro zjednodušení řekněme, že jste toto úložiště naklonovali buď do `C:\\Users\jerry\\project\\laftools-repo` ve Windows nebo `/Users/jerry/projects/laftools-repo` na Linux/MacOS, pak byste měli deklarovat env a nastavit konfiguraci níže ve vašem souboru **~/.bashrc**, nebo je jednoduše spustit před spuštěním jakéhokoli příkazu.

Pokud používáte operační systém Windows, ujistěte se, že jsou všechny příkazy prováděny v git-bash, další informace naleznete v [PŘÍSPĚVEK](./docs/CONTRIBUTION.md). Kromě toho se doporučuje nepoužívat žádné mezery nebo neanglické znaky v cestě k souboru, kde je tento projekt umístěn.

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

## 2. Spustit službu Go (refaktoring)

Chcete-li spustit službu Go v terminálu, můžete provést následující příkaz:

```shell
go run ./core/app.go server
```

Chcete-li ladit službu Go, nakonfigurovali jsme ji ve VSCode, stačí postupovat podle následujících kroků:

1. Zadejte Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Spustit modul FrontEnd (přesunuto na web2)

```bash
# nainstalovat požadovanou globální knihovnu
npm i -g pnpm ts-node typescript

# nainstalovat zast
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Je pouze pro Windows, zavře všechny terminály a předchozí procesy.

# spustit webovou službu na terminálu 1
npm run fe-web

# spusťte CSS procesor na terminálu 2
npm run fe-css

# spustit další úlohy na terminálu 3
npm run fe-extra

```

Všimněte si, že můžete použít symbol '&' pro provádění na pozadí, pokud nechcete alternativně spouštět tyto příkazy v samostatných instancích terminálu.

## 4. Začněte se vyvíjet

Jakmile je služba Go spuštěna, měli byste být schopni vidět vytištěný odkaz v terminálu. Nyní zkopírujte tuto adresu URL a vložte ji do svého prohlížeče, abyste mohli začít vyvíjet, jdeme na to!

Příklad:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Stavět

```bash
cd pipeline
./build-all.sh
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
