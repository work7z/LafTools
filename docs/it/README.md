<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - La prossima generazione di un toolbox versatile progettato per i programmatori
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Anteprima della versione Insider di LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Questa pagina è generata internamente da LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

Per utilizzare rapidamente queste funzioni, abbiamo fornito un sito Web online stabile nella regione CN e negli Stati Uniti da utilizzare. La maggior parte degli strumenti sono disponibili nei nostri siti Web online, ad eccezione di alcuni strumenti che si basano su funzionalità specifiche del sistema operativo.

- 🇺🇸 stato unito: [laftools.dev](https://laftools.dev)
- 🇨🇳 Solo Cina continentale: [laf-tools.com](https://laf-tools.com)

# 💡 introduzione

Potresti chiederti perché siamo determinati a sviluppare questo toolbox poiché esistono numerosi strumenti che possono essere utilizzati su Internet. In effetti, la maggior parte degli strumenti che abbiamo fornito possono essere facilmente reperiti su Internet, come codec, formattatore, traduzione, codice QR, ecc… Tuttavia, non è l'approccio più comodo ed efficiente per utilizzare questi strumenti.

Hai mai riscontrato i seguenti problemi durante l'utilizzo di questi strumenti online?

- Nessuna accessibilità offline.
- Nessun tema oscuro globale.
- Nessuno stile dell'interfaccia utente produttivo.
- Scarse prestazioni di rete.
- Pubblicità sconvolgenti.
- Problema di perdita di dati.

Se la risposta a una qualsiasi delle domande precedenti è sì, allora dovresti considerare di provare la nostra cassetta degli attrezzi. Offre le seguenti funzionalità:

- FOSS per sempre
- Autonomia leggera
- Supporto completo della piattaforma (incluso ARMv8)
- Supporto completo simile a GPT
- Altamente integrato con un'interfaccia utente produttiva
- Immagini Docker disponibili ed edizione portatile
- Supporti extra come appunti, manuali, ecc...

# 🌠 Anteprima

> LafTools è ancora in fase di sviluppo, la sua interfaccia utente, le dipendenze o i prerequisiti potrebbero essere modificati in base alle necessità.

### Anteprima:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Iniziare

## 0. Refactoring

Recentemente, stiamo eseguendo il refactoring dell'architettura di LafTools basata su next.js, i passaggi seguenti potrebbero essere modificati in base alle necessità.

## 1. Imposta l'ambiente di sistema

Per semplicità, supponiamo che tu abbia clonato questo repository su `C:\Usersjerry\project\laftools-repo` su Windows o `/Users/jerry/projects/laftools-repo` su Linux/MacOS, quindi dovresti dichiarare env e impostare config di seguito nel tuo file **~/.bashrc* *, o semplicemente eseguirli prima di eseguire qualsiasi comando.

Se utilizzi il sistema operativo Windows, assicurati che tutti i comandi siano eseguiti in git-bash, per ulteriori informazioni fai riferimento a [CONTRIBUTO](/docs/it/CONTRIBUTION.md). Oltre a ciò, si consiglia di evitare di utilizzare spazi bianchi o caratteri non inglesi nel percorso del file in cui si trova questo progetto.

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

## 2. Avvia il servizio Go (Refactoring)

Per eseguire il servizio Go nel terminale, puoi eseguire il comando seguente:

```shell
go run ./core/app.go server
```

Per eseguire il debug del servizio Go, lo abbiamo configurato in VSCode, puoi semplicemente seguire i passaggi seguenti:

1. Inserisci Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Avvia il modulo FrontEnd (spostato in web2)

```bash
# installare la libreria globale richiesta
npm i -g pnpm ts-node typescript

# installa le dipendenze del progetto
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # È solo per Windows, chiuderà tutti i terminali e i processi precedenti.

# eseguire il servizio Web sul terminale 1
npm run fe-web

# eseguire il processore CSS sul terminale 2
npm run fe-css

# eseguire lavori extra sul terminale 3
npm run fe-extra

```

Tieni presente che puoi utilizzare il simbolo "&" per l'esecuzione in background se non desideri eseguire in alternativa questi comandi in istanze di terminale separate.

## 4. Inizia a sviluppare

Una volta che il servizio Go è in esecuzione, dovresti essere in grado di vedere un collegamento stampato nel terminale. Ora copia questo URL e incollalo nel tuo browser per iniziare a sviluppare, andiamo!

Esempio:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Costruire

```bash
cd pipeline
./build-all.sh
```

# 🌱 Cosa significa il nome?

#### _The Tools for Laffin' At Life_

Il nome di questo progetto è ispirato a 'Laffin' At Life', una classica canzone country del 1987 di Chet Atkins che occupa anche un posto speciale nel cuore dell'autore.

Speriamo che LafTools semplifichi le tue attività quotidiane, riducendo la necessità di straordinari e aiutandoti a mantenere un sano equilibrio tra lavoro e vita privata, lasciaci semplicemente ridere della vita!

# 📑 Altri materiali

Di seguito sono riportati ulteriori materiali a cui puoi dare un'occhiata se desideri saperne di più dettagli su questo progetto:

- [FAQ](/docs/it/FAQ.md)
- [CONTRIBUTO](/docs/it/CONTRIBUTION.md)
- [Per gli sviluppatori cinesi](/devtools/notes/common/issues.md)

# 💐 Icons

Apprezzeremmo gli artisti di talento che fornissero di seguito bellissime icone:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Ringraziamenti

Questo progetto non sarebbe stato possibile senza fantastici progetti open source ai quali vorrei esprimere personalmente la mia più profonda gratitudine:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Sicuramente ci sono altri progetti open source che hanno beneficiato e facilitato questo progetto, che non ho potuto dettagliare in questa parte; Senza questi progetti e gli sforzi di questi talentuosi sviluppatori, LafTools non sarebbe stato possibile.

Thank you!

Ryan Laf  
2 febbraio 2023

# 🪪 License

Questo progetto è protetto dalla GNU Affero General Public License, per maggiori dettagli consultare il file LICENSE.
