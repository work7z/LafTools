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

<i>Note: This page is generated from LafTools internally.</i>

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

### Preview(English):

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

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

Chcete-li ladit službu Go, nakonfigurovali jsme ji ve VSCode, stačí postupovat podle následujících kroků:

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
- [CONTRIBUTION](./docs/cs/CONTRIBUTION.md)
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
