<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Следующее поколение универсального набора инструментов, предназначенного для программистов.
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Предварительный просмотр инсайдерской версии LafTools</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

# 💡 Введение

Вы можете задаться вопросом, почему мы полны решимости разработать этот набор инструментов, поскольку в Интернете можно использовать множество инструментов. Действительно, большинство предоставленных нами инструментов можно легко найти в Интернете, например, кодек, форматтер, перевод, QR-код и т. д. Однако это не самый удобный и эффективный подход к использованию этих инструментов.

Сталкивались ли вы когда-нибудь с указанными ниже проблемами при использовании этих онлайн-инструментов?

- Нет автономного доступа.
- Нет глобальной темной темы.
- Нет продуктивного стиля пользовательского интерфейса.
- Плохая производительность сети.
- Возмутительная реклама.
- Проблема утечки данных.

Если ответ на любой из вышеперечисленных вопросов положительный, вам следует рассмотреть возможность использования нашего набора инструментов. Он предлагает следующие возможности:

- ФОСС навсегда
- Легкая среда выполнения
- Полная поддержка платформ (включая ARMv8)
- Полная поддержка GPT
- Высокая интеграция с продуктивным пользовательским интерфейсом
- Доступные образы Docker и портативная версия
- Дополнительные помощники, такие как заметки, руководства и т. д.

# 🌠 Предварительный просмотр

> LafTools все еще находится в стадии разработки, его пользовательский интерфейс, зависимости или предварительные требования могут быть изменены по мере необходимости.

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Начиная

## 0. Рефакторинг

Недавно мы провели рефакторинг архитектуры LafTools на основе next.js, приведенные ниже шаги могут быть изменены по мере необходимости.

## 1. Настройка системной среды

Для простоты предположим, что вы клонировали этот репозиторий либо в `C:\\Users\jerry\\project\\laftools-repo` в Windows, либо в `/Users/jerry/projects/laftools-repo` в Linux/MacOS, тогда вам следует объявить env и установить конфигурацию ниже в вашем файле **~/.bashrc** или просто выполнить их перед запуском любой команды.

Если вы используете ОС Windows, убедитесь, что все команды выполняются в git-bash. Дополнительную информацию см. в [ВКЛАД](./docs/CONTRIBUTION.md). Помимо этого, рекомендуется избегать использования пробелов или неанглийских символов в пути к файлу, где находится этот проект.

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

## 2. Запуск службы Go (рефакторинг)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

Чтобы отладить службу Go, мы настроили ее в VSCode, вы можете просто выполнить следующие шаги:

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
- [CONTRIBUTION](./docs/ru/CONTRIBUTION.md)
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
