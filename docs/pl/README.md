<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Kolejna generacja wszechstronnego zestawu narzędzi przeznaczonego dla programistów
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Wyświetl podgląd wersji Insider LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Ta strona jest generowana wewnętrznie przez LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

Aby szybko korzystać z tych funkcji, wdrożyliśmy stabilną witrynę internetową w USA i regionie CN. Większość narzędzi jest dostępna w naszych witrynach internetowych, z wyjątkiem niektórych narzędzi, które opierają się na określonych możliwościach systemu operacyjnego.

- 🇺🇸 Zjednoczone państwo: [laftools.dev](https://laftools.dev)
- 🇨🇳 Tylko Chiny kontynentalne: [laftools.cn](https://laftools.cn)

# 💡 Wstęp

Możesz się zastanawiać, dlaczego jesteśmy zdeterminowani opracować ten zestaw narzędzi, skoro w Internecie można korzystać z wielu narzędzi. Rzeczywiście, większość narzędzi, które udostępniliśmy, można łatwo znaleźć w Internecie, takich jak kodek, formater, tłumaczenie, kod QR itp. Jednak korzystanie z tych narzędzi nie jest najwygodniejszym i najskuteczniejszym podejściem.

Czy kiedykolwiek spotkałeś się z poniższymi problemami podczas korzystania z tych narzędzi online?

- Brak dostępności offline.
- Brak globalnego ciemnego motywu.
- Brak produktywnego stylu interfejsu użytkownika.
- Słaba wydajność sieci.
- Denerwujące reklamy.
- Problem wycieku danych.

Jeśli odpowiedź na którekolwiek z powyższych pytań brzmi „tak”, powinieneś rozważyć wypróbowanie naszego zestawu narzędzi. Oferuje następujące funkcje:

- FOSS na zawsze
- Lekki czas działania
- Pełna obsługa platformy (w tym ARMv8)
- Pełna obsługa podobna do GPT
- Wysoce zintegrowany z produktywnym interfejsem użytkownika
- Dostępne obrazy platformy Docker i wersja przenośna
- Dodatkowe pomoce, takie jak notatki, podręczniki itp.

# 🌠 Zapowiedź

> LafTools jest wciąż w fazie rozwoju, jego interfejs użytkownika, zależności lub wymagania wstępne mogą ulec zmianie w razie potrzeby.

### Zapowiedź:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 Pierwsze kroki

## 1. Skonfiguruj środowisko systemowe

Dla uproszczenia załóżmy, że sklonowałeś to repozytorium do `C:\Usersjerry\project\laftools-repo` w systemie Windows lub `/Users/jerry/projects/laftools-repo` w systemie Linux/MacOS, następnie powinieneś zadeklarować env i ustawić konfigurację poniżej w swoim pliku **~/.bashrc* * lub po prostu wykonaj je przed uruchomieniem dowolnego polecenia.

Jeśli używasz systemu operacyjnego Windows, upewnij się, że wszystkie polecenia są wykonywane w git-bash. Więcej informacji znajdziesz w [WKŁAD](/docs/pl/CONTRIBUTION.md). Poza tym zaleca się unikanie używania spacji lub znaków innych niż angielskie w ścieżce pliku, w którym znajduje się ten projekt.

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
# zainstaluj wymaganą bibliotekę globalną
npm i -g pnpm ts-node typescript

# zainstaluj deps projektu
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# run core service
npm run fe-web

```

## 3. Zbudować

```bash
cd pipeline
./build-all.sh "v1.9.9-beta"
```

# 🌱 O co chodzi z nazwą?

#### _The Tools for Laffin' At Life_

Nazwa tego projektu inspirowana jest „Laffin' At Life”, klasyczną piosenką country z 1987 roku autorstwa Cheta Atkinsa, która również zajmuje szczególne miejsce w sercu autora.

Mamy nadzieję, że LafTools ułatwi Ci codzienne zadania, zmniejszy potrzebę nadgodzin i pomoże Ci zachować zdrową równowagę między życiem zawodowym a prywatnym. Pozwól nam po prostu bawić się życiem!

# 📑 Inne materiały

Poniżej znajdują się dalsze materiały, z którymi możesz się zapoznać, jeśli chcesz poznać więcej szczegółów na temat tego projektu:

- [Często zadawane pytania](/docs/pl/FAQ.md)
- [SKŁADKA](/docs/pl/CONTRIBUTION.md)
- [Dla chińskich programistów](/devtools/notes/common/issues.md)

# 💐 Icons

Bylibyśmy wdzięczni utalentowanym artystom, którzy dostarczyli poniżej piękne ikony:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Podziękowanie

Ten projekt nie byłby możliwy bez świetnych projektów open source, którym chciałbym osobiście wyrazić moją najgłębszą wdzięczność:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Z pewnością istnieją inne projekty open source, które przyniosły korzyści i ułatwiły ten projekt, których nie mogłem szczegółowo opisać w tej części; Bez tych projektów i wysiłków twórców talentów LafTools nie byłoby możliwe.

Thank you!

Ryan Laf  
2 lutego 2023 r

# 🪪 License

Ten projekt jest chroniony na podstawie Powszechnej Licencji Publicznej GNU Affero. Więcej szczegółów znajdziesz w pliku LICENCJA.
