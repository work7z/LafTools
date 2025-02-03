由于考虑到CodeGen工具箱(LafTools)发展现况较为困难，迫于服务器和域名等费用过于昂贵，我们经过深思熟虑之后，还是决定放弃开发和维护。

对于原高级会员(包含付费/非付费)的用户，很感谢有您的支持，我们已经记录好所有的数据库记录，在将来我们新产品上线之后，将会依旧保持您的权益。

原有工具箱应该还能用，源码都已开源：

- https://github.com/work7z/MDGJX
- https://github.com/work7z/LafTools

与此同时，以下域名将不再可用：

- work7z.com
- codegen.cc
- mdgjx.com
- laftools.cn
- laf-tools.com
我们也感叹到DeepSeek对AI领域的革命性突破，特别是token单价实现了不可思议的低成本，我们相信未来时代是属于AI的。

我们团队内部正在开发一款IDE插件(偏AI的)，未来我们新产品的发布，还请关注我们B站唯一账号“CodeGen工具箱”的消息，江湖再见！

最后，祝大家蛇年大吉大利，新春快乐，万事如意！



<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - The next generation of a versatile toolbox designed for programmers
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Preview the Insider Version of LafTools</a>
</div>
</center> -->
<br><br>
</p>

**Unfinished Project, to be continue**

<i>Note: This page is generated from LafTools internally.</i> <br/> English | [简体中文](/docs/zh_CN/README.md) | [繁體中文](/docs/zh_HK/README.md) | [Deutsch](/docs/de/README.md) | [Español](/docs/es/README.md) | [Français](/docs/fr/README.md) | [日本語](/docs/ja/README.md) | [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Vision

LafTools is a privacy-first, self-hosted, fully open source toolbox designed for programmers, you can find plentful toolsets on this website.

# 💌 Features

- FOSS Forever
- Lightweight Runtime
- Full platform support(including ARMv8)
- Full GPT-alike support
- Highly integrated with productive UI
- Available Docker Images and Portable Edition
- Desktop edition support(Planning)
- ...

# 🚀 Run it on Docker

**For GLOBAL users:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**For CHINESE users(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Default port is set to 39899, you can adjust it if needed.
2. LafTools will always be upgraded to latest version automatically so that you can enjoy latest functions and bugfixs.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Online Websites

To quickly use these functions, we've deployed stable online website in US and CN region for you to use. Most tools are available in our online websites except for some tools that rely on specific OS capablities.

- 🇺🇸 United State: [laftools.dev](https://laftools.dev)
- 🇨🇳 China Mainland: [laftools.cn](https://laftools.cn)

# 🌠 Preview

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 About LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

In short, LafTools is a suite that offers a series of linked, asynchronous, and functional toolsets.

Rest assured, this project will evolve in remarkable and fantastic ways over time. This project needs more time, just like wine, gets better with time.

# 🌠 Contribution

## 1. Setup System Environment

For the sake of simplicity, let's say that you've cloned this repository to either `C:\Usersjerry\project\laftools-repo` on Windows or `/Users/jerry/projects/laftools-repo` on Linux/MacOS, then you should declare env and set config below in your file **~/.bashrc**, or simply execute them before running any command.

If you're using Windows OS, please ensure that all commands are executed in git-bash, learn more please refer to [CONTRIBUTION](/docs/en_US/CONTRIBUTION.md). Apart from this, it is recommended to avoid using any whitespace or non-English characters in the file path where this project is located.

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
# install required global library
npm i -g pnpm ts-node typescript

# install project deps
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# run core service
npm run fe-web

```

## 3. Build

```bash
cd pipeline
./build-all.sh
```

# 📑 Other Materials

Below are further materials that you can have a look if you'd like to learn more detail about this project:

- [FAQ](/docs/en_US/FAQ.md)
- [CONTRIBUTION](/docs/en_US/CONTRIBUTION.md)
- [For China Developers](/devtools/notes/common/issues.md)

# 💐 Icons

We would appreciate talent artists who provided below beautiful icons:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Acknowledgements

This project would not have been possible without awesome open source projects which I would like to personally express my deepest gratitude to:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

For sure, there are other open source projects that have benefited and facilitated this project, which I couldn't detail in this part; Without these projects and these talent developers' efforts, LafTools would not have been possible.

# 🪪 License

This project is protected under the GNU Affero General Public License, please see the LICENSE file for more details.
