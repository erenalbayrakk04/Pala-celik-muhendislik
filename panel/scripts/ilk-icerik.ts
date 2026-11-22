// Panele ilk içerikleri yükler: hizmetler, site ayarları, Hakkımızda, KVKK ve Instagram'daki ekipman işleri.
//
// Çalıştırma (panel klasöründe):  npx sanity exec scripts/ilk-icerik.ts --with-user-token
//
// Güvenli: sadece OLMAYAN belgeleri oluşturur (createIfNotExists). Abin panelden bir şeyi
// değiştirdiyse bu betiği tekrar çalıştırmak onun değişikliğini ezmez.
// Bütün yazılar taslaktır; abin panelden istediği gibi düzeltebilir.
import {createReadStream} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {turkceSlug} from '../schemaTypes/turkceSlug'
import {h2, KVKK_BASLIK, kvkkIcerigi, madde, p} from './metinler'

const istemci = getCliClient({apiVersion: '2025-02-19'})
const MALZEME = resolve(process.cwd(), '..', 'malzeme', 'instagram')

// ---------- Görsel yükleme (aynı dosya ikinci kez yüklenmez, Sanity tanır) ----------
async function gorselYukle(dosya: string) {
  const yol = resolve(MALZEME, dosya)
  const varlik = await istemci.assets.upload('image', createReadStream(yol), {filename: basename(yol)})
  return {_type: 'image', asset: {_type: 'reference', _ref: varlik._id}}
}

// ---------- Hizmetler ----------
type HizmetTohum = {
  slug: string
  baslik: string
  ikon: string
  ozet: string
  paragraflar: string[]
  maddeler: string[]
  kapak?: string
}

