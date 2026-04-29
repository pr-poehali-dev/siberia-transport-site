import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/4f2dc699-9cbe-47be-8c03-2f5cada8a80c/files/0dd39420-d43f-44df-b250-fa3111cc138e.jpg";

const ROUTES = [
  { label: "Москва → Санкт-Петербург", distance: 710, base: 2500 },
  { label: "Москва → Казань", distance: 820, base: 2800 },
  { label: "Москва → Екатеринбург", distance: 1780, base: 5200 },
  { label: "Москва → Новосибирск", distance: 3360, base: 9500 },
  { label: "Москва → Владивосток", distance: 9000, base: 24000 },
  { label: "Санкт-Петербург → Екатеринбург", distance: 2100, base: 6100 },
];

const SERVICES = [
  { icon: "Truck", title: "Автодоставка", desc: "Доставка грузов автомобильным транспортом по всей России и СНГ", color: "#FF8C00" },
  { icon: "Package", title: "Складирование", desc: "Ответственное хранение на современных складских комплексах", color: "#FFB700" },
  { icon: "Shield", title: "Страхование", desc: "Полное страхование груза на весь период транспортировки", color: "#FF6B35" },
  { icon: "BarChart3", title: "Аналитика", desc: "Отчёты и аналитика по всем перевозкам в личном кабинете", color: "#FF8C00" },
  { icon: "Globe", title: "Международная логистика", desc: "Экспорт и импорт грузов в страны СНГ и Европы", color: "#FFB700" },
  { icon: "Zap", title: "Срочная доставка", desc: "Экспресс-доставка в кратчайшие сроки с гарантией", color: "#FF6B35" },
];

const STATS = [
  { value: "12+", label: "Лет на рынке" },
  { value: "50 000+", label: "Доставленных грузов" },
  { value: "200+", label: "Городов России" },
  { value: "99.8%", label: "Сохранность грузов" },
];

const GALLERY = [
  { src: HERO_IMAGE, title: "Логистический хаб" },
  { src: HERO_IMAGE, title: "Автопарк компании" },
  { src: HERO_IMAGE, title: "Складской комплекс" },
  { src: HERO_IMAGE, title: "Международные перевозки" },
];

