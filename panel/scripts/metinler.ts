// Betiklerin paylaştığı zengin metin yardımcıları ve uzun metinler (KVKK).
// ilk-icerik.ts, yasal-guncelleme.ts ve kvkk-guncelle.ts buradan kullanır.

// ---------- Zengin metin yardımcıları ----------
let anahtarSayaci = 0
const anahtar = () => `k${Date.now().toString(36)}${(anahtarSayaci++).toString(36)}`

// Bir satırın parçaları: düz yazı, kalın yazı ya da bağlantı
type Parca = string | {kalin: string} | {link: string; metin: string}

export const satir = (parcalar: Parca[], ek: Record<string, unknown> = {}) => {
  const markDefs: {_key: string; _type: 'link'; href: string}[] = []
  const children = parcalar.map((parca) => {
    if (typeof parca === 'string') return {_type: 'span', _key: anahtar(), text: parca, marks: []}
    if ('kalin' in parca) return {_type: 'span', _key: anahtar(), text: parca.kalin, marks: ['strong']}
    const linkAnahtari = anahtar()
    markDefs.push({_key: linkAnahtari, _type: 'link', href: parca.link})
    return {_type: 'span', _key: anahtar(), text: parca.metin, marks: [linkAnahtari]}
  })
  return {_type: 'block', _key: anahtar(), style: 'normal', markDefs, children, ...ek}
}

export const blok = (metin: string, ek: Record<string, unknown> = {}) => satir([metin], ek)
export const p = (metin: string | Parca[]) => satir(typeof metin === 'string' ? [metin] : metin)
export const h2 = (metin: string) => blok(metin, {style: 'h2'})
export const madde = (metin: string | Parca[]) =>
  satir(typeof metin === 'string' ? [metin] : metin, {listItem: 'bullet', level: 1})

// ---------- KVKK Aydınlatma Metni ve Çerez Politikası ----------
// 6698 sayılı KVKK m.10, Aydınlatma Yükümlülüğü Tebliği, Veri Sorumlusuna Başvuru Tebliği m.5,
// yeni m.9 (7499 sayılı Kanun) ve Kurul'un 2026/347 sayılı İlke Kararı'na göre hazırlandı:
// her işleme faaliyeti kendi hukuki sebebiyle eşleştirildi, yurt dışı aktarımlar kesin dille yazıldı.
// Dayandığı gerçekler (22 Kasım 2026, abiden): mali müşavir yok, ödemeler havale/EFT ile alınıyor, çalışan yok,
// normal WhatsApp kullanılıyor, e-posta Gmail'de kalıyor. Bunlar değişirse metin de güncellenmeli.
export const KVKK_BASLIK = 'KVKK Aydınlatma Metni ve Çerez Politikası'
export const KVKK_GUNCELLEME = '22 Kasım 2026'

const EPOSTA = 'info@palacelikmuhendislik.com'
const ADRES = 'Huzur Mah. Ulubaş Cad. Ulubaş Pasajı No: 11 Kat: 1 Daire: 40 Sarıyer / İstanbul'
const epostaLinki = {link: `mailto:${EPOSTA}`, metin: EPOSTA}

