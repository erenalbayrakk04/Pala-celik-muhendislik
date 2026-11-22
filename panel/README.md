# Pala Çelik & Mühendislik — Yönetim Paneli

Bu klasör sitenin admin paneli. [Sanity Studio](https://www.sanity.io/docs) ile yapıldı.
Abin buradan iş, fotoğraf ve bölüm ekler; site de bu bilgilerle güncellenir.

## Çalıştırmak

Terminalde bu klasördeyken (`panel/`):

| Komut             | Ne yapar                                                          |
| :---------------- | :---------------------------------------------------------------- |
| `npm install`     | Gerekli paketleri kurar (ilk seferde bir kere)                    |
| `npm run dev`     | Paneli bilgisayarında açar: http://localhost:3333                 |
| `npm run deploy`  | Paneli internete yükler: https://palacelikmuhendislik.sanity.studio |
| `npm run kontrol` | Kodda tip hatası var mı diye bakar                                 |

## Nerede ne var?

| Dosya                     | İçindekiler                                                        |
| :------------------------ | :----------------------------------------------------------------- |
| `sanity.proje.ts`         | Sanity proje kimliği (projectId) ve veri seti adı                  |
| `sanity.config.tsx`       | Panelin ana ayarları (Türkçe dil, menü, Yayınla butonu)            |
| `yapi.ts`                 | Panelin sol menüsü                                                 |
| `schemaTypes/`            | Paneldeki içerik türleri ve alanları                               |
| `schemaTypes/yapilanIs.ts`| Yapılan işler: başlık, bölüm, fotoğraflar, konum, tarih            |
| `schemaTypes/hizmet.ts`   | Hizmet bölümleri: başlık, kısa açıklama, ikon, detaylı açıklama    |
| `schemaTypes/sayfa.ts`    | Hakkımızda ve KVKK sayfaları                                       |
| `schemaTypes/ayarlar.ts`  | Site Ayarları: telefon, adres, e-posta, Instagram                  |
| `eylemler.ts`             | Sayfa adresini başlıktan otomatik dolduran "Yayınla" butonu        |
| `scripts/ilk-icerik.ts`   | İlk içerikleri yükleyen betik (sadece eksik belgeleri oluşturur)   |

## Hesap ve proje

- Sanity hesabı: firmanın Google hesabı (palacelikmuhendislik@gmail.com), Google ile giriş.
- Organizasyon: "Pala Çelik & Mühendislik" (`os6dwtewt`) · Proje: "Pala Çelik" (`lnnbnu19`) · Veri seti: `production`
- Panel adresi: https://palacelikmuhendislik.sanity.studio (Sanity'nin kendi giriş sayfasına yönlendirir)
- Panele yeni kişi eklemek: https://www.sanity.io/manage → Pala Çelik → Members → Invite
- İlk içerikleri yeniden yüklemek: `npx sanity exec scripts/ilk-icerik.ts --with-user-token`

## Yeni bir alan eklemek

Örneğin yapılan işlere "Müşteri adı" eklemek için `schemaTypes/yapilanIs.ts` içindeki
`fields` listesine bir `defineField({...})` ekle. Panel kendiliğinden güncellenir;
sitede göstermek için `site/` tarafında da ilgili sayfaya eklemek gerekir.
