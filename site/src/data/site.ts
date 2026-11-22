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
  haritaLinki: dolu(
    ayarlar.haritaLinki,
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresSatirlari.join(' '))}`,
  ),
  instagram: { kullanici: instagramKullanici, link: instagramLink },
  tanitim: dolu(ayarlar.tanitim, VARSAYILAN.tanitim),
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