export const kvkkIcerigi = () => [
  p(
    '6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verilerinizi nasıl işlediğimizi aşağıda açıklıyoruz. Pala Çelik & Mühendislik, Fatih Şahin\'e ait bir şahıs işletmesidir; veri sorumlusu Fatih Şahin\'dir.',
  ),
  p([
    {kalin: 'Veri sorumlusu: '},
    'Fatih Şahin (Pala Çelik & Mühendislik)\n',
    {kalin: 'Adres: '},
    `${ADRES}\n`,
    {kalin: 'E-posta: '},
    epostaLinki,
    '\n',
    {kalin: 'Telefon: '},
    {link: 'tel:+905444854216', metin: '0544 485 42 16'},
  ]),

  h2('Hangi kişisel verileri işliyoruz?'),
  madde([{kalin: 'Kimlik ve iletişim: '}, 'ad-soyad, telefon numarası, e-posta adresi ve adres.']),
  madde([{kalin: 'Talep ve iş bilgileri: '}, 'işin yapılacağı adres, ölçüler, fotoğraflar ve yazışmalar.']),
  madde([
    {kalin: 'Ödeme bilgileri: '},
    'ödeme kayıtları (havale veya EFT ile ödediğinizde gönderen bilgileri dahil); fatura düzenlenmesi gerektiğinde T.C. kimlik numarası veya vergi numarası.',
  ]),
  madde([
    {kalin: 'Site ziyaret kayıtları: '},
    'IP adresi, tarayıcı ve cihaz bilgisi, ziyaret edilen sayfa ve ziyaret zamanı.',
  ]),
  p(
    'Sağlık bilgisi veya din gibi özel nitelikli kişisel verileri işlemiyoruz. Bu nedenle lütfen kimlik kartınızın fotoğrafını göndermeyin; fatura için gerekirse yalnızca kimlik numaranızı isteriz.',
  ),

  h2('Verilerinizi nasıl topluyoruz?'),
  p(
    'Bu sitede form bulunmaz ve site üzerinden ödeme alınmaz; ödemeler elden veya banka aracılığıyla yapılır. Verilerinizi; bizi telefonla aradığınızda, WhatsApp, Instagram veya e-posta ile yazdığınızda ya da yüz yüze görüştüğümüzde sözlü, yazılı veya elektronik olarak sizden alırız. İşi sizin adınıza takip eden biri (örneğin ustanız veya müteahhidiniz) bilgilerinizi bize iletebilir. Site ziyaret kayıtları ise siteyi açtığınızda barındırma altyapısı tarafından otomatik olarak oluşturulur.',
  ),

  h2('Hangi amaçla ve hangi hukuki sebeple işliyoruz?'),
  madde([
    {kalin: 'Teklif ve keşif: '},
    'talebinize dönüş yapmak, ölçü ve keşif için görüşmek ve teklif hazırlamak için kimlik, iletişim ve talep bilgilerinizi; bir sözleşmenin kurulmasıyla doğrudan ilgili olması hukuki sebebine dayanarak işleriz (KVKK m.5/2-c).',
  ]),
  madde([
    {kalin: 'İşin yapılması: '},
    'imalat, teslimat ve montajı planlamak, işi teslim etmek ve ödemeyi almak için kimlik, iletişim, iş ve ödeme bilgilerinizi; sözleşmenin ifası hukuki sebebine dayanarak işleriz (m.5/2-c).',
  ]),
  madde([
    {kalin: 'Fatura ve vergi kayıtları: '},
    "fatura düzenlemek ve kayıtları saklamak için kimlik, iletişim ve ödeme bilgilerinizi; 213 sayılı Vergi Usul Kanunu'ndan doğan hukuki yükümlülüğümüze dayanarak işleriz (m.5/2-ç).",
  ]),
  madde([
    {kalin: 'Hakkımızın korunması: '},
    'teslim ettiğimiz işle ilgili olası ayıp, garanti veya ödeme uyuşmazlıklarında kendimizi savunabilmek için işe ait yazışma, fotoğraf ve kayıtları; bir hakkın tesisi, kullanılması veya korunması için zorunlu olması hukuki sebebine dayanarak saklarız (m.5/2-e).',
  ]),
  madde([
    {kalin: 'Sitenin çalışması ve güvenliği: '},
    'sitenin size ulaştırılması ve saldırılara karşı korunması için site ziyaret kayıtlarını; temel hak ve özgürlüklerinize zarar vermemek kaydıyla meşru menfaatimiz için zorunlu olması hukuki sebebine dayanarak işleriz (m.5/2-f).',
  ]),

  h2('Kimlere aktarıyoruz?'),
  madde([
    {kalin: 'Yetkili kamu kurumları '},
    '(örneğin vergi dairesi ve mahkemeler): kanunen talep edildiğinde, hukuki yükümlülüğümüz gereği.',
  ]),
  madde([{kalin: 'Bankalar: '}, 'ödemenin yapılması veya iadesi için.']),
  madde([
    {kalin: 'Birlikte çalıştığımız nakliye ve montaj ekipleri: '},
    'yalnızca işin yapılabilmesi için gerekli olduğunda; adınız, telefonunuz ve işin adresi.',
  ]),
  madde([
    {kalin: 'Hizmet sağlayıcılar: '},
    'sitenin barındırılması, e-posta ve mesajlaşma için kullandığımız, aşağıda adı geçen şirketler.',
  ]),

  h2('Yurt dışına aktarım'),
  p(
    'Aşağıdaki hizmetlerin sunucuları yurt dışında bulunduğundan, bu hizmetler üzerinden işlenen verileriniz yurt dışına aktarılır:',
  ),
  madde([
    {kalin: 'Cloudflare: '},
    'sitemiz Cloudflare altyapısında barındırılır; siteyi ziyaret ettiğinizde ziyaret kayıtlarınızı Cloudflare işler.',
  ]),
  madde([
    {kalin: 'Google (Gmail): '},
    epostaLinki,
    ' adresine gönderdiğiniz e-postalar Gmail hizmetinde saklanır.',
  ]),
  madde([
    {kalin: 'Meta (WhatsApp ve Instagram): '},
    'WhatsApp veya Instagram üzerinden yazdığınız mesajlar bu hizmetler üzerinden iletilir. WhatsApp mesajlarının içeriği uçtan uca şifrelidir; telefon numaranız gibi hesap bilgileriniz ise WhatsApp tarafından işlenir.',
  ]),
  p(
    'Verilerinizin yurt dışına aktarılmadan bize ulaşmasını isterseniz bizi telefonla arayabilir veya adresimize yazılı olarak başvurabilirsiniz.',
  ),

  h2('Ne kadar süre saklıyoruz?'),
  madde([{kalin: 'İşe dönüşmeyen talepler: '}, 'talebin sonuçlanmasından itibaren 2 yıl.']),
  madde([
    {kalin: 'İşe dönüşen taleplere ait kayıtlar '},
    '(yazışma, ölçü, fotoğraf, fatura ve ödeme bilgileri): vergi mevzuatı ve olası uyuşmazlıklar nedeniyle işin tesliminden itibaren 10 yıl.',
  ]),
  madde([
    {kalin: 'Site ziyaret kayıtları: '},
    'tarafımızca tutulmaz; Cloudflare tarafından kendi gizlilik politikası çerçevesinde tutulur.',
  ]),
  p('Süresi dolan veriler silinir veya anonim hâle getirilir.'),

  h2('Çerezler'),
  p(
    'Sitemizin kendine ait çerezi yoktur; sitemiz tarayıcınızda bilgi saklamaz ve reklam ya da kişiyi izleme amaçlı araç kullanmaz. Yalnızca olağan dışı trafik veya saldırı şüphesinde Cloudflare, ziyaretçinin insan olduğunu doğrulamak için zorunlu bir güvenlik çerezi (cf_clearance) yerleştirebilir.',
  ),
  p([
    'İletişim sayfasındaki harita, siz "Haritayı göster" düğmesine basmadıkça yüklenmez. Bastığınızda harita Google Haritalar\'dan yüklenir ve Google kendi çerezlerini kullanabilir; bu konuda ',
    {link: 'https://policies.google.com/privacy', metin: "Google'ın gizlilik politikası"},
    ' geçerlidir. Instagram ve WhatsApp bağlantıları yalnızca tıkladığınızda ilgili hizmeti açar.',
  ]),

  h2('Haklarınız'),
  p("KVKK'nın 11. maddesi uyarınca şu haklara sahipsiniz:"),
  madde('Kişisel verilerinizin işlenip işlenmediğini öğrenme,'),
  madde('İşlenmişse buna ilişkin bilgi talep etme,'),
  madde('İşlenme amacını ve verilerinizin amacına uygun kullanılıp kullanılmadığını öğrenme,'),
  madde('Yurt içinde veya yurt dışında verilerinizin aktarıldığı üçüncü kişileri bilme,'),
  madde('Eksik veya yanlış işlenmişse düzeltilmesini isteme,'),
  madde("KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,"),
  madde('Düzeltme, silme veya yok etme işlemlerinin, verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,'),
  madde(
    'İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme,',
  ),
  madde('Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.'),

  h2('Nasıl başvurabilirsiniz?'),
  p(
    'Başvurunuzda; adınız ve soyadınız, yazılı başvurularda imzanız, T.C. kimlik numaranız (yabancılar için uyruk ve pasaport veya kimlik numarası), tebligata esas yerleşim yeri veya iş yeri adresiniz, varsa e-posta adresiniz ve telefon numaranız ile talebinizin konusu bulunmalıdır. Başvurunuzu şu yollarla iletebilirsiniz:',
  ),
  madde([{kalin: 'Yazılı olarak: '}, `${ADRES} adresine elden, postayla veya noter aracılığıyla.`]),
  madde([
    {kalin: 'E-posta ile: '},
    'güvenli elektronik imza veya mobil imza ile imzalayarak ya da daha önce bize bildirdiğiniz ve kayıtlarımızda bulunan e-posta adresinizden ',
    epostaLinki,
    ' adresine.',
  ]),
  p(
    "Başvurunuz, talebin niteliğine göre en geç 30 gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu'nca belirlenen tarifedeki ücret alınabilir.",
  ),
  p(
    "Başvurunuzun reddedilmesi, verilen cevabı yetersiz bulmanız veya süresinde cevap verilmemesi hâlinde; cevabı öğrendiğiniz tarihten itibaren 30 gün ve her hâlde başvuru tarihinden itibaren 60 gün içinde Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz.",
  ),
  p(`Son güncelleme: ${KVKK_GUNCELLEME}`),
]

// ---------- Hizmet metinlerinde düzeltmeler ----------
// "Deprem yükleri karşısında avantajlıdır" kanıt gerektiren bir iddia (Reklam Kurulu aldatıcı reklam riski);
// ölçülebilir bir ifadeyle değiştirildi.
export const CELIK_EV_ESKI = 'Hafif oldukları için deprem yükleri karşısında avantajlıdır;'
export const CELIK_EV_YENI = 'Hafif oldukları için binaya ve zemine daha az yük bindirir;'
