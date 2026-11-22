import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {trTRLocale} from '@sanity/locale-tr-tr'
import {schemaTypes} from './schemaTypes'
import {yapi, TEKIL_TURLER} from './yapi'
import {slugluYayinla} from './eylemler'
import {PalaIkon} from './PalaIkon'
import {projectId, dataset} from './sanity.proje'

// Tekil belgelerde (Site Ayarları, Hakkımızda, KVKK) izin verilen işlemler
const TEKIL_EYLEMLER = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Pala Çelik Panel',
  icon: PalaIkon,
  projectId,
  dataset,

  // Abin kullanmayacağı gelişmiş özellikleri gizle (ekran sade kalsın).
  // Bunların çoğu zaten ücretli planlarda var; ücretsiz planda işe yaramaz.
  releases: {enabled: false},
  scheduledDrafts: {enabled: false},
  scheduledPublishing: {enabled: false},
  tasks: {enabled: false},

  plugins: [
    structureTool({title: 'İçerik', structure: yapi}),
    trTRLocale(),
    // Sorgu deneme ekranı: sadece bilgisayarda geliştirme yaparken görünür, abin görmez
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
    // Tekil belgeler "Yeni oluştur" menüsünde çıkmasın
    templates: (sablonlar) => sablonlar.filter(({schemaType}) => !TEKIL_TURLER.has(schemaType)),
  },

  document: {
    actions: (eylemler, {schemaType}) => {
      // Tekil belgelerde silme / çoğaltma gibi işlemleri kapat
      if (TEKIL_TURLER.has(schemaType)) {
        return eylemler.filter(({action}) => action && TEKIL_EYLEMLER.has(action))
      }
      // İş ve hizmetlerde "Yayınla", boş sayfa adresini başlıktan doldursun
      if (schemaType === 'yapilanIs' || schemaType === 'hizmet') {
        return eylemler.map((eylem) => (eylem.action === 'publish' ? slugluYayinla(eylem) : eylem))
      }
      return eylemler
    },
  },
})
