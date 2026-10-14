<template>
  <v-app>
    <div class="site-shell">
      <div class="site-fixed-header" :class="{ 'is-hidden': headerHidden }">
        <!-- TOP UTILITY BAR INDUSTRIAL -->
        <div class="site-utility-bar">
          <div class="site-utility-inner">
            <div class="utility-left">
              <!-- <span class="utility-badge">ISO 9001 / IACS STANDARDS</span> -->
              <span>Supply Sparepart &amp; Layanan Teknis Kapal Tanker · Indonesia</span>
            </div>
            <div class="utility-right">
              <!-- <a href="tel:+628111234567" class="utility-contact bold">
                <v-icon icon="mdi-phone" size="13" /> Emergency Support 24/7
              </a>
              <span class="sep">|</span>
              <a href="mailto:sales@dutarayamarine.com" class="utility-contact">
                <v-icon icon="mdi-email" size="13" /> sales@dutarayamarine.com
              </a>
              <span class="sep">|</span> -->
              <div class="lang">
                <strong>ID</strong> / <span>EN</span>
              </div>
            </div>
          </div>
        </div>

        <!-- MAIN NAVBAR -->
        <header class="site-navbar">
          <div class="site-nav-container">
            <NuxtLink class="site-brand" to="/" aria-label="Duta Raya Marine, beranda">
              <img src="/main-logo.png" alt="Duta Raya Marine" />
              <!-- <div class="brand-info">
                <span class="brand-name">PT. DUTA RAYA MARINE</span>
                <span class="brand-tag">Tanker &amp; Offshore Supply</span>
              </div> -->
            </NuxtLink>

            <button
              class="site-menu-toggle"
              type="button"
              :aria-expanded="menuOpen"
              aria-label="Buka atau tutup navigasi"
              @click="menuOpen = !menuOpen"
            >
              <v-icon :icon="menuOpen ? 'mdi-close' : 'mdi-menu'" size="25" />
            </button>

            <span class="mobile-language" aria-label="Bahasa Inggris">EN</span>

            <nav class="site-nav-links" :class="{ 'is-open': menuOpen }" aria-label="Navigasi utama">
              <NuxtLink
                v-for="link in links"
                :key="link.to"
                :to="link.to"
                exact-active-class="is-active"
                @click="menuOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
              <NuxtLink to="/contact" class="mobile-rfq" @click="menuOpen = false">
                CONTACT US
              </NuxtLink>
            </nav>

            <NuxtLink class="site-nav-cta" to="/contact">
              CONTACT US
            </NuxtLink>
          </div>
        </header>
      </div>

      <main class="site-main">
        <slot />
      </main>

      <section class="footer-contact-cta">
        <div class="footer-contact-cta-inner">
          <div>
            <p class="footer-eyebrow">PT. DUTA RAYA MARINE</p>
            <h2>Have a marine requirement?</h2>
            <p>Talk to our team about procurement, technical service, or emergency port support.</p>
          </div>
          <NuxtLink to="/contact">Contact our team <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
        </div>
      </section>

      <footer class="site-footer">
        <div class="site-footer-main">
          <div class="footer-company">
            <p>Marine and offshore equipment, spare parts, and technical services for vessel operations.</p>
            <a class="footer-contact-link" href="mailto:sales@dutarayamarine.com"><v-icon icon="mdi-email-outline" size="18" /> sales@dutarayamarine.com</a>
          </div>

          <nav class="footer-column" aria-label="Navigasi footer">
            <h2>Explore</h2>
            <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
          </nav>

          <nav class="footer-column" aria-label="Produk dan layanan">
            <h2>Our capabilities</h2>
            <NuxtLink to="/products">Engine &amp; machinery parts</NuxtLink>
            <NuxtLink to="/products">Ship supplies &amp; consumables</NuxtLink>
            <NuxtLink to="/products">HVAC &amp; refrigeration</NuxtLink>
            <NuxtLink to="/services">Mechanical services</NuxtLink>
            <NuxtLink to="/services">HVAC &amp; refrigeration services</NuxtLink>
          </nav>

          <div class="footer-column footer-offices">
            <h2>Our offices</h2>
            <p><strong>Batam</strong><br />Ruko Dream Land Blok H3 No. 05, Dreamland Square, Marina City Tanjung Riau, Sekupang, Batam 29425</p>
            <p><strong>Jakarta</strong><br />Jln. Raya Pasar Minggu No. 15A, Jakarta Selatan</p>
          </div>
        </div>

        <div class="site-footer-bottom">
          <span>PT. Duta Raya Marine &copy; {{ new Date().getFullYear() }}. All rights reserved.</span>
          <span>Batam &amp; Jakarta, Indonesia</span>
        </div>
      </footer>

      <Transition name="scroll-top">
        <button
          v-if="showScrollTop"
          class="scroll-top-button"
          type="button"
          aria-label="Kembali ke atas"
          @click="scrollToTop"
        >
          <span>Back to top</span>
          <v-icon icon="mdi-arrow-up" size="18" />
        </button>
      </Transition>
    </div>
    <Whatsapp />
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const menuOpen = ref(false);
const showScrollTop = ref(false);
const headerHidden = ref(false);
let lastScrollY = 0;

