# Pala Çelik & Mühendislik

palacelikmuhendislik.com sitesinin ve admin panelinin kodları.

| Klasör     | Ne var?                                                                          |
| :--------- | :------------------------------------------------------------------------------- |
| `site/`    | Web sitesi ([Astro](https://docs.astro.build)). Ayrıntılar: [site/README.md](site/README.md)   |
| `panel/`   | Admin paneli ([Sanity Studio](https://www.sanity.io/docs)). Ayrıntılar: [panel/README.md](panel/README.md) |
| `malzeme/` | Logo (SVG/PNG) ve Instagram'dan alınan ilk görseller                             |

## Nasıl çalışıyor?

```
Abin panelde "Yayınla"ya basar
        │
        ▼
Sanity (içerik + fotoğraflar)  ──►  Site yeniden derlenir  ──►  Cloudflare'de yayınlanır
                                    (içerik ve görseller
                                     sitenin içine konur)
```

- Ziyaretçi sadece sabit sayfaları görür; Sanity'ye bağlanmaz. Sanity'de sorun olsa bile site açık kalır.
- Derleme hata verirse yayındaki son sürüm olduğu gibi kalır.

## Bilgisayarda çalıştırmak

```bash
cd site && npm install && npm run dev     # site:  http://localhost:4321
cd panel && npm install && npm run dev    # panel: http://localhost:3333
```

## Hesaplar

- Panel / Sanity: firmanın Google hesabıyla giriş (proje `lnnbnu19`)
- Panel adresi: https://palacelikmuhendislik.sanity.studio
- Kod: bu depo (GitHub, gizli)
