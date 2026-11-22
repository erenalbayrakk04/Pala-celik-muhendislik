// Betiklerin paylaştığı zengin metin yardımcıları ve uzun metinler (KVKK).
// ilk-icerik.ts ve yasal-guncelleme.ts buradan kullanır.

// ---------- Zengin metin yardımcıları ----------
let anahtarSayaci = 0
const anahtar = () => `k${Date.now().toString(36)}${(anahtarSayaci++).toString(36)}`

export const blok = (metin: string, ek: Record<string, unknown> = {}) => ({
  _type: 'block',
  _key: anahtar(),
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: anahtar(), text: metin, marks: []}],
  ...ek,
})
export const p = (metin: string) => blok(metin)
export const h2 = (metin: string) => blok(metin, {style: 'h2'})
export const madde = (metin: string) => blok(metin, {listItem: 'bullet', level: 1})

// ---------- KVKK Aydınlatma Metni ve Çerez Politikası ----------
// 6698 sayılı KVKK m.10 ve Aydınlatma Yükümlülüğü Tebliği'ndeki başlıklara göre hazırlandı:
// veri sorumlusu, işleme amacı, aktarım (yurt dışı dahil), toplama yöntemi ve hukuki sebep, haklar.
// Taslaktır; yayın öncesi bir hukukçuya gösterilmesi önerilir.
export const KVKK_GUNCELLEME = '22 Kasım 2026'

export const kvkkIcerigi = () => [
  p(
    '6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla Pala Çelik & Mühendislik (Fatih Şahin) olarak kişisel verilerinizi aşağıda açıklanan şekilde işliyoruz.',
  ),
  h2('Hangi verileri, hangi yolla topluyoruz?'),
  p('Bu web sitesinde form bulunmaz ve sitemiz çerez kullanmaz. Kişisel verileriniz yalnızca şu yollarla elde edilir:'),
  madde(
    'Bizimle telefon, WhatsApp veya e-posta yoluyla iletişime geçtiğinizde paylaştığınız ad-soyad, telefon numarası, e-posta adresi, adres ve talebinize ilişkin bilgiler (ölçü, fotoğraf, proje bilgisi gibi).',
  ),
  madde(
    'Siteyi ziyaret ettiğinizde, sitenin barındırıldığı altyapı tarafından teknik olarak zorunlu şekilde işlenen IP adresi, tarayıcı bilgisi ve ziyaret edilen sayfa gibi kayıtlar. Ziyaretçi sayısını ve sayfa hızını ölçmek için çerez kullanmayan ve kişiyi tanımlamayan bir istatistik hizmeti (Cloudflare Web Analytics) kullanılır.',
  ),
  h2('Hangi amaçla işliyoruz?'),
  p(
    'Talebinize dönüş yapmak, teklif hazırlamak, keşif ve iş planlaması yapmak, sözleşme kurmak ve yürütmek, sitenin güvenli ve düzgün çalışmasını sağlamak ve yasal yükümlülüklerimizi yerine getirmek amacıyla işliyoruz.',
  ),
  h2('Hukuki sebep'),
  p(
    "Verileriniz KVKK'nın 5. maddesinde yer alan; bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, hukuki yükümlülüğümüzü yerine getirebilmemiz ve temel hak ve özgürlüklerinize zarar vermemek kaydıyla meşru menfaatimiz için zorunlu olması sebeplerine dayanılarak işlenir.",
  ),
  h2('Kimlere aktarılır?'),
  p(
    'Verileriniz yalnızca yukarıdaki amaçlar için ve gerektiği ölçüde; yasal zorunluluk hâlinde yetkili kamu kurumlarıyla, işin yürütülmesi için gerekli olduğunda iş ortaklarımız ve tedarikçilerimizle paylaşılabilir.',
  ),
  p(
    "Web sitemiz Cloudflare, Inc. altyapısında barındırılır. WhatsApp üzerinden yazdığınızda mesajlarınız WhatsApp (Meta) altyapısı üzerinden iletilir. Bu hizmet sağlayıcıların sunucuları yurt dışında bulunabileceğinden, bu durumlarda verileriniz KVKK'nın 9. maddesi çerçevesinde yurt dışına aktarılmış olur.",
  ),
  h2('Çerezler'),
  p(
    'Sitemiz çerez (cookie) kullanmaz ve tarayıcınızda bilgi saklamaz. İletişim sayfasındaki harita, siz "Haritayı göster" düğmesine basmadıkça yüklenmez. Bastığınızda harita Google Haritalar\'dan yüklenir ve Google kendi çerezlerini kullanabilir; bu konuda Google\'ın gizlilik politikası (policies.google.com/privacy) geçerlidir. Instagram ve WhatsApp bağlantıları yalnızca tıkladığınızda ilgili hizmeti açar.',
  ),
  h2('Haklarınız'),
  p(
    "KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini, silinmesini veya yok edilmesini isteme, bu işlemlerin aktarıldığı kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
  ),
  p(
    'Başvurularınızı, kimliğinizi tespit etmeye yarayan bilgilerle birlikte info@palacelikmuhendislik.com adresine e-posta ile veya Huzur Mah. Ulubaş Cad. Ulubaş Pasajı No: 11 Kat: 1 Daire: 40 Sarıyer / İstanbul adresine yazılı olarak iletebilirsiniz. Başvurunuz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.',
  ),
  p(`Son güncelleme: ${KVKK_GUNCELLEME}`),
]

// ---------- Hizmet metinlerinde düzeltmeler ----------
// "Deprem yükleri karşısında avantajlıdır" kanıt gerektiren bir iddia (Reklam Kurulu aldatıcı reklam riski);
// ölçülebilir bir ifadeyle değiştirildi.
export const CELIK_EV_ESKI = 'Hafif oldukları için deprem yükleri karşısında avantajlıdır;'
export const CELIK_EV_YENI = 'Hafif oldukları için binaya ve zemine daha az yük bindirir;'