function updateScrollState() {
  const currentScrollY = window.scrollY;
  showScrollTop.value = currentScrollY > 420;

  if (menuOpen.value || currentScrollY <= 80) {
    headerHidden.value = false;
  } else if (currentScrollY > lastScrollY + 3) {
    headerHidden.value = true;
  } else if (currentScrollY < lastScrollY - 3) {
    headerHidden.value = false;
  }

  lastScrollY = currentScrollY;
}

function scrollToTop() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  window.scrollTo({ top: 0, behavior });
}

onMounted(() => {
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
});

onUnmounted(() => window.removeEventListener("scroll", updateScrollState));

const links = [
  { label: "Beranda", to: "/" },
  { label: "Tentang Kami", to: "/about" },
  { label: "Produk", to: "/products" },
  { label: "Layanan", to: "/services" },
  { label: "Kontak", to: "/contact" },
];
</script>

<style>
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  margin: 0;
  background: #ffffff;
  color: #1e293b;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

:where(a, button):focus-visible {
  outline: 3px solid rgba(220, 38, 38, .8);
  outline-offset: 3px;
}

.site-shell {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: #ffffff;
}

/* ==========================================================================
   HEADER REDESIGN (SOLID & INDUSTRIAL)
   ========================================================================== */
.site-fixed-header {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  transition: transform 240ms ease;
  will-change: transform;
}

.site-fixed-header.is-hidden {
  transform: translateY(-100%);
}

.site-utility-bar {
  background: #0f172a;
  color: #94a3b8;
  font-size: 11px;
  border-bottom: 1px solid #1e293b;
}

.site-utility-inner {
  display: flex;
  width: min(1240px, 100% - 48px);
  min-height: 34px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.utility-left,
.utility-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.utility-badge {
  background: #dc2626;
  color: #ffffff;
  font-weight: 800;
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 2px;
  letter-spacing: 0.5px;
}

.utility-contact {
  color: #cbd5e1;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.utility-contact:hover {
  color: #ffffff;
}

.utility-contact.bold {
  color: #f87171;
  font-weight: 700;
}

.sep {
  color: #334155;
}

.lang {
  color: #64748b;
  font-size: 10px;
}

.lang strong {
  color: #dc2626;
}

.site-navbar {
  position: relative;
  border-bottom: 3px solid #dc2626;
  background: #ffffff;
}

.site-nav-container {
  width: min(1240px, 100% - 48px);
  min-height: 72px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.site-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.site-brand img {
  display: block;
  width: auto;
  height: 42px;
  object-fit: contain;
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-name {
  color: #0f172a;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: -0.2px;
  line-height: 1.1;
}

.brand-tag {
  color: #64748b;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.site-nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.site-nav-links a {
  position: relative;
  padding: 8px 12px;
  border-radius: 4px;
  color: #334155;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  transition: color 160ms ease, background 160ms ease;
}

.site-nav-links a:hover {
  color: #dc2626;
  background: #f8fafc;
}

.site-nav-links a.is-active {
  color: #dc2626;
  background: #ffecec;
}

.site-nav-cta {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  gap: 7px;
  padding: 0 18px;
  border-radius: 4px;
  background: #dc2626;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  transition: background 160ms ease;
}

.site-nav-cta:hover {
  background: #b91c1c;
}

.mobile-rfq {
  display: none;
}

.site-menu-toggle {
  display: none;
  width: 25px;
  height: 25px;
  place-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: #fff;
  color: #0f172a;
  cursor: pointer;
}

.mobile-language {
  display: none;
}

/* ==========================================================================
   PAGE CONTENT CLASSES (MURNI & TIDAK DIHAPUS)
   ========================================================================== */
.site-main {
  position: relative;
  z-index: 1;
  width: 100%;
  flex: 1;
  padding-top: 106px;
}

.site-container {
  width: min(1120px, 100% - 48px);
  margin: 0 auto;
  padding: 64px 0 80px;
}

.site-page-heading {
  max-width: 760px;
  margin-bottom: 34px;
}

.site-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;
  color: #475569;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.site-kicker::before {
  width: 30px;
  height: 4px;
  border-radius: 4px;
  background: #dc2626;
  content: "";
}

.site-title {
  margin: 0;
  color: #0f172a;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.08;
}

.site-title span,
.site-red {
  color: #dc2626;
}

.site-lead {
  max-width: 760px;
  margin: 16px 0 0;
  color: #64748b;
  font-size: 16px;
  line-height: 1.7;
}

.site-section-title {
  margin: 0 0 12px;
  color: #0f172a;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 850;
  letter-spacing: -0.025em;
}

.site-section-copy {
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
}

.site-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.site-card {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #fff;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.site-card:hover {
  transform: translateY(-2px);
  border-color: #fecaca;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.07);
}

.site-card-icon {
  display: grid;
  width: 48px;
  height: 48px;
  margin-bottom: 17px;
  place-items: center;
  border-radius: 12px;
  background: #fef2f2;
  color: #dc2626;
}

.site-card h3 {
  margin: 0 0 9px;
  color: #0f172a;
  font-size: 17px;
  line-height: 1.35;
}

.site-card p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.65;
}

.site-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 18px;
}

