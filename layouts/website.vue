<template>
  <v-app>
    <div class="site-shell">
      <div
        class="site-fixed-header"
        :class="{
          'is-hidden': headerHidden,
          'is-scrolled': headerScrolled,
          'menu-is-open': menuOpen,
        }"
      >
        <!-- Compact company and contact rail -->
        <div class="site-utility-bar">
          <div class="site-utility-inner">
            <div class="utility-left">
              <span class="utility-status"><i aria-hidden="true"></i> {{ translate("Marine supply & technical services", "Pasokan kelautan & layanan teknis") }}</span>
              <span class="utility-divider" aria-hidden="true"></span>
              <span class="utility-location"><v-icon icon="mdi-map-marker-outline" size="13" /> Batam · Jakarta, Indonesia</span>
            </div>
            <div class="utility-right">
              <NuxtLink to="/about" class="utility-contact">
                {{ translate("Company profile", "Profil perusahaan") }}
              </NuxtLink>
              <span class="utility-divider" aria-hidden="true"></span>
              <a class="utility-contact">
                <v-icon icon="mdi-email-outline" size="14" /> sales@dutarayamarine.com
              </a>
            </div>
          </div>
        </div>

        <!-- Primary navigation -->
        <header class="site-navbar">
          <div class="site-nav-container">
            <NuxtLink class="site-brand" to="/" :aria-label="translate('Duta Raya Marine, home', 'Duta Raya Marine, beranda')">
              <span class="brand-mark"><img src="/main-logo.png" alt="" /></span>
              <span class="brand-info">
                <strong>PT. DUTA RAYA MARINE</strong>
                <small>{{ translate("Marine Partner, From Supply to Service", "Marine Partner, From Supply to Service") }}</small>
              </span>
            </NuxtLink>

            <nav
              id="primary-navigation"
              class="site-nav-links"
              :class="{ 'is-open': menuOpen }"
              :aria-label="translate('Primary navigation', 'Navigasi utama')"
            >
              <div class="mobile-menu-header">
                <span>{{ translate("Navigation", "Navigasi") }}</span>
                <small>PT. Duta Raya Marine</small>
              </div>

              <div v-for="link in links" :key="link.to" class="site-nav-item">
                <NuxtLink
                  :to="link.to"
                  class="site-nav-link"
                  exact-active-class="is-active"
                  @click="closeMenu"
                >
                  <span>{{ link.label }}</span>
                  <v-icon v-if="link.children" icon="mdi-chevron-down" size="15" />
                </NuxtLink>

                <div v-if="link.children" class="nav-flyout">
                  <div class="nav-flyout-heading">
                    <span>{{ link.eyebrow }}</span>
                    <strong>{{ link.flyoutTitle }}</strong>
                  </div>
                  <NuxtLink
                    v-for="child in link.children"
                    :key="child.title"
                    :to="child.to"
                    class="nav-flyout-link"
                    @click="closeMenu"
                  >
                    <span class="nav-flyout-icon"><v-icon :icon="child.icon" size="19" /></span>
                    <span><strong>{{ child.title }}</strong><small>{{ child.description }}</small></span>
                    <v-icon class="nav-flyout-arrow" icon="mdi-arrow-up-right" size="16" />
                  </NuxtLink>
                  <NuxtLink :to="link.to" class="nav-flyout-all" @click="closeMenu">
                    {{ translate("View all", "Lihat semua") }} {{ link.label.toLowerCase() }}
                    <v-icon icon="mdi-arrow-right" size="16" />
                  </NuxtLink>
                </div>
              </div>

              <NuxtLink to="/contact" class="mobile-rfq" @click="closeMenu">
                <span>{{ translate("Request a quotation", "Minta penawaran") }}</span>
                <v-icon icon="mdi-arrow-right" size="18" />
              </NuxtLink>

              <div class="mobile-menu-meta">
                <span><v-icon icon="mdi-map-marker-outline" size="17" /> Batam &amp; Jakarta, Indonesia</span>
                <a ><v-icon icon="mdi-email-outline" size="17" /> sales@dutarayamarine.com</a>
              </div>
            </nav>

            <div
              class="site-language-switcher"
              role="group"
              :aria-label="translate('Choose language', 'Pilih bahasa')"
            >
              <button
                type="button"
                :class="{ 'is-active': locale === 'en' }"
                :aria-pressed="locale === 'en'"
                @click="setLocale('en')"
              >
                EN
              </button>
              <button
                type="button"
                :class="{ 'is-active': locale === 'id' }"
                :aria-pressed="locale === 'id'"
                @click="setLocale('id')"
              >
                ID
              </button>
            </div>

            <NuxtLink class="site-nav-cta" to="/contact">
              <span>{{ translate("Request a quotation", "Minta penawaran") }}</span>
              <v-icon icon="mdi-arrow-up-right" size="17" />
            </NuxtLink>

            <button
              ref="menuButton"
              class="site-menu-toggle"
              type="button"
              :aria-expanded="menuOpen"
              aria-controls="primary-navigation"
              :aria-label="menuOpen ? translate('Close navigation', 'Tutup navigasi') : translate('Open navigation', 'Buka navigasi')"
              @click="toggleMenu"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
        </header>

      </div>

      <button
        v-if="menuOpen"
        class="nav-backdrop"
        type="button"
        :aria-label="translate('Close navigation', 'Tutup navigasi')"
        @click="closeMenu"
      ></button>

      <main class="site-main">
        <slot />
      </main>

      <section class="footer-contact-cta">
        <div class="footer-contact-cta-inner">
          <div>
            <p class="footer-eyebrow">PT. DUTA RAYA MARINE</p>
            <h2>{{ translate("Have a marine requirement?", "Memiliki kebutuhan kelautan?") }}</h2>
            <p>{{ translate("Talk to our team about procurement, technical service, or emergency port support.", "Hubungi tim kami untuk pengadaan, layanan teknis, atau dukungan darurat di pelabuhan.") }}</p>
          </div>
          <NuxtLink to="/contact">{{ translate("Contact our team", "Hubungi tim kami") }} <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
        </div>
      </section>

      <footer class="site-footer">
        <div class="site-footer-main">
          <div class="footer-company">
            <p>{{ translate("Marine and offshore equipment, spare parts, and technical services for vessel operations.", "Peralatan kelautan dan lepas pantai, suku cadang, serta layanan teknis untuk operasional kapal.") }}</p>
            <a class="footer-contact-link" ><v-icon icon="mdi-email-outline" size="18" /> sales@dutarayamarine.com</a>
          </div>

          <nav class="footer-column" :aria-label="translate('Footer navigation', 'Navigasi footer')">
            <h2>{{ translate("Explore", "Jelajahi") }}</h2>
            <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
          </nav>

          <nav class="footer-column" :aria-label="translate('Products and services', 'Produk dan layanan')">
            <h2>{{ translate("Our capabilities", "Kemampuan kami") }}</h2>
            <NuxtLink to="/products">{{ translate("Engine & machinery parts", "Suku cadang mesin & permesinan") }}</NuxtLink>
            <NuxtLink to="/products">{{ translate("Ship supplies & consumables", "Perlengkapan kapal & bahan habis pakai") }}</NuxtLink>
            <NuxtLink to="/products">{{ translate("HVAC & refrigeration", "HVAC & refrigerasi") }}</NuxtLink>
            <NuxtLink to="/services">{{ translate("Mechanical services", "Layanan mekanikal") }}</NuxtLink>
            <NuxtLink to="/services">{{ translate("HVAC & refrigeration services", "Layanan HVAC & refrigerasi") }}</NuxtLink>
          </nav>

          <div class="footer-column footer-offices">
            <h2>{{ translate("Our offices", "Kantor kami") }}</h2>
            <p><strong>Batam</strong><br />Ruko Dreamland H3 No. 05, Tanjung Riau, Sekupang, Kota Batam, Kepulauan Riau.</p>
            <p><strong>Jakarta</strong><br />Jln. Raya Pasar Minggu No. 15A, Jakarta Selatan</p>
          </div>
        </div>

        <section
          class="footer-assurance"
          :aria-label="translate('Company statement', 'Pernyataan perusahaan')"
        >
          <div class="footer-assurance-inner">
            <p class="footer-forward-message">
              <span>YOUR MARINE PARTNER, FROM <strong>SUPPLY</strong> TO <strong>SERVICE</strong></span>
              <!-- YOUR MARINE PARTNER, FROM SUPPLY TO SERVICE -->
              <i class="footer-forward-arrows" aria-hidden="true"><b></b><b></b><b></b></i>
            </p>
          </div>
        </section>

        <div class="footer-legal-bar">
          <div class="site-footer-bottom">
            <span>Copyright &copy;{{ new Date().getFullYear() }} PT Duta Raya Marine. {{ translate("All Rights Reserved.", "Seluruh Hak Cipta Dilindungi.") }}</span>
            <span class="footer-policy-links">
              <NuxtLink to="/legal">Legal</NuxtLink>
              <i aria-hidden="true"></i>
              <NuxtLink to="/privacy-policy">{{ translate("Privacy Policy", "Kebijakan Privasi") }}</NuxtLink>
            </span>
          </div>
        </div>
      </footer>

      <Transition name="scroll-top">
        <button
          v-if="showScrollTop"
          class="scroll-top-button"
          type="button"
          :aria-label="translate('Back to top', 'Kembali ke atas')"
          @click="scrollToTop"
        >
          <span>{{ translate("Back to top", "Kembali ke atas") }}</span>
          <v-icon icon="mdi-arrow-up" size="15" />
        </button>
      </Transition>
    </div>
    <Whatsapp />
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const { locale, setLocale, translate } = useSiteLocale();

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === "id" ? "id" : "en",
  },
  meta: [
    {
      property: "og:locale",
      content: locale.value === "id" ? "id_ID" : "en_ID",
    },
  ],
}));

