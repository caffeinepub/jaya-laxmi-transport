import {
  Building2,
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  Navigation,
  Package,
  Phone,
  ShieldCheck,
  Star,
  Tractor,
  Truck,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMetaTags } from "./hooks/useMetaTags";

const PHONE = "7396888333";
const PHONE_DISPLAY = "73968 88333";
const PROPRIETOR = "Pentakota Parameshwarao";
const BUSINESS_NAME = "Jaya Laxmi Transport";
const LOCATION = "Anakapalli, Andhra Pradesh";

type ActiveTab = "home" | "gallery";

const HOME_NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

const SERVICES = [
  {
    icon: Package,
    title: "Goods Transportation",
    description:
      "Reliable and secure transportation of all types of goods and merchandise across Andhra Pradesh and beyond.",
  },
  {
    icon: Users,
    title: "Passenger Transport",
    description:
      "Comfortable and safe passenger transport services for groups, events, and daily commutes.",
  },
  {
    icon: Truck,
    title: "Local Transport",
    description:
      "Fast, dependable local transport within Anakapalli and nearby areas. Available on-call.",
  },
  {
    icon: Navigation,
    title: "Long Distance Transport",
    description:
      "End-to-end long-distance haulage services across India with tracking and timely delivery.",
  },
  {
    icon: Building2,
    title: "Commercial Vehicle Hire",
    description:
      "Flexible hire of trucks, tempo travellers, and commercial vehicles for your business needs.",
  },
  {
    icon: Tractor,
    title: "Agricultural Transport",
    description:
      "Specialized transport for agricultural produce, farm equipment, and seasonal harvests.",
  },
];

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Fleet Vehicles" },
  { value: "24/7", label: "Service Availability" },
];

const FLEET_IMAGES = [
  "/assets/uploads/IMG-20260308-WA0014-1.jpg",
  "/assets/uploads/IMG-20260308-WA0019-2.jpg",
  "/assets/uploads/IMG-20260308-WA0016-3.jpg",
  "/assets/uploads/IMG-20260308-WA0020-4.jpg",
  "/assets/uploads/IMG-20260308-WA0017-5.jpg",
  "/assets/uploads/IMG-20260308-WA0015-6.jpg",
  "/assets/uploads/IMG-20260308-WA0018-7.jpg",
  "/assets/uploads/IMG-20260308-WA0023-8.jpg",
  "/assets/uploads/IMG-20260308-WA0022-9.jpg",
];

function smoothScrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useScrollSpy(enabled: boolean) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!enabled) return;
    const sections = ["home", "about", "services", "contact"];
    const observers: IntersectionObserver[] = [];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, [enabled]);

  return activeSection;
}

