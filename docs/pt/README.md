<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - A próxima geração de uma caixa de ferramentas versátil projetada para programadores
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Visualize a versão interna do LafTools</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

# 💡 Introdução

Você pode se perguntar por que estamos determinados a desenvolver esta caixa de ferramentas, já que existem inúmeras ferramentas que podem ser usadas na Internet. Na verdade, a maioria das ferramentas que disponibilizamos podem ser facilmente encontradas na Internet, como codec, formatador, tradução, QR Code, etc… No entanto, não é a abordagem mais confortável e eficiente para utilizar estas ferramentas.

Você já encontrou os problemas abaixo ao usar essas ferramentas online?

- Sem acessibilidade off-line.
- Nenhum tema escuro global.
- Nenhum estilo de UI produtiva.
- Mau desempenho da rede.
- Anúncios perturbadores.
- Problema de vazamento de dados.

Se a resposta a alguma das perguntas acima for sim, você deve considerar experimentar nossa caixa de ferramentas. Ele oferece os seguintes recursos:

- Software Livre para Sempre
- Tempo de execução leve
- Suporte completo à plataforma (incluindo ARMv8)
- Suporte completo semelhante ao GPT
- Altamente integrado com UI produtiva
- Imagens Docker disponíveis e edição portátil
- Ajudantes extras, como notas, manuais, etc.

# 🌠 Visualização

> LafTools ainda está em desenvolvimento, sua UI, dependências ou pré-requisitos podem ser alterados conforme necessário.

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Começando

## 0. Reestruturação

Recentemente, estamos refatorando a arquitetura do LafTools com base em next.js. As etapas abaixo podem ser alteradas conforme necessário.

## 1. Configurar ambiente do sistema

Para simplificar, digamos que você clonou este repositório para `C:\\Users\jerry\\project\\laftools-repo` no Windows ou `/Users/jerry/projects/laftools-repo` no Linux/MacOS, então você deve declarar env e definir a configuração abaixo em seu arquivo **~/.bashrc**, ou simplesmente executá-los antes de executar qualquer comando.

Se você estiver usando o sistema operacional Windows, certifique-se de que todos os comandos sejam executados no git-bash. Para saber mais, consulte [CONTRIBUTION](./docs/CONTRIBUTION.md). Além disso, é recomendável evitar o uso de espaços em branco ou caracteres que não sejam do inglês no caminho do arquivo onde este projeto está localizado.

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

## 2. Iniciar serviço Go (refatoração)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

Para depurar o serviço Go, nós o configuramos no VSCode, basta seguir os passos abaixo:

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
- [CONTRIBUTION](./docs/pt/CONTRIBUTION.md)
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
