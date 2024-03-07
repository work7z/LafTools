<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Thế hệ tiếp theo của hộp công cụ đa năng được thiết kế dành cho lập trình viên
</span>
<center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Xem trước phiên bản nội bộ của LafTools</a>
</div>
</center>
<br><br>
</p>

<i>Note: This page is generated from LafTools internally.</i>

# 💡 Giới thiệu

Bạn có thể thắc mắc tại sao chúng tôi quyết tâm phát triển hộp công cụ này vì có rất nhiều công cụ có thể được sử dụng trên Internet. Thật vậy, hầu hết các công cụ chúng tôi cung cấp đều có thể dễ dàng tìm thấy trên Internet, chẳng hạn như codec, bộ định dạng, dịch thuật, Mã QR, v.v… Tuy nhiên, đây không phải là cách tiếp cận thoải mái và hiệu quả nhất để sử dụng những công cụ này.

Bạn đã bao giờ gặp phải những vấn đề dưới đây khi sử dụng những công cụ trực tuyến đó chưa?

- Không có khả năng truy cập ngoại tuyến.
- Không có chủ đề tối toàn cầu.
- Không có phong cách giao diện người dùng hiệu quả.
- Hiệu suất mạng kém.
- Quảng cáo gây khó chịu.
- Vấn đề rò rỉ dữ liệu.

Nếu câu trả lời cho bất kỳ câu hỏi nào ở trên là có thì bạn nên cân nhắc dùng thử hộp công cụ của chúng tôi. Nó cung cấp các tính năng sau:

- FOSS mãi mãi
- Thời gian chạy nhẹ
- Hỗ trợ nền tảng đầy đủ (bao gồm ARMv8)
- Hỗ trợ đầy đủ tương tự GPT
- Tích hợp cao với giao diện người dùng hiệu quả
- Hình ảnh Docker có sẵn và phiên bản di động
- Những trợ giúp bổ sung như ghi chú, hướng dẫn sử dụng, v.v...

# 🌠 Xem trước

> LafTools vẫn đang được phát triển, giao diện người dùng, các phần phụ thuộc hoặc điều kiện tiên quyết của nó có thể thay đổi khi cần thiết.

### Preview(English):

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Bắt đầu

## 0. Tái cấu trúc

Gần đây, chúng tôi đang tái cấu trúc kiến ​​trúc của LafTools dựa trên next.js, các bước bên dưới có thể thay đổi nếu cần.

## 1. Thiết lập môi trường hệ thống

Để đơn giản, giả sử bạn đã sao chép kho lưu trữ này vào `C:\\Users\jerry\\project\\laftools-repo` trên Windows hoặc `/Users/jerry/projects/laftools-repo` trên Linux/MacOS, thì bạn nên khai báo env và đặt cấu hình bên dưới trong tệp của mình **~/.bashrc** hoặc chỉ cần thực thi chúng trước khi chạy bất kỳ lệnh nào.

Nếu bạn đang sử dụng HĐH Windows, vui lòng đảm bảo rằng tất cả các lệnh được thực thi trong git-bash, tìm hiểu thêm vui lòng tham khảo [ĐÓNG GÓP](./docs/CONTRIBUTION.md). Ngoài ra, bạn nên tránh sử dụng bất kỳ khoảng trắng hoặc ký tự không phải tiếng Anh nào trong đường dẫn tệp chứa dự án này.

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

## 2. Khởi chạy dịch vụ Go (Tái cấu trúc)

To run Go service in terminal, you can execute below command:

```shell
go run ./core/app.go server
```

Để gỡ lỗi dịch vụ Go, chúng tôi đã định cấu hình nó trong VSCode, bạn chỉ cần làm theo các bước dưới đây:

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
- [CONTRIBUTION](./docs/vi/CONTRIBUTION.md)
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
