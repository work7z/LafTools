<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/sub/web/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - The next generation of a versatile toolbox designed for programmers
</span>
<br><br>
</p>

# 💡 Introduction

You may wonder why we are determined to develop this toolbox if there are numerous alternatives exist for those commonly used tools on online websites.

Indeed, most tools in our toolbox can be found on any online website and you also can collect them easily into your favorites in the browser, such as common encryption and decryption, translation tools, generating QR codes, etc…

However, it’s not the simplest and quickest approach to access these conversion tools, in other words, not the most comfortable and efficient way.

Have you ever met the below issues while using those online tools?

- No Offline Accessibility.
- No Global Dark Theme.
- No Productive UI style.
- Poor Network Performance.
- Upsetting Advertisements
- Data Leakage Issue.

If the answer to any of the above is yes, then you should consider trying our toolbox. It offers the following features:

- Fully open-source code with no malicious logic
- Lightweight runtime (requires only 6MB of RAM)
- Full platform support (including ARMv8)
- Native AI support (similar to ChatGPT)
- Highly integrated with a productive UI
- Continuous addition of new tools in the future
- Can be used over the web and with Docker
- Extra helpers such as notes, manuals, etc...

Example Preview:
Here are some screenshots for you to preview how this toolbox works.

(TO BE CONTINUE)

# 🍀 Getting Started

> If you're using Windows, please ensure below commands will be executed in git-bash, further detail and [CONTRIBUTION](CONTRIBUTION.md) at first.

## IMPORTANT NOTES

LafTools is still under development, its dependencies or prerequisites may changed as needed.

**For any issue, in particular to developers in China mainland, please read [Common Env Issues](dev/notes/common/issues.md) firstly, if there's no solution can solve it then raise an issue to us at any time, thanks!**

## Setup System Environment

Note that you need to set system environment variables in your bash before developing or building. If you're unsure how to do this, you can simply execute the following commands each time you open a new terminal:

### LAFTOOLS_ROOT

if you've cloned this repository to `/users/jerry/projects/laftools-repo`, then you should set this path as the value for `LAFTOOLS_ROOT`

### Examples:

```bash
export LAFTOOLS_ROOT=/users/jerry/projects/laftools-repo
```

## Launch Go service

To run Go service in terminal, you can execute below command:

```shell
go run ./core/CodeGenApplication.go server
```

To debug Go service, we have configured it in VSCode, you can just follow below steps:

1. Enter Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## Launch Front-end project

**Web Part**:

```bash
# using pnpm instead of npm
npm i -g pnpm
# install ts library
npm i -g ts-node
npm i -g typescript
# install project deps
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/sub/web && pnpm install
cd $LAFTOOLS_ROOT/sub/purejs && pnpm install
cd $LAFTOOLS_ROOT/dev/scripts/scan && pnpm install

# terminate previous processes if you're on Windows OS.
npm run kill-prev


# start webpack service
npm run fe-web &
npm run fe-css &
npm run fe-extra &

```

Note that if you prefer not to use the '&' symbol for background execution, you can alternatively run these commands in separate terminal instances.

**Scan Part**:

```bash
cd dev/scripts/scan
npm i -g pnpm # can skip if it's installed
pnpm install --no-frozen-lockfile
npm run scan # start scanning files to provide translate service
```

## Access Local Service

Once the Go service is running, you should see a URL in the output. Copy this URL and paste it into your browser to start developing!

Examples:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh_CN users)
請復製下方鏈接並在瀏覽器端打開(for zh_HK users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## Build

```bash
cd pipeline
./build-all.sh
```

Note that this app is still under development, kindly stay tuned for when will it release, thanks a lots!

> if you encounter any issue when you are developing LafTools or building your binary, please contact us at any time.

# 🙋 Is it a free software?

Yes, it is open-source software, and you can use it following the terms of the license. However, please note that being open-source does not necessarily mean it's entirely free of charge. While most tools can be used for free, some may incur charges related to API usage and server costs.

While we strive to provide as many services as possible for free, some features do require payment. This is because we incur costs for servers, maintenance, and other operational aspects that are essential to keep our services running smoothly and reliably. By charging for premium services, we can cover these costs and continue to offer high-quality, sustainable services. We appreciate your understanding and support.

Wait, actually there’s another option instead of just paying the bill.

As a professional programmer, you can contribute to this project and create a pull request for this project, then you could obtain a free premium membership for three months.

What you can do is to

- Add Unit Test
- Add New Tools
- Enhance Exist Tools
- Solve Any App Issue
- Enhance Performance
- Technical Implementation

Learn more kindly refer to [Contribution](CONTRIBUTION.md)

With full test coverage and efforts from the LafTools community, we are firmly convinced that the software can grow faster and stronger.

# 🌠 Preview

Preview(English):
![](https://github.com/work7z/LafTools/blob/dev/dev/source/img-preview-en.png?raw=true)

Preview(简体中文):
![](https://github.com/work7z/LafTools/blob/dev/dev/source/img-preview.png?raw=true)

# ✉️ A Letter to CodeGen ToolBox Users

Greetings from the CodeGen ToolBox team.

In the midst of this cold winter, we are thrilled to announce that CodeGen ToolBox has released its entire source code and has been renamed to LafTools for a more concise and specific product name. From this point forward, our team will also be known as the LafTools Team.

Despite our software now being fully open source, we remain committed to serving our premium users as before. We are deeply grateful to those who have shown us their unreserved trust and generous support by upgrading to our premium account. Rest assured, your paid services will remain unaffected, and we are continually exploring ways to enhance this product.

Our decision to completely open our source code was driven by the following reasons::

- To conduct a security reviews
- To demonstrate the void of malicious logic or backdoors
- To welcome contributions from the community
- To build a strong reputation and earn trust.

We understand your concerns about potential hacking attempts to bypass the activation logic of the software. Indeed, we acknowledge this as a potential issue. However, we have realized that LafTools should thrive by selling services, not just software licenses.

We'd like to remind you below things:

- Download our software from the official Github repository or our official website.
- Report any security issues you detect.
- Do not hesitate to submit your proposals for UI, tools, development, or any other aspects.

Lastly, we would like to express our gratitude for your time in reading this section.

Thank you.

Nov 18th, 2023   
LafTools Team

# 🎷 Inspiration

This project is primarily inspired by the following musicians:

- Joe Pass
- The Manhattan Transfer  
- Khalil Fong    
- Li Rong Hao     
- Chet Atkins
- Tommy Emmanuel
- Frédéric Chopin
- Oscar Peterson  
- Hugo Strasser  
- Jay Chou  
- Stefanie Sun   
- David Tao   
- Jacky Cheung   

Specifically, the performance of **"Satin Doll"** by the virtuoso **Joe Pass** in "An Evening With Joe Pass" (1994) has been a source of strength and confidence for me, empowering me to face any dilemma in life.

Thank you.

Mar. 20th, 2021  
Ryan Laf   


# 🪪 License

This project is protected under the GNU Affero General Public License.  
Please see the LICENSE file for more details.
