// KVKK metninin hukuki inceleme sonrası sürümünü (22 Kasım 2026) panele yükler:
//  - her işleme faaliyeti kendi hukuki sebebiyle eşleştirildi (Kurul İlke Kararı 2026/347)
//  - yurt dışı aktarımlar (Cloudflare, Gmail, WhatsApp/Instagram) kesin dille yazıldı
//  - silme hakkı (m.11/e), başvuru usulü (Başvuru Tebliği m.5), saklama süreleri, Kurul'a şikâyet eklendi
//  - başlık alt bilgi linkiyle aynı oldu: "KVKK Aydınlatma Metni ve Çerez Politikası"
//
// Çalıştırma (panel klasöründe):  npx sanity exec scripts/kvkk-guncelle.ts --with-user-token
// Güvenli: KVKK metni betiğin son yazımından sonra panelde elle değiştirildiyse üzerine yazmaz.
import {getCliClient} from 'sanity/cli'
import {KVKK_BASLIK, kvkkIcerigi} from './metinler'

const istemci = getCliClient({apiVersion: '2025-02-19'})

// yasal-guncelleme.ts'in KVKK belgesini son yazdığı an. Belge bundan sonra değiştiyse (abi panelden
// düzenlediyse) dokunulmaz.
const SON_BETIK_YAZIMI = '2026-11-22T18:59:21Z'
const YENI_SURUM_ISARETI = 'Ne kadar süre saklıyoruz?'

type Blok = {_type: string; children?: {text?: string}[]}
const metin = (bloklar: Blok[] = []) =>
  bloklar.flatMap((b) => b.children ?? []).map((s) => s.text ?? '').join(' ')

async function main() {
  const taslak = await istemci.fetch<number>('count(*[_id == "drafts.kvkk"])', {}, {perspective: 'raw'})
  if (taslak) {
    console.log('Panelde yayımlanmamış bir KVKK taslağı var; önce yayımlanmalı veya silinmeli.')
    process.exit(1)
  }

  const kvkk = await istemci.getDocument<{_rev: string; _updatedAt: string; icerik?: Blok[]}>('kvkk')
  if (!kvkk) throw new Error('KVKK belgesi bulunamadı.')

  if (metin(kvkk.icerik).includes(YENI_SURUM_ISARETI)) {
    console.log('KVKK zaten güncel.')
    return
  }
  if (kvkk._updatedAt !== SON_BETIK_YAZIMI) {
    console.log(`UYARI: KVKK metni ${kvkk._updatedAt} tarihinde panelden değiştirilmiş; üzerine yazılmadı.`)
    process.exit(1)
  }

  await istemci
    .patch('kvkk')
    .ifRevisionId(kvkk._rev)
    .set({baslik: KVKK_BASLIK, icerik: kvkkIcerigi()})
    .commit()
  console.log('KVKK metni güncellendi; site yaklaşık 1 dakika içinde yenilenir.')
}

main().catch((hata) => {
  console.error(hata)
  process.exit(1)
})
