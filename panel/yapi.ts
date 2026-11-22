import type {StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {ImagesIcon} from '@sanity/icons/Images'
import {TagsIcon} from '@sanity/icons/Tags'
import {UsersIcon} from '@sanity/icons/Users'

// Tek olması gereken belge türleri (yenisi oluşturulamaz, silinemez)
export const TEKIL_TURLER = new Set(['sayfa', 'ayarlar'])

// Panelin sol menüsü
export const yapi: StructureResolver = (S) =>
  S.list()
    .title('İçerik')
    .items([
      S.listItem()
        .title('Yapılan İşler')
        .icon(ImagesIcon)
        .child(
          S.documentTypeList('yapilanIs')
            .title('Yapılan İşler')
            .defaultOrdering([{field: 'tarih', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Hizmetler (Bölümler)')
        .icon(TagsIcon)
        .child(
          S.documentTypeList('hizmet')
            .title('Hizmetler (Bölümler)')
            .defaultOrdering([{field: 'sira', direction: 'asc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Hakkımızda')
        .id('hakkimizda')
        .icon(UsersIcon)
        .child(S.document().schemaType('sayfa').documentId('hakkimizda').title('Hakkımızda')),
      S.listItem()
        .title('KVKK Aydınlatma Metni')
        .id('kvkk')
        .icon(DocumentTextIcon)
        .child(S.document().schemaType('sayfa').documentId('kvkk').title('KVKK Aydınlatma Metni')),
      S.divider(),
      S.listItem()
        .title('Site Ayarları')
        .id('ayarlar')
        .icon(CogIcon)
        .child(S.document().schemaType('ayarlar').documentId('ayarlar').title('Site Ayarları')),
    ])
