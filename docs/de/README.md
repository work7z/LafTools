<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Die nächste Generation einer vielseitigen Toolbox für Programmierer
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Vorschau der Insider-Version von LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Diese Seite wird intern von LafTools generiert.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  Deutsch  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 💡 Einführung

Sie fragen sich vielleicht, warum wir entschlossen sind, diese Toolbox zu entwickeln, da es im Internet zahlreiche Tools gibt, die verwendet werden können. Tatsächlich sind die meisten von uns bereitgestellten Tools wie Codec, Formatierer, Übersetzung, QR-Code usw. leicht im Internet zu finden. Allerdings ist die Verwendung dieser Tools nicht die bequemste und effizienteste.

Sind Ihnen bei der Verwendung dieser Online-Tools schon einmal die folgenden Probleme begegnet?

- Keine Offline-Zugänglichkeit.
- Kein globales dunkles Thema.
- Kein produktiver UI-Stil.
- Schlechte Netzwerkleistung.
- Verstörende Werbung.
- Problem mit Datenlecks.

Wenn die Antwort auf eine der oben genannten Fragen „Ja“ lautet, sollten Sie unsere Toolbox ausprobieren. Es bietet folgende Funktionen:

- FOSS für immer
- Leichte Laufzeit
- Vollständige Plattformunterstützung (einschließlich ARMv8)
- Vollständige GPT-ähnliche Unterstützung
- Hochintegriert mit produktiver Benutzeroberfläche
- Verfügbare Docker-Images und Portable Edition
- Zusätzliche Hilfsmittel wie Notizen, Handbücher usw.

# 🌠 Vorschau

> LafTools befindet sich noch in der Entwicklung, seine Benutzeroberfläche, Abhängigkeiten oder Voraussetzungen können sich bei Bedarf ändern.

### Vorschau:

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Erste Schritte

## 0. Refactoring

Vor kurzem haben wir die Architektur von LafTools auf Basis von next.js umgestaltet. Die folgenden Schritte können bei Bedarf geändert werden.

## 1. Systemumgebung einrichten

Nehmen wir der Einfachheit halber an, dass Sie dieses Repository entweder auf `C:\Usersjerry\project\laftools-repo` unter Windows oder auf `/Users/jerry/projects/laftools-repo` unter Linux/MacOS geklont haben. Dann sollten Sie env deklarieren und unten in Ihrer Datei config festlegen **~/.bashrc* *, oder führen Sie sie einfach aus, bevor Sie einen Befehl ausführen.

Wenn Sie ein Windows-Betriebssystem verwenden, stellen Sie bitte sicher, dass alle Befehle in Git-Bash ausgeführt werden. Weitere Informationen finden Sie unter [BEITRAG](/docs/de/CONTRIBUTION.md). Darüber hinaus wird empfohlen, im Dateipfad, in dem sich dieses Projekt befindet, keine Leerzeichen oder nicht-englischen Zeichen zu verwenden.

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

## 2. Go-Dienst starten (Refactoring)

Um den Go-Dienst im Terminal auszuführen, können Sie den folgenden Befehl ausführen:

```shell
go run ./core/app.go server
```

Um den Go-Dienst zu debuggen, haben wir ihn in VSCode konfiguriert. Sie können einfach die folgenden Schritte ausführen:

1. Geben Sie Visual Studio Code ein
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. FrontEnd-Modul starten (nach web2 verschoben)

```bash
# Installieren Sie die erforderliche globale Bibliothek
npm i -g pnpm ts-node typescript

# Projekt-Abhängigkeiten installieren
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Es ist nur für Windows und schließt alle Terminals und vorherigen Prozesse.

# Führen Sie den Webdienst auf Terminal 1 aus
npm run fe-web

# Führen Sie den CSS-Prozessor auf Terminal 2 aus
npm run fe-css

# Führen Sie zusätzliche Jobs auf Terminal 3 aus
npm run fe-extra

```

Beachten Sie, dass Sie das Symbol „&“ für die Hintergrundausführung verwenden können, wenn Sie diese Befehle nicht alternativ in separaten Terminalinstanzen ausführen möchten.

## 4. Beginnen Sie mit der Entwicklung

Sobald der Go-Dienst ausgeführt wird, sollte im Terminal ein ausgedruckter Link angezeigt werden. Kopieren Sie nun diese URL und fügen Sie sie in Ihren Browser ein, um mit der Entwicklung zu beginnen. Los geht's!

Beispiel:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Bauen

```bash
cd pipeline
./build-all.sh
```

# 🌱 Was ist mit dem Namen?

#### _The Tools for Laffin' At Life_

Der Name dieses Projekts ist von „Laffin' At Life“ inspiriert, einem klassischen Country-Song aus dem Jahr 1987 von Chet Atkins, der ebenfalls einen besonderen Platz im Herzen des Autors einnimmt.

Wir hoffen, dass LafTools Ihre täglichen Aufgaben erleichtert, Überstunden reduziert und Ihnen dabei hilft, eine gesunde Work-Life-Balance aufrechtzuerhalten. Lassen Sie uns einfach im Leben herumtollen!

# 📑 Andere Materialien

Nachfolgend finden Sie weitere Materialien, die Sie sich ansehen können, wenn Sie mehr Details über dieses Projekt erfahren möchten:

- [FAQ](/docs/de/FAQ.md)
- [BEITRAG](/docs/de/CONTRIBUTION.md)
- [Für chinesische Entwickler](/devtools/notes/common/issues.md)

# 💐 Icons

Wir würden uns über talentierte Künstler freuen, die die folgenden wunderschönen Symbole zur Verfügung gestellt haben:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Danksagungen

Dieses Projekt wäre ohne großartige Open-Source-Projekte nicht möglich gewesen, bei denen ich persönlich meinen tiefsten Dank aussprechen möchte:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Sicherlich gibt es andere Open-Source-Projekte, die diesem Projekt geholfen und es erleichtert haben, worauf ich in diesem Teil nicht näher eingehen kann; Ohne diese Projekte und die Bemühungen dieser Talententwickler wäre LafTools nicht möglich gewesen.

Thank you!

Ryan Laf  
2. Februar 2023

# 🪪 License

Dieses Projekt ist unter der GNU Affero General Public License geschützt. Weitere Informationen finden Sie in der LIZENZdatei.
