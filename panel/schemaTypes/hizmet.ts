import {defineField, defineType} from 'sanity'
import {TagsIcon} from '@sanity/icons/Tags'
import {turkceSlug} from './turkceSlug'

// Sitedeki çizim ikonları (site/src/components/HizmetIkonu.astro ile aynı isimler)
export const IKONLAR = [
  {title: 'Çelik çatı (çatı makası)', value: 'celik-cati'},
  {title: 'Uzay çatı', value: 'uzay-cati'},
  {title: 'Çelik ev', value: 'celik-ev'},
  {title: 'Asma tavan', value: 'asma-tavan'},
  {title: 'Bölme duvar', value: 'bolme-duvar'},
  {title: 'Çelik imalat (I profil)', value: 'celik-imalat'},
  {title: 'Şantiye (vinç)', value: 'santiye'},
  {title: 'Film ekipmanı (kamera)', value: 'film-ekipmani'},
]

// Hizmet bölümleri: Çelik Çatı, Uzay Çatı, ... Abin yeni bölüm ekleyince sitede kendiliğinden görünür.
export const hizmet = defineType({
  name: 'hizmet',
  title: 'Hizmet (Bölüm)',
  type: 'document',
  icon: TagsIcon,
  fields: [
    defineField({
      name: 'baslik',
      title: 'Başlık',
      type: 'string',
      validation: (kural) => kural.required().error('Başlık yazmalısınız.'),
    }),
    defineField({
      name: 'ozet',
      title: 'Kısa açıklama',
      type: 'text',
      rows: 3,
      description: 'Kartlarda görünen 1-2 cümlelik açıklama.',
      validation: (kural) => kural.required().max(220).error('En fazla 220 karakterlik kısa bir açıklama yazın.'),
    }),
    defineField({
      name: 'ikon',
      title: 'İkon',
      type: 'string',
      description: 'Kartta görünecek çizim.',
      options: {list: IKONLAR, layout: 'dropdown'},
      initialValue: 'celik-imalat',
      validation: (kural) => kural.required(),
    }),
    defineField({
      name: 'kapak',
      title: 'Kapak fotoğrafı',
      type: 'image',
      description: 'Hizmet sayfasının üstünde görünür. İsteğe bağlı.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'aciklama',
      title: 'Detaylı açıklama',
      type: 'zenginMetin',
      description: 'Hizmet sayfasında görünen uzun yazı.',
    }),
    defineField({
      name: 'sira',
      title: 'Sıra',
      type: 'number',
      description: 'Sitede hangi sırada görüneceği. Küçük sayı önce gelir.',
      initialValue: 100,
    }),
    defineField({
      name: 'slug',
      title: 'Sayfa adresi',
      type: 'slug',
      description: 'Boş bırakırsanız "Yayımla"ya basınca başlıktan otomatik oluşturulur.',
      options: {source: 'baslik', slugify: turkceSlug},
    }),
  ],
  orderings: [{title: 'Sıraya göre', name: 'siraArtan', by: [{field: 'sira', direction: 'asc'}]}],
  preview: {
    select: {title: 'baslik', subtitle: 'ozet', media: 'kapak'},
  },
})
