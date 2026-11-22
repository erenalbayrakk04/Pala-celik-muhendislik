# Pala Çelik & Mühendislik — Web Sitesi

Bu klasör sitenin kendisi. [Astro](https://docs.astro.build) ile yapıldı.
İçerikler (hizmetler, yapılan işler, Hakkımızda, KVKK, iletişim bilgileri) admin panelinden
(`../panel`, Sanity) gelir.

## İçerik nasıl siteye geliyor?

1. Abin panelde bir şey ekler ya da değiştirir ve "Yayınla"ya basar.
2. Site yeniden derlenir (`npm run build`). Derleme sırasında bütün içerik panelden bir kere çekilir,
   görseller indirilip küçültülür (webp) ve sitenin içine konur.
3. Ortaya çıkan sabit sayfalar yayınlanır. Ziyaretçi Sanity'ye hiç bağlanmaz.

Panel o an çalışmıyorsa derleme hata verip durur; internetteki son çalışan sürüm yayında kalır.

## Çalıştırmak

Terminalde bu klasördeyken (`site/`):

| Komut             | Ne yapar                                                        |
| :---------------- | :-------------------------------------------------------------- |
| `npm install`     | Gerekli paketleri kurar (ilk seferde bir kere)                  |
| `npm run dev`     | Siteyi bilgisayarında açar: http://localhost:4321               |
| `npm run build`   | Yayına hazır dosyaları `dist/` klasörüne üretir                 |
| `npm run preview` | `build` ile üretilen siteyi bilgisayarında açıp kontrol etmeni sağlar |

`npm run dev` açıkken koddaki değişiklikler tarayıcıda anında görünür. Panelde yapılan bir
değişikliği görmek için ise `npm run dev`'i durdurup yeniden başlat (içerik açılışta bir kere çekilir).

## Nerede ne var?

| Yer                          | İçindekiler                                                           |
| :--------------------------- | :-------------------------------------------------------------------- |
| `src/pages/`                 | Sayfalar. Dosya adı adres olur: `iletisim.astro` = /iletisim          |
| `src/pages/hizmetler/[slug].astro` | Her hizmetin sayfası (paneldeki her hizmet için otomatik)       |
| `src/pages/yapilan-isler/[slug].astro` | Her işin sayfası (paneldeki her iş için otomatik)           |
| `src/lib/sanity.ts`          | Panel bağlantısı ve görsel boyutlandırma                              |
| `src/lib/icerik.ts`          | Panelden içerik çeken sorgu; hizmetler, işler, sayfalar               |
| `src/data/site.ts`           | Firma bilgileri (panelin Site Ayarları'ndan), WhatsApp linki, menü    |
| `src/layouts/BaseLayout.astro` | Bütün sayfaların ortak iskeleti (üst menü, alt bilgi, iletişim butonları) |
| `src/components/`            | Sayfa parçaları: başlık bandı, kartlar, zengin metin, ikonlar         |
| `src/components/anasayfa/`   | Anasayfanın bölümleri (giriş, hizmetler, süreç, son işler)            |
| `src/styles/global.css`      | Renkler, yazı tipleri, butonlar                                       |
| `public/`                    | Olduğu gibi yayınlanan dosyalar (sekme ikonu, paylaşım görseli, robots.txt) |

## Sık yapılan değişiklikler

- **Telefon, adres, e-posta:** Panel → Site Ayarları. (Kodda bir şey değiştirmeye gerek yok.)
- **Yeni hizmet / yeni iş:** Panelden eklenir; sayfası bir sonraki yayında kendiliğinden oluşur.
- **Bir rengi değiştirmek:** `src/styles/global.css` dosyasının en üstündeki `:root` bölümü.
- **Anasayfadaki sabit bir yazıyı değiştirmek:** `src/components/anasayfa/` içindeki ilgili dosya.
