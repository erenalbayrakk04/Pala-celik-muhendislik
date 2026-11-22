import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'
import {turkceSlug} from './turkceSlug'

// Yapılan işler (referanslar). Abin en çok bunu kullanacak:
// başlık yazar, bölüm seçer, fotoğrafları yükler, "Yayımla"ya basar.
export const yapilanIs = defineType({
  name: 'yapilanIs',
  title: 'Yapılan İş',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'baslik',
      title: 'Başlık',
      type: 'string',
      description: 'Örnek: "Sarıyer depo çelik çatı"',
      validation: (kural) => kural.required().error('Başlık yazmalısınız.'),
    }),
    defineField({
      name: 'hizmet',
      title: 'Bölüm',
      type: 'reference',
      to: [{type: 'hizmet'}],
      description: 'Bu iş hangi bölümde görünsün?',
      options: {disableNew: true},
      validation: (kural) => kural.required().error('Bir bölüm seçmelisiniz.'),
    }),
    defineField({
      name: 'kapak',
      title: 'Kapak fotoğrafı',
      type: 'image',
      description: 'Listelerde görünen ana fotoğraf.',
      options: {hotspot: true},
      validation: (kural) => kural.required().error('Bir kapak fotoğrafı yükleyin.'),
    }),
    defineField({
      name: 'galeri',
      title: 'Diğer fotoğraflar',
      type: 'array',
      description: 'Birden fazla fotoğrafı aynı anda sürükleyip bırakabilirsiniz.',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'aciklama',
      title: 'Açıklama',
      type: 'text',
      rows: 4,
      description: 'İsteğe bağlı: işin kısa anlatımı (ölçü, malzeme, süre gibi).',
    }),
    defineField({
      name: 'konum',
      title: 'Konum',
      type: 'string',
      description: 'Örnek: "Sarıyer, İstanbul"',
    }),
    defineField({
      name: 'tarih',
      title: 'Tarih',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: 'video',
      title: 'Video bağlantısı',
      type: 'url',
      description: 'İsteğe bağlı: Instagram ya da YouTube linki.',
    }),
    defineField({
      name: 'anasayfa',
      title: 'Anasayfada göster',
      type: 'boolean',
      description: 'Açıksa anasayfadaki "Son işlerimiz" bölümünde görünür.',
      initialValue: true,
    }),
    defineField({
      name: 'slug',
      title: 'Sayfa adresi',
      type: 'slug',
      description: 'Boş bırakırsanız "Yayımla"ya basınca başlıktan otomatik oluşturulur.',
      options: {source: 'baslik', slugify: turkceSlug},
    }),
  ],
  orderings: [{title: 'Tarihe göre (yeni önce)', name: 'tarihAzalan', by: [{field: 'tarih', direction: 'desc'}]}],
  preview: {
    select: {title: 'baslik', bolum: 'hizmet.baslik', konum: 'konum', media: 'kapak'},
    prepare: ({title, bolum, konum, media}) => ({
      title,
      subtitle: [bolum, konum].filter(Boolean).join(' · '),
      media,
    }),
  },
})
