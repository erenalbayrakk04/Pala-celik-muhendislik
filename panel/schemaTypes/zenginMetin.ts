import {defineArrayMember, defineType} from 'sanity'

// Kalın, italik, ara başlık, madde ve fotoğraf eklenebilen yazı alanı.
// Hizmet açıklamaları, Hakkımızda ve KVKK sayfaları bunu kullanıyor.
export const zenginMetin = defineType({
  name: 'zenginMetin',
  title: 'Metin',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Ara başlık', value: 'h2'},
        {title: 'Küçük ara başlık', value: 'h3'},
      ],
      lists: [
        {title: 'Madde işaretli', value: 'bullet'},
        {title: 'Numaralı', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Kalın', value: 'strong'},
          {title: 'İtalik', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Bağlantı',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'Adres',
                validation: (kural) => kural.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Fotoğraf',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Fotoğrafta ne var? (kısaca)'}],
    }),
  ],
})