const menuOpen = ref(false);
const showScrollTop = ref(false);
const headerHidden = ref(false);
const headerScrolled = ref(false);
const menuButton = ref<HTMLButtonElement | null>(null);
const route = useRoute();
let lastScrollY = 0;

function updateScrollState() {
  const currentScrollY = window.scrollY;
  showScrollTop.value = currentScrollY > 420;
  headerScrolled.value = currentScrollY > 24;

  if (menuOpen.value || currentScrollY <= 80) {
    headerHidden.value = false;
  } else if (currentScrollY > lastScrollY + 3) {
    headerHidden.value = true;
  } else if (currentScrollY < lastScrollY - 3) {
    headerHidden.value = false;
  }

  lastScrollY = currentScrollY;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && menuOpen.value) {
    closeMenu();
    menuButton.value?.focus();
  }
}

function handleResize() {
  if (window.innerWidth > 1080 && menuOpen.value) closeMenu();
}

function scrollToTop() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  window.scrollTo({ top: 0, behavior });
}

onMounted(() => {
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("keydown", handleKeydown);
  updateScrollState();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollState);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("keydown", handleKeydown);
  document.documentElement.classList.remove("site-menu-open");
});

watch(menuOpen, (isOpen) => {
  document.documentElement.classList.toggle("site-menu-open", isOpen);
});

