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
    {
      name: 'resmi',
      title: 'Resmi firma bilgileri',
      description:
        'Vergi levhasında / ticaret sicilinde yazan bilgiler. Doldurulanlar sitenin en altında küçük yazıyla görünür (yasal zorunluluk).',
      options: {collapsible: true, collapsed: false},
    },
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
      name: 'resmiUnvan',
      title: 'Ticaret unvanı (resmi ad)',
      type: 'string',
      fieldset: 'resmi',
      description: 'Vergi levhasında yazan tam ad. Örnek: "Fatih Şahin – Pala Çelik ve Mühendislik"',
    }),
    defineField({
      name: 'vergiDairesi',
      title: 'Vergi dairesi',
      type: 'string',
      fieldset: 'resmi',
      description: 'Örnek: Sarıyer Vergi Dairesi',
    }),
    defineField({
      name: 'vergiNo',
      title: 'Vergi numarası',
      type: 'string',
      fieldset: 'resmi',
      description:
        'Şirketseniz 10 haneli vergi numarası. Şahıs işletmesiyseniz BOŞ bırakın (T.C. kimlik numarası sitede yayımlanmamalı).',
      validation: (kural) =>
        kural.custom((deger?: string) =>
          !deger || /^\d{10}$/.test(deger.replace(/\s/g, ''))
            ? true
            : 'Vergi numarası 10 haneli olmalı. T.C. kimlik numarası yazmayın.',
        ),
    }),
    defineField({
      name: 'ticaretSicilNo',
      title: 'Ticaret sicil numarası',
      type: 'string',
      fieldset: 'resmi',
      description: 'Ticaret odasına kayıtlıysanız. Esnaf odasına kayıtlıysanız boş bırakın.',
    }),
    defineField({
      name: 'mersisNo',
      title: 'MERSİS numarası',
      type: 'string',
      fieldset: 'resmi',
      description: 'Varsa 16 haneli MERSİS numarası.',
      validation: (kural) =>
        kural.custom((deger?: string) =>
          !deger || /^\d{16}$/.test(deger.replace(/\s/g, '')) ? true : 'MERSİS numarası 16 haneli olmalı.',
        ),
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