function Navbar({
  activeTab,
  setActiveTab,
}: {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(activeTab === "home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeNavClick = (id: string) => {
    setActiveTab("home");
    setMobileOpen(false);
    // Defer scroll until home tab has rendered
    setTimeout(() => smoothScrollTo(id), 50);
  };

  const handleGalleryClick = () => {
    setActiveTab("gallery");
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 nav-blur shadow-nav border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleHomeNavClick("home")}
            className="flex items-center gap-2.5 group"
            aria-label="Go to home"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Truck className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div
                className={`font-display font-bold text-sm md:text-base transition-colors ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                Jaya Laxmi
              </div>
              <div
                className={`text-[10px] font-medium tracking-wider uppercase transition-colors ${
                  scrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                Transport
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {HOME_NAV_LINKS.map(({ label, id }) => {
              const isActive = activeTab === "home" && activeSection === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    data-ocid={`nav.${id}.link`}
                    onClick={() => handleHomeNavClick(id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      scrolled
                        ? isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                        : isActive
                          ? "bg-white/20 text-white"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
            {/* Gallery tab */}
            <li>
              <button
                type="button"
                data-ocid="nav.gallery.tab"
                onClick={handleGalleryClick}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  scrolled
                    ? activeTab === "gallery"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                    : activeTab === "gallery"
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                Gallery
              </button>
            </li>
          </ul>

          {/* Desktop CTA */}
          <a
            href={`tel:${PHONE}`}
            className="hidden md:flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:brightness-105 active:scale-95 transition-all shadow-md"
          >
            <Phone className="w-4 h-4" />
            {PHONE_DISPLAY}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-border shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {HOME_NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  data-ocid={`nav.${id}.link`}
                  onClick={() => handleHomeNavClick(id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/5 hover:text-primary font-medium transition-colors text-left"
                >
                  {label}
                </button>
              ))}
              {/* Gallery tab mobile */}
              <button
                type="button"
                data-ocid="nav.gallery.tab"
                onClick={handleGalleryClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left ${
                  activeTab === "gallery"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-primary/5 hover:text-primary"
                }`}
              >
                Gallery
              </button>
              <a
                href={`tel:${PHONE}`}
                className="mt-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-lg font-semibold hover:brightness-105 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-transport.dim_1600x900.jpg')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
        >
          <MapPin className="w-3.5 h-3.5" />
          {LOCATION}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-4"
        >
          Jaya Laxmi
          <br />
          <span className="text-accent">Transport</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/85 text-lg sm:text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto"
        >
          Your Trusted Transport Partner in Anakapalli
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`tel:${PHONE}`}
            data-ocid="hero.primary_button"
            className="group flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:brightness-105 active:scale-95 transition-all"
          >
            <Phone className="w-5 h-5 group-hover:animate-bounce" />
            Call Now
          </a>
          <button
            type="button"
            onClick={() => smoothScrollTo("services")}
            className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/25 transition-all"
          >
            Our Services
            <ChevronDown className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
            >
              <div className="font-display font-black text-3xl text-accent">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Stats 2x2 grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-5"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-center justify-center text-center bg-secondary/50 rounded-2xl p-6 shadow-card border border-border/50"
              >
                <div className="font-display font-black text-4xl md:text-5xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm font-medium leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/8 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-5 tracking-wider uppercase">
              About Us
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight mb-5">
              Anakapalli's Most <span className="text-primary">Reliable</span>{" "}
              Transport Service
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              Founded in Anakapalli, Andhra Pradesh, Jaya Laxmi Transport has
              been serving clients across the region for over 15 years. We
              specialize in all types of transportation services — from local
              goods delivery to long-distance haulage — ensuring your cargo
              reaches its destination safely and on time.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              Under the leadership of{" "}
              <strong className="text-foreground font-semibold">
                Proprietor {PROPRIETOR}
              </strong>
              , we have built a reputation for punctuality, transparency, and
              professionalism. Our fleet is well-maintained, and our drivers are
              experienced professionals committed to safe operations.
            </p>

            {/* Trust pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: ShieldCheck,
                  label: "Fully Insured",
                  desc: "All vehicles and cargo insured",
                },
                {
                  icon: Clock,
                  label: "On-Time Delivery",
                  desc: "99% on-time delivery rate",
                },
                {
                  icon: Star,
                  label: "Trusted by 500+",
                  desc: "Happy clients across the region",
                },
                {
                  icon: Truck,
                  label: "Well-Maintained Fleet",
                  desc: "Regular maintenance & inspection",
                },
              ].map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            What We Do
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight mb-4">
            All Types of{" "}
            <span className="text-primary">Transport Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From local delivery to cross-country haulage, we cover every type of
            transportation need across Andhra Pradesh.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 border border-border/60"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 flex items-center justify-center mb-4 transition-all duration-300">
                <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-primary relative overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            Get In Touch
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-4">
            Ready to Move? <span className="text-accent">Call Us Today</span>
          </h2>
          <p className="text-white/70 text-lg">
            We're available 24/7 for all your transportation needs across Andhra
            Pradesh.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Call card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Phone className="w-8 h-8 text-accent-foreground" />
            </div>
            <div className="text-white/70 text-sm font-medium mb-2 uppercase tracking-wider">
              Phone
            </div>
            <a
              href={`tel:${PHONE}`}
              className="font-display font-black text-3xl text-white hover:text-accent transition-colors block mb-5"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={`tel:${PHONE}`}
              data-ocid="contact.primary_button"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-bold text-base hover:brightness-105 active:scale-95 transition-all w-full justify-center shadow-md"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
          >
            <h3 className="font-display font-bold text-xl text-white mb-6">
              Business Info
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4.5 h-4.5 text-white/80" />
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-0.5">
                    Business
                  </div>
                  <div className="text-white font-semibold">
                    {BUSINESS_NAME}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4.5 h-4.5 text-white/80" />
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-0.5">
                    Proprietor
                  </div>
                  <div className="text-white font-semibold">{PROPRIETOR}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4.5 h-4.5 text-white/80" />
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-0.5">
                    Location
                  </div>
                  <div className="text-white font-semibold">{LOCATION}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GalleryPage() {
  return (
    <section
      data-ocid="gallery.section"
      className="pt-28 pb-24 md:pt-32 md:pb-32 bg-background min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            Photo Gallery
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight mb-4">
            Our Vehicle <span className="text-primary">Fleet</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A look at our well-maintained fleet serving Anakapalli and Andhra
            Pradesh.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              data-ocid={`gallery.item.${i + 1}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all border border-border/50"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt={`Jaya Laxmi Transport vehicle ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({
  setActiveTab,
}: {
  setActiveTab: (tab: ActiveTab) => void;
}) {
  const year = new Date().getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  const handleHomeLink = (id: string) => {
    setActiveTab("home");
    setTimeout(() => smoothScrollTo(id), 50);
  };

  const handleGalleryLink = () => {
    setActiveTab("gallery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-white py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display font-bold text-base text-white">
                {BUSINESS_NAME}
              </div>
              <div className="text-white/50 text-xs">{LOCATION}</div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-5">
            {HOME_NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleHomeLink(id)}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={handleGalleryLink}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Gallery
            </button>
          </nav>

          <div className="text-center md:text-right">
            <div className="text-white/50 text-xs">
              &copy; {year} {BUSINESS_NAME}. All rights reserved.
            </div>
            <div className="text-white/30 text-xs mt-1">
              Built with ❤️ using{" "}
              <a
                href={utmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingCallButton() {
  return (
    <motion.a
      href={`tel:${PHONE}`}
      data-ocid="floating.primary_button"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-6 right-5 z-50 md:hidden flex items-center gap-2.5 bg-accent text-accent-foreground px-5 py-3.5 rounded-full font-bold shadow-xl hover:brightness-105 active:scale-95 transition-all"
      aria-label="Call Jaya Laxmi Transport"
    >
      <Phone className="w-5 h-5" />
      <span className="text-sm font-bold">Call Now</span>
    </motion.a>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");

  useMetaTags({
    title:
      "Jaya Laxmi Transport - Transport Services in Anakapalli, Andhra Pradesh",
    description:
      "Jaya Laxmi Transport offers all types of transportation services in Anakapalli, Andhra Pradesh. Contact Pentakota Parameshwarao at 7396888333.",
    keywords:
      "Anakapalli Transport, Transport Services in Anakapalli, Jaya Laxmi Transport, goods transport Anakapalli",
    ogTitle: "Jaya Laxmi Transport - Anakapalli's Trusted Transport Partner",
    ogDescription:
      "All types of transportation services in Anakapalli, Andhra Pradesh. Reliable, safe, and on-time. Call 7396888333.",
    ogType: "website",
  });

  return (
    <div className="min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <AnimatePresence mode="wait">
          {activeTab === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HeroSection />
              <AboutSection />
              <ServicesSection />
              <ContactSection />
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <GalleryPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer setActiveTab={setActiveTab} />
      <FloatingCallButton />
    </div>
  );
}
