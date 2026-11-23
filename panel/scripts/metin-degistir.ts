// Paneldeki yayımlanmış içerikte belirli ifadeleri değiştirir (düz yazı alanları ve zengin metin).
// Aranan ifade bulunamazsa (ör. abin metni panelden değiştirmişse) hiçbir şeye dokunmaz;
// birden fazla eski hâl yazılabilir, hangisi bulunursa o değişir.
//
// Çalıştırma (panel klasöründe):  npx sanity exec scripts/metin-degistir.ts --with-user-token
//
// DEGISIKLIKLER listesini ihtiyaca göre düzenleyin. Önceki listeler uygulandı ve git geçmişinde duruyor.
// Şu anki liste (23 Kasım 2026): KVKK "Verilerinizi nasıl topluyoruz?" bölümüne site üzerinden ödeme alınmadığı.
import {getCliClient} from 'sanity/cli'

const istemci = getCliClient({apiVersion: '2025-02-19'})

type Degisiklik = {belge: string; eski: string; yeni: string}
export const DEGISIKLIKLER: Degisiklik[] = [
  {
    belge: 'kvkk',
    eski: 'Bu sitede form bulunmaz. Verilerinizi;',
    yeni: 'Bu sitede form bulunmaz ve site üzerinden ödeme alınmaz; ödemeler elden veya banka aracılığıyla yapılır. Verilerinizi;',
  },
]

type Deger = unknown
// Bir değerin içindeki bütün yazılarda (string alanlar ve zengin metin span'leri) değiştir
function degistir(deger: Deger, eski: string, yeni: string): {deger: Deger; sayi: number} {
  if (typeof deger === 'string') {
    return deger.includes(eski) ? {deger: deger.split(eski).join(yeni), sayi: 1} : {deger, sayi: 0}
  }
  if (Array.isArray(deger)) {
    let sayi = 0
    const yeniDizi = deger.map((d) => {
      const r = degistir(d, eski, yeni)
      sayi += r.sayi
      return r.deger
    })
    return {deger: yeniDizi, sayi}
  }
  if (deger && typeof deger === 'object') {
    let sayi = 0
    const yeniNesne: Record<string, Deger> = {}
    for (const [k, v] of Object.entries(deger)) {
      // Sistem alanlarına, anahtarlara ve referanslara dokunma
      if (k.startsWith('_') || k === 'asset' || k === 'slug') yeniNesne[k] = v
      else {
        const r = degistir(v, eski, yeni)
        sayi += r.sayi
        yeniNesne[k] = r.deger
      }
    }
    return {deger: yeniNesne, sayi}
  }
  return {deger, sayi: 0}
}

async function main() {
  const idler = [...new Set(DEGISIKLIKLER.map((d) => d.belge))]
  const taslaklar = await istemci.fetch<string[]>('*[_id in $idler]._id', {idler: idler.map((i) => `drafts.${i}`)}, {perspective: 'raw'})
  if (taslaklar.length) {
    console.log('Panelde yayımlanmamış taslak var, önce o yayımlanmalı ya da silinmeli:', taslaklar)
    process.exit(1)
  }
  for (const id of idler) {
    const belge = await istemci.getDocument(id)
    if (!belge) {
      console.log(`${id}: belge yok, atlandı`)
      continue
    }
    const set: Record<string, Deger> = {}
    for (const d of DEGISIKLIKLER.filter((x) => x.belge === id)) {
      let bulundu = 0
      for (const [alan, deger] of Object.entries({...belge, ...set})) {
        if (alan.startsWith('_')) continue
        const r = degistir(deger, d.eski, d.yeni)
        if (r.sayi) {
          set[alan] = r.deger
          bulundu += r.sayi
        }
      }
      console.log(`${id}: "${d.eski}" → ${bulundu ? 'değişti' : 'BULUNAMADI (dokunulmadı)'}`)
    }
    if (Object.keys(set).length) await istemci.patch(id).set(set).commit()
  }
}

main().catch((hata) => {
  console.error(hata)
  process.exit(1)
})