watch(() => route.fullPath, closeMenu);

type NavLink = {
  label: string;
  to: string;
  eyebrow?: string;
  flyoutTitle?: string;
  children?: Array<{
    title: string;
    description: string;
    icon: string;
    to: string;
  }>;
};

const links = computed<NavLink[]>(() => [
  { label: translate("Home", "Beranda"), to: "/" },
  { label: translate("About Us", "Tentang Kami"), to: "/about" },
  {
    label: translate("Products", "Produk"),
    to: "/products",
    eyebrow: translate("Product range", "Rangkaian produk"),
    flyoutTitle: translate("Equipment for reliable operations", "Peralatan untuk operasional yang andal"),
    children: [
      { title: translate("Engine & machinery", "Mesin & permesinan"), description: translate("Parts for engines, pumps, generators, and auxiliaries.", "Suku cadang untuk mesin, pompa, generator, dan peralatan bantu."), icon: "mdi-engine-outline", to: "/products" },
      { title: translate("Ship supplies", "Perlengkapan kapal"), description: translate("Deck, lifting, welding, coating, and consumables.", "Perlengkapan dek, pengangkatan, pengelasan, pelapisan, dan bahan habis pakai."), icon: "mdi-package-variant-closed", to: "/products" },
      { title: translate("HVAC & refrigeration", "HVAC & refrigerasi"), description: translate("Compressors, controls, AHUs, FCUs, and accessories.", "Kompresor, kontrol, AHU, FCU, dan aksesori."), icon: "mdi-snowflake", to: "/products" },
    ],
  },
  {
    label: translate("Services", "Layanan"),
    to: "/services",
    eyebrow: translate("Technical support", "Dukungan teknis"),
    flyoutTitle: translate("Practical response for every vessel", "Respons praktis untuk setiap kapal"),
    children: [
      { title: translate("Mechanical & engine", "Mekanikal & mesin"), description: translate("Repair, overhaul, alignment, and commissioning.", "Perbaikan, overhaul, alignment, dan commissioning."), icon: "mdi-cog-outline", to: "/services" },
      { title: translate("HVAC & refrigeration", "HVAC & refrigerasi"), description: translate("Maintenance, troubleshooting, retrofit, and testing.", "Pemeliharaan, troubleshooting, retrofit, dan pengujian."), icon: "mdi-air-conditioner", to: "/services" },
      { title: translate("Automation & control", "Otomasi & kontrol"), description: translate("Electrical support, controls, and vessel systems.", "Dukungan elektrikal, kontrol, dan sistem kapal."), icon: "mdi-tune-vertical", to: "/services" },
    ],
  },
  { label: translate("Projects", "Proyek"), to: "/projects" },
  { label: translate("Contact", "Kontak"), to: "/contact" },
]);
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
   HEADER — COMPACT MARINE COMMAND BAR
   ========================================================================== */
