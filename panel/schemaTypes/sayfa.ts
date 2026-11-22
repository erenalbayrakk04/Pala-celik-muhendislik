import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

// Tek yazılık sayfalar: Hakkımızda ve KVKK Aydınlatma Metni.
// Bunlar panelin sol menüsünde sabit duruyor; yenisi oluşturulamaz, silinemez.
export const sayfa = defineType({
  name: 'sayfa',
  title: 'Sayfa',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'baslik',
      title: 'Başlık',
      type: 'string',
      validation: (kural) => kural.required(),
    }),
    defineField({
      name: 'gorsel',
      title: 'Görsel',
      type: 'image',
      description: 'İsteğe bağlı: sayfanın üstünde görünür.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'icerik',
      title: 'İçerik',
      type: 'zenginMetin',
    }),
  ],
})
