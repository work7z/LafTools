<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - กล่องเครื่องมืออเนกประสงค์เจเนอเรชันถัดไปที่ออกแบบมาสำหรับโปรแกรมเมอร์
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">ดูตัวอย่าง LafTools เวอร์ชัน Insider</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: หน้านี้สร้างขึ้นจาก LafTools ภายใน</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🪄 Quick View

เพื่อใช้ฟังก์ชันเหล่านี้อย่างรวดเร็ว เราได้ปรับใช้เว็บไซต์ออนไลน์ที่มีความเสถียรในภูมิภาคสหรัฐอเมริกาและ CN เพื่อให้คุณใช้งานได้ เครื่องมือส่วนใหญ่มีอยู่ในเว็บไซต์ออนไลน์ของเรา ยกเว้นเครื่องมือบางอย่างที่ต้องอาศัยความสามารถเฉพาะของระบบปฏิบัติการ

- 🇺🇸 อเมริกา: [laftools.dev](https://laftools.dev)
- 🇨🇳 จีนแผ่นดินใหญ่เท่านั้น: [laftools.cn](https://laftools.cn)

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

### ดูตัวอย่าง:

[Online Preview](http://laftools.dev)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🚀 เริ่มต้นใช้งาน

## 1. ตั้งค่าสภาพแวดล้อมระบบ

เพื่อความเรียบง่าย สมมติว่าคุณได้โคลนพื้นที่เก็บข้อมูลนี้เป็น `C:\Usersjerry\project\laftools-repo` บน Windows หรือ `/Users/jerry/projects/laftools-repo` บน Linux/MacOS จากนั้นคุณควรประกาศ env และตั้งค่าการกำหนดค่าด้านล่างในไฟล์ของคุณ **~/.bashrc* * หรือเพียงดำเนินการก่อนที่จะรันคำสั่งใด ๆ

หากคุณใช้ Windows OS โปรดตรวจสอบให้แน่ใจว่าคำสั่งทั้งหมดดำเนินการใน git-bash เรียนรู้เพิ่มเติม โปรดดูที่ [CONTRIBUTION](/docs/th/CONTRIBUTION.md) นอกจากนี้ ขอแนะนำให้หลีกเลี่ยงการใช้ช่องว่างหรืออักขระที่ไม่ใช่ภาษาอังกฤษในเส้นทางไฟล์ที่เป็นที่ตั้งของโปรเจ็กต์นี้

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
# ติดตั้งไลบรารีส่วนกลางที่จำเป็น
npm i -g pnpm ts-node typescript

# ติดตั้ง deps โครงการ
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# run core service
npm run fe-web

```

## 3. สร้าง

```bash
cd pipeline
./build-all.sh "v1.9.9-beta"
```

# 🌱 ชื่ออะไรคะ?

#### _The Tools for Laffin' At Life_

ชื่อของโปรเจ็กต์นี้ได้รับแรงบันดาลใจจาก Laffin' At Life ซึ่งเป็นเพลงคันทรีคลาสสิกจากปี 1987 ของ Chet Atkins ซึ่งมีความพิเศษอยู่ในใจของผู้แต่งด้วย

หวังว่า LafTools จะทำให้งานประจำวันของคุณง่ายขึ้น ลดความจำเป็นในการทำงานล่วงเวลา และช่วยให้คุณรักษาสมดุลระหว่างชีวิตและการทำงานที่ดี ให้เราละทิ้งชีวิตกันเถอะ!

# 📑 วัสดุอื่นๆ

ด้านล่างนี้เป็นเอกสารเพิ่มเติมที่คุณสามารถดูได้หากต้องการเรียนรู้รายละเอียดเพิ่มเติมเกี่ยวกับโครงการนี้:

- [คำถามที่พบบ่อย](/docs/th/FAQ.md)
- [ผลงาน](/docs/th/CONTRIBUTION.md)
- [สำหรับนักพัฒนาชาวจีน](/devtools/notes/common/issues.md)

# 💐 Icons

เราขอขอบคุณศิลปินที่มีพรสวรรค์ที่ให้ไอคอนที่สวยงามด้านล่าง:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 รับทราบ

โครงการนี้คงเป็นไปไม่ได้หากไม่มีโครงการโอเพ่นซอร์สที่ยอดเยี่ยม ซึ่งฉันอยากจะแสดงความขอบคุณอย่างสุดซึ้งเป็นการส่วนตัวต่อ:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

แน่นอนว่ายังมีโครงการโอเพ่นซอร์สอื่น ๆ ที่เป็นประโยชน์และสนับสนุนโครงการนี้ ซึ่งฉันไม่สามารถให้รายละเอียดได้ในส่วนนี้ หากไม่มีโครงการเหล่านี้และความพยายามของนักพัฒนาที่มีความสามารถเหล่านี้ LafTools คงเป็นไปไม่ได้

Thank you!

Ryan Laf  
2 กุมภาพันธ์ 2023

# 🪪 License

โครงการนี้ได้รับการคุ้มครองภายใต้สัญญาอนุญาตสาธารณะทั่วไปของ GNU โปรดดูไฟล์ใบอนุญาตสำหรับรายละเอียดเพิ่มเติม
