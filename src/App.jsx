import { useState } from "react";

const PALETTE = {
  linen: "#F5EFE6",
  taupe: "#C4A882",
  sage: "#8FAF8A",
  blush: "#E8C4B8",
  mocha: "#5C4033",
  white: "#FAF9F7",
  taupeLight: "#EDE0CE",
  sageLight: "#D4E8D0",
  text: "#3A2E28",
  muted: "#8B7E74",
};

const S = {
  app: {
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    background: PALETTE.white,
    minHeight: "100vh",
    maxWidth: 430,
    margin: "0 auto",
    position: "relative",
    paddingBottom: 80,
  },
  screen: { padding: "0 0 16px" },
};

// ── DATA ──────────────────────────────────────────────────────────────────────

const MEMBERS = [
  { id: 1, ad: "Selin Kaya", isim: "SK", isletme: "Çiçek Atölyesi", sehir: "Londra", rozet: "Pro", bio: "El yapımı çiçek tasarımları ve atölyeler." },
  { id: 2, ad: "Melis Demir", isim: "MD", isletme: "Bebek Fotoğrafçılığı", sehir: "Berlin", rozet: "Yaratıcı", bio: "Doğal ışık ile bebek portreleri." },
  { id: 3, ad: "Ayşe Yılmaz", isim: "AY", isletme: "Online Muhasebe", sehir: "Amsterdam", rozet: "Kaşif", bio: "KOBİ'lere uzaktan mali danışmanlık." },
  { id: 4, ad: "Zeynep Arslan", isim: "ZA", isletme: "Çocuk Giyim", sehir: "İstanbul", rozet: "Pro", bio: "Organik kumaşlardan el yapımı çocuk kıyafetleri." },
  { id: 5, ad: "Hande Şahin", isim: "HŞ", isletme: "Dijital Pazarlama", sehir: "Londra", rozet: "Yaratıcı", bio: "Küçük işletmeler için sosyal medya stratejisi." },
  { id: 6, ad: "Naz Çelik", isim: "NÇ", isletme: "Yoga Stüdyosu", sehir: "Paris", rozet: "Kaşif", bio: "Anne-bebek yoga sınıfları ve meditasyon." },
];

const POSTS = [
  { id: 1, yazar: "Selin Kaya", isim: "SK", zaman: "2 saat önce", baslik: "İlk müşterime nasıl ulaştım?", icerik: "Sıfırdan başladığımda en büyük korkum müşteri bulmaktı. Ama doğru ağ kurarak ilk 3 ayda 20 düzenli müşteriye ulaştım. Deneyimlerimi paylaşmak istiyorum...", begeni: 24, yorum: 8, kategori: "Networking" },
  { id: 2, yazar: "Melis Demir", isim: "MD", zaman: "5 saat önce", baslik: "Bebek uyurken iş yapmak mümkün mü?", icerik: "Yeni doğanla evde çalışmak kaotik görünüyor ama zaman yönetimiyle aslında çok verimli olabiliyorsunuz. Benim sistemim şöyle...", begeni: 41, yorum: 15, kategori: "İş-Yaşam Dengesi" },
  { id: 3, yazar: "Zeynep Arslan", isim: "ZA", zaman: "1 gün önce", baslik: "Shopify vs Etsy — hangisi daha iyi?", icerik: "2 yıldır her ikisini de kullanan biri olarak artıları ve eksileri paylaşıyorum. El emeği ürünler satıyorsanız bu karşılaştırma işinize yarayacak.", begeni: 37, yorum: 22, kategori: "İş Tavsiyeleri" },
];