.site-tags span {
  padding: 4px 8px;
  border-radius: 5px;
  background: #f1f5f9;
  color: #475569;
  font-size: 11px;
  font-weight: 650;
}

.site-panel {
  padding: clamp(24px, 5vw, 42px);
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #fff;
}

.site-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 48px;
  padding: 30px;
  border-radius: 16px;
  background: #0f172a;
  color: #fff;
}

.site-cta h2 {
  margin: 0 0 7px;
  font-size: 22px;
}

.site-cta p {
  margin: 0;
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
}

.site-cta a,
.site-button {
  display: inline-flex;
  min-height: 44px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 18px;
  border: 0;
  border-radius: 9px;
  background: #dc2626;
  color: #fff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 750;
}

.site-info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.site-info-card {
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #fff;
}

.site-info-card h2 {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 14px;
  color: #0f172a;
  font-size: 17px;
}

.site-info-card p,
.site-info-card address {
  margin: 0 0 11px;
  color: #475569;
  font-size: 13px;
  font-style: normal;
  line-height: 1.65;
}

/* ==========================================================================
   FOOTER SECTION
   ========================================================================== */
.footer-contact-cta {
  position: relative;
  overflow: hidden;
  padding: 52px 24px;
  background: #0f172a;
  color: #fff;
  border-top: 4px solid #dc2626;
}

.footer-contact-cta-inner,
.site-footer-main,
.site-footer-bottom {
  width: min(1200px, 100% - 48px);
  margin: 0 auto;
}

.footer-contact-cta-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.footer-eyebrow {
  margin: 0 0 9px;
  color: #f87171;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 1.5px;
}

.footer-contact-cta h2 {
  margin: 0;
  color: #fff;
  font-size: clamp(23px, 3vw, 34px);
  font-weight: 850;
  letter-spacing: -.03em;
}

.footer-contact-cta p:not(.footer-eyebrow) {
  margin: 8px 0 0;
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
}

.footer-contact-cta-inner > a {
  display: inline-flex;
  min-height: 48px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 20px;
  border-radius: 4px;
  background: #fff;
  color: #101b30;
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
}

.footer-contact-cta-inner > a:hover {
  background: #f1f5f9;
}

.site-footer {
  margin-top: auto;
  background: #090d16;
  color: #94a3b8;
}

.site-footer-main {
  display: grid;
  grid-template-columns: 1.2fr .7fr 1fr 1.15fr;
  gap: 42px;
  padding-top: 62px;
  padding-bottom: 54px;
}

.footer-company > p {
  max-width: 280px;
  margin: 0 0 22px;
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.7;
}

.footer-contact-link {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 11px;
  color: #e5eaf1;
  text-decoration: none;
  font-size: 13px;
}

.footer-contact-link:hover,
.footer-column a:hover {
  color: #ff7378;
}

.footer-column {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 13px;
}

