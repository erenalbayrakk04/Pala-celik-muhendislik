// Türkçe karakterleri sadeleştirerek sayfa adresi (slug) üretir.
// Örnek: "Çelik Çatı" → "celik-cati", "Şantiye Faaliyetleri" → "santiye-faaliyetleri"
const HARFLER: Record<string, string> = {
  ç: 'c',
  ğ: 'g',
  ı: 'i',
  ö: 'o',
  ş: 's',
  ü: 'u',
  â: 'a',
  î: 'i',
  û: 'u',
}

export function turkceSlug(metin: string): string {
  return metin
    .toLocaleLowerCase('tr-TR')
    .replace(/[çğıöşüâîû]/g, (harf) => HARFLER[harf] ?? harf)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}
