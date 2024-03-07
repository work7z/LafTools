<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - 专为程序员设计的下一代多功能工具箱
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">预览LafTools工具箱的 Insider 版本</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

# 💡 介绍

您可能想知道为什么我们决心开发这个工具箱，因为互联网上有很多工具可以使用。 确实，我们提供的大多数工具都可以在互联网上轻松找到，例如编解码器、格式化程序、翻译、二维码等……但是，使用这些工具并不是最舒适和最有效的方法。

您在使用这些在线工具时是否遇到过以下问题？

- 无法离线访问。
- 没有全局黑暗主题。
- 没有高效的 UI 风格。
- 网络性能差。
- 令人不安的广告。
- 数据泄露问题。

如果以上任一问题的答案是肯定的，那么您应该考虑尝试我们的工具箱。它具有以下功能：

- 永远的自由软件
- 轻量级运行时
- 全平台支持（包括ARMv8）
- 完全类似 GPT 的支持
- 与高效的 UI 高度集成
- 可用的 Docker 映像和便携式版本
- 额外的帮助，如注释、手册等......

# 🌠 预览

> LafTools工具箱仍在开发中，其 UI、依赖项或先决条件可能会根据需要进行更改。

### 预览（英文）:

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-zh_CN.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark-zh_CN.png?raw=true)

# 🍀 入门

## 0. 重构

最近，我们正在基于next.js重构LafTools工具箱的架构，以下步骤可能会根据需要进行更改。

## 1. 设置系统环境

为了简单起见，假设您已将此仓库克隆到 Windows 上的“C:\\Users\jerry\\project\\laftools-repo”或 Windows 上的“/Users/jerry/projects/laftools-repo” Linux/MacOS，那么您应该在文件 **~/.bashrc** 中声明 env 并设置配置，或者在运行任何命令之前执行它们。

如果您使用的是 Windows 操作系统，请确保所有命令都在 git-bash 中执行，了解更多信息请参阅 [CONTRIBUTION](./docs/CONTRIBUTION.md)。除此之外，建议避免在该项目所在的文件路径中使用任何空格或非英文字符。

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

## 2. 启动Go服务（重构）

要在终端中运行 Go 服务，您可以执行以下命令：

```shell
go run ./core/app.go server
```

为了调试Go服务，我们已经在VSCode中配置了它，您可以按照以下步骤操作：

1. 输入Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. 启动前端模块（移至 web2）

```bash
# 安装所需的全局库
npm i -g pnpm ts-node typescript

# 安装项目依赖
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # 它仅适用于 Windows，它将关闭所有终端和以前的进程。

# 在终端 1 上运行 Web 服务
npm run fe-web

# run CSS processor on terminal 2
npm run fe-css

# run extra jobs on terminal 3
npm run fe-extra

```

请注意，如果您不想在单独的终端实例中运行这些命令，则可以使用“&”符号进行后台执行。

## 4. 开始开发

Go 服务运行后，您应该能够看到终端中打印出一个链接。现在，复制此 URL 并将其粘贴到浏览器中开始开发，让我们开始吧！

例子:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. 构建(Build)

```bash
cd pipeline
./build-all.sh
```

# 🌱 名字是怎么回事？

#### _拉芬生活的工具_

该项目的名称灵感来自于切特·阿特金斯 (Chet Atkins) 于 1987 年创作的一首经典乡村歌曲《Laffin' At Life》，这首歌曲在作者心中也占有特殊的地位。

希望LafTools工具箱能让您的日常工作变得更加轻松，减少加班的需要，帮助您保持健康的工作与生活平衡，让我们尽情享受生活吧！

# 📑 其他材料

如果您想了解有关该项目的更多详细信息，可以查看以下更多材料：

- [常见问题](./docs/FAQ.md)
- [贡献](./docs/zh_CN/CONTRIBUTION.md)
- [对于中国开发者](devtools/notes/common/issues.md)

# 💐 Icons

我们非常感谢提供以下精美图标的才华横溢的艺术家：
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 致谢

如果没有出色的开源项目，这个项目就不可能实现，我想亲自向以下项目表示最深切的谢意：

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

当然，还有其他开源项目受益并促进了这个项目，我无法在这一部分中详细介绍；如果没有这些项目和这些人才开发人员的努力，LafTools工具箱就不可能实现。

Thank you!

Ryan Laf  
2023年2月2日

# 🪪 License

该项目受 GNU Affero 通用公共许可证保护，请参阅许可证文件了解更多详细信息。
