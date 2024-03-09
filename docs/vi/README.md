<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Thế hệ tiếp theo của hộp công cụ đa năng được thiết kế dành cho lập trình viên
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Xem trước phiên bản nội bộ của LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Trang này được tạo từ nội bộ LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

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

### Xem trước:

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Bắt đầu

## 0. Tái cấu trúc

Gần đây, chúng tôi đang tái cấu trúc kiến ​​trúc của LafTools dựa trên next.js, các bước bên dưới có thể thay đổi nếu cần.

## 1. Thiết lập môi trường hệ thống

Để đơn giản, giả sử bạn đã sao chép kho lưu trữ này sang `C:\Usersjerry\project\laftools-repo` trên Windows hoặc `/Users/jerry/projects/laftools-repo` trên Linux/MacOS, thì bạn nên khai báo env và đặt config bên dưới trong tệp của mình **~/.bashrc* * hoặc đơn giản là thực thi chúng trước khi chạy bất kỳ lệnh nào.

Nếu bạn đang sử dụng HĐH Windows, vui lòng đảm bảo rằng tất cả các lệnh được thực thi trong git-bash, tìm hiểu thêm vui lòng tham khảo [ĐÓNG GÓP](/docs/vi/CONTRIBUTION.md). Ngoài ra, bạn nên tránh sử dụng bất kỳ khoảng trắng hoặc ký tự không phải tiếng Anh nào trong đường dẫn tệp chứa dự án này.

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

Để chạy dịch vụ Go trong terminal, bạn có thể thực hiện lệnh bên dưới:

```shell
go run ./core/app.go server
```

Để gỡ lỗi dịch vụ Go, chúng tôi đã định cấu hình nó trong VSCode, bạn chỉ cần làm theo các bước dưới đây:

1. Nhập Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Khởi chạy Mô-đun FrontEnd (Đã chuyển sang web2)

```bash
# cài đặt thư viện toàn cầu cần thiết
npm i -g pnpm ts-node typescript

# cài đặt dự án
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Nó chỉ dành cho Windows, nó sẽ đóng tất cả các thiết bị đầu cuối và các quy trình trước đó.

# chạy dịch vụ web trên terminal 1
npm run fe-web

# chạy bộ xử lý CSS trên thiết bị đầu cuối 2
npm run fe-css

# chạy thêm công việc trên terminal 3
npm run fe-extra

```

Lưu ý rằng bạn có thể sử dụng biểu tượng '&' để thực thi ở chế độ nền nếu bạn không muốn chạy các lệnh này trong các phiên bản đầu cuối riêng biệt.

## 4. Bắt đầu phát triển

Khi dịch vụ Go đang chạy, bạn sẽ có thể thấy một liên kết được in ra trong thiết bị đầu cuối. Bây giờ, hãy sao chép URL này và dán vào trình duyệt của bạn để bắt đầu phát triển, bắt đầu nào!

Ví dụ:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Xây dựng

```bash
cd pipeline
./build-all.sh
```

# 🌱 Có chuyện gì với cái tên vậy?

#### _The Tools for Laffin' At Life_

Tên của dự án này được lấy cảm hứng từ Laffin' At Life, một bài hát đồng quê cổ điển từ năm 1987 của Chet Atkins cũng có một vị trí đặc biệt trong trái tim tác giả.

Hy vọng rằng LafTools sẽ giúp công việc hàng ngày của bạn trở nên dễ dàng hơn, giảm nhu cầu làm thêm giờ và giúp bạn duy trì sự cân bằng lành mạnh giữa công việc và cuộc sống, chúng ta hãy cùng tận hưởng cuộc sống!

# 📑 Vật liệu khác

Dưới đây là các tài liệu khác mà bạn có thể xem nếu muốn tìm hiểu thêm chi tiết về dự án này:

- [Câu hỏi thường gặp](/docs/vi/FAQ.md)
- [SỰ ĐÓNG GÓP](/docs/vi/CONTRIBUTION.md)
- [Dành cho nhà phát triển Trung Quốc](/devtools/notes/common/issues.md)

# 💐 Icons

Chúng tôi đánh giá cao những nghệ sĩ tài năng đã cung cấp các biểu tượng đẹp dưới đây:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Sự nhìn nhận

Dự án này sẽ không thể thực hiện được nếu không có các dự án nguồn mở tuyệt vời mà cá nhân tôi muốn bày tỏ lòng biết ơn sâu sắc nhất tới:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Chắc chắn, có những dự án nguồn mở khác đã mang lại lợi ích và tạo điều kiện thuận lợi cho dự án này, điều mà tôi không thể trình bày chi tiết trong phần này; Nếu không có những dự án này và nỗ lực của những nhà phát triển tài năng này, LafTools sẽ không thể tồn tại được.

Thank you!

Ryan Laf  
Ngày 2 tháng 2 năm 2023

# 🪪 License

Dự án này được bảo vệ theo Giấy phép Công cộng GNU Affero, vui lòng xem tệp GIẤY PHÉP để biết thêm chi tiết.