const TEAM = [
  { name: "Алексей Воронов", role: "Генеральный директор", exp: "20 лет в логистике" },
  { name: "Марина Сергеева", role: "Директор по логистике", exp: "15 лет опыта" },
  { name: "Дмитрий Козлов", role: "Руководитель автопарка", exp: "12 лет опыта" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [weight, setWeight] = useState(500);
  const [routeIndex, setRouteIndex] = useState(0);
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [calcDone, setCalcDone] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "home", label: "Главная" },
    { id: "services", label: "Услуги" },
    { id: "calculator", label: "Калькулятор" },
    { id: "about", label: "О компании" },
    { id: "gallery", label: "Галерея" },
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
          if (scrollY >= top && scrollY < bottom) {
            setActiveSection(s.id);
          }
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

  const calcPrice = () => {
    const route = ROUTES[routeIndex];
    const weightFactor = weight <= 100 ? 1 : weight <= 500 ? 1.3 : weight <= 1000 ? 1.6 : weight <= 5000 ? 2.1 : 2.8;
    const price = Math.round(route.base * weightFactor);
    setCalcResult(price);
    setCalcDone(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-body overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF8C00] to-[#FFB700] flex items-center justify-center animate-pulse-glow">
              <Icon name="Truck" size={18} className="text-black" />
            </div>
            <span className="font-display text-xl font-bold tracking-wider text-white">ТРАНС<span className="text-[#FF8C00]">ЛОГИСТ</span></span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 font-body ${
                  activeSection === s.id
                    ? "text-[#FF8C00] bg-[#FF8C00]/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#0F0F1A] border-t border-white/5 px-6 py-4 flex flex-col gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === s.id ? "text-[#FF8C00] bg-[#FF8C00]/10" : "text-white/70 hover:text-white"
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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/70 via-[#0A0A0F]/60 to-[#0A0A0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/80 via-transparent to-[#0A0A0F]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FF8C00]/20 border border-[#FF8C00]/30 rounded-full px-4 py-2 mb-6 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
              <div className="w-2 h-2 rounded-full bg-[#FF8C00] animate-pulse" />
              <span className="text-[#FF8C00] text-sm font-medium">Надёжная логистика с 2012 года</span>
            </div>

            <h1
              className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-up"
              style={{ animationDelay: "0.2s", opacity: 0 }}
            >
              ДОСТАВИМ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FFB700]">
                КУДА УГОДНО
              </span>
              <br />
              <span className="text-white/80 text-4xl md:text-5xl">В СРОК</span>
            </h1>

            <p
              className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up"
              style={{ animationDelay: "0.4s", opacity: 0 }}
            >
              Профессиональная перевозка грузов по России и СНГ. Собственный автопарк, страхование, контроль на каждом этапе.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
              <button
                onClick={() => scrollTo("calculator")}
                className="group flex items-center gap-3 bg-gradient-to-r from-[#FF8C00] to-[#FFB700] text-black font-bold px-8 py-4 rounded-xl text-base hover:scale-105 transition-all duration-200 shadow-lg shadow-[#FF8C00]/30"
              >
                <Icon name="Calculator" size={20} />
                Рассчитать стоимость
                <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="flex items-center gap-3 border border-white/20 text-white font-medium px-8 py-4 rounded-xl text-base hover:bg-white/5 hover:border-white/40 transition-all duration-200"
              >
                Связаться с нами
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={28} className="text-[#FF8C00]/60" />
        </div>
      </section>

      {/* STATS */}
      <div ref={statsRef} className="bg-[#0F0F1A] border-y border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`text-center transition-all duration-700 ${visibleStats ? "animate-counter-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FFB700] mb-1">
                  {s.value}
                </div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#FF8C00] text-sm font-semibold uppercase tracking-widest">Что мы делаем</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-white">НАШИ УСЛУГИ</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FF8C00] to-[#FFB700] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="group bg-[#0F0F1A] border border-white/5 rounded-2xl p-8 hover:border-[#FF8C00]/40 hover:bg-[#FF8C00]/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: s.color + "20", border: `1px solid ${s.color}40` }}
              >
                <Icon name={s.icon} size={26} style={{ color: s.color }} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3 tracking-wide">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-[#0F0F1A] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#FF8C00] text-sm font-semibold uppercase tracking-widest">Быстро и точно</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-white">КАЛЬКУЛЯТОР</h2>
            <p className="text-white/40 mt-1 text-sm tracking-widest">СТОИМОСТИ ДОСТАВКИ</p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#FF8C00] to-[#FFB700] mx-auto mt-4 rounded-full" />
          </div>

          <div className="bg-[#0A0A0F] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/50">
            <div className="space-y-8">

              {/* Route */}
              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-3">
                  <Icon name="MapPin" size={16} className="text-[#FF8C00]" />
                  Маршрут
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {ROUTES.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => { setRouteIndex(i); setCalcDone(false); }}
                      className={`text-left px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                        routeIndex === i
                          ? "bg-[#FF8C00]/15 border-[#FF8C00]/50 text-[#FF8C00]"
                          : "border-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
                      }`}
                    >
                      <span>{r.label}</span>
                      <span className="float-right text-xs opacity-60">{r.distance.toLocaleString()} км</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-3">
                  <Icon name="Weight" size={16} className="text-[#FF8C00]" />
                  Вес груза: <span className="text-[#FF8C00] font-bold ml-1">{weight.toLocaleString()} кг</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={10000}
                  step={10}
                  value={weight}
                  onChange={(e) => { setWeight(Number(e.target.value)); setCalcDone(false); }}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF8C00 0%, #FFB700 ${(weight / 10000) * 100}%, #1a1a2e ${(weight / 10000) * 100}%, #1a1a2e 100%)`,
                  }}
                />
                <div className="flex justify-between text-white/30 text-xs mt-2">
                  <span>10 кг</span>
                  <span>2 500 кг</span>
                  <span>5 000 кг</span>
                  <span>10 000 кг</span>
                </div>

                <div className="grid grid-cols-4 gap-2 mt-4">
                  {[100, 500, 1000, 5000].map((w) => (
                    <button
                      key={w}
                      onClick={() => { setWeight(w); setCalcDone(false); }}
                      className={`py-2 rounded-lg text-xs font-medium transition-all border ${
                        weight === w
                          ? "bg-[#FF8C00]/15 border-[#FF8C00]/50 text-[#FF8C00]"
                          : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
                      }`}
                    >
                      {w} кг
                    </button>
                  ))}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={calcPrice}
                className="w-full bg-gradient-to-r from-[#FF8C00] to-[#FFB700] text-black font-bold py-4 rounded-xl text-base hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-[#FF8C00]/30 flex items-center justify-center gap-3"
              >
                <Icon name="Calculator" size={20} />
                Рассчитать стоимость
              </button>

              {/* Result */}
              {calcDone && calcResult && (
                <div className="bg-gradient-to-r from-[#FF8C00]/10 to-[#FFB700]/10 border border-[#FF8C00]/30 rounded-2xl p-6 animate-fade-up text-center">
                  <p className="text-white/60 text-sm mb-2">Ориентировочная стоимость</p>
                  <p className="font-display text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FFB700]">
                    {calcResult.toLocaleString()} ₽
                  </p>
                  <p className="text-white/40 text-xs mt-3">
                    {ROUTES[routeIndex].label} · {weight.toLocaleString()} кг
                  </p>
                  <p className="text-white/30 text-xs mt-1">Точная стоимость зависит от типа груза и дополнительных услуг</p>
                  <button
                    onClick={() => scrollTo("contacts")}
                    className="mt-4 inline-flex items-center gap-2 bg-[#FF8C00] text-black font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-[#FFB700] transition-all"
                  >
                    Оформить заявку
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#FF8C00] text-sm font-semibold uppercase tracking-widest">Наша история</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6 text-white">О КОМПАНИИ</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              ТрансЛогист — одна из ведущих транспортно-логистических компаний России. С 2012 года мы обеспечиваем надёжную доставку грузов по всей стране и за рубежом.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
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
                  <Icon name={item.icon} size={18} className="text-[#FF8C00] mt-0.5 flex-shrink-0" />
                  <span className="text-white/60 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTo("contacts")}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF8C00] to-[#FFB700] text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg shadow-[#FF8C00]/30"
            >
              Сотрудничать с нами
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-[#0F0F1A] border border-white/5 rounded-2xl p-6 flex items-center gap-5 hover:border-[#FF8C00]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF8C00]/20 to-[#FFB700]/20 border border-[#FF8C00]/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl font-bold text-[#FF8C00]">{member.name[0]}</span>
                </div>
                <div>
                  <div className="font-semibold text-white text-base">{member.name}</div>
                  <div className="text-[#FF8C00] text-sm font-medium">{member.role}</div>
                  <div className="text-white/40 text-xs mt-0.5">{member.exp}</div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-[#FF8C00]/10 to-[#FFB700]/5 border border-[#FF8C00]/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Award" size={22} className="text-[#FFB700]" />
                <span className="font-semibold text-white">Сертификаты и награды</span>
              </div>
              <p className="text-white/50 text-sm">Лауреат «Транспорт России 2023» · ISO 9001:2015 · Член ассоциации АСМАП</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-[#0F0F1A] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#FF8C00] text-sm font-semibold uppercase tracking-widest">Наши объекты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-white">ГАЛЕРЕЯ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#FF8C00] to-[#FFB700] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY.map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[#FF8C00]/0 group-hover:bg-[#FF8C00]/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-white tracking-wide">{item.title}</h3>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-[#FF8C00] rounded-full p-2">
                    <Icon name="Expand" size={16} className="text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#FF8C00] text-sm font-semibold uppercase tracking-widest">Свяжитесь с нами</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-white">КОНТАКТЫ</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FF8C00] to-[#FFB700] mx-auto mt-4 rounded-full" />
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
                <div className="w-12 h-12 rounded-xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF8C00]/20 transition-all">
                  <Icon name={c.icon} size={20} className="text-[#FF8C00]" />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{c.title}</div>
                  <div className="text-white font-semibold">{c.value}</div>
                  <div className="text-white/40 text-sm">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0F0F1A] border border-white/10 rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold text-white mb-6">ОСТАВИТЬ ЗАЯВКУ</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8C00]/50 transition-colors text-sm"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8C00]/50 transition-colors text-sm"
              />
              <input
                type="text"
                placeholder="Откуда → Куда"
                className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8C00]/50 transition-colors text-sm"
              />
              <textarea
                placeholder="Комментарий (тип груза, вес, дата)"
                rows={3}
                className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8C00]/50 transition-colors text-sm resize-none"
              />
              <button className="w-full bg-gradient-to-r from-[#FF8C00] to-[#FFB700] text-black font-bold py-4 rounded-xl text-base hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-[#FF8C00]/30 flex items-center justify-center gap-3">
                <Icon name="Send" size={18} />
                Отправить заявку
              </button>
              <p className="text-white/30 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F0F1A] border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF8C00] to-[#FFB700] flex items-center justify-center">
              <Icon name="Truck" size={16} className="text-black" />
            </div>
            <span className="font-display text-lg font-bold">ТРАНС<span className="text-[#FF8C00]">ЛОГИСТ</span></span>
          </div>
          <p className="text-white/30 text-sm">© 2024 ТрансЛогист. Все права защищены.</p>
          <div className="flex gap-6">
            {sections.slice(0, 4).map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="text-white/30 text-sm hover:text-[#FF8C00] transition-colors">
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
