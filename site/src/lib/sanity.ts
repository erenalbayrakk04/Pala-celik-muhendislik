// Sanity (admin paneli) bağlantısı.
// Site, yayınlanırken (build) içerikleri buradan BİR KERE çeker ve sabit sayfalara çevirir.
// Görseller de o sırada indirilip sitenin içine konur; ziyaretçi Sanity'ye hiç bağlanmaz.
// Bu yüzden Sanity'de bir sorun olsa bile canlı site çalışmaya devam eder.
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Panelle aynı proje (panel/sanity.proje.ts). Gizli bilgi değildir.
export const projectId = 'lnnbnu19';
export const dataset = 'production';

export const istemci = createClient({
  projectId,
  dataset,
  apiVersion: '2025-02-19',
  useCdn: false, // her yayında en güncel içerik
  perspective: 'published', // sadece "Yayınla"ya basılmış içerikler (taslaklar sitede görünmez)
});

/** Panelden gelen görsel alanı (kırpma ve odak noktası bilgisiyle). */
export type SanityGorsel = {
  _key?: string;
  asset: { _ref: string };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
  alt?: string;
  boyut?: { width: number; height: number } | null;
};

const kurucu = createImageUrlBuilder({ projectId, dataset });

/**
 * Görselin istenen genişlikteki adresini ve ölçülerini verir.
 * `oran` verilirse (genişlik / yükseklik, ör. 4/3) görsel abinin paneldeki odak noktasına göre kırpılır.
 * Görsel, aslından daha büyük istenmez.
 */
export function gorselBoyutla(g: SanityGorsel, genislik: number, oran?: number) {
  const asilG = g.boyut?.width ?? genislik;
  const asilY = g.boyut?.height ?? genislik;
  const k = g.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const kullanilanG = asilG * (1 - k.left - k.right);
  const kullanilanY = asilY * (1 - k.top - k.bottom);

  const width = Math.max(1, Math.min(genislik, Math.round(kullanilanG)));
  if (oran) {
    const height = Math.max(1, Math.round(width / oran));
    return { src: kurucu.image(g).width(width).height(height).fit('crop').quality(90).url(), width, height };
  }
  const height = Math.max(1, Math.round((width * kullanilanY) / kullanilanG));
  return { src: kurucu.image(g).width(width).quality(90).url(), width, height };
}
