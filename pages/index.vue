<script setup lang="ts">
definePageMeta({ layout: "website" });

const highlights = [
  {
    icon: "mdi-package-variant-closed",
    title: "Marine Supplies",
    desc: "Consumables, safety equipment, valves, and essential ship supplies.",
    to: "/products",
  },
  {
    icon: "mdi-engine",
    title: "Spare Parts",
    desc: "Parts and equipment for marine engines, machinery, and refrigeration.",
    to: "/products",
  },
  {
    icon: "mdi-cog-sync",
    title: "Technical Services",
    desc: "On-site maintenance, troubleshooting, and multidisciplinary repairs.",
    to: "/services",
  },
];
</script>

<template>
  <div class="site-container home-page">
    <section class="home-hero">
      <div class="home-hero-copy">
        <p class="site-kicker">Batam &amp; Jakarta, Indonesia</p>
        <h1 class="site-title">DUTA RAYA<br /><span>MARINE</span></h1>
        <p class="site-lead">
          PT. Duta Raya Marine supplies dependable equipment, vessel provisions,
          and technical services for marine and offshore operations.
        </p>
        <div class="home-actions">
          <NuxtLink class="site-button" to="/contact">
            Hubungi tim kami <v-icon icon="mdi-arrow-right" size="18" />
          </NuxtLink>
          <NuxtLink class="home-secondary-link" to="/about">Kenali perusahaan kami</NuxtLink>
        </div>
      </div>
      <div class="home-hero-art">
        <img src="/Logo-DRM.png" alt="Logo PT. Duta Raya Marine" />
        <div class="hero-art-caption">
          <span class="hero-art-dot"></span>
          Supporting marine operations across Indonesia
        </div>
      </div>
    </section>

    <section class="home-intro">
      <div>
        <p class="site-kicker">What we do</p>
        <h2 class="site-section-title">Integrated support for your vessel and operation</h2>
      </div>
      <p class="site-section-copy">
        From sourcing critical parts to carrying out onboard repairs, our team
        helps keep marine operations moving safely and efficiently.
      </p>
    </section>

    <section class="site-card-grid home-highlights" aria-label="Produk dan layanan utama">
      <NuxtLink v-for="item in highlights" :key="item.title" class="site-card highlight-card" :to="item.to">
        <div class="site-card-icon"><v-icon :icon="item.icon" size="25" /></div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <span class="highlight-link">Pelajari lebih lanjut <v-icon icon="mdi-arrow-right" size="16" /></span>
      </NuxtLink>
    </section>

    <section class="home-about-strip">
      <div class="about-strip-mark"><v-icon icon="mdi-anchor" size="34" /></div>
      <div>
        <p class="site-kicker">Duta Raya Marine</p>
        <h2>Practical marine support, from inquiry to delivery.</h2>
        <p>Based in Batam, serving shipowners, shipyards, offshore platforms, and operators.</p>
      </div>
      <NuxtLink class="strip-link" to="/about">Tentang kami <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding-top: 55px;
}

.home-hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 42px;
  min-height: 390px;
}

.home-hero-copy .site-lead {
  max-width: 580px;
}

.home-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-top: 28px;
}

.home-secondary-link {
  color: #475569;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.home-secondary-link:hover,
.highlight-link:hover {
  color: #dc2626;
}

.home-hero-art {
  position: relative;
  display: grid;
  min-height: 300px;
  place-items: center;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  background: radial-gradient(circle at center, #26364c, #0f172a 72%);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
}

.home-hero-art::before,
.home-hero-art::after {
  position: absolute;
  width: 280px;
  height: 280px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  content: "";
}

.home-hero-art::after {
  width: 390px;
  height: 390px;
}

.home-hero-art img {
  position: relative;
  z-index: 1;
  width: min(62%, 270px);
  max-height: 150px;
  object-fit: contain;
}

.hero-art-caption {
  position: absolute;
  right: 18px;
  bottom: 17px;
  left: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  font-size: 11px;
}

.hero-art-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ef4444;
}

.home-intro {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin: 74px 0 23px;
}

.home-intro .site-section-title {
  max-width: 540px;
}

.home-intro .site-section-copy {
  max-width: 390px;
  margin: 0 0 12px;
}

.home-highlights .site-card {
  min-height: 230px;
  text-decoration: none;
}

.highlight-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: auto;
  padding-top: 20px;
  color: #0f172a;
  font-size: 12px;
  font-weight: 750;
}

.home-about-strip {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 48px;
  padding: 26px 30px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
}

.about-strip-mark {
  display: grid;
  width: 60px;
  height: 60px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 14px;
  background: #fef2f2;
  color: #dc2626;
}

.home-about-strip .site-kicker {
  margin-bottom: 7px;
}

.home-about-strip h2 {
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 19px;
}

.home-about-strip p:last-child {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

.strip-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  color: #dc2626;
  white-space: nowrap;
  text-decoration: none;
  font-size: 13px;
  font-weight: 750;
}

@media (max-width: 760px) {
  .home-page {
    padding-top: 35px;
  }

  .home-hero {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .home-hero-art {
    min-height: 245px;
  }

  .home-intro {
    align-items: flex-start;
    flex-direction: column;
    gap: 0;
    margin-top: 52px;
  }

  .home-about-strip {
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 22px;
  }

  .strip-link {
    margin-left: 82px;
  }
}
</style>