const ETKINLIKLER = [
  { id: 1, baslik: "Sabah Kahvesi & Networking", tarih: "26 Haziran 2026", gun: "Per", saat: "09:30", yer: "Olea Social, Londra", tip: "Yüz Yüze", renk: PALETTE.taupe, katilimci: 18 },
  { id: 2, baslik: "Finansal Okuryazarlık Atölyesi", tarih: "3 Temmuz 2026", gun: "Cum", saat: "19:00", yer: "Zoom", tip: "Online", renk: PALETTE.sage, katilimci: 34 },
  { id: 3, baslik: "Marka Kimliği Masterclass", tarih: "10 Temmuz 2026", gun: "Per", saat: "10:00", yer: "Zoom", tip: "Online", renk: PALETTE.blush, katilimci: 27 },
  { id: 4, baslik: "Yaz Buluşması — Picnic", tarih: "19 Temmuz 2026", gun: "Paz", saat: "12:00", yer: "Regent's Park, Londra", tip: "Yüz Yüze", renk: PALETTE.taupeLight, katilimci: 52 },
];

const KAYNAKLAR = [
  { id: 1, baslik: "İşletme Planı Şablonu", aciklama: "Sıfırdan iş planı hazırlamak için adım adım rehber", kategori: "Şablonlar", ikon: "📄", renk: PALETTE.sageLight },
  { id: 2, baslik: "Sosyal Medya Takvimi", aciklama: "30 günlük içerik planı ve hazır görseller", kategori: "Pazarlama", ikon: "📅", renk: PALETTE.taupeLight },
  { id: 3, baslik: "Start-Up Loans Rehberi", aciklama: "İngiltere'de girişimci anneye özel hibe ve kredi kaynakları", kategori: "Finansman", ikon: "💷", renk: PALETTE.blush },
  { id: 4, baslik: "Fiyatlandırma Stratejisi", aciklama: "Ürün ve hizmetinizi nasıl fiyatlandırırsınız?", kategori: "Finans", ikon: "📊", renk: PALETTE.sageLight },
  { id: 5, baslik: "E-ticaret Başlangıç Kılavuzu", aciklama: "Shopify, Etsy ve kendi sitenizi kurma karşılaştırması", kategori: "E-ticaret", ikon: "🛍️", renk: PALETTE.taupeLight },
  { id: 6, baslik: "Çalışma Rutini & Verimlilik", aciklama: "Çocukla evde çalışırken odaklanma teknikleri", kategori: "Verimlilik", ikon: "⏱️", renk: PALETTE.blush },
];

// ── COMPONENTS ─────────────────────────────────────────────────────────────────

function Avatar({ isim, size = 36, bg = PALETTE.taupe, color = PALETTE.white }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color, display: "flex",
      alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 500, flexShrink: 0,
    }}>
      {isim}
    </div>
  );
}

function Rozet({ tip }) {
  const renkler = { Pro: { bg: PALETTE.mocha, text: "#EDE0CE" }, Yaratıcı: { bg: PALETTE.taupe, text: PALETTE.white }, Kaşif: { bg: PALETTE.sage, text: PALETTE.white } };
  const r = renkler[tip] || renkler["Kaşif"];
  return (
    <span style={{ background: r.bg, color: r.text, fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 20, letterSpacing: 0.3 }}>
      {tip}
    </span>
  );
}

// ── SCREENS ───────────────────────────────────────────────────────────────────

