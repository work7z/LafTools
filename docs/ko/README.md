<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - 프로그래머를 위해 설계된 차세대 다목적 도구 상자
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">LafTools의 내부자 버전 미리보기</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

# 💡 소개

인터넷에는 수많은 도구를 사용할 수 있는데 왜 우리가 이 도구 상자를 개발하기로 결정했는지 궁금할 것입니다. 실제로 우리가 제공하는 대부분의 도구는 코덱, 포맷터, 번역, QR 코드 등 인터넷에서 쉽게 찾을 수 있습니다. 그러나 이러한 도구를 사용하는 것이 가장 편안하고 효율적인 접근 방식은 아닙니다.

해당 온라인 도구를 사용하는 동안 아래 문제를 만난 적이 있습니까?

- 오프라인 접근성이 없습니다.
- 글로벌 다크 테마가 없습니다.
- 생산적인 UI 스타일이 없습니다.
- 네트워크 성능이 좋지 않습니다.
- 혼란스러운 광고.
- 데이터 유출 문제.

위 항목 중 하나라도 '예'라고 답했다면 당사의 도구 상자를 사용해 보시기 바랍니다. 다음과 같은 기능을 제공합니다.

- 포스 포에버
- 경량 런타임
- 전체 플랫폼 지원(ARMv8 포함)
- 완전한 GPT 유사 지원
- 생산적인 UI와 고도로 통합됨
- 사용 가능한 Docker 이미지 및 Portable Edition
- 메모, 매뉴얼 등과 같은 추가 도우미...

# 🌠 시사

> LafTools는 아직 개발 중이므로 필요에 따라 UI, 종속성 또는 전제 조건이 변경될 수 있습니다.

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 시작하기

## 0. 리팩토링

최근에는 next.js를 기반으로 LafTools의 아키텍처를 리팩토링하고 있으며, 아래 단계는 필요에 따라 변경될 수 있습니다.

## 1. 시스템 환경 설정

단순화를 위해 이 저장소를 Windows의 `C:\\Users\jerry\\project\\laftools-repo` 또는 Windows의 `/Users/jerry/projects/laftools-repo`에 복제했다고 가정해 보겠습니다. Linux/MacOS의 경우 **~/.bashrc** 파일에서 아래에 env를 선언하고 구성을 설정하거나 명령을 실행하기 전에 간단히 실행해야 합니다.

Windows OS를 사용하는 경우 모든 명령이 git-bash에서 실행되는지 확인하세요. 자세한 내용은 [CONTRIBUTION](./docs/CONTRIBUTION.md)을 참조하세요. 이 외에도 이 프로젝트가 있는 파일 경로에는 공백이나 영어가 아닌 문자를 사용하지 않는 것이 좋습니다.

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

## 2. Go 서비스 출시(리팩토링)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

Go 서비스를 디버깅하려면 VSCode에서 구성했습니다. 아래 단계를 따르면 됩니다.

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
- [CONTRIBUTION](./docs/ko/CONTRIBUTION.md)
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
