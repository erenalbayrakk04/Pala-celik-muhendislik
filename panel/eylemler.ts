import {useEffect, useState} from 'react'
import {useClient, useDocumentOperation, type DocumentActionComponent} from 'sanity'
import {turkceSlug} from './schemaTypes/turkceSlug'

type Taslak = {baslik?: string; slug?: {current?: string}}

/**
 * "Yayınla" butonunu sarar: sayfa adresi (slug) boşsa önce başlıktan oluşturur, sonra yayınlar.
 * Böylece abin sadece başlık yazıp "Yayınla"ya basabilir.
 * Aynı adres başka bir belgede varsa sonuna kısa bir ek koyar (ör. celik-cati-a1b2).
 */
export function slugluYayinla(orijinal: DocumentActionComponent): DocumentActionComponent {
  const SlugluYayinla: DocumentActionComponent = (props) => {
    const {patch, publish} = useDocumentOperation(props.id, props.type)
    const istemci = useClient({apiVersion: '2025-02-19'})
    const [yayinlaniyor, setYayinlaniyor] = useState(false)
    const varsayilan = orijinal(props)

    // Taslak kaybolduysa belge yayınlanmış demektir
    useEffect(() => {
      if (yayinlaniyor && !props.draft) setYayinlaniyor(false)
    }, [props.draft, yayinlaniyor])

    if (!varsayilan) return null

    return {
      ...varsayilan,
      label: yayinlaniyor ? 'Yayınlanıyor…' : varsayilan.label,
      onHandle: async () => {
        const taslak = props.draft as Taslak | null
        if (!taslak?.baslik || taslak.slug?.current) {
          varsayilan.onHandle?.()
          return
        }
        setYayinlaniyor(true)
        let adres = turkceSlug(taslak.baslik)
        const ayniAdresSayisi = await istemci.fetch<number>(
          'count(*[_type == $tur && slug.current == $adres && !(_id in [$id, $taslakId])])',
          {tur: props.type, adres, id: props.id, taslakId: `drafts.${props.id}`},
        )
        if (ayniAdresSayisi > 0) adres = `${adres}-${props.id.slice(-4)}`
        patch.execute([{set: {slug: {_type: 'slug', current: adres}}}])
        publish.execute()
        props.onComplete()
      },
    }
  }
  SlugluYayinla.action = 'publish'
  return SlugluYayinla
}
