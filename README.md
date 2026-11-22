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

## Hesaplar ve adresler

- Site: https://palacelikmuhendislik.com (www ve http buraya yönlenir)
- Panel: https://palacelikmuhendislik.com/admin → https://palacelikmuhendislik.sanity.studio
- Sanity: firmanın Google hesabıyla giriş (proje `lnnbnu19`)
- Cloudflare (firma hesabı): domain (Cloudflare Registrar, otomatik yenileme açık),
  Worker `pala-celik-muhendislik` (her `main` gönderiminde ve panelden yayında derlenir),
  www → kök yönlendirme kuralı, Always Use HTTPS
- Kod: bu depo (GitHub, gizli). Haftalık içerik yedekleri: bu deponun Releases bölümü
