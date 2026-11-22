// Sitenin her yerinde kullanılan firma bilgileri.
// Bilgiler panelin "Site Ayarları" bölümünden gelir; abin oradan değiştirir.
// Aşağıdaki varsayılanlar sadece panelde bir alan boş kalırsa kullanılır.
import { ayarlar } from '../lib/icerik';

const VARSAYILAN = {
  ad: 'Pala Çelik & Mühendislik',
  telefon: '0544 485 42 16',
  eposta: 'info@palacelikmuhendislik.com',
  adres: 'Huzur Mah. Ulubaş Cad. Ulubaş Pasajı\nNo: 11 Kat: 1 Daire: 40\nSarıyer / İstanbul',
  instagram: 'https://www.instagram.com/pala.1933/',
  tanitim:
    'Çelik çatı, uzay çatı, çelik konstrüksiyon ve projeye özel çelik imalatta projeden montaja tek elden hizmet. Film ve video sektörü için prodüksiyon ekipmanları.',
};

const dolu = (deger: string | undefined, yedek: string) => (deger?.trim() ? deger.trim() : yedek);

/** "0544 485 42 16" → "905444854216" (ülke kodlu, sadece rakam) */
function ulkeKodlu(numara: string) {
  let r = numara.replace(/\D/g, '');
  if (r.startsWith('00')) r = r.slice(2);
  else if (r.startsWith('0')) r = `90${r.slice(1)}`;
  else if (r.length === 10) r = `90${r}`;
  return r;
}

const telefon = dolu(ayarlar.telefon, VARSAYILAN.telefon);
const adresSatirlari = dolu(ayarlar.adres, VARSAYILAN.adres)
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean);
/**
 * Google Haritalar'ın doğru yeri bulabileceği sade adres.
 * Firma adı, kat/daire/pasaj gibi bina içi bilgiler ve "Mah./Cad." kısaltmaları Google'ı şaşırtıp
 * yanlış semte götürüyordu (ör. Çengelköy). Sitede görünen adres değişmez; sadece haritaya giden arama.
 * "Huzur Mah. Ulubaş Cad. Ulubaş Pasajı / No: 11 Kat: 1 Daire: 40 / Sarıyer / İstanbul"
 *   → "Huzur Mahallesi, Ulubaş Caddesi No: 11, Sarıyer, İstanbul"
 */
function haritaAdresi(satirlar: string[]) {
  return satirlar
    .join(' ')
    .replace(/\b(Kat|Daire|D)\s*:?\s*\d+\w*/gi, ' ') // bina içi bilgiler
    .replace(/\S+\s+(Pasajı|İş Merkezi|İş Hanı|Apartmanı|Apt\.?|Sitesi)(?=\s|,|$)/giu, ' ')
    .replace(/\bMah\.?(?=\s)/gi, 'Mahallesi,')
    .replace(/\bCad\.?(?=\s)/gi, 'Caddesi')
    .replace(/\bSok\.?(?=\s)|\bSk\.?(?=\s)/gi, 'Sokak')
    .replace(/\bBulv?\.?(?=\s)|\bBlv\.?(?=\s)/gi, 'Bulvarı')
    .replace(/\s*\/\s*/g, ', ')
    .replace(/\s+(Sarıyer|Beşiktaş|Şişli|Kağıthane|Eyüpsultan)\b/g, ', $1')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/^,|,$/g, '');
}
const haritaSorgusu = haritaAdresi(adresSatirlari);

const instagramLink = dolu(ayarlar.instagram, VARSAYILAN.instagram);
const instagramKullanici = instagramLink.match(/instagram\.com\/([^/?#]+)/i)?.[1] ?? 'pala.1933';

export const firma = {
  ad: dolu(ayarlar.firmaAdi, VARSAYILAN.ad),
  yetkili: ayarlar.yetkili?.trim() ?? '',
  telefon,
  telefonLink: `tel:+${ulkeKodlu(telefon)}`,
  whatsappNumara: ulkeKodlu(dolu(ayarlar.whatsapp, telefon)),
  eposta: dolu(ayarlar.eposta, VARSAYILAN.eposta),
  adresSatirlari,
  /** Haritada aranacak sade adres (iletişim sayfasındaki harita için) */
  haritaSorgusu,
  haritaLinki: dolu(
    ayarlar.haritaLinki,
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(haritaSorgusu)}`,
  ),
  instagram: { kullanici: instagramKullanici, link: instagramLink },
  tanitim: dolu(ayarlar.tanitim, VARSAYILAN.tanitim),
  /** Resmi bilgiler (TTK m.39, 5651 m.3): panelde doldurulanlar alt bilgide görünür */
  resmi: {
    unvan: ayarlar.resmiUnvan?.trim() ?? '',
    vergiDairesi: ayarlar.vergiDairesi?.trim() ?? '',
    vergiNo: ayarlar.vergiNo?.replace(/\s/g, '') ?? '',
    sicilNo: ayarlar.ticaretSicilNo?.trim() ?? '',
    mersisNo: ayarlar.mersisNo?.replace(/\s/g, '') ?? '',
  },
};

/** WhatsApp sohbetini hazır yazılmış bir mesajla açan bağlantıyı üretir. */
export function whatsappLink(mesaj = 'Merhaba, web sitenizden ulaşıyorum. Teklif almak istiyorum.') {
  return `https://wa.me/${firma.whatsappNumara}?text=${encodeURIComponent(mesaj)}`;
}

/** Üst menüdeki ve alt bilgideki sayfa bağlantıları. */
export const menu = [
  { ad: 'Anasayfa', link: '/' },
  { ad: 'Hakkımızda', link: '/hakkimizda' },
  { ad: 'Hizmetlerimiz', link: '/hizmetler' },
  { ad: 'Yapılan İşler', link: '/yapilan-isler' },
  { ad: 'İletişim', link: '/iletisim' },
];

/** Sayfanın temiz adresi: "/index.html" → "/", "/hakkimizda.html" → "/hakkimizda" */
export function sayfaYolu(url: URL) {
  return url.pathname.replace(/(index)?\.html$/, '').replace(/\/$/, '') || '/';
}
