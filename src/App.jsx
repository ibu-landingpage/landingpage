import React, { useState, useRef, useEffect } from 'react';
import {
  Phone, MessageCircle, Clock, Users, Award, ChevronDown, Percent,
  GraduationCap, Building, ArrowRight, ShieldCheck,
  MapPin, Camera, PlayCircle, Star, Headset, ChevronLeft, ChevronRight, Mail
} from 'lucide-react';
import './index.css';

const galleryItems = [
  { src: "https://www.balkan.edu.tr/wp-content/uploads/2025/12/imgi_3_582312014_18538347496016118_5518810466559579021_n.jpeg", title: "Modern Sınıf" },
  { src: "https://www.balkan.edu.tr/wp-content/uploads/2025/12/imgi_2_572889145_18534276445016118_775188407179768182_n.jpeg", title: "Diş Hekimliği Lab" },
  { src: "https://www.balkan.edu.tr/wp-content/uploads/2024/02/2-min-scaled.jpg", title: "Kampüs Dış Cephe" },
  { src: "https://www.balkan.edu.tr/wp-content/uploads/2025/10/lofts.png", title: "Öğrenci Sosyal Alan" },
  { src: "https://www.balkan.edu.tr/wp-content/uploads/2025/12/saglk.png", title: "Sağlık Laboratuvarı" },
  { src: "https://www.balkan.edu.tr/wp-content/uploads/2025/12/imgi_3_582777747_18538347433016118_1701999184263958107_n.jpeg", title: "Etkinlik" }
];

