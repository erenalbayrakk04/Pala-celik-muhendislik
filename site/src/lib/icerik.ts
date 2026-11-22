// Panelden gelen bütün içerik: site ayarları, hizmetler, yapılan işler, Hakkımızda ve KVKK.
// Tek sorguyla, site yayınlanırken bir kere çekilir. Panelde bir şey değişince site
// yeniden yayınlanır ve yeni içerik gelir.
// Panel çalışmıyorsa yayın durur; internetteki son sürüm yayında kalmaya devam eder.
import { istemci, type SanityGorsel } from './sanity';

export type IkonAdi =
  | 'celik-cati'
  | 'uzay-cati'
  | 'celik-ev'
  | 'asma-tavan'
  | 'bolme-duvar'
  | 'celik-imalat'
  | 'santiye'
  | 'film-ekipmani';

const IKONLAR = new Set<IkonAdi>([
  'celik-cati',
  'uzay-cati',
  'celik-ev',
  'asma-tavan',
  'bolme-duvar',
  'celik-imalat',
  'santiye',
  'film-ekipmani',
]);

/** Panelin zengin metin alanı (paragraflar, başlıklar, listeler, görseller). */
export type ZenginMetin = Array<{ _type: string; _key: string; [alan: string]: unknown }>;

export type Hizmet = {
  slug: string; // sayfa adresi: /hizmetler/<slug>
  baslik: string;
  ozet: string; // kartlarda görünen kısa açıklama
  ikon: IkonAdi;
  kapak: SanityGorsel | null;
  aciklama: ZenginMetin | null;
};

export type YapilanIs = {
  slug: string; // sayfa adresi: /yapilan-isler/<slug>
  baslik: string;
  hizmet: { slug: string; baslik: string } | null;
  kapak: SanityGorsel | null;
  galeri: SanityGorsel[] | null;
  aciklama: string | null;
  konum: string | null;
  tarih: string | null; // YYYY-AA-GG
  video: string | null;
  anasayfa: boolean | null;
};

export type Sayfa = {
  baslik: string;
  gorsel: SanityGorsel | null;
  icerik: ZenginMetin | null;
};

export type Ayarlar = {
  firmaAdi?: string;
  yetkili?: string;
  telefon?: string;
  whatsapp?: string;
  eposta?: string;
  adres?: string;
  haritaLinki?: string;
  instagram?: string;
  tanitim?: string;
};

// Görsellerin asıl ölçülerini de alıyoruz (sayfa kaymasın diye genişlik/yükseklik lazım)
const GORSEL = `{..., "boyut": asset->metadata.dimensions{width, height}}`;
const ZENGIN = `[]{..., _type == "image" => {"boyut": asset->metadata.dimensions{width, height}}}`;

const SORGU = `{
  "ayarlar": *[_id == "ayarlar"][0]{firmaAdi, yetkili, telefon, whatsapp, eposta, adres, haritaLinki, instagram, tanitim},
  "hizmetler": *[_type == "hizmet" && defined(slug.current)] | order(coalesce(sira, 100) asc, baslik asc) {
    "slug": slug.current, baslik, ozet, ikon, kapak${GORSEL}, aciklama${ZENGIN}
  },
  "isler": *[_type == "yapilanIs" && defined(slug.current)] | order(coalesce(tarih, _createdAt) desc) {
    "slug": slug.current, baslik,
    "hizmet": hizmet->{"slug": slug.current, baslik},
    kapak${GORSEL}, galeri[]${GORSEL}, aciklama, konum, tarih, video, anasayfa
  },
  "hakkimizda": *[_id == "hakkimizda"][0]{baslik, gorsel${GORSEL}, icerik${ZENGIN}},
  "kvkk": *[_id == "kvkk"][0]{baslik, gorsel${GORSEL}, icerik${ZENGIN}}
}`;

type Icerik = {
  ayarlar: Ayarlar | null;
  hizmetler: Hizmet[];
  isler: YapilanIs[];
  hakkimizda: Sayfa | null;
  kvkk: Sayfa | null;
};

async function getir(): Promise<Icerik> {
  try {
    return await istemci.fetch<Icerik>(SORGU);
  } catch (hata) {
    throw new Error(
      'Panelden (Sanity) içerik alınamadı. İnternet bağlantısını kontrol edin. ' +
        'Canlı sitede bu durumda yayın durur ve son çalışan sürüm yayında kalır.',
      { cause: hata },
    );
  }
}

const veri = await getir();

export const ayarlar: Ayarlar = veri.ayarlar ?? {};

export const hizmetler: Hizmet[] = veri.hizmetler.map((h) => ({
  ...h,
  ozet: h.ozet ?? '',
  ikon: IKONLAR.has(h.ikon) ? h.ikon : 'celik-imalat',
}));

// Kapak fotoğrafı olmayan işleri sitede göstermiyoruz (panelde zaten zorunlu)
export const isler: YapilanIs[] = veri.isler.filter((is) => is.kapak?.asset);

export const hakkimizda = veri.hakkimizda;
export const kvkk = veri.kvkk;

/** Bir hizmete ait işler (yeni önce). */
export function hizmetinIsleri(slug: string) {
  return isler.filter((is) => is.hizmet?.slug === slug);
}

/** "2026-04-22" → "Nisan 2026" */
export function tarihYaz(tarih: string | null, gun = false) {
  if (!tarih) return '';
  const d = new Date(`${tarih.slice(0, 10)}T12:00:00`);
  return d.toLocaleDateString('tr-TR', gun ? { day: 'numeric', month: 'long', year: 'numeric' } : { month: 'long', year: 'numeric' });
}
