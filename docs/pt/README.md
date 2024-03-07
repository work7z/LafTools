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

<i>Note: Esta página é gerada internamente pelo LafTools.</i> <br/> [English](/docs/en_US)  |  [简体中文](/docs/zh_CN)  |  [繁體中文](/docs/zh_HK)  |  [Deutsch](/docs/de)  |  [Español](/docs/es)  |  [Français](/docs/fr)  |  [日本語](/docs/ja) | [More](/docs/) <br/>

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

### Visualização:

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

Para executar o serviço Go no terminal, você pode executar o comando abaixo:

```shell
go run ./core/app.go server
```

Para depurar o serviço Go, nós o configuramos no VSCode, basta seguir os passos abaixo:

1. Insira Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Inicie o módulo FrontEnd (movido para web2)

```bash
# instale a biblioteca global necessária
npm i -g pnpm ts-node typescript

# instalar dependências do projeto
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # É apenas para Windows, fechará todos os terminais e processos anteriores.

# execute o serviço web no terminal 1
npm run fe-web

# execute o processador CSS no terminal 2
npm run fe-css

# execute trabalhos extras no terminal 3
npm run fe-extra

```

Observe que você pode usar o símbolo '&' para execução em segundo plano se não quiser executar esses comandos alternativamente em instâncias de terminal separadas.

## 4. Comece a desenvolver

Assim que o serviço Go estiver em execução, você poderá ver um link impresso no terminal. Agora, copie esta URL e cole em seu navegador para começar a desenvolver, vamos lá!

Exemplo:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Construir

```bash
cd pipeline
./build-all.sh
```

# 🌱 O que há com o nome?

#### _The Tools for Laffin' At Life_

O nome deste projeto é inspirado em 'Laffin' At Life', um clássico country de 1987 de Chet Atkins que também ocupa um lugar especial no coração do autor.

Esperamos que o LafTools facilite suas tarefas diárias, reduzindo a necessidade de horas extras e ajudando você a manter um equilíbrio saudável entre vida profissional e pessoal, deixe-nos apenas rir da vida!

# 📑 Outros materiais

Abaixo estão outros materiais que você pode dar uma olhada se quiser saber mais detalhes sobre este projeto:

- [Perguntas frequentes](/docs/pt/FAQ.md)
- [CONTRIBUIÇÃO](/docs/pt/CONTRIBUTION.md)
- [Para desenvolvedores da China](/devtools/notes/common/issues.md)

# 💐 Icons

Gostaríamos de agradecer aos artistas talentosos que forneceram os belos ícones abaixo:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Reconhecimentos

Este projeto não teria sido possível sem incríveis projetos de código aberto aos quais gostaria de expressar pessoalmente minha mais profunda gratidão:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Com certeza existem outros projetos open source que beneficiaram e facilitaram este projeto, que não pude detalhar nesta parte; Sem esses projetos e os esforços desses desenvolvedores de talentos, o LafTools não teria sido possível.

Thank you!

Ryan Laf  
2 de fevereiro de 2023

# 🪪 License

Este projeto está protegido pela Licença Pública Geral GNU Affero. Consulte o arquivo LICENSE para obter mais detalhes.