const hizmetler: HizmetTohum[] = [
  {
    slug: 'celik-cati',
    baslik: 'Çelik Çatı',
    ikon: 'celik-cati',
    ozet: 'Fabrika, depo, atölye ve konutlar için hafif, sağlam ve uzun ömürlü çelik çatı sistemleri.',
    paragraflar: [
      'Çelik çatı; fabrika, depo, atölye, otopark ve konut gibi yapılarda hafif, hızlı kurulan ve uzun ömürlü bir çatı çözümüdür. Ahşap çatıya göre çürüme ve böceklenme derdi yoktur, betonarmeye göre binaya çok daha az yük bindirir.',
      'Çatı makaslarını, aşıkları ve bağlantı elemanlarını yapının ölçüsüne ve açıklığına göre hazırlıyor, sahada monte ediyoruz.',
    ],
    maddeler: [
      'Çatı makası, aşık ve kolon imalatı',
      'Yeni yapılar için çelik çatı',
      'Eski çatıların çelik sistemle yenilenmesi',
    ],
  },
  {
    slug: 'uzay-cati',
    baslik: 'Uzay Çatı',
    ikon: 'uzay-cati',
    ozet: 'Geniş alanları ara kolon kullanmadan geçen, hafif ve estetik uzay çatı sistemleri.',
    paragraflar: [
      'Uzay çatı, çelik boruların küresel düğüm noktalarında birleşmesiyle oluşan üç boyutlu bir taşıyıcı sistemdir. Yükü her yöne dağıttığı için geniş alanları ara kolon kullanmadan geçebilir.',
      'Spor salonu, fuar alanı, akaryakıt istasyonu, giriş sundurması ve hangar gibi yapılarda hem hafif hem de göze hoş görünen bir örtü sağlar.',
    ],
    maddeler: [
      'Spor salonu ve kapalı alan çatıları',
      'Akaryakıt istasyonu ve giriş sundurmaları',
      'Depo, fuar ve hangar örtüleri',
    ],
  },
  {
    slug: 'celik-konstruksiyon-ev',
    baslik: 'Çelik Konstrüksiyon Ev',
    ikon: 'celik-ev',
    ozet: 'Kısa sürede kurulan, hafif ve sağlam çelik konstrüksiyon evler.',
    paragraflar: [
      'Çelik konstrüksiyon evlerde taşıyıcı iskelet çelik profillerden oluşur. Hafif oldukları için binaya ve zemine daha az yük bindirir; elemanlar ölçüsüne göre hazırlandığından sahadaki kurulum betonarmeye göre çok daha kısa sürer.',
      'İhtiyacınıza ve projenize uygun çelik iskeleti kuruyor, duvar, çatı ve kaplama aşamalarını birlikte planlıyoruz.',
    ],
    maddeler: ['Müstakil ev ve bahçe evi', 'Mevcut binalara ek kat', 'Ofis ve ticari yapılar'],
  },
  {
    slug: 'asma-tavan',
    baslik: 'Asma Tavan',
    ikon: 'asma-tavan',
    ozet: 'Ofis, mağaza ve konutlarda tesisatı gizleyen, düzgün yüzeyli asma tavan uygulamaları.',
    paragraflar: [
      'Asma tavan; kabloları, tesisatı ve havalandırma kanallarını gizleyerek düzgün ve temiz bir tavan yüzeyi sağlar. Aydınlatmayı istediğiniz yere yerleştirmeyi de kolaylaştırır.',
      'Galvaniz çelik taşıyıcılar üzerine alçıpan ya da modüler tavan uygulayarak ofis, mağaza ve konutlarda hızlı ve temiz sonuç alıyoruz.',
    ],
    maddeler: ['Alçıpan asma tavan', 'Modüler (karo) tavan', 'Spot ve aydınlatma boşlukları'],
  },
  {
    slug: 'bolme-duvar',
    baslik: 'Bölme Duvar',
    ikon: 'bolme-duvar',
    ozet: 'Çelik karkas üzerine hızlı, temiz ve esnek iç mekân bölme duvarları.',
    paragraflar: [
      'Galvaniz çelik profillerden kurulan karkas üzerine alçıpan levhalar uygulayarak iç mekânları hızlı ve temiz şekilde bölüyoruz. Tuğla duvara göre çok daha hafif olan bu sistem binaya fazla yük bindirmez.',
      'Duvarın içine yalıtım malzemesi konarak ses ve ısı yalıtımı artırılabilir, tesisat duvarın içinden geçirilebilir. İhtiyaç değiştiğinde yeniden düzenlemek de kolaydır.',
    ],
    maddeler: ['Ofis ve mağaza bölmeleri', 'Konut içi oda bölmeleri', 'Ses ve ısı yalıtımlı duvarlar'],
  },
  {
    slug: 'proje-bazli-celik-imalat',
    baslik: 'Proje Bazlı Çelik İmalat',
    ikon: 'celik-imalat',
    ozet: 'Projenize özel kesim, kaynak ve boya; atölyemizde ölçüye göre çelik imalat.',
    paragraflar: [
      'Hazır ölçülere uymayan işler için çeliği projenize göre kesiyor, kaynaklıyor ve boyuyoruz. Çiziminiz varsa ona göre, yoksa birlikte ölçü alıp tasarlayarak üretiyoruz.',
      'Atölyemizde hazırladığımız parçaların montajını da yapabiliyoruz.',
    ],
    maddeler: [
      'Merdiven, korkuluk ve platformlar',
      'Taşıyıcı ayak, şase ve konstrüksiyonlar',
      'Özel ölçü ve tek parça imalatlar',
    ],
  },
  {
    slug: 'santiye-faaliyetleri',
    baslik: 'Şantiye Faaliyetleri',
    ikon: 'santiye',
    ozet: 'Çelik yapıların sahada montajı ve uygulaması; işin yerinde ve planlı yürütülmesi.',
    paragraflar: [
      'Çelik yapı işlerinin sahadaki adımlarını yürütüyoruz: keşif ve ölçü, malzemenin sahaya getirilmesi, montaj, saha kaynağı ve son kontroller.',
      'Atölyede hazırlanan elemanların sahada doğru ve güvenli şekilde kurulması, yapının ömrü için en az imalat kadar önemlidir. İşi planlı ilerletip iş programınıza uyum sağlıyoruz.',
    ],
    maddeler: ['Yerinde keşif ve ölçü', 'Çelik montaj ve saha kaynağı', 'İş programına uygun planlama'],
  },
  {
    slug: 'film-ve-video-ekipmanlari',
    baslik: 'Film ve Video Ekipmanları',
    ikon: 'film-ekipmani',
    ozet: 'Film ve video sektörü için yüksek kaliteli, çok fonksiyonlu prodüksiyon ekipmanları imalatı.',
    kapak: '2026-03-07_kamera-arabasi.jpg',
    paragraflar: [
      'Film, dizi, reklam ve klip çekimleri için yüksek kaliteli ve çok fonksiyonlu prodüksiyon ekipmanları üretiyoruz: kamera ve ekipman arabaları, kamera platformları, kıskaçlar, vantuzlu tutucular ve bağlantı aparatları.',
      'Setteki özel bir ihtiyacınız için ölçüye göre ekipman da yapabiliriz. Ne istediğinizi anlatın, birlikte tasarlayalım.',
    ],
    maddeler: [
      'Kamera ve ekipman arabaları',
      'Kamera platformları ve araç bağlantıları',
      'Kıskaçlar, mount ve bağlantı aparatları',
    ],
  },
]

const hizmetId = (slug: string) => `hizmet-${slug}`