function Onboarding({ onBitir }) {
  const [adim, setAdim] = useState(0);
  const adimlar = [
    {
      ikon: "🌱",
      baslik: "Hoş Geldin",
      alt: "Girişimci Anneler Kulübü'ne",
      aciklama: "Avrupa ve Türkiye'deki girişimci annelerin bir araya geldiği, büyüdüğü ve birbirini desteklediği topluluk.",
    },
    {
      ikon: "🤝",
      baslik: "Bağlan & Büyü",
      alt: "Seninle aynı yolda olan annelerle tanış",
      aciklama: "Etkinliklere katıl, kaynaklara ulaş, deneyimlerini paylaş. Yalnız değilsin.",
    },
    {
      ikon: "✨",
      baslik: "Başlamaya Hazır mısın?",
      alt: "Birlikte büyüyoruz.",
      aciklama: "Topluluğumuz şu an 1.000'den fazla girişimci anneyi barındırıyor. Sen de aramıza katıl.",
    },
  ];
  const a = adimlar[adim];
  return (
    <div style={{ minHeight: "100vh", background: PALETTE.linen, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>{a.ikon}</div>
      <p style={{ fontSize: 12, letterSpacing: 3, color: PALETTE.muted, marginBottom: 8, textTransform: "uppercase" }}>KULÜP</p>
      <h1 style={{ fontSize: 28, fontFamily: "Georgia, serif", color: PALETTE.mocha, textAlign: "center", margin: "0 0 8px", fontWeight: 400 }}>{a.baslik}</h1>
      <p style={{ fontSize: 16, color: PALETTE.taupe, textAlign: "center", margin: "0 0 16px", fontFamily: "Georgia, serif", fontStyle: "italic" }}>{a.alt}</p>
      <p style={{ fontSize: 14, color: PALETTE.muted, textAlign: "center", lineHeight: 1.7, margin: "0 0 40px", maxWidth: 300 }}>{a.aciklama}</p>
      <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
        {adimlar.map((_, i) => (
          <div key={i} style={{ width: i === adim ? 20 : 6, height: 6, borderRadius: 3, background: i === adim ? PALETTE.taupe : PALETTE.taupeLight, transition: "width 0.3s" }} />
        ))}
      </div>
      <button
        onClick={() => adim < adimlar.length - 1 ? setAdim(adim + 1) : onBitir()}
        style={{ background: PALETTE.mocha, color: PALETTE.white, border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
      >
        {adim < adimlar.length - 1 ? "Devam" : "Keşfet →"}
      </button>
      {adim < adimlar.length - 1 && (
        <button onClick={onBitir} style={{ background: "none", border: "none", color: PALETTE.muted, fontSize: 13, marginTop: 16, cursor: "pointer", fontFamily: "inherit" }}>Geç</button>
      )}
    </div>
  );
}

function AnaSayfa() {
  return (
    <div style={S.screen}>
      {/* Header */}
      <div style={{ background: PALETTE.linen, padding: "24px 20px 20px" }}>
        <p style={{ fontSize: 12, letterSpacing: 2, color: PALETTE.muted, margin: "0 0 4px", textTransform: "uppercase" }}>Girişimci Anneler Kulübü</p>
        <h1 style={{ fontSize: 22, fontFamily: "Georgia, serif", color: PALETTE.mocha, margin: "0 0 4px", fontWeight: 400 }}>Merhaba, Eda 👋</h1>
        <p style={{ fontSize: 14, color: PALETTE.muted, margin: 0, fontStyle: "italic" }}>Birlikte büyüyoruz.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "16px 20px 0" }}>
        {[["1.000+", "Üye"], ["12", "Şehir"], ["4", "Etkinlik"], ].map(([n, l]) => (
          <div key={l} style={{ background: PALETTE.white, border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
            <p style={{ fontSize: 20, fontWeight: 600, color: PALETTE.mocha, margin: 0, fontFamily: "Georgia, serif" }}>{n}</p>
            <p style={{ fontSize: 11, color: PALETTE.muted, margin: "2px 0 0" }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Yaklaşan Etkinlik */}
      <div style={{ padding: "20px 20px 0" }}>
        <p style={{ fontSize: 11, letterSpacing: 2, color: PALETTE.muted, margin: "0 0 10px", textTransform: "uppercase" }}>Yaklaşan Etkinlik</p>
        <div style={{ background: PALETTE.mocha, borderRadius: 14, padding: 18, color: PALETTE.white }}>
          <span style={{ fontSize: 11, background: "rgba(255,255,255,0.2)", padding: "3px 10px", borderRadius: 20 }}>Yüz Yüze</span>
          <p style={{ fontSize: 17, fontFamily: "Georgia, serif", fontWeight: 400, margin: "10px 0 4px" }}>Sabah Kahvesi & Networking</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: "0 0 12px" }}>26 Haziran · 09:30 · Olea Social, Londra</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "0 0 14px" }}>18 katılımcı kayıt oldu</p>
          <button style={{ background: PALETTE.taupe, color: PALETTE.white, border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
            Katıl →
          </button>
        </div>
      </div>

      {/* Son Paylaşımlar */}
      <div style={{ padding: "20px 20px 0" }}>
        <p style={{ fontSize: 11, letterSpacing: 2, color: PALETTE.muted, margin: "0 0 10px", textTransform: "uppercase" }}>Topluluktan</p>
        {POSTS.slice(0, 2).map(p => (
          <div key={p.id} style={{ background: PALETTE.white, border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Avatar isim={p.isim} size={32} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: PALETTE.mocha, margin: 0 }}>{p.yazar}</p>
                <p style={{ fontSize: 11, color: PALETTE.muted, margin: 0 }}>{p.zaman}</p>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 11, background: PALETTE.sageLight, color: PALETTE.mocha, padding: "2px 8px", borderRadius: 20 }}>{p.kategori}</span>
            </div>
            <p style={{ fontSize: 14, fontWeight: 500, color: PALETTE.mocha, margin: "0 0 4px" }}>{p.baslik}</p>
            <p style={{ fontSize: 13, color: PALETTE.muted, margin: "0 0 10px", lineHeight: 1.5 }}>{p.icerik.slice(0, 90)}...</p>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ fontSize: 12, color: PALETTE.muted }}>♥ {p.begeni}</span>
              <span style={{ fontSize: 12, color: PALETTE.muted }}>💬 {p.yorum}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Topluluk() {
  const [aktifTab, setAktifTab] = useState("forum");
  const [yeniGonderi, setYeniGonderi] = useState(false);
  const [gonderiMetni, setGonderiMetni] = useState("");

  return (
    <div style={S.screen}>
      <div style={{ background: PALETTE.linen, padding: "24px 20px 0" }}>
        <h2 style={{ fontSize: 20, fontFamily: "Georgia, serif", color: PALETTE.mocha, margin: "0 0 16px", fontWeight: 400 }}>Topluluk</h2>
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${PALETTE.taupeLight}` }}>
          {["forum", "üyeler"].map(t => (
            <button key={t} onClick={() => setAktifTab(t)} style={{
              background: "none", border: "none", padding: "10px 20px", fontSize: 14,
              color: aktifTab === t ? PALETTE.mocha : PALETTE.muted,
              borderBottom: aktifTab === t ? `2px solid ${PALETTE.taupe}` : "2px solid transparent",
              cursor: "pointer", fontFamily: "inherit", fontWeight: aktifTab === t ? 500 : 400,
              textTransform: "capitalize",
            }}>
              {t === "forum" ? "Forum" : "Üyeler"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        {aktifTab === "forum" ? (
          <>
            {/* Yeni gönderi */}
            {!yeniGonderi ? (
              <button onClick={() => setYeniGonderi(true)} style={{
                width: "100%", background: PALETTE.white, border: `0.5px solid ${PALETTE.taupeLight}`,
                borderRadius: 12, padding: "13px 16px", textAlign: "left", fontSize: 14, color: PALETTE.muted,
                cursor: "pointer", marginBottom: 16, fontFamily: "inherit",
              }}>
                Topluluğa bir şeyler paylaş...
              </button>
            ) : (
              <div style={{ background: PALETTE.white, border: `0.5px solid ${PALETTE.taupe}`, borderRadius: 12, padding: 14, marginBottom: 16 }}>
                <textarea
                  value={gonderiMetni}
                  onChange={e => setGonderiMetni(e.target.value)}
                  placeholder="Deneyimini, sorunlu, tavsiyeni paylaş..."
                  style={{
                    width: "100%", minHeight: 80, border: "none", outline: "none", resize: "none",
                    fontFamily: "inherit", fontSize: 14, color: PALETTE.mocha, background: "transparent",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button onClick={() => setYeniGonderi(false)} style={{ background: "none", border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 8, padding: "7px 14px", fontSize: 13, color: PALETTE.muted, cursor: "pointer", fontFamily: "inherit" }}>İptal</button>
                  <button onClick={() => setYeniGonderi(false)} style={{ background: PALETTE.mocha, border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, color: PALETTE.white, cursor: "pointer", fontFamily: "inherit" }}>Paylaş</button>
                </div>
              </div>
            )}
            {POSTS.map(p => (
              <div key={p.id} style={{ background: PALETTE.white, border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Avatar isim={p.isim} size={34} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: PALETTE.mocha, margin: 0 }}>{p.yazar}</p>
                    <p style={{ fontSize: 11, color: PALETTE.muted, margin: 0 }}>{p.zaman}</p>
                  </div>
                  <span style={{ fontSize: 11, background: PALETTE.sageLight, color: PALETTE.mocha, padding: "2px 8px", borderRadius: 20 }}>{p.kategori}</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: PALETTE.mocha, margin: "0 0 6px" }}>{p.baslik}</p>
                <p style={{ fontSize: 13, color: PALETTE.muted, margin: "0 0 12px", lineHeight: 1.6 }}>{p.icerik}</p>
                <div style={{ display: "flex", gap: 16, borderTop: `0.5px solid ${PALETTE.taupeLight}`, paddingTop: 10 }}>
                  <button style={{ background: "none", border: "none", fontSize: 13, color: PALETTE.muted, cursor: "pointer", fontFamily: "inherit" }}>♥ {p.begeni} Beğen</button>
                  <button style={{ background: "none", border: "none", fontSize: 13, color: PALETTE.muted, cursor: "pointer", fontFamily: "inherit" }}>💬 {p.yorum} Yorum</button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <input placeholder="Üye veya işletme ara..." style={{
                width: "100%", padding: "10px 16px", borderRadius: 10, border: `0.5px solid ${PALETTE.taupeLight}`,
                fontSize: 14, color: PALETTE.mocha, background: PALETTE.white, boxSizing: "border-box", fontFamily: "inherit",
              }} />
            </div>
            {MEMBERS.map(m => (
              <div key={m.id} style={{ background: PALETTE.white, border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 12, padding: 14, marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <Avatar isim={m.isim} size={42} bg={PALETTE.taupe} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: PALETTE.mocha, margin: 0 }}>{m.ad}</p>
                    <Rozet tip={m.rozet} />
                  </div>
                  <p style={{ fontSize: 12, color: PALETTE.taupe, margin: "0 0 3px", fontWeight: 500 }}>{m.isletme} · {m.sehir}</p>
                  <p style={{ fontSize: 12, color: PALETTE.muted, margin: 0, lineHeight: 1.5 }}>{m.bio}</p>
                </div>
                <button style={{ background: PALETTE.linen, border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: PALETTE.mocha, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>Bağlan</button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function Etkinlikler() {
  return (
    <div style={S.screen}>
      <div style={{ background: PALETTE.linen, padding: "24px 20px 20px" }}>
        <h2 style={{ fontSize: 20, fontFamily: "Georgia, serif", color: PALETTE.mocha, margin: "0 0 4px", fontWeight: 400 }}>Etkinlikler</h2>
        <p style={{ fontSize: 13, color: PALETTE.muted, margin: 0 }}>Atölye, networking ve buluşmalar</p>
      </div>
      <div style={{ padding: "16px 20px 0" }}>
        {ETKINLIKLER.map(e => (
          <div key={e.id} style={{ background: PALETTE.white, border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 14, padding: "0", marginBottom: 12, overflow: "hidden" }}>
            <div style={{ background: e.renk, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: 11, background: "rgba(255,255,255,0.5)", color: PALETTE.mocha, padding: "2px 8px", borderRadius: 20 }}>{e.tip}</span>
                  <p style={{ fontSize: 17, fontFamily: "Georgia, serif", color: PALETTE.mocha, margin: "8px 0 0", fontWeight: 400 }}>{e.baslik}</p>
                </div>
                <div style={{ textAlign: "center", background: "rgba(255,255,255,0.6)", borderRadius: 8, padding: "6px 10px", minWidth: 40 }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: PALETTE.mocha, margin: 0 }}>{e.tarih.split(" ")[0]}</p>
                  <p style={{ fontSize: 10, color: PALETTE.muted, margin: 0 }}>{e.tarih.split(" ")[1]}</p>
                </div>
              </div>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 13, color: PALETTE.mocha, margin: "0 0 2px" }}>🕐 {e.saat} · {e.yer}</p>
                <p style={{ fontSize: 12, color: PALETTE.muted, margin: 0 }}>{e.katilimci} kişi katılıyor</p>
              </div>
              <button style={{ background: PALETTE.mocha, color: PALETTE.white, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
                Katıl
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kaynaklar() {
  const kategoriler = ["Tümü", "Şablonlar", "Pazarlama", "Finansman", "Finans", "E-ticaret", "Verimlilik"];
  const [aktifKat, setAktifKat] = useState("Tümü");
  const filtreliKaynaklar = aktifKat === "Tümü" ? KAYNAKLAR : KAYNAKLAR.filter(k => k.kategori === aktifKat);

  return (
    <div style={S.screen}>
      <div style={{ background: PALETTE.linen, padding: "24px 20px 20px" }}>
        <h2 style={{ fontSize: 20, fontFamily: "Georgia, serif", color: PALETTE.mocha, margin: "0 0 4px", fontWeight: 400 }}>Kaynaklar</h2>
        <p style={{ fontSize: 13, color: PALETTE.muted, margin: 0 }}>Rehberler, şablonlar ve araçlar</p>
      </div>
      <div style={{ padding: "12px 20px 0", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 8, paddingBottom: 4, flexWrap: "nowrap", minWidth: "max-content" }}>
          {kategoriler.map(k => (
            <button key={k} onClick={() => setAktifKat(k)} style={{
              background: aktifKat === k ? PALETTE.mocha : PALETTE.white,
              color: aktifKat === k ? PALETTE.white : PALETTE.muted,
              border: `0.5px solid ${aktifKat === k ? PALETTE.mocha : PALETTE.taupeLight}`,
              borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
            }}>
              {k}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 20px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {filtreliKaynaklar.map(k => (
          <div key={k.id} style={{ background: PALETTE.white, border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 12, padding: 14, cursor: "pointer" }}>
            <div style={{ width: 40, height: 40, background: k.renk, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 10 }}>
              {k.ikon}
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: PALETTE.mocha, margin: "0 0 4px", lineHeight: 1.3 }}>{k.baslik}</p>
            <p style={{ fontSize: 11, color: PALETTE.muted, margin: "0 0 8px", lineHeight: 1.4 }}>{k.aciklama}</p>
            <span style={{ fontSize: 10, background: PALETTE.linen, color: PALETTE.taupe, padding: "2px 8px", borderRadius: 20 }}>{k.kategori}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profil() {
  return (
    <div style={S.screen}>
      <div style={{ background: PALETTE.linen, padding: "24px 20px 20px", textAlign: "center" }}>
        <Avatar isim="ED" size={64} bg={PALETTE.taupe} />
        <h2 style={{ fontSize: 20, fontFamily: "Georgia, serif", color: PALETTE.mocha, margin: "12px 0 2px", fontWeight: 400 }}>Eda</h2>
        <p style={{ fontSize: 13, color: PALETTE.taupe, margin: "0 0 4px", fontWeight: 500 }}>Kids n'Joy · Londra</p>
        <p style={{ fontSize: 13, color: PALETTE.muted, margin: "0 0 12px", fontStyle: "italic" }}>Girişimci, anne, topluluk kurucusu.</p>
        <Rozet tip="Pro" />
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        {/* İstatistikler */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[["12", "Gönderi"], ["3", "Etkinlik"], ["28", "Bağlantı"]].map(([n, l]) => (
            <div key={l} style={{ background: PALETTE.white, border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
              <p style={{ fontSize: 20, fontWeight: 600, color: PALETTE.mocha, margin: 0, fontFamily: "Georgia, serif" }}>{n}</p>
              <p style={{ fontSize: 11, color: PALETTE.muted, margin: "2px 0 0" }}>{l}</p>
            </div>
          ))}
        </div>

        {/* İşletme Bilgisi */}
        <p style={{ fontSize: 11, letterSpacing: 2, color: PALETTE.muted, margin: "0 0 10px", textTransform: "uppercase" }}>İşletmelerim</p>
        {[
          { isim: "Kids n'Joy", tip: "Oyun Kafesi · Crouch End, Londra", ikon: "🎈" },
          { isim: "Fancy Socks", tip: "E-ticaret · Corap markası", ikon: "🧦" },
          { isim: "Roamie", tip: "Platform · Seyahat & fotoğraf", ikon: "📸" },
        ].map(i => (
          <div key={i.isim} style={{ background: PALETTE.white, border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 24 }}>{i.ikon}</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: PALETTE.mocha, margin: 0 }}>{i.isim}</p>
              <p style={{ fontSize: 12, color: PALETTE.muted, margin: 0 }}>{i.tip}</p>
            </div>
          </div>
        ))}

        {/* Üyelik */}
        <p style={{ fontSize: 11, letterSpacing: 2, color: PALETTE.muted, margin: "20px 0 10px", textTransform: "uppercase" }}>Üyelik</p>
        <div style={{ background: PALETTE.mocha, borderRadius: 12, padding: 16, color: PALETTE.white, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, margin: "0 0 4px" }}>Pro Üye</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0 }}>Tüm kaynaklara tam erişim</p>
            </div>
            <span style={{ fontSize: 24 }}>✦</span>
          </div>
        </div>

        <button style={{ width: "100%", background: "none", border: `0.5px solid ${PALETTE.taupeLight}`, borderRadius: 10, padding: "12px", fontSize: 14, color: PALETTE.muted, cursor: "pointer", fontFamily: "inherit" }}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { key: "ana", label: "Ana Sayfa", ikon: "🏠" },
  { key: "topluluk", label: "Topluluk", ikon: "👥" },
  { key: "etkinlikler", label: "Etkinlikler", ikon: "📅" },
  { key: "kaynaklar", label: "Kaynaklar", ikon: "📚" },
  { key: "profil", label: "Profil", ikon: "👤" },
];

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [onboarding, setOnboarding] = useState(true);
  const [aktifEkran, setAktifEkran] = useState("ana");

  if (onboarding) return <Onboarding onBitir={() => setOnboarding(false)} />;

  const ekranlar = { ana: <AnaSayfa />, topluluk: <Topluluk />, etkinlikler: <Etkinlikler />, kaynaklar: <Kaynaklar />, profil: <Profil /> };

  return (
    <div style={S.app}>
      <div style={{ overflowY: "auto", paddingBottom: 70 }}>
        {ekranlar[aktifEkran]}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: PALETTE.white, borderTop: `0.5px solid ${PALETTE.taupeLight}`,
        display: "flex", justifyContent: "space-around", padding: "8px 0 12px",
        zIndex: 100,
      }}>
        {NAV_ITEMS.map(item => (
          <button key={item.key} onClick={() => setAktifEkran(item.key)} style={{
            background: "none", border: "none", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, cursor: "pointer", padding: "4px 8px",
          }}>
            <span style={{ fontSize: 20 }}>{item.ikon}</span>
            <span style={{ fontSize: 10, color: aktifEkran === item.key ? PALETTE.mocha : PALETTE.muted, fontWeight: aktifEkran === item.key ? 600 : 400, fontFamily: "inherit" }}>
              {item.label}
            </span>
            {aktifEkran === item.key && <div style={{ width: 4, height: 4, borderRadius: 2, background: PALETTE.taupe }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