html.site-menu-open {
  overflow: hidden;
}

.site-fixed-header {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  transition: transform 240ms ease, box-shadow 240ms ease;
  will-change: transform;
}

.site-fixed-header.is-hidden {
  transform: translateY(-100%);
}

.site-fixed-header.menu-is-open {
  transform: none;
}

.site-fixed-header.is-scrolled {
  box-shadow: 0 10px 30px rgba(8, 18, 38, .12);
}

.site-utility-bar {
  max-height: 31px;
  overflow: hidden;
  border-bottom: 1px solid rgba(148, 163, 184, .16);
  background: #0b162a;
  color: #aeb9c8;
  font-size: 10px;
  transition: max-height 220ms ease, opacity 180ms ease, border-color 180ms ease;
}

.site-fixed-header.is-scrolled .site-utility-bar {
  max-height: 0;
  border-color: transparent;
  opacity: 0;
}

.site-utility-inner {
  display: flex;
  width: min(1320px, 100% - 56px);
  min-height: 30px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.utility-left,
.utility-right,
.utility-status,
.utility-location,
.utility-contact {
  display: flex;
  align-items: center;
}

.utility-left,
.utility-right {
  gap: 13px;
}

.utility-status {
  gap: 8px;
  color: #eef2f7;
  font-weight: 750;
  letter-spacing: .045em;
  text-transform: uppercase;
}

.utility-status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, .12);
}

.utility-location {
  gap: 4px;
}

.utility-divider {
  width: 1px;
  height: 12px;
  background: rgba(148, 163, 184, .28);
}

.utility-contact {
  gap: 5px;
  color: #c7d0dc;
  text-decoration: none;
  transition: color 160ms ease;
}

.utility-contact:hover {
  color: #fff;
}

.site-navbar {
  position: relative;
  z-index: 2;
  border-bottom: 1px solid #e8edf3;
  background: rgba(255, 255, 255, .98);
}

.site-navbar::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #d51f2b 0, #d51f2b 28%, transparent 28%);
  content: "";
}

.site-nav-container {
  display: flex;
  width: min(1320px, 100% - 56px);
  min-height: 70px;
  align-items: center;
  gap: clamp(22px, 3vw, 48px);
  margin: 0 auto;
}

.site-brand {
  display: inline-flex;
  min-width: max-content;
  align-items: center;
  gap: 12px;
  color: #0b162a;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 72px;
  height: 42px;
  place-items: center;
}

.brand-mark img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.brand-info {
  display: flex;
  padding-left: 12px;
  border-left: 1px solid #dbe2ea;
  flex-direction: column;
  line-height: 1;
}

.brand-info strong {
  color: #0b162a;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .035em;
}

.brand-info small {
  margin-top: 6px;
  color: #555f6b;
  font-size: 8px;
  font-weight: 650;
  letter-spacing: .11em;
  text-transform: uppercase;
}