// ---------- Yapılan işler (Instagram'daki ekipman videolarının kapakları) ----------
const isler = [
  {dosya: '2026-04-22_pipe-fixing-baglanti.jpg', baslik: 'Pipe fixing bağlantı aparatı', reel: 'DXcb_7YDD1z'},
  {dosya: '2026-04-16_vantuzlu-kamera-tutucu.jpg', baslik: 'Vantuzlu kamera tutucu', reel: 'DXMuC01jLoW'},
  {dosya: '2026-04-15_koltuk-basligi-kamera-baglantisi.jpg', baslik: 'Koltuk başlığı kamera bağlantısı', reel: 'DXJx2DnDM9t'},
  {dosya: '2026-04-14_euro-mount.jpg', baslik: 'Euro mount bağlantı', reel: 'DXHysEoDG1f'},
  {dosya: '2026-03-07_kamera-arabasi.jpg', baslik: 'Kamera arabası', reel: 'DVmUTwQDCZV'},
  {dosya: '2026-01-12_kamera-platformu.jpg', baslik: 'Kamera platformu', reel: 'DTa50tADH7y'},
  {dosya: '2026-01-08_ekipman-arabasi.jpg', baslik: 'Ekipman arabası', reel: 'DTQX0W5jLXZ'},
  {dosya: '2025-12-21_grip-ekipman-arabasi.jpg', baslik: 'Grip ekipman arabası', reel: 'DSiHC29jGKo'},
  {dosya: '2025-08-30_c-kiskaclar.jpg', baslik: 'C kıskaçlar', reel: 'DN-MiQTjPeR'},
]

// ---------- Tek sayfalar ----------
const hakkimizda = [
  p(
    "Pala Çelik & Mühendislik, İstanbul Sarıyer'de çelik yapı ve çelik imalat alanında hizmet veren bir firmadır. Çelik çatı, uzay çatı, çelik konstrüksiyon ev, asma tavan ve bölme duvar uygulamalarından projeye özel çelik imalata kadar işleri atölyeden şantiyeye tek elden yürütüyoruz.",
  ),
  p(
    'Bunun yanında film ve video sektörü için yüksek kaliteli ve çok fonksiyonlu prodüksiyon ekipmanları üretiyoruz: kamera arabaları, kamera platformları, kıskaçlar ve bağlantı aparatları.',
  ),
  h2('Nasıl çalışıyoruz?'),
  madde('İhtiyacınızı dinliyor, gerektiğinde yerinde inceleyip ölçü alıyoruz.'),
  madde('Projeye uygun çözümü ve fiyatı netleştiriyoruz.'),
  madde('İmalatı atölyemizde yapıyor, sahada monte ediyoruz.'),
  madde('İşi teslim ettikten sonra da ulaşabileceğiniz bir muhatap oluyoruz.'),
]

const kvkk = kvkkIcerigi()

// ---------- Yükleme ----------
async function main() {
  console.log(`Proje: ${istemci.config().projectId} / ${istemci.config().dataset}`)
  const islem = istemci.transaction()

  islem.createIfNotExists({
    _id: 'ayarlar',
    _type: 'ayarlar',
    firmaAdi: 'Pala Çelik & Mühendislik',
    yetkili: 'Fatih Şahin',
    telefon: '0544 485 42 16',
    eposta: 'info@palacelikmuhendislik.com',
    adres: 'Huzur Mah. Ulubaş Cad. Ulubaş Pasajı\nNo: 11 Kat: 1 Daire: 40\nSarıyer / İstanbul',
    instagram: 'https://www.instagram.com/pala.1933/',
    tanitim:
      'Çelik çatı, uzay çatı, çelik konstrüksiyon ve projeye özel çelik imalatta atölyeden şantiyeye tek elden hizmet. Film ve video sektörü için prodüksiyon ekipmanları.',
  })
  islem.createIfNotExists({_id: 'hakkimizda', _type: 'sayfa', baslik: 'Hakkımızda', icerik: hakkimizda})
  islem.createIfNotExists({_id: 'kvkk', _type: 'sayfa', baslik: KVKK_BASLIK, icerik: kvkk})

  for (const [sira, h] of hizmetler.entries()) {
    islem.createIfNotExists({
      _id: hizmetId(h.slug),
      _type: 'hizmet',
      baslik: h.baslik,
      ozet: h.ozet,
      ikon: h.ikon,
      sira: (sira + 1) * 10,
      slug: {_type: 'slug', current: h.slug},
      aciklama: [...h.paragraflar.map(p), h2('Neler yapıyoruz?'), ...h.maddeler.map(madde)],
      ...(h.kapak ? {kapak: {...(await gorselYukle(h.kapak))}} : {}),
    })
  }

  for (const is of isler) {
    const slug = turkceSlug(is.baslik)
    islem.createIfNotExists({
      _id: `is-${slug}`,
      _type: 'yapilanIs',
      baslik: is.baslik,
      slug: {_type: 'slug', current: slug},
      hizmet: {_type: 'reference', _ref: hizmetId('film-ve-video-ekipmanlari')},
      kapak: await gorselYukle(is.dosya),
      tarih: is.dosya.slice(0, 10),
      video: `https://www.instagram.com/reel/${is.reel}/`,
      anasayfa: true,
    })
    console.log(`  görsel yüklendi: ${is.dosya}`)
  }

  const sonuc = await islem.commit()
  console.log(`Tamam: ${sonuc.results.length} belge işlendi (zaten var olanlara dokunulmadı).`)
}

main().catch((hata) => {
  console.error(hata)
  process.exit(1)
})
