import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/4f2dc699-9cbe-47be-8c03-2f5cada8a80c/files/e215c15e-b0cf-483b-a320-242ad5dd4b52.jpg";


const SERVICES = [
  { icon: "Truck", title: "Автодоставка", desc: "Доставка грузов автомобильным транспортом по всей России и СНГ", color: "#1D4ED8" },
  { icon: "Package", title: "Складирование", desc: "Ответственное хранение на современных складских комплексах", color: "#2563EB" },
  { icon: "Shield", title: "Страхование", desc: "Полное страхование груза на весь период транспортировки", color: "#1E40AF" },
  { icon: "BarChart3", title: "Аналитика", desc: "Отчёты и аналитика по всем перевозкам в личном кабинете", color: "#1D4ED8" },
  { icon: "Globe", title: "Международная логистика", desc: "Экспорт и импорт грузов в страны СНГ и Европы", color: "#2563EB" },
  { icon: "Zap", title: "Срочная доставка", desc: "Экспресс-доставка в кратчайшие сроки с гарантией", color: "#1E40AF" },
];

const STATS = [
  { value: "12+", label: "Лет на рынке" },
  { value: "50 000+", label: "Доставленных грузов" },
  { value: "200+", label: "Городов России" },
  { value: "99.8%", label: "Сохранность грузов" },
];