function App() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const galleryScrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollGallery = (direction) => {
    if (galleryScrollRef.current) {
      const { scrollLeft, clientWidth } = galleryScrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      galleryScrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const trackWhatsAppClick = () => {
    // Push GTM Event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'event': 'whatsapp_click' });
    
    const text = encodeURIComponent("Merhaba, YKS’siz üniversite kayıtları hakkında bilgi almak istiyorum.");
    window.open(`https://wa.me/905050345791?text=${text}`, '_blank');
  };

  const trackPhoneClick = () => {
    // Push GTM Event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'event': 'phone_click' });

    window.location.href = 'tel:+908502422428';
  };

  const trackFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const response = await fetch("https://formspree.io/f/mdabpkbg", {
        method: "POST",
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Push GTM DataLayer Event for rock-solid conversion tracking
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'form_submission_success'
        });

        // Success state handling
        setShowSuccessModal(true);
        form.reset();
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 15000);
      } else {
        alert("Bir sorun oluştu. Lütfen tekrar deneyiniz veya WhatsApp üzerinden iletişime geçiniz.");
      }
    } catch (err) {
      alert("Bağlantı hatası! Lütfen internetinizi kontrol edip tekrar deneyiniz.");
    }
  };

  const faqs = [
    { 
      question: "YKS olmadan başvuru mümkün mü?", 
      answer: "Evet, Uluslararası Balkan Üniversitesinde Diş Hekimliği ve Hukuk fakültesi haricinde bütün bölümlere YKS sınav şartı aranmaksızın kayıt alınabilmektedir. Bu iki bölümde ise Türkiye Cumhuriyeti vatandaşı öğrencilerin Türkiye'de diploma denkliği alabilmesi için YKS sınavından ilgili başarı puanına sahip olması gerekmektedir." 
    },
    { 
      question: "Diplomam Türkiye'de geçerli mi?", 
      answer: "Üniversitemiz YÖK tarafından tanınmaktadır. Ayrıca üniversitemizin eğitim müfredatı Avrupa Birliği Bologna Sürecine uyumlu olduğun için mezun öğrenciler mezuniyet sonrasında Avrupa'da diploma denkliğine başvurabilirler." 
    },
    { 
      question: "Hangi bölümler mevcut?", 
      answer: "Diş Hekimliği, Hukuk, Bilgisayar Mühendisliği, Psikoloji, Mimarlık ve daha birçok alanda 20’den fazla lisans programı ile uluslararası eğitim fırsatlarını keşfedin." 
    },
    {
      question: "Eğitim dili nedir?", 
      answer: "Uluslararası Balkan Üniversitesindeki tüm eğitim düzeyindeki (lisans, yüksek lisans, doktora) eğitim dili İngilizce’dir."
    },
    { 
      question: "Süreç nasıl işliyor?", 
      answer: "Aday öğrenciler üniversitemizin kayıt ofisi yetkilileri ile görüştükten sonra kayıt olmaya karar vermeleri halinde online kayıt formu doldurulur ve bu şekilde ön kayıt süreci başlamış olur. Ödeme ve evrak sürecinin tamamlanması ile beraber kayıt süreci tamamlanmış olur." 
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="app-wrapper" style={{ position: 'relative' }}>

      {/* HEADER */}
      <header className="glass-header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://i.hizliresim.com/q5ueewo.png" alt="International Balkan University" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <div className="hidden-mobile" style={{ gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--apple-text-gray)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>ÜCRETSİZ DANIŞMANLIK</span>
              <a href="tel:08502422428" style={{ color: 'var(--ibu-navy)', textDecoration: 'none', fontWeight: 800, fontSize: '18px' }}>0850 242 24 28</a>
            </div>
            <button onClick={trackWhatsAppClick} className="btn btn-whatsapp" style={{ padding: '12px 24px', fontSize: '15px' }}>
              <MessageCircle size={18} /> WhatsApp
            </button>
          </div>
        </div>
      </header>

      {/* 1. HERO + FORM */}
      <section className="hero-ambient" style={{ paddingTop: 'clamp(120px, 15vw, 160px)', paddingBottom: 'clamp(48px, 8vw, 80px)' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center" style={{ position: 'relative', zIndex: 10 }}>

            {/* HERO MESSAGING */}
            <div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <span className="animate-pulse-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--ibu-red)', color: 'white', borderRadius: '980px', fontWeight: 700, fontSize: '13px' }}>
                  <ShieldCheck size={16} /> Sınırlı Kontenjan!
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(9, 19, 37, 0.05)', color: 'var(--ibu-navy)', borderRadius: '980px', fontWeight: 700, fontSize: '13px' }}>
                  <Star size={16} /> Ücretsiz Danışmanlık
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', borderRadius: '980px', fontWeight: 700, fontSize: '13px', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                  <Percent size={15} /> Erken Ödeme İndirimleri & Taksit
                </span>
              </div>

              <h1 className="typography-hero" style={{ marginBottom: '24px' }}>
                <span className="text-gradient">YKS’siz Üniversite</span><br />Kayıtları Başladı
              </h1>
              <p className="typography-p" style={{ marginBottom: '48px', maxWidth: '520px' }}>
                Bölüm seçenekleri, ücretler, <strong>erken ödeme indirimleri ve taksit seçenekleri</strong> hakkında uzman danışmanlarımızdan ücretsiz bilgi alın.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={trackWhatsAppClick} className="btn btn-whatsapp" style={{ flex: '1 1 200px', padding: '20px' }}>
                  <MessageCircle size={22} /> WhatsApp’tan Bilgi Al
                </button>
                <button onClick={trackPhoneClick} className="btn btn-outline flex-phone-btn" style={{ flex: '1 1 200px', padding: '12px 16px', background: 'white' }}>
                  <Phone size={26} color="var(--ibu-red)" style={{ flexShrink: 0 }} />
                  <div className="flex-phone-labels">
                    <span className="label-small">Hemen Arayın</span>
                    <span className="label-large">0850 242 24 28</span>
                  </div>
                </button>
              </div>
            </div>

            {/* HERO LEAD FORM */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
              <div className="glass-form" style={{ width: '100%', maxWidth: '460px' }}>
                <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '26px', color: 'var(--ibu-navy)', marginBottom: '8px' }}>Uzman Eğitim Danışmanımız &nbsp;
                    Size Hemen Ulaşsın</h3>
                  <p style={{ color: 'var(--apple-text-gray)', fontSize: '15px', fontWeight: 500 }}>Bölümler, ücretler, burs imkanları ve kayıt süreci hakkında bilgi alın.</p>
                </div>
                <form onSubmit={trackFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input type="text" name="ad_soyad" className="form-input" placeholder="Adınız Soyadınız" required />
                  <input type="tel" name="telefon" className="form-input" placeholder="Telefon Numaranız" required />
                  <select name="konu" className="form-input" required style={{ appearance: 'none' }}>
                    <option value="">Size nasıl yardımcı olabiliriz?</option>
                    <option value="YKS'siz başvuru">YKS’siz başvuru</option>
                    <option value="Bölümler hakkında bilgi">Bölümler hakkında bilgi</option>
                    <option value="Ücret bilgisi">Ücret bilgisi</option>
                    <option value="Burs İmkanları">Burs İmkanları</option>
                    <option value="Başvuru süreci">Başvuru süreci</option>
                    <option value="Denklik bilgisi">Denklik bilgisi</option>
                    <option value="Uzman danışmanla görüşmek istiyorum">Uzman danışmanla görüşmek istiyorum</option>
                  </select>
                  <button type="submit" className="btn btn-primary w-full" style={{ padding: '20px', marginTop: '8px' }}>
                    Ücretsiz Bilgi Al <ArrowRight size={20} />
                  </button>
                  <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '12px', fontWeight: 500 }}>KVKK kapsamında korunmaktadır.</p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="trust-section" style={{ position: 'relative', zIndex: 15 }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="trust-badge-card">
              <div className="icon-wrapper">
                <ShieldCheck size={28} color="var(--ibu-navy)" />
              </div>
              <div className="trust-title">ÖSYM Tercih Kılavuzunda</div>
              <div className="trust-desc">YÖK Denklik Güvencesi</div>
            </div>
            <div className="trust-badge-card">
              <div className="icon-wrapper">
                <Building size={28} color="var(--ibu-red)" />
              </div>
              <div className="trust-title">%100 İngilizce Eğitim</div>
              <div className="trust-desc">Uluslararası Eğitim Standardı</div>
            </div>
            <div className="trust-badge-card">
              <div className="icon-wrapper">
                <Users size={28} color="var(--ibu-navy)" />
              </div>
              <div className="trust-title">YKS’siz Başvuru İmkanı</div>
              <div className="trust-desc">Başvuru koşulları için bilgi alın</div>
            </div>
            <div className="trust-badge-card">
              <div className="icon-wrapper">
                <Award size={28} color="var(--ibu-red)" />
              </div>
              <div className="trust-title">Uluslararası Geçerli Diploma</div>
              <div className="trust-desc">Avrupa Odaklı Eğitim</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FINANCE HIGHLIGHT SECTION - NEW PROMINENT INSERTION */}
      <section style={{ padding: '48px 0 0', position: 'relative', zIndex: 5 }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Banner 1: Erken Ödeme */}
            <div style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '2px solid rgba(37, 99, 235, 0.15)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(32px, 5vw, 48px) 32px',
              textAlign: 'center',
              boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.12)',
              transition: 'transform 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                <Percent size={140} />
              </div>
              <div style={{ 
                width: '60px', height: '60px', background: '#eff6ff', borderRadius: '16px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                color: '#2563eb', boxShadow: 'inset 0 0 0 1px rgba(37,99,235,0.1)'
              }}>
                <Percent size={28} strokeWidth={2.5} />
              </div>
              <h3 style={{ color: 'var(--ibu-navy)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '8px' }}>
                Erken Ödeme İndirimleri
              </h3>
              <p style={{ color: '#64748b', fontWeight: 600, fontSize: '15px' }}>Kaçırılmayacak Erken Kayıt Fırsatları</p>
            </div>

            {/* Banner 2: Taksit Seçenekleri */}
            <div style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '2px solid rgba(217, 4, 41, 0.15)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(32px, 5vw, 48px) 32px',
              textAlign: 'center',
              boxShadow: '0 20px 40px -10px rgba(217, 4, 41, 0.12)',
              transition: 'transform 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
               <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                <Award size={140} />
              </div>
              <div style={{ 
                width: '60px', height: '60px', background: '#fff1f2', borderRadius: '16px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                color: 'var(--ibu-red)', boxShadow: 'inset 0 0 0 1px rgba(217,4,41,0.1)'
              }}>
                <Award size={28} strokeWidth={2.5} />
              </div>
              <h3 style={{ color: 'var(--ibu-navy)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '8px' }}>
                Taksit Seçenekleri
              </h3>
              <p style={{ color: '#64748b', fontWeight: 600, fontSize: '15px' }}>Bütçenize Uygun Kolay Ödeme Planları</p>
            </div>

          </div>
        </div>
      </section>


      {/* 3. VIDEO AUTHORITY SECTION */}
      <section className="section-pad">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}>
            <h2 className="typography-h2">Rektörümüzden Resmi Bilgilendirmeler</h2>
            <p className="typography-p">Denklik ve üniversitemiz hakkında</p>
            <p className="typography-p"> doğrudan rektörümüzün açıklamalarını izleyin.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              onClick={() => setActiveVideoUrl("https://www.youtube.com/embed/xMojjZXByW4")}
              className="premium-card video-card"
              style={{ cursor: 'pointer' }}
            >
              <div className="video-card-bg" style={{ backgroundImage: 'url(https://www.balkan.edu.tr/wp-content/uploads/2026/04/bloombegtvibu.png)' }}>
                <div className="video-overlay"></div>
                <div className="video-play-btn">
                  <div className="play-icon">
                    <PlayCircle size={40} color="var(--ibu-red)" />
                  </div>
                </div>
                <div className="video-content">
                  <h3>Üniversitemiz ve Vizyonumuz</h3>
                  <p>Üniversitemiz Hakkında Rektörümüz Anlatıyor</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setActiveVideoUrl("https://drive.google.com/file/d/1E8lweUfjmC-mSiwoD_OxFwzgJhbDzByA/preview")}
              className="premium-card video-card"
              style={{ cursor: 'pointer' }}
            >
              <div className="video-card-bg" style={{ backgroundImage: 'url(https://i.hizliresim.com/b3pp431.png)' }}>
                <div className="video-overlay"></div>
                <div className="video-play-btn">
                  <div className="play-icon">
                    <PlayCircle size={40} color="var(--ibu-red)" />
                  </div>
                </div>
                <div className="video-content">
                  <h3>Denklik ve Süreçler</h3>
                  <p>Denklik Sürecini Rektörümüz Açıklıyor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAM SECTION */}
      <section className="section-pad">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}>
            <h2 className="typography-h2">Uluslararası Eğitim Avantajları</h2>
            <p className="typography-p">İngiltere bağlantılı özel programlarla global kariyer fırsatlarını keşfedin.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AMEP Card - Ultra Premium */}
            <div className="program-card">
              <div className="program-card-bg">
                <Building size={320} color="white" />
              </div>
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div className="program-badge">
                    <Building size={16} /> Çift Anadal & Avrupa Deneyimi
                  </div>
                  <h4 className="program-title">AMEP Programı</h4>
                  <p className="program-desc">
                    Avrupa bağlantılı eğitim modeliyle çift anadal ve uluslararası deneyim fırsatı.
                  </p>
                </div>

              </div>
            </div>

            {/* UK PACE Card - Ultra Premium */}
            <div className="program-card program-card-uk">
              <div className="program-card-bg">
                <GraduationCap size={320} color="white" />
              </div>
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div className="program-badge badge-uk">
                    <GraduationCap size={16} /> İngiltere Bağlantılı Eğitim
                  </div>
                  <h4 className="program-title">UK PACE Programı</h4>
                  <p className="program-desc">
                    Uluslararası akademik deneyim ve global eğitim fırsatları.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. URGENCY SECTION */}
      <section className="section-pad">
        <div className="container">
          <div className="urgency-container">
            <div className="urgency-bg-icon">
              <Clock size={600} color="white" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center position-relative z-10">
              <div>
                <div className="animate-pulse-red urgency-badge">
                  Sınırlı Kontenjan
                </div>
                <h2 className="urgency-title">
                  2026 Erken Kayıtlar Başladı
                </h2>
                <ul className="urgency-list">
                  <li>
                    <div className="urgency-list-icon">
                      <Users size={28} color="white" />
                    </div>
                    <span>Sınırlı Kontenjan</span>
                  </li>
                  <li>
                    <div className="urgency-list-icon">
                      <Headset size={28} color="white" />
                    </div>
                    <span>Ücretsiz Danışmanlık</span>
                  </li>
                  <li>
                    <div className="urgency-list-icon">
                      <Percent size={28} color="white" />
                    </div>
                    <span>Erken Ödeme İndirimleri</span>
                  </li>
                  <li>
                    <div className="urgency-list-icon">
                      <Award size={28} color="white" />
                    </div>
                    <span>Taksit Seçenekleri</span>
                  </li>

                </ul>
              </div>

              <div className="urgency-box">
                <p>Kontenjanlar dolmadan uzman danışmanlarımızdan ücretsiz bilgi alın.</p>
                <button onClick={trackWhatsAppClick} className="btn btn-whatsapp w-full btn-large">
                  <MessageCircle size={24} /> WhatsApp’tan Bilgi Al
                </button>
                <button onClick={trackPhoneClick} className="btn btn-white w-full btn-large flex-phone-btn" style={{ padding: '12px 16px' }}>
                  <Phone size={26} color="var(--ibu-navy)" style={{ flexShrink: 0 }} />
                  <div className="flex-phone-labels">
                    <span className="label-small">Hemen Arayın</span>
                    <span className="label-large">0850 242 24 28</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="section-pad">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}>
            <h2 className="typography-h2">Sıkça Sorulan Sorular</h2>
          </div>
          <div className="premium-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '16px 32px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ borderBottom: index === faqs.length - 1 ? 'none' : '1px solid #E2E8F0' }}>
                <button className="faq-btn" onClick={() => toggleFaq(index)} style={{ padding: '24px 0', borderBottom: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ paddingRight: '24px', flex: 1, textAlign: 'left', lineHeight: 1.4 }}>{faq.question}</span>
                  <div style={{ flexShrink: 0, width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: activeFaq === index ? 'rgba(217, 4, 41, 0.1)' : 'rgba(9, 19, 37, 0.05)', transition: 'var(--transition-smooth)' }}>
                    <ChevronDown size={20} style={{ transform: activeFaq === index ? 'rotate(180deg)' : 'none', transition: 'var(--transition-bounce)', color: activeFaq === index ? 'var(--ibu-red)' : 'var(--ibu-navy)' }} />
                  </div>
                </button>
                <div className="faq-content" style={{ maxHeight: activeFaq === index ? '500px' : '0', opacity: activeFaq === index ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease, opacity 0.4s ease' }}>
                  <p style={{ padding: '0 0 24px', color: 'var(--apple-text-gray)', fontSize: '16px', lineHeight: 1.7, fontWeight: 500 }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 360 TOUR SECTION */}
      <section className="section-pad" style={{ background: '#030712', position: 'relative' }}>
        <div className="container">
          <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}>
            <img src="https://www.balkan.edu.tr/wp-content/uploads/2023/12/6-1024x576.png" alt="360 Tour" style={{ width: '100%', height: 'clamp(300px, 50vw, 500px)', objectFit: 'cover', display: 'block', filter: 'brightness(0.5)' }} loading="lazy" decoding="async" />

            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 'clamp(64px, 12vw, 100px)', height: 'clamp(64px, 12vw, 100px)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'clamp(16px, 4vw, 32px)', border: '2px solid rgba(255,255,255,0.2)' }}>
                <MapPin size={32} color="white" />
              </div>
              <h2 style={{ color: 'white', fontSize: 'clamp(28px, 6vw, 40px)', fontWeight: 800, marginBottom: '32px', letterSpacing: '-0.04em', textAlign: 'center' }}>Kampüsümüzü 360° Keşfedin</h2>
              <a href="https://virtualtour.ibu.edu.mk" target="_blank" rel="noreferrer" className="btn btn-red tour-button-dynamic">
                Sanal kampüs turunu hemen deneyimleyin
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CAMPUS GALLERY */}
      <section className="section-pad">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}>
            <h2 className="typography-h2">Kampüs Yaşamından Kareler</h2>
            <p className="typography-p">Akademik yaşamı ve modern kampüs olanaklarını yakından inceleyin.</p>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Left Button */}
            <button
              onClick={() => scrollGallery('left')}
              className="gallery-nav-btn hidden-mobile"
              style={{ position: 'absolute', left: '-24px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
            >
              <ChevronLeft size={24} />
            </button>

            <div ref={galleryScrollRef} className="hide-scrollbar" style={{ display: 'flex', gap: '24px', overflowX: 'auto', padding: '16px 4px 32px', margin: '0 -16px', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
              {galleryItems.map((item, index) => (
                <div key={index} style={{
                  flex: '0 0 auto', width: 'clamp(280px, 25vw, 360px)', aspectRatio: '4/3', position: 'relative', background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease', cursor: 'zoom-in', scrollSnapAlign: 'start', border: '1px solid rgba(0,0,0,0.03)'
                }}
                  onClick={() => setActiveImage(item.src)}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'; }}
                >
                  <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={() => scrollGallery('right')}
              className="gallery-nav-btn hidden-mobile"
              style={{ position: 'absolute', right: '-24px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="premium-card final-cta-card">
            <h2>Geleceğinize İlk Adımı Bugün Atın</h2>
            <p>
              Uluslararası eğitim fırsatları için uzman danışmanlarımızla hemen iletişime geçin.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={trackWhatsAppClick} className="btn btn-whatsapp btn-large w-full-mobile">
                <MessageCircle size={24} /> WhatsApp'tan Bilgi Al
              </button>
              <button onClick={trackPhoneClick} className="btn btn-outline btn-large w-full-mobile flex-phone-btn" style={{ padding: '12px 16px', background: 'white', color: 'var(--ibu-navy)' }}>
                <Phone size={26} color="var(--ibu-red)" style={{ flexShrink: 0 }} />
                <div className="flex-phone-labels">
                  <span className="label-small">Hemen Arayın</span>
                  <span className="label-large">0850 242 24 28</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section" style={{ padding: '24px 0', background: '#f8fafc', borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

          {/* Logo Compact */}
          <img src="https://i.hizliresim.com/q5ueewo.png" alt="IBU Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />

          {/* Contact Details Compact Row */}
          <div style={{ display: 'flex', gap: '8px 20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--ibu-navy)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} color="var(--ibu-red)" />
              <span>Merkezefendi Mah. Mevlana Cad. Tercüman Sitesi A7 Blok Daire 18 Zeytinburnu/İstanbul</span>
            </div>
            <a href="tel:08502422428" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ibu-navy)', textDecoration: 'none' }}>
              <Phone size={15} color="var(--ibu-red)" />
              <span>0850 242 24 28</span>
            </a>
            <a href="https://wa.me/905050345791" onClick={(e) => { e.preventDefault(); trackWhatsAppClick(); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ibu-navy)', textDecoration: 'none' }}>
              <MessageCircle size={15} color="var(--ibu-red)" />
              <span>+90 505 034 57 91</span>
            </a>
            <a href="mailto:istanbul@ibu.edu.mk" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ibu-navy)', textDecoration: 'none' }}>
              <Mail size={15} color="var(--ibu-red)" />
              <span>istanbul@ibu.edu.mk</span>
            </a>
          </div>

          {/* Bottom Compact Row (Copyright & Legal) */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '12px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--apple-text-gray)', fontWeight: 500 }}>
            <p style={{ margin: 0 }}>
              International Balkan University © 2026 / Tüm Hakları Saklıdır.
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <a href="https://www.balkan.edu.tr/aydinlatma-metni/" target="_blank" rel="noreferrer" style={{ color: 'var(--apple-text-gray)', textDecoration: 'none', fontWeight: 600 }}>Aydınlatma Metni</a>
              <span>|</span>
              <a href="https://www.balkan.edu.tr/" target="_blank" rel="noreferrer" style={{ color: 'var(--apple-text-gray)', textDecoration: 'none', fontWeight: 600 }}>KVKK & Gizlilik Politikası</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 10. MOBILE CTA BAR */}
      <div className={`mobile-sticky-bar ${showSticky ? 'visible' : ''}`}>
        <button onClick={trackWhatsAppClick} className="mobile-sticky-btn-whatsapp" style={{ display: 'flex', gap: '10px' }}>
          <MessageCircle size={20} /> WhatsApp
        </button>
        <button onClick={trackPhoneClick} className="mobile-sticky-btn-red" style={{ display: 'flex', gap: '10px' }}>
          <Phone size={20} /> Hemen Ara
        </button>
      </div>

      {/* VIDEO MODAL */}
      {activeVideoUrl && (
        <div className="video-modal-overlay" onClick={() => setActiveVideoUrl(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setActiveVideoUrl(null)}>&times;</button>
            <div className="video-modal-iframe-wrapper">
              <iframe
                src={activeVideoUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      {/* IMAGE LIGHTBOX MODAL */}
      {activeImage && (
        <div className="video-modal-overlay" onClick={() => setActiveImage(null)} style={{ zIndex: 10000, padding: '24px' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1200px', width: '100%', height: '100%' }}>
            <button className="video-modal-close" onClick={() => setActiveImage(null)} style={{ position: 'absolute', top: 0, right: 0, background: 'var(--ibu-red)', zIndex: 10001 }}>&times;</button>
            <img src={activeImage} alt="Büyütülmüş Görsel" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', cursor: 'zoom-out' }} onClick={(e) => { e.stopPropagation(); setActiveImage(null); }} />
          </div>
        </div>
      )}

      {/* PREMIUM SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="video-modal-overlay" style={{ zIndex: 10002, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.4s ease' }}>
          <div style={{
            background: 'white',
            padding: '48px 32px 36px',
            borderRadius: '28px',
            textAlign: 'center',
            maxWidth: '420px',
            width: '90%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            animation: 'scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: '1px solid rgba(0,0,0,0.05)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ibu-navy)', fontWeight: 'bold', fontSize: '16px' }}
            >
              &times;
            </button>

            <div style={{
              width: '72px',
              height: '72px',
              background: 'linear-gradient(135deg, #22c55e, #15803d)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
              color: 'white'
            }}>
              <ShieldCheck size={36} />
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ibu-navy)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Talebiniz Alındı!
            </h3>
            <p style={{ color: 'var(--apple-text-gray)', fontSize: '15px', lineHeight: 1.6, fontWeight: 500, marginBottom: '24px' }}>
              Uzman eğitim danışmanlarımız en kısa sürede sizinle iletişime geçecektir. Daha hızlı bilgi almak isterseniz hemen bizimle WhatsApp üzerinden iletişime geçebilirsiniz.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button
                onClick={trackWhatsAppClick}
                className="btn btn-whatsapp"
                style={{ width: '100%', padding: '16px', justifyContent: 'center', fontSize: '16px', fontWeight: 700, borderRadius: '999px', boxShadow: '0 8px 20px rgba(37, 211, 102, 0.25)' }}
              >
                <MessageCircle size={20} /> WhatsApp’tan Hemen Yazın
              </button>

              <a
                href="tel:08502422428"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--ibu-navy)', textDecoration: 'none', fontSize: '15px', fontWeight: 700, marginTop: '4px' }}
              >
                <Phone size={18} color="var(--ibu-red)" /> Hemen Ara: 0850 242 24 28
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