.site-nav-links {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 1px;
}

.site-nav-item {
  position: relative;
}

.site-nav-link {
  position: relative;
  display: flex;
  min-height: 70px;
  align-items: center;
  gap: 5px;
  padding: 0 12px;
  color: #344154;
  text-decoration: none;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 750;
  transition: color 160ms ease;
}

.site-nav-link::after {
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  height: 3px;
  transform: scaleX(0);
  transform-origin: center;
  background: #d51f2b;
  content: "";
  transition: transform 180ms ease;
}

.site-nav-link:hover,
.site-nav-link.is-active,
.site-nav-item:focus-within > .site-nav-link {
  color: #c81e29;
}

.site-nav-link:hover::after,
.site-nav-link.is-active::after,
.site-nav-item:focus-within > .site-nav-link::after {
  transform: scaleX(1);
}

.site-nav-link .v-icon {
  transition: transform 180ms ease;
}

.site-nav-item:hover > .site-nav-link .v-icon,
.site-nav-item:focus-within > .site-nav-link .v-icon {
  transform: rotate(180deg);
}

.nav-flyout {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  width: 410px;
  padding: 10px;
  transform: translate(-50%, 8px);
  border: 1px solid #e1e7ee;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 22px 50px rgba(8, 18, 38, .17);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 160ms ease, transform 160ms ease, visibility 160ms ease;
}

.nav-flyout::before {
  position: absolute;
  right: 0;
  bottom: 100%;
  left: 0;
  height: 11px;
  content: "";
}

.nav-flyout::after {
  position: absolute;
  top: -5px;
  left: 50%;
  width: 10px;
  height: 10px;
  transform: translateX(-50%) rotate(45deg);
  border-top: 1px solid #e1e7ee;
  border-left: 1px solid #e1e7ee;
  background: #f5f7fa;
  content: "";
}