const TEAM = [
  { name: "Алексей Воронов", role: "Генеральный директор", exp: "20 лет в логистике" },
  { name: "Марина Сергеева", role: "Директор по логистике", exp: "15 лет опыта" },
  { name: "Дмитрий Козлов", role: "Руководитель автопарка", exp: "12 лет опыта" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "home", label: "Главная" },
    { id: "services", label: "Услуги" },
    { id: "about", label: "О компании" },
    { id: "contacts", label: "Контакты" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop - 100;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) setActiveSection(s.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleStats(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };


  return (
    <div className="min-h-screen bg-white text-gray-900 font-body overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center shadow-md shadow-blue-200">
              <Icon name="Truck" size={18} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-gray-900">
              ТРАНС<span className="text-[#1D4ED8]">ЛОГИСТ</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === s.id
                    ? "text-[#1D4ED8] bg-blue-50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-gray-500 hover:text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-blue-50 px-6 py-4 flex flex-col gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === s.id ? "text-[#1D4ED8] bg-blue-50" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D4ED8]/80 via-[#1E3A8A]/70 to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/60 via-transparent to-[#1D4ED8]/20" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-sm font-medium">Надёжная логистика с 2012 года</span>
            </div>

            <h1
              className="font-display text-5xl md:text-7xl font-black leading-tight mb-6 text-white animate-fade-up"
              style={{ animationDelay: "0.2s", opacity: 0 }}
            >
              ДОСТАВИМ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                КУДА УГОДНО
              </span>
              <br />
              <span className="text-white/80 text-4xl md:text-5xl font-bold">В СРОК</span>
            </h1>

            <p
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up"
              style={{ animationDelay: "0.4s", opacity: 0 }}
            >
              Профессиональная перевозка грузов по России и СНГ. Собственный автопарк, страхование, контроль на каждом этапе.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
              <button
                onClick={() => scrollTo("contacts")}
                className="group flex items-center gap-3 bg-white text-[#1D4ED8] font-bold px-8 py-4 rounded-xl text-base hover:scale-105 transition-all duration-200 shadow-xl shadow-blue-900/30"
              >
                Связаться с нами
                <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="flex items-center gap-3 border-2 border-white/50 text-white font-medium px-8 py-4 rounded-xl text-base hover:bg-white/10 hover:border-white transition-all duration-200"
              >
                Наши услуги
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <Icon name="ChevronDown" size={28} className="text-[#1D4ED8]" />
        </div>
      </section>

      {/* STATS */}
      <div ref={statsRef} className="bg-white border-b border-blue-100 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`text-center transition-all duration-700 ${visibleStats ? "animate-counter-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="font-display text-3xl md:text-4xl font-black text-[#1D4ED8] mb-1">{s.value}</div>
                <div className="text-gray-500 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#1D4ED8] text-sm font-bold uppercase tracking-widest">Что мы делаем</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 text-gray-900">НАШИ УСЛУГИ</h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#1D4ED8] to-[#60A5FA] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="group bg-white border border-blue-100 rounded-2xl p-8 hover:border-[#1D4ED8]/40 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: s.color + "15", border: `1.5px solid ${s.color}30` }}
              >
                <Icon name={s.icon} size={26} style={{ color: s.color }} />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#1D4ED8] text-sm font-bold uppercase tracking-widest">Наша история</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-3 mb-6 text-gray-900">О КОМПАНИИ</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              ТрансЛогист — одна из ведущих транспортно-логистических компаний России. С 2012 года мы обеспечиваем надёжную доставку грузов по всей стране и за рубежом.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Собственный парк из 150+ единиц техники, современные складские комплексы в Москве, Санкт-Петербурге и Екатеринбурге — всё это позволяет нам гарантировать высокое качество услуг.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "CheckCircle", text: "Собственный автопарк 150+ машин" },
                { icon: "CheckCircle", text: "3 складских комплекса" },
                { icon: "CheckCircle", text: "Страхование грузов" },
                { icon: "CheckCircle", text: "GPS-мониторинг 24/7" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon name={item.icon} size={18} className="text-[#1D4ED8] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollTo("contacts")}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-300/40"
            >
              Сотрудничать с нами
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-white border border-blue-100 rounded-2xl p-6 flex items-center gap-5 hover:border-[#1D4ED8]/30 hover:shadow-md hover:shadow-blue-100 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1D4ED8]/10 to-[#60A5FA]/20 border border-blue-200 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl font-black text-[#1D4ED8]">{member.name[0]}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{member.name}</div>
                  <div className="text-[#1D4ED8] text-sm font-semibold">{member.role}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{member.exp}</div>
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/40 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Award" size={22} className="text-[#1D4ED8]" />
                <span className="font-bold text-gray-900">Сертификаты и награды</span>
              </div>
              <p className="text-gray-500 text-sm">Лауреат «Транспорт России 2023» · ISO 9001:2015 · Член ассоциации АСМАП</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#1D4ED8] text-sm font-bold uppercase tracking-widest">Свяжитесь с нами</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 text-gray-900">КОНТАКТЫ</h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#1D4ED8] to-[#60A5FA] mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (495) 123-45-67", sub: "Пн–Пт 9:00–18:00 МСК" },
              { icon: "Mail", title: "Email", value: "info@translogist.ru", sub: "Ответим в течение часа" },
              { icon: "MapPin", title: "Офис", value: "Москва, ул. Складочная, 1", sub: "Главный офис" },
              { icon: "Clock", title: "Режим работы", value: "Пн–Пт: 9:00–18:00", sub: "Диспетчер 24/7" },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-all">
                  <Icon name={c.icon} size={20} className="text-[#1D4ED8]" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-0.5 font-semibold">{c.title}</div>
                  <div className="text-gray-900 font-bold">{c.value}</div>
                  <div className="text-gray-500 text-sm">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-xl shadow-blue-100/40">
            <h3 className="font-display text-2xl font-black text-gray-900 mb-6">ОСТАВИТЬ ЗАЯВКУ</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Ваше имя" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1D4ED8]/50 focus:bg-white transition-colors text-sm" />
              <input type="tel" placeholder="Телефон" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1D4ED8]/50 focus:bg-white transition-colors text-sm" />
              <input type="text" placeholder="Откуда → Куда" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1D4ED8]/50 focus:bg-white transition-colors text-sm" />
              <textarea placeholder="Комментарий (тип груза, вес, дата)" rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1D4ED8]/50 focus:bg-white transition-colors text-sm resize-none" />
              <button className="w-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-bold py-4 rounded-xl text-base hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-blue-300/40 flex items-center justify-center gap-3">
                <Icon name="Send" size={18} />
                Отправить заявку
              </button>
              <p className="text-gray-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1E3A8A] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Icon name="Truck" size={16} className="text-white" />
            </div>
            <span className="font-display text-lg font-black text-white">ТРАНС<span className="text-blue-300">ЛОГИСТ</span></span>
          </div>
          <p className="text-blue-200/60 text-sm">© 2024 ТрансЛогист. Все права защищены.</p>
          <div className="flex gap-6">
            {sections.slice(0, 4).map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="text-blue-200/60 text-sm hover:text-white transition-colors">
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}