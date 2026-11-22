import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

// Site Ayarları: telefon, adres, e-posta gibi her sayfada görünen bilgiler.
// Bu belgeden sadece bir tane var; panelin sol menüsünden açılıyor.
export const ayarlar = defineType({
  name: 'ayarlar',
  title: 'Site Ayarları',
  type: 'document',
  icon: CogIcon,
  fieldsets: [
    {name: 'iletisim', title: 'İletişim bilgileri'},
    {name: 'diger', title: 'Diğer'},
  ],
  fields: [
    defineField({
      name: 'firmaAdi',
      title: 'Firma adı',
      type: 'string',
      initialValue: 'Pala Çelik & Mühendislik',
      validation: (kural) => kural.required(),
    }),
    defineField({
      name: 'yetkili',
      title: 'Yetkili kişi',
      type: 'string',
      fieldset: 'iletisim',
      description: 'İletişim sayfasında görünür. Örnek: Fatih Şahin',
    }),
    defineField({
      name: 'telefon',
      title: 'Telefon',
      type: 'string',
      fieldset: 'iletisim',
      description: 'Sitede görünen numara. Örnek: 0544 485 42 16',
      validation: (kural) => kural.required(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp numarası',
      type: 'string',
      fieldset: 'iletisim',
      description: 'Telefondan farklıysa yazın. Boş bırakılırsa telefon numarası kullanılır.',
    }),
    defineField({
      name: 'eposta',
      title: 'E-posta',
      type: 'string',
      fieldset: 'iletisim',
      validation: (kural) => kural.email().error('Geçerli bir e-posta adresi yazın.'),
    }),
    defineField({
      name: 'adres',
      title: 'Adres',
      type: 'text',
      rows: 3,
      fieldset: 'iletisim',
      description: 'Her satır sitede ayrı satırda görünür.',
    }),
    defineField({
      name: 'haritaLinki',
      title: 'Google Haritalar bağlantısı',
      type: 'url',
      fieldset: 'iletisim',
      description: 'İsteğe bağlı: Google Haritalar\'da işletmeyi açıp "Paylaş" ile alınan link.',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram adresi',
      type: 'url',
      fieldset: 'diger',
    }),
    defineField({
      name: 'tanitim',
      title: 'Kısa tanıtım yazısı',
      type: 'text',
      rows: 3,
      fieldset: 'diger',
      description: 'Sayfaların en altında logonun yanında görünür.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Ayarları'}),
  },
})