.site-nav-item:hover > .nav-flyout,
.site-nav-item:focus-within > .nav-flyout {
  transform: translate(-50%, 0);
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

.nav-flyout-heading {
  display: flex;
  padding: 15px 16px 13px;
  border-radius: 6px 6px 3px 3px;
  background: #f5f7fa;
  flex-direction: column;
}

.nav-flyout-heading span {
  margin-bottom: 5px;
  color: #d51f2b;
  font-size: 8px;
  font-weight: 850;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.nav-flyout-heading strong {
  color: #101b2e;
  font-size: 13px;
  letter-spacing: -.01em;
}

.nav-flyout-link {
  display: grid;
  grid-template-columns: 38px 1fr auto;
  align-items: center;
  gap: 11px;
  padding: 11px 10px;
  border-bottom: 1px solid #edf1f5;
  color: #172236;
  text-decoration: none;
  transition: background 160ms ease;
}

.nav-flyout-link:hover,
.nav-flyout-link:focus-visible {
  border-radius: 5px;
  background: #f8fafc;
}

.nav-flyout-icon {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid #e3e8ef;
  border-radius: 5px;
  background: #fff;
  color: #d51f2b;
}

.nav-flyout-link > span:nth-child(2) {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.nav-flyout-link strong {
  font-size: 11px;
}

.nav-flyout-link small {
  overflow: hidden;
  margin-top: 3px;
  color: #748093;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 9px;
}

.nav-flyout-arrow {
  color: #96a0af;
}

.nav-flyout-all {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px 6px;
  color: #b91c25;
  text-decoration: none;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.site-language-switcher {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border: 1px solid #e1e6ed;
  border-radius: 999px;
  background: #f2f5f8;
  box-shadow: inset 0 1px 2px rgba(15, 23, 42, .04);
}

.site-language-switcher button {
  width: 30px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #718096;
  cursor: pointer;
  font: inherit;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: .06em;
  transition: background 160ms ease, box-shadow 160ms ease, color 160ms ease;
}

.site-language-switcher button:not(.is-active):hover {
  background: rgba(255, 255, 255, .75);
  color: #263449;
}

.site-language-switcher button.is-active {
  background: #fff;
  box-shadow: 0 1px 4px rgba(15, 23, 42, .14);
  color: #c81e29;
}

.site-nav-cta {
  display: inline-flex;
  min-height: 42px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 17px;
  border: 1px solid #bc1722;
  border-radius: 4px;
  background: #d51f2b;
  box-shadow: 0 5px 14px rgba(213, 31, 43, .18);
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: .06em;
  text-transform: uppercase;
  transition: transform 160ms ease, background 160ms ease, box-shadow 160ms ease;
}

.site-nav-cta:hover {
  transform: translateY(-1px);
  background: #b91823;
  box-shadow: 0 8px 18px rgba(185, 24, 35, .24);
}

.site-menu-toggle,
.mobile-menu-header,
.mobile-rfq,
.mobile-menu-meta,
.nav-backdrop {
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
  padding-top: 101px;
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
.footer-assurance-inner,
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

.footer-assurance {
  position: relative;
  padding: 46px 0;
  border-top: 5px solid #dc2626;
  background: #fff;
  color: #111827;
}

.footer-assurance-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(36px, 6vw, 84px);
}

.footer-forward-message {
  display: flex;
  min-width: max-content;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: #111;
  font-size: clamp(21px, 2.15vw, 31px);
  font-style: italic;
  font-weight: 950;
  letter-spacing: -.055em;
  line-height: 1;
  white-space: nowrap;
}

.footer-forward-message strong {
  color: #dc2626;
  font-weight: inherit;
}

.footer-forward-arrows {
  display: inline-flex;
  align-items: center;
  margin-left: 1px;
}

.footer-forward-arrows b {
  width: 13px;
  height: 13px;
  margin-left: -4px;
  transform: rotate(-45deg);
  border-right: 4px solid #dc2626;
  border-bottom: 4px solid #dc2626;
}

.footer-legal-bar {
  background: #f0f0f0;
}

.site-footer-bottom {
  display: flex;
  min-height: 76px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  color: #515151;
  font-size: 11px;
}

.footer-policy-links {
  display: inline-flex;
  align-items: center;
  gap: 13px;
  margin-right: 180px;
  color: #515151;
  white-space: nowrap;
}

.footer-policy-links a {
  color: inherit;
  text-decoration: none;
  transition: color 160ms ease;
}

.footer-policy-links a:hover,
.footer-policy-links a:focus-visible {
  color: #b91c1c;
}

.footer-policy-links i {
  width: 1px;
  height: 18px;
  background: #777;
}

.scroll-top-button {
  position: fixed;
  right: 24px;
  bottom: 96px;
  z-index: 450;
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  gap: 7px;
  padding: 0 11px;
  border: none;
  border-radius: 4px;
  background: #dc2626;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 9px;
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

@media (max-width: 1080px) {
  .site-footer-main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 38px;
  }

  .footer-policy-links {
    margin-right: 140px;
  }

  .site-utility-bar {
    display: none;
  }

  .site-nav-container {
    position: relative;
    width: calc(100% - 40px);
    min-height: 72px;
    gap: 14px;
  }

  .brand-mark {
    width: 66px;
    height: 38px;
  }

  .site-nav-cta {
    margin-left: 0;
  }

  .site-language-switcher {
    margin-left: auto;
  }

  .site-nav-cta + .site-menu-toggle {
    margin-left: 0;
  }

  .site-menu-toggle {
    display: flex;
    width: 44px;
    height: 44px;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    border: 1px solid #dce3eb;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    flex-direction: column;
    gap: 5px;
  }

  .site-menu-toggle span {
    width: 18px;
    height: 2px;
    border-radius: 2px;
    background: #142036;
    transition: transform 180ms ease, opacity 180ms ease;
  }

  .menu-is-open .site-menu-toggle span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .menu-is-open .site-menu-toggle span:nth-child(2) {
    opacity: 0;
  }

  .menu-is-open .site-menu-toggle span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .site-nav-links {
    display: none;
  }

  .site-nav-links.is-open {
    position: absolute;
    top: calc(100% + 1px);
    left: 50%;
    z-index: 4;
    display: block;
    width: 100vw;
    max-height: calc(100dvh - 72px);
    overflow-y: auto;
    align-items: stretch;
    padding: 12px max(24px, calc((100vw - 960px) / 2)) 24px;
    transform: translateX(-50%);
    border-top: 0;
    border-bottom: 3px solid #d51f2b;
    background: #fff;
    box-shadow: 0 22px 45px rgba(8, 18, 38, .17);
  }

  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 2px 12px;
    border-bottom: 1px solid #e7ebf0;
  }

  .mobile-menu-header span {
    color: #101b2e;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .13em;
    text-transform: uppercase;
  }

  .mobile-menu-header small {
    color: #7d8898;
    font-size: 9px;
    font-weight: 700;
  }

  .site-nav-item {
    border-bottom: 1px solid #edf1f5;
  }

  .site-nav-link {
    min-height: 55px;
    justify-content: space-between;
    padding: 0 2px;
    color: #1f2c40;
    font-size: 14px;
    font-weight: 800;
  }

  .site-nav-link::after {
    top: 15px;
    right: auto;
    bottom: 15px;
    left: -24px;
    width: 3px;
    height: auto;
    transform: scaleY(0);
  }

  .site-nav-link.is-active::after {
    transform: scaleY(1);
  }

  .site-nav-link .v-icon {
    transform: rotate(-90deg);
  }

  .nav-flyout {
    display: none;
  }

  .mobile-rfq {
    display: flex;
    min-height: 48px;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding: 0 16px;
    border-radius: 4px;
    background: #d51f2b;
    color: #fff;
    text-decoration: none;
    font-size: 11px;
    font-weight: 850;
    letter-spacing: .06em;
    text-transform: uppercase;
  }

  .mobile-menu-meta {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-top: 14px;
    padding: 14px;
    border: 1px solid #e6ebf1;
    border-radius: 5px;
    background: #f7f9fb;
    flex-direction: column;
  }

  .mobile-menu-meta span,
  .mobile-menu-meta a {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #596679;
    text-decoration: none;
    font-size: 11px;
  }

  .mobile-menu-meta .v-icon {
    color: #d51f2b;
  }

  .nav-backdrop {
    position: fixed;
    z-index: 900;
    top: 72px;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    border: 0;
    background: rgba(7, 15, 29, .58);
    backdrop-filter: blur(2px);
  }

  .site-main {
    padding-top: 72px;
  }
}

@media (max-width: 760px) {
  .site-nav-container,
  .site-container {
    width: calc(100% - 32px);
  }

  .footer-contact-cta-inner,
  .site-footer-main,
  .footer-assurance-inner,
  .site-footer-bottom {
    width: calc(100% - 32px);
  }

  .site-nav-container {
    min-height: 72px;
  }

  .site-nav-links.is-open {
    padding-right: 16px;
    padding-left: 16px;
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

  .footer-policy-links {
    margin-right: 0;
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

  .footer-assurance {
    padding: 38px 0;
  }

  .footer-forward-message {
    width: 100%;
    min-width: 0;
    align-items: flex-end;
    white-space: normal;
    line-height: 1.18;
  }

  .footer-forward-message > span {
    min-width: 0;
    overflow-wrap: break-word;
  }

  .footer-forward-arrows {
    flex: 0 0 auto;
    margin-bottom: .12em;
  }

  .scroll-top-button {
    right: 16px;
    bottom: 88px;
  }
}

@media (max-width: 640px) {
  .site-nav-cta {
    display: none;
  }

  .site-menu-toggle {
    margin-left: 0;
  }
}

@media (max-width: 400px) {
  .brand-info {
    display: none;
  }
}

@media (max-width: 520px) {
  .site-nav-container {
    width: calc(100% - 24px);
    gap: 10px;
  }

  .brand-mark {
    width: 55px;
  }

  .brand-info {
    padding-left: 9px;
  }

  .brand-info strong {
    font-size: 10px;
  }

  .brand-info small {
    margin-top: 5px;
    font-size: 7px;
  }

  .site-footer-main {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .site-footer-bottom {
    gap: 8px;
    min-height: 0;
    padding: 22px 0;
  }

  .footer-forward-message {
    min-width: 0;
    font-size: clamp(17px, 5.7vw, 24px);
  }

  .footer-forward-arrows b {
    width: 10px;
    height: 10px;
    border-width: 0 3px 3px 0;
  }

  .footer-policy-links {
    gap: 10px;
  }

  .scroll-top-button {
    min-height: 34px;
    padding: 0 10px;
  }
}
</style>
