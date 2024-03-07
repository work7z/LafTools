<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Programcılar için tasarlanmış yeni nesil çok yönlü araç kutusu
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laf-tools.com">LafTools'un Insider Sürümünü Önizleyin</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Bu sayfa dahili olarak LafTools'tan oluşturulmuştur.</i> <br/> [English](/docs/en_US)  |  [简体中文](/docs/zh_CN)  |  [繁體中文](/docs/zh_HK)  |  [Deutsch](/docs/de)  |  [Español](/docs/es)  |  [Français](/docs/fr)  |  [日本語](/docs/ja)  |  [한국어](/docs/ko) | [More](/docs/) <br/>

# 💡 giriiş

İnternette kullanılabilecek çok sayıda araç varken neden bu araç kutusunu geliştirmeye kararlı olduğumuzu merak edebilirsiniz. Aslında sunduğumuz codec, formatlayıcı, çeviri, QR Code vb. gibi araçların çoğu internette kolaylıkla bulunabilir. Ancak bu araçları kullanmak en rahat ve verimli yaklaşım değildir.

Bu çevrimiçi araçları kullanırken aşağıdaki sorunlarla hiç karşılaştınız mı?

- Çevrimdışı Erişilebilirlik Yok.
- Küresel Karanlık Tema Yok.
- Üretken kullanıcı arayüzü stili yok.
- Zayıf Ağ Performansı.
- Üzücü Reklamlar.
- Veri Sızıntısı Sorunu.

Yukarıdakilerden herhangi birine cevabınız evet ise araç kutumuzu denemeyi düşünmelisiniz. Aşağıdaki özellikleri sunar:

- Sonsuza Kadar FOSS
- Hafif Çalışma Süresi
- Tam platform desteği (ARMv8 dahil)
- Tam GPT benzeri destek
- Üretken kullanıcı arayüzüyle son derece entegre
- Mevcut Docker Görüntüleri ve Taşınabilir Sürüm
- Notlar, kılavuzlar vb. gibi ekstra yardımcılar...

# 🌠 Ön izleme

> LafTools hala geliştirilme aşamasındadır; kullanıcı arayüzü, bağımlılıkları veya önkoşulları gerektiği gibi değiştirilebilir.

### Ön izleme:

[Online Preview](http://cloud.laf-tools.com)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 🍀 Başlarken

## 0. Yeniden düzenleme

Son zamanlarda LafTools'un mimarisini next.js'ye dayalı olarak yeniden düzenliyoruz, aşağıdaki adımlar gerektiği gibi değiştirilebilir.

## 1. Sistem Ortamını Kurma

Basitleştirmek adına, bu depoyu Windows'ta `C:\\Users\jerry\\project\\laftools-repo`ya veya Windows'ta `/Users/jerry/projects/laftools-repo`ya kopyaladığınızı varsayalım. Linux/MacOS kullanıyorsanız, **~/.bashrc** dosyanızda env'yi bildirmeli ve aşağıdaki set config'i belirtmeli veya herhangi bir komutu çalıştırmadan önce bunları çalıştırmalısınız.

Windows işletim sistemi kullanıyorsanız lütfen tüm komutların git-bash'ta yürütüldüğünden emin olun, daha fazla bilgi için lütfen [CONTRIBUTION](./docs/CONTRIBUTION.md) adresine bakın. Bunun dışında bu projenin bulunduğu dosya yolunda boşluk veya İngilizce olmayan karakterlerin kullanılmaması tavsiye edilir.

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

## 2. Go Hizmetini Başlatın (Yeniden Düzenleme)

Go hizmetini terminalde çalıştırmak için aşağıdaki komutu çalıştırabilirsiniz:

```shell
go run ./core/app.go server
```

Go hizmetinde hata ayıklamak için onu VSCode'da yapılandırdık, aşağıdaki adımları takip etmeniz yeterlidir:

1. Visual Studio Code girin
2. Click "Run and Debug" on your sidebar
3. Click "Run" button.

## 3. FrontEnd Modülünü Başlatın (web2'ye taşındı)

```bash
# gerekli global kütüphaneyi yükleyin
npm i -g pnpm ts-node typescript

# proje bölümlerini yükle
cd $LAFTOOLS_ROOT && pnpm install
cd $LAFTOOLS_ROOT/modules/web && pnpm install
cd $LAFTOOLS_ROOT/modules/purejs && pnpm install
cd $LAFTOOLS_ROOT/devtools/scripts/scan && pnpm install

npm run win-clean # Yalnızca Windows içindir, tüm terminalleri ve önceki işlemleri kapatacaktır.

# terminal 1'de web hizmetini çalıştırın
npm run fe-web

# CSS işlemcisini terminal 2'de çalıştırın
npm run fe-css

# terminal 3'te ekstra işler çalıştırın
npm run fe-extra

```

Bu komutları alternatif olarak ayrı terminal örneklerinde çalıştırmak istemiyorsanız, arka planda çalıştırmak için '&' sembolünü kullanabileceğinizi unutmayın.

## 4. Geliştirmeye Başlayın

Go hizmeti çalışmaya başladığında terminalde bir bağlantının yazdırıldığını görebilmeniz gerekir. Şimdi bu URL'yi kopyalayıp tarayıcınıza yapıştırarak geliştirmeye başlayın, hadi başlayalım!

Örnek:

```output
-----------------------------------------------
PLEASE ACCESS THE LINK BELOW IN BROWSER.
请复制下方链接并在浏览器端打开(for zh-hans users)
請復製下方鏈接並在瀏覽器端打開(for zh-hant users)
http://127.0.0.1:35000/app/entry?t={YOUR_SECRET_ID}
-----------------------------------------------
```

## 5. İnşa etmek

```bash
cd pipeline
./build-all.sh
```

# 🌱 İsmin nesi var?

#### _The Tools for Laffin' At Life_

Bu projenin adı, Chet Atkins'in 1987 tarihli, yazarın kalbinde de özel bir yere sahip olan klasik country şarkısı 'Laffin' At Life'dan esinlenilmiştir.

LafTools'un günlük görevlerinizi kolaylaştıracağını, fazla mesai ihtiyacını azaltacağını ve sağlıklı bir iş-yaşam dengesini korumanıza yardımcı olacağını umuyoruz, bırakın hayatta biraz sohbet edelim!

# 📑 Diğer materyaller

Bu proje hakkında daha fazla ayrıntı öğrenmek istiyorsanız aşağıda göz atabileceğiniz diğer materyaller bulunmaktadır:

- [SSS](/docs/tr/FAQ.md)
- [KATKI](/docs/tr/CONTRIBUTION.md)
- [Çin Geliştiricileri için](/devtools/notes/common/issues.md)

# 💐 Icons

Aşağıdaki güzel simgeleri sunan yetenekli sanatçıları takdir ediyoruz:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>

# 🙏 Teşekkür

Bu proje, kişisel olarak en derin minnettarlığımı ifade etmek istediğim muhteşem açık kaynak projeleri olmasaydı mümkün olamazdı:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Elbette bu projeye fayda sağlayan ve kolaylaştıran, bu bölümde detaylandıramayacağım başka açık kaynaklı projeler de var; Bu projeler ve yetenek geliştiricilerin çabaları olmasaydı LafTools mümkün olmazdı.

Thank you!

Ryan Laf  
2 Şubat 2023

# 🪪 License

Bu proje GNU Affero Genel Kamu Lisansı kapsamında korunmaktadır; daha fazla ayrıntı için lütfen LİSANS dosyasına bakın.
