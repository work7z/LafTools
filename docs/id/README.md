<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Kotak peralatan serbaguna generasi berikutnya yang dirancang untuk pemrogram
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">Pratinjau LafTools Versi Insider</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Halaman ini dihasilkan dari LafTools secara internal.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 💡 Perkenalan

Anda mungkin bertanya-tanya mengapa kami bertekad untuk mengembangkan kotak peralatan ini karena ada banyak alat yang dapat digunakan di Internet. Memang benar, sebagian besar alat yang kami sediakan dapat dengan mudah ditemukan di Internet, seperti codec, pemformat, terjemahan, Kode QR, dll… Namun, penggunaan alat-alat ini bukanlah pendekatan yang paling nyaman dan efisien.

Pernahkah Anda menemui masalah di bawah ini saat menggunakan alat online tersebut?

- Tidak Ada Aksesibilitas Offline.
- Tidak Ada Tema Gelap Global.
- Tidak ada gaya UI Produktif.
- Kinerja Jaringan Buruk.
- Iklan yang Mengecewakan.
- Masalah Kebocoran Data.

Jika jawaban di atas adalah ya, Anda harus mempertimbangkan untuk mencoba kotak peralatan kami. Ini menawarkan fitur-fitur berikut:

- FOSS Selamanya
- Waktu Proses Ringan
- Dukungan platform penuh (termasuk ARMv8)
- Dukungan penuh mirip GPT
- Sangat terintegrasi dengan UI produktif
- Tersedia Gambar Docker dan Edisi Portabel
- Pembantu tambahan seperti catatan, manual, dll...

# 🌠 Pratinjau

> LafTools masih dalam pengembangan, UI, dependensi, atau prasyaratnya dapat diubah sesuai kebutuhan.

### Pratinjau:

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Mulai

## 0. Pemfaktoran ulang

Baru-baru ini, kami melakukan refactoring arsitektur LafTools berdasarkan next.js, langkah-langkah di bawah ini dapat diubah sesuai kebutuhan.

## 1. Pengaturan Lingkungan Sistem

Demi kesederhanaan, katakanlah Anda telah mengkloning repositori ini ke `C:\Usersjerry\project\laftools-repo` di Windows atau `/Users/jerry/projects/laftools-repo` di Linux/MacOS, maka Anda harus mendeklarasikan env dan menyetel config di bawah ini dalam file Anda **~/.bashrc* *, atau jalankan saja sebelum menjalankan perintah apa pun.

Jika Anda menggunakan OS Windows, pastikan semua perintah dijalankan di git-bash, pelajari lebih lanjut silakan lihat [KONTRIBUSI](./docs/CONTRIBUTION.md). Selain itu, disarankan untuk menghindari penggunaan spasi atau karakter non-Inggris di jalur file tempat proyek ini berada.

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

## 2. Luncurkan Layanan Go (Refactoring)

Untuk menjalankan layanan Go di terminal, Anda dapat menjalankan perintah di bawah ini:

```shell
go run ./core/app.go server
```

Untuk men-debug layanan Go, kami telah mengkonfigurasinya di VSCode, Anda cukup mengikuti langkah-langkah di bawah ini:

1. Masukkan Visual Studio Code
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. Luncurkan Modul FrontEnd (Dipindahkan ke web2)

```bash
# instal perpustakaan global yang diperlukan
npm i -g pnpm ts-node typescript

# instal deps proyek
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Ini hanya untuk Windows, ini akan menutup semua terminal dan proses sebelumnya.

# jalankan layanan web di terminal 1
npm run fe-web

# jalankan prosesor CSS di terminal 2
npm run fe-css

# menjalankan pekerjaan tambahan di terminal 3
npm run fe-extra

```

Perhatikan bahwa Anda dapat menggunakan simbol '&' untuk eksekusi latar belakang jika Anda tidak ingin menjalankan perintah ini di terminal terpisah.

## 4. Mulai Berkembang

Setelah layanan Go berjalan, Anda akan melihat tautan tercetak di terminal. Sekarang, salin URL ini dan tempel ke browser Anda untuk mulai mengembangkan, ayo!

Contoh:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. Membangun

```bash
cd pipeline
./build-all.sh
```

# 🌱 Ada apa dengan namanya?

#### _The Tools for Laffin' At Life_

Nama proyek ini terinspirasi dari Laffin' At Life, lagu country klasik tahun 1987 karya Chet Atkins yang juga mendapat tempat spesial di hati penulisnya.

Semoga LafTools dapat mempermudah tugas sehari-hari Anda, mengurangi kebutuhan lembur dan membantu Anda menjaga keseimbangan kehidupan kerja yang sehat, mari kita bermalas-malasan dalam hidup!

# 📑 Bahan Lainnya

Di bawah ini adalah materi lebih lanjut yang dapat Anda lihat jika Anda ingin mempelajari lebih detail tentang proyek ini:

- [Pertanyaan Umum](/docs/id/FAQ.md)
- [KONTRIBUSI](/docs/id/CONTRIBUTION.md)
- [Untuk Pengembang Tiongkok](/devtools/notes/common/issues.md)

# 💐 Icons

Kami sangat menghargai seniman berbakat yang menyediakan ikon-ikon indah di bawah ini:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Ucapan Terima Kasih

Proyek ini tidak akan mungkin terwujud tanpa proyek open source yang luar biasa. Saya secara pribadi ingin mengucapkan terima kasih yang sebesar-besarnya kepada:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Yang pasti, ada proyek open source lain yang memberikan manfaat dan memfasilitasi proyek ini, yang tidak dapat saya jelaskan secara rinci di bagian ini; Tanpa proyek-proyek ini dan upaya para pengembang bakat ini, LafTools tidak akan mungkin terwujud.

Thank you!

Ryan Laf  
2 Februari 2023

# 🪪 License

Proyek ini dilindungi di bawah Lisensi Publik Umum GNU Affero, silakan lihat file LISENSI untuk lebih jelasnya.
