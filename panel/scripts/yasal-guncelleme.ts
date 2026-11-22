// Yasal uyum güncellemesi (22 Kasım 2026):
//  - KVKK sayfası: çerez politikası, ziyaret kayıtları/istatistik, toplama yöntemi, yurt dışı aktarım, başvuru süresi
//  - "Çelik Konstrüksiyon Ev": kanıt gerektiren deprem iddiası yerine ölçülebilir ifade
//
// Çalıştırma (panel klasöründe):  npx sanity exec scripts/yasal-guncelleme.ts --with-user-token
// Güvenli: metin abin tarafından değiştirilmişse (ilk taslak değilse) dokunmaz, uyarı verir.
import {getCliClient} from 'sanity/cli'
import {CELIK_EV_ESKI, CELIK_EV_YENI, kvkkIcerigi} from './metinler'

const istemci = getCliClient({apiVersion: '2025-02-19'})

type Span = {_type: string; text?: string}
type Blok = {_type: string; children?: Span[]}
const metin = (bloklar: Blok[] = []) => bloklar.flatMap((b) => b.children ?? []).map((s) => s.text ?? '').join(' ')

async function main() {
  const taslaklar = await istemci.fetch<string[]>(
    '*[_id in ["drafts.kvkk", "drafts.hizmet-celik-konstruksiyon-ev"]]._id',
    {},
    {perspective: 'raw'},
  )
  if (taslaklar.length) {
    console.log('Panelde yayımlanmamış taslak var, önce o yayımlanmalı/silinmeli:', taslaklar)
    process.exit(1)
  }

  // 1) KVKK
  const kvkk = await istemci.getDocument<{icerik?: Blok[]}>('kvkk')
  const kvkkMetni = metin(kvkk?.icerik)
  const ilkTaslak = kvkkMetni.includes('Bu web sitesinde form bulunmaz. Bizimle telefon')
  const zatenGuncel = kvkkMetni.includes('Sitemiz çerez (cookie) kullanmaz')
  if (zatenGuncel) console.log('KVKK zaten güncel.')
  else if (!ilkTaslak) console.log('UYARI: KVKK metni panelden değiştirilmiş; üzerine yazılmadı. Elle güncelleyin.')
  else {
    await istemci.patch('kvkk').set({icerik: kvkkIcerigi()}).commit()
    console.log('KVKK metni güncellendi.')
  }

  // 2) Çelik konstrüksiyon ev
  const ev = await istemci.getDocument<{aciklama?: (Blok & {children?: (Span & {_key: string})[]})[]}>(
    'hizmet-celik-konstruksiyon-ev',
  )
  let degisti = false
  const aciklama = (ev?.aciklama ?? []).map((b) => ({
    ...b,
    children: b.children?.map((s) => {
      if (s.text?.includes(CELIK_EV_ESKI)) {
        degisti = true
        return {...s, text: s.text.replace(CELIK_EV_ESKI, CELIK_EV_YENI)}
      }
      return s
    }),
  }))
  if (degisti) {
    await istemci.patch('hizmet-celik-konstruksiyon-ev').set({aciklama}).commit()
    console.log('Çelik Konstrüksiyon Ev açıklaması güncellendi.')
  } else console.log('Çelik Konstrüksiyon Ev: değiştirilecek cümle bulunamadı (zaten güncel ya da elle değiştirilmiş).')
}

main().catch((hata) => {
  console.error(hata)
  process.exit(1)
})
