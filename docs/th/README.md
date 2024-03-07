<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - กล่องเครื่องมืออเนกประสงค์เจเนอเรชันถัดไปที่ออกแบบมาสำหรับโปรแกรมเมอร์
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">ดูตัวอย่าง LafTools เวอร์ชัน Insider</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

# 💡 การแนะนำ

คุณอาจสงสัยว่าเหตุใดเราจึงมุ่งมั่นที่จะพัฒนากล่องเครื่องมือนี้เนื่องจากมีเครื่องมือมากมายที่สามารถใช้งานบนอินเทอร์เน็ตได้ แท้จริงแล้ว เครื่องมือส่วนใหญ่ที่เราจัดเตรียมให้นั้นหาได้ง่ายบนอินเทอร์เน็ต เช่น โคเดก ฟอร์แมตเตอร์ การแปล รหัส QR ฯลฯ อย่างไรก็ตาม การใช้เครื่องมือเหล่านี้ไม่สะดวกสบายและมีประสิทธิภาพที่สุด

คุณเคยพบปัญหาด้านล่างขณะใช้เครื่องมือออนไลน์เหล่านั้นหรือไม่

- ไม่มีการเข้าถึงแบบออฟไลน์
- ไม่มีธีม Global Dark
- ไม่มีสไตล์ UI ที่มีประสิทธิผล
- ประสิทธิภาพของเครือข่ายแย่
- โฆษณาที่ทำให้เสียอารมณ์
- ปัญหาการรั่วไหลของข้อมูล

หากคำตอบข้างต้นคือใช่ คุณควรลองใช้กล่องเครื่องมือของเรา มันมีคุณสมบัติดังต่อไปนี้:

- ฟอสส์ตลอดไป
- รันไทม์น้ำหนักเบา
- รองรับแพลตฟอร์มเต็มรูปแบบ (รวมถึง ARMv8)
- รองรับ GPT เต็มรูปแบบ
- บูรณาการอย่างสูงกับ UI ที่มีประสิทธิผล
- มี Docker Images และ Portable Edition
- ตัวช่วยพิเศษ เช่น บันทึกย่อ คู่มือ ฯลฯ...

# 🌠 ดูตัวอย่าง

> LafTools ยังอยู่ระหว่างการพัฒนา UI การขึ้นต่อกัน หรือข้อกำหนดเบื้องต้นอาจเปลี่ยนแปลงได้ตามความจำเป็น

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 เริ่มต้นใช้งาน

## 0. การปรับโครงสร้างใหม่

ล่าสุด เรากำลังปรับโครงสร้างสถาปัตยกรรมของ LafTools ใหม่โดยใช้ next.js ขั้นตอนด้านล่างอาจมีการเปลี่ยนแปลงตามความจำเป็น

## 1. ตั้งค่าสภาพแวดล้อมระบบ

เพื่อความเรียบง่าย สมมติว่าคุณได้โคลนพื้นที่เก็บข้อมูลนี้ไปที่ `C:\\Users\jerry\\project\\laftools-repo` บน Windows หรือ `/Users/jerry/projects/laftools-repo` บน Linux/MacOS คุณควรประกาศ env และตั้งค่าการกำหนดค่าด้านล่างในไฟล์ของคุณ **~/.bashrc** หรือเพียงแค่ดำเนินการก่อนที่จะรันคำสั่งใดๆ

หากคุณใช้ Windows OS โปรดตรวจสอบให้แน่ใจว่าคำสั่งทั้งหมดดำเนินการใน git-bash เรียนรู้เพิ่มเติม โปรดดูที่ [CONTRIBUTION](./docs/CONTRIBUTION.md) นอกจากนี้ ขอแนะนำให้หลีกเลี่ยงการใช้ช่องว่างหรืออักขระที่ไม่ใช่ภาษาอังกฤษในเส้นทางไฟล์ที่เป็นที่ตั้งของโปรเจ็กต์นี้

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

## 2. เปิดตัวบริการ Go (การปรับโครงสร้างใหม่)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

ในการแก้ไขข้อบกพร่องของบริการ Go เราได้กำหนดค่าไว้ใน VSCode คุณสามารถทำตามขั้นตอนด้านล่าง:

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
- [CONTRIBUTION](./docs/th/CONTRIBUTION.md)
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
