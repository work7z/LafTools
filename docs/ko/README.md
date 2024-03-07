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

<i>Note: 이 페이지는 LafTools에서 내부적으로 생성됩니다.</i> <br/> [English](/docs/en_US)  |  [简体中文](/docs/zh_CN)  |  [繁體中文](/docs/zh_HK)  |  [Deutsch](/docs/de)  |  [Español](/docs/es)  |  [Français](/docs/fr)  |  [日本語](/docs/ja)  |  한국어 | [More](/docs/) <br/>

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

### 시사:

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

터미널에서 Go 서비스를 실행하려면 아래 명령을 실행할 수 있습니다.

```shell
go run ./core/app.go server
```

Go 서비스를 디버깅하려면 VSCode에서 구성했습니다. 아래 단계를 따르면 됩니다.

1. Visual Studio Code을(를) 입력하세요
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. FrontEnd 모듈 실행(web2로 이동)

```bash
# 필요한 전역 라이브러리 설치
npm i -g pnpm ts-node typescript

# 프로젝트 뎁스 설치
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Windows 전용이며 모든 터미널과 이전 프로세스를 닫습니다.

# 터미널 1에서 웹 서비스 실행
npm run fe-web

# 터미널 2에서 CSS 프로세서 실행
npm run fe-css

# 터미널 3에서 추가 작업 실행
npm run fe-extra

```

별도의 터미널 인스턴스에서 이러한 명령을 실행하지 않으려는 경우 백그라운드 실행에 '&' 기호를 사용할 수 있습니다.

## 4. 개발 시작

Go 서비스가 실행되면 터미널에 링크가 인쇄되는 것을 볼 수 있습니다. 이제 이 URL을 복사하여 브라우저에 붙여넣고 개발을 시작하세요.

예:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. 짓다

```bash
cd pipeline
./build-all.sh
```

# 🌱 이름이 뭐예요?

#### _The Tools for Laffin' At Life_

이 프로젝트의 이름은 저자의 마음 속에 특별한 자리를 차지한 Chet Atkins의 1987년 클래식 컨트리 노래인 'Laffin' At Life'에서 영감을 받았습니다.

LafTools가 귀하의 일상 업무를 더 쉽게 만들고 초과 근무의 필요성을 줄이고 건강한 일과 삶의 균형을 유지하는 데 도움이 되기를 바랍니다. 인생을 즐겁게 보내세요!

# 📑 기타 재료

다음은 이 프로젝트에 대해 더 자세히 알아보고 싶은 경우 살펴볼 수 있는 추가 자료입니다.

- [자주하는 질문](/docs/ko/FAQ.md)
- [기부금](/docs/ko/CONTRIBUTION.md)
- [중국 개발자의 경우](/devtools/notes/common/issues.md)

# 💐 Icons

아래의 아름다운 아이콘을 제공해 주신 재능 있는 아티스트에게 감사드립니다.
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 감사의 말

이 프로젝트는 멋진 오픈 소스 프로젝트가 없었다면 불가능했을 것입니다. 개인적으로 깊은 감사를 표하고 싶습니다.

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

확실히 이 프로젝트에 도움이 되고 촉진된 다른 오픈 소스 프로젝트가 있지만 이 부분에서는 자세히 설명할 수 없습니다. 이러한 프로젝트와 인재 개발자들의 노력이 없었다면 LafTools는 불가능했을 것입니다.

Thank you!

Ryan Laf  
2023년 2월 2일

# 🪪 License

이 프로젝트는 GNU Affero General Public License에 따라 보호됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.
