<template>
  <v-app>
    <div class="site-shell">
      <header class="site-navbar">
        <div class="site-nav-container">
          <NuxtLink class="site-brand" to="/" aria-label="Duta Raya Marine, beranda">
            <img src="/logo-header.png" alt="Duta Raya Marine" />
          </NuxtLink>

          <button
            class="site-menu-toggle"
            type="button"
            :aria-expanded="menuOpen"
            aria-label="Buka atau tutup navigasi"
            @click="menuOpen = !menuOpen"
          >
            <v-icon :icon="menuOpen ? 'mdi-close' : 'mdi-menu'" />
          </button>

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
          </nav>
        </div>
      </header>

      <main class="site-main">
        <slot />
      </main>

      <footer class="site-footer">
        <div class="site-footer-inner">
          <span>PT. Duta Raya Marine &copy; {{ new Date().getFullYear() }}. All rights reserved.</span>
          <span>Batam &amp; Jakarta, Indonesia</span>
        </div>
      </footer>
    </div>
    <Whatsapp />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

const menuOpen = ref(false);
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

body {
  margin: 0;
  background: #f8fafc;
  color: #1e293b;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.site-shell {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: #f8fafc;
  background-image:
    linear-gradient(to right, rgba(15, 23, 42, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.025) 1px, transparent 1px);
  background-size: 32px 32px;
}

.site-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12px);
}

.site-nav-container,
.site-footer-inner {
  width: min(1120px, 100% - 48px);
  margin: 0 auto;
}

.site-nav-container {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.site-brand {
  display: inline-flex;
  align-items: center;
}

.site-brand img {
  display: block;
  width: auto;
  height: 50px;
  object-fit: contain;
}

.site-nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.site-nav-links a {
  color: #475569;
  text-decoration: none;
  font-size: 14px;
  font-weight: 650;
  transition: color 160ms ease;
}

.site-nav-links a:hover,
.site-nav-links a.is-active {
  color: #dc2626;
}

.site-menu-toggle {
  display: none;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  color: #0f172a;
}

.site-main {
  position: relative;
  z-index: 1;
  width: 100%;
  flex: 1;
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

.site-footer {
  margin-top: auto;
  padding: 20px 0;
  background: #0f172a;
  color: #cbd5e1;
  font-size: 12px;
}

.site-footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

@media (max-width: 760px) {
  .site-nav-container,
  .site-footer-inner,
  .site-container {
    width: calc(100% - 32px);
  }

  .site-nav-container {
    min-height: 68px;
  }

  .site-brand img {
    height: 44px;
  }

  .site-menu-toggle {
    display: grid;
  }

  .site-nav-links {
    position: absolute;
    top: calc(100% + 1px);
    right: 0;
    left: 0;
    display: none;
    align-items: stretch;
    gap: 0;
    padding: 8px 16px 14px;
    border-bottom: 1px solid #e2e8f0;
    background: #fff;
  }

  .site-nav-links.is-open {
    display: flex;
    flex-direction: column;
  }

  .site-nav-links a {
    padding: 12px 4px;
  }

  .site-container {
    padding: 44px 0 60px;
  }

  .site-info-grid {
    grid-template-columns: 1fr;
  }

  .site-cta,
  .site-footer-inner {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