.footer-column h2 {
  position: relative;
  margin: 0 0 10px;
  padding-bottom: 11px;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.footer-column h2::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 28px;
  height: 2px;
  border-radius: 2px;
  background: #dc2626;
  content: "";
}

.footer-column a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.5;
  transition: color 160ms ease;
}

.footer-column p {
  margin: 0;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.65;
}

.footer-column p + p {
  margin-top: 4px;
}

.footer-column p strong {
  display: inline-block;
  margin-bottom: 3px;
  color: #fff;
  font-size: 12px;
}

.footer-offices p {
  padding-left: 12px;
  border-left: 2px solid #dc2626;
}

.site-footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding-top: 18px;
  padding-bottom: 20px;
  border-top: 1px solid rgba(226, 232, 240, .12);
  color: #94a3b8;
  font-size: 11px;
}

.scroll-top-button {
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 450;
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  background: #dc2626;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .04em;
  text-transform: uppercase;
  transition: background 160ms ease;
}

.scroll-top-button:hover {
  background: #b91c1c;
}

.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

/* RESPONSIVE LAYOUT */
@media (prefers-reduced-motion: reduce) {
  .site-fixed-header {
    transition: none;
  }
}

@media (max-width: 1050px) {
  .site-footer-main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 38px;
  }

  .site-nav-container {
    position: relative;
    width: calc(100% - 48px);
    min-height: 76px;
    justify-content: center;
  }

  .site-brand {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .site-brand img {
    height: 60px;
  }

  .site-menu-toggle {
    position: absolute;
    left: 0;
    display: grid;
    width: 25px;
    height: 25px;
    border: 0;
    border-radius: 0;
    background: #dc2626;
    color: #fff;
  }

  .mobile-language {
    position: absolute;
    right: 0;
    display: block;
    color: #555;
    font-size: 16px;
    font-weight: 800;
  }

  .site-nav-links,
  .site-nav-cta {
    display: none;
  }

  .site-nav-links.is-open {
    position: absolute;
    top: 100%;
    right: -24px;
    left: -24px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 16px 14px;
    border-bottom: 3px solid #dc2626;
    background: #fff;
    box-shadow: 0 15px 28px rgba(15, 23, 42, .12);
  }

  .site-nav-links.is-open a {
    padding: 12px;
    border-bottom: 1px solid #f1f5f9;
  }

  .mobile-rfq {
    display: block;
    margin-top: 8px;
    background: #dc2626;
    color: #fff !important;
    text-align: center;
  }

  .site-main {
    padding-top: 79px;
  }
}

@media (max-width: 760px) {
  .site-nav-container,
  .site-container {
    width: calc(100% - 32px);
  }

  .footer-contact-cta-inner,
  .site-footer-main,
  .site-footer-bottom {
    width: calc(100% - 32px);
  }

  .site-nav-container {
    min-height: 76px;
  }

  .site-utility-bar {
    display: none;
  }

  .site-main {
    padding-top: 79px;
  }

  .brand-tag,
  .site-nav-cta {
    display: none;
  }

  .site-nav-links {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    display: none;
    align-items: stretch;
    gap: 0;
    padding: 8px 16px 14px;
    border-bottom: 3px solid #dc2626;
    background: #fff;
    box-shadow: 0 15px 28px rgba(15, 23, 42, .12);
  }

  .site-nav-links.is-open {
    display: flex;
    flex-direction: column;
  }

  .site-nav-links a {
    padding: 12px;
    border-bottom: 1px solid #f1f5f9;
  }

  .mobile-rfq {
    display: block;
    margin-top: 8px;
    padding: 12px;
    background: #dc2626;
    color: #ffffff !important;
    text-align: center;
    font-weight: 800;
    text-decoration: none;
    border-radius: 4px;
  }

  .site-container {
    padding: 44px 0 60px;
  }

  .site-info-grid {
    grid-template-columns: 1fr;
  }

  .site-cta,
  .site-footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-contact-cta {
    padding: 34px 0;
  }

  .footer-contact-cta-inner {
    align-items: flex-start;
    flex-direction: column;
  }

  .site-footer-main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 36px 28px;
    padding-top: 42px;
    padding-bottom: 38px;
  }

  .scroll-top-button {
    right: 16px;
    bottom: 24px;
  }
}

@media (max-width: 520px) {
  .site-footer-main {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .site-footer-bottom {
    gap: 8px;
  }

  .scroll-top-button {
    min-height: 42px;
    padding: 0 12px;
  }
}
</style>
