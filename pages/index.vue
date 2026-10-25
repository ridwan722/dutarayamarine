<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

definePageMeta({ layout: "website" });

const seoDescription =
  "PT Duta Raya Marine supplies marine equipment, ship spare parts, HVAC, and technical services for vessels, shipyards, and offshore operators in Batam and Jakarta.";

usePageSeo({
  title: "Marine Supplier Batam & Ship Spare Parts | Duta Raya Marine",
  description: seoDescription,
  path: "/",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "PT. Duta Raya Marine",
        url: "https://www.dutarayamarine.com/",
        logo: "https://www.dutarayamarine.com/Logo-DRM.png",
        email: "sales@dutarayamarine.com",
        description: seoDescription,
        address: [
          {
            "@type": "PostalAddress",
            streetAddress:
              "Ruko Dream Land Blok H3 No. 05, Dreamland Square, Marina City Tanjung Riau, Sekupang",
            addressLocality: "Batam",
            addressRegion: "Kepulauan Riau",
            postalCode: "29425",
            addressCountry: "ID",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "Jln. Raya Pasar Minggu No. 15A",
            addressLocality: "Jakarta Selatan",
            addressRegion: "DKI Jakarta",
            addressCountry: "ID",
          },
        ],
        areaServed: ["Batam", "Jakarta", "Indonesia"],
      }),
    },
  ],
});

const slides = [
  {
    image: "/carousel-1.jpg",
    kicker: "Duta Raya Marine · Batam, Indonesia",
    title: "Marine equipment",
    accent: "& ship spare parts.",
    description: "Marine machinery, genuine and OEM spare parts, and responsive technical support for shipowners, shipyards, and offshore operators.",
    action: "Explore our services",
    to: "/services",
  },
  {
    image: "/carousel-2.jpg",
    kicker: "Parts & equipment",
    title: "The right equipment",
    accent: "for every voyage.",
    description: "From main and auxiliary engines to pumps, hydraulics, and cooling systems, find parts matched to your equipment.",
    action: "Browse product range",
    to: "/products",
  },
  {
    image: "/carousel-3.jpg",
    kicker: "Based in Batam, Indonesia",
    title: "A responsive partner",
    accent: "at every port call.",
    description: "Talk to our team about procurement, mechanical repairs, HVAC service, or emergency port support.",
    action: "Talk to our team",
    to: "/contact",
  },
];

const activeSlide = ref(0);
const currentSlide = computed(() => slides[activeSlide.value]!);
let slideTimer: ReturnType<typeof setInterval> | undefined;
const productCategories = [
  { icon: "mdi-engine", title: "Engine & machinery", detail: "Genuine, OEM, and aftermarket parts for engines, generators, pumps, and machinery." },
  { icon: "mdi-package-variant-closed", title: "Ship supplies", detail: "Mooring, lifting, welding, coating, maintenance, and deck consumables." },
  { icon: "mdi-pump", title: "Hydraulic & cooling", detail: "Hydraulic and gearbox parts, pumps, radiators, coolers, and filters." },
  { icon: "mdi-snowflake", title: "HVAC & refrigeration", detail: "Compressors, refrigeration components, AHUs, FCUs, controls, and accessories." },
];

const services = [
  { icon: "mdi-cog-sync", title: "Mechanical & engine", to: "/services" },
  { icon: "mdi-air-conditioner", title: "HVAC & refrigeration", to: "/services" },
  { icon: "mdi-tune-vertical", title: "Automation & control", to: "/services" },
];

function changeSlide(direction: number) {
  activeSlide.value = (activeSlide.value + direction + slides.length) % slides.length;
}

onMounted(() => {
  slideTimer = setInterval(() => changeSlide(1), 5000);
});

onUnmounted(() => {
  if (slideTimer) clearInterval(slideTimer);
});
</script>

<template>
  <div class="homepage">
    <section class="hero-carousel" aria-label="Marine solutions highlights">
      <div
        class="hero-background"
        :style="{ backgroundImage: `url('${currentSlide.image}')` }"
        aria-hidden="true"
      ></div>
      <div class="hero-inner">
        <Transition name="hero-copy" mode="out-in">
          <div :key="activeSlide" class="hero-copy">
            <p class="hero-kicker"><span></span>{{ currentSlide.kicker }}</p>
            <h1>{{ currentSlide.title }}<br /><span>{{ currentSlide.accent }}</span></h1>
            <p class="hero-description">{{ currentSlide.description }}</p>
            <div class="hero-actions">
              <NuxtLink class="hero-button" :to="currentSlide.to">
                {{ currentSlide.action }} <v-icon icon="mdi-arrow-right" size="18" />
              </NuxtLink>
              <span class="hero-location"><v-icon icon="mdi-map-marker" size="17" /> Batam &amp; Jakarta</span>
            </div>
          </div>
        </Transition>

        <div class="hero-controls">
          <div class="hero-pagination" aria-label="Pilih slide">
            <button
              v-for="(_, index) in slides"
              :key="index"
              type="button"
              :aria-label="`Tampilkan slide ${index + 1}`"
              :aria-current="activeSlide === index ? 'true' : undefined"
              :class="{ active: activeSlide === index }"
              @click="activeSlide = index"
            />
          </div>
          <!-- <span class="slide-count">0{{ activeSlide + 1 }} <i>/</i> 0{{ slides.length }}</span> -->
          <div class="hero-arrows">
            <button type="button" aria-label="Slide sebelumnya" @click="changeSlide(-1)"><v-icon icon="mdi-arrow-left" /></button>
            <button type="button" aria-label="Slide berikutnya" @click="changeSlide(1)"><v-icon icon="mdi-arrow-right" /></button>
          </div>
        </div>
      </div>
      <div class="hero-edge-label">BUILT FOR MARINE OPERATIONS</div>
    </section>

    <section class="range-section site-container">
      <div class="section-heading-row">
        <div>
          <p class="site-kicker">What we supply</p>
          <h2 class="site-section-title">Marine parts &amp;<br /><span class="site-red">equipment supply</span></h2>
        </div>
        <NuxtLink class="text-link" to="/products">View all products <v-icon icon="mdi-arrow-right" size="17" /></NuxtLink>
      </div>

      <div class="range-grid">
        <NuxtLink v-for="(category, index) in productCategories" :key="category.title" to="/products" class="range-card">
          <div class="range-image" :class="`range-image-${index + 1}`">
            <span class="range-index">0{{ index + 1 }}</span>
            <v-icon :icon="category.icon" size="54" />
            <span class="range-image-line"></span>
          </div>
          <div class="range-card-copy">
            <h3>{{ category.title }}</h3>
            <p>{{ category.detail }}</p>
            <span class="range-link">Explore range <v-icon icon="mdi-arrow-right" size="16" /></span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="support-promo">
      <div class="support-promo-inner">
        <div class="support-graphic" aria-hidden="true">
          <div class="support-ring"></div>
          <v-icon icon="mdi-wrench-cog-outline" size="74" />
          <span class="support-graphic-tag">TECHNICAL SUPPORT</span>
        </div>
        <div class="support-copy">
          <p class="site-kicker">Service &amp; support</p>
          <h2>Keeping your vessel<br />ready for the next voyage.</h2>
          <p>From engine overhaul and hydraulic repairs to refrigeration commissioning, we coordinate practical technical support for your vessel.</p>
          <NuxtLink class="support-button" to="/services">Discover our services <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
        </div>
      </div>
    </section>

    <section class="service-preview site-container">
      <div class="section-heading-row">
        <div>
          <p class="site-kicker">How we support</p>
          <h2 class="site-section-title">Technical expertise.<br /><span class="site-red">Practical response.</span></h2>
        </div>
        <NuxtLink class="text-link" to="/services">All services <v-icon icon="mdi-arrow-right" size="17" /></NuxtLink>
      </div>
      <div class="service-list">
        <NuxtLink v-for="(service, index) in services" :key="service.title" :to="service.to" class="service-row">
          <span class="service-row-index">0{{ index + 1 }}</span>
          <span class="service-row-icon"><v-icon :icon="service.icon" size="23" /></span>
          <strong>{{ service.title }}</strong>
          <v-icon class="service-row-arrow" icon="mdi-arrow-up-right" size="20" />
        </NuxtLink>
      </div>
    </section>

    <section class="brand-strip">
      <div class="brand-strip-inner">
        <p>Supported engine &amp; compressor brands</p>
        <div class="brand-list"><span>MAN B&amp;W</span><span>WÄRTSILÄ</span><span>YANMAR</span><span>CATERPILLAR</span><span>BITZER</span><span>CARRIER</span></div>
      </div>
    </section>

    <section class="home-contact site-container">
      <div class="home-contact-copy">
        <p class="site-kicker">Start a conversation</p>
        <h2>Have a requirement?<br /><span>We’re ready to help.</span></h2>
        <p>Contact us for procurement, engineering consultation, or round-the-clock emergency port support.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.homepage {
  overflow: hidden;
  background: #fff;
}

.hero-carousel {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: #0b1425;
  color: #fff;
}

.hero-carousel::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(90deg, rgba(3, 8, 18, .96) 0%, rgba(5, 12, 25, .82) 38%, rgba(7, 14, 26, .32) 58%, transparent 76%);
  content: "";
}

.hero-background {
  position: absolute;
  z-index: -2;
  inset: 0;
  background-position: center;
  background-size: cover;
  transform: scale(1.02);
  transition: background-image 250ms ease;
}

.hero-inner {
  position: relative;
  display: grid;
  width: min(1200px, 100% - 48px);
  min-height: 590px;
  grid-template-columns: 1fr;
  align-items: center;
  margin: 0 auto;
  padding: 56px 0 92px;
}

.hero-copy {
  position: relative;
  z-index: 3;
  max-width: 640px;
}

.hero-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  color: #dbe3ee;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.7px;
  text-transform: uppercase;
}

.hero-kicker span {
  width: 30px;
  height: 3px;
  background: #ef3038;
}

.hero-copy h1 {
  max-width: 620px;
  margin: 0;
  color: #fff;
  font-size: clamp(40px, 5.5vw, 67px);
  font-weight: 900;
  letter-spacing: -.045em;
  line-height: 1.04;
}

.hero-copy h1 span {
  color: #f04449;
}

.hero-description {
  max-width: 490px;
  margin: 22px 0 0;
  color: #bdc9d9;
  font-size: 15px;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 22px;
  margin-top: 30px;
}

.hero-button,
.support-button,
.home-contact-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  border-radius: 6px;
  background: #dc2626;
  color: #fff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 750;
  transition: background 160ms ease, transform 160ms ease;
}

.hero-button:hover,
.support-button:hover,
.home-contact-button:hover {
  transform: translateY(-1px);
  background: #b91c1c;
}

.hero-location {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #d2dbe7;
  font-size: 12px;
}

.hero-controls {
  position: absolute;
  right: 0;
  bottom: 28px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 17px;
}

.hero-pagination {
  display: flex;
  align-items: center;
  gap: 7px;
}

.hero-pagination button {
  width: 22px;
  height: 3px;
  padding: 0;
  border: 0;
  background: #65748a;
  cursor: pointer;
}

.hero-pagination button.active {
  width: 42px;
  background: #ef3038;
}

.slide-count {
  color: #fff;
  font-size: 11px;
  font-weight: 750;
}

.slide-count i {
  margin: 0 4px;
  color: #718096;
  font-style: normal;
}

.hero-arrows {
  display: flex;
  gap: 7px;
  margin-left: auto;
}

.hero-arrows button {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, .25);
  border-radius: 50%;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: background 150ms ease;
}

.hero-arrows button:hover {
  background: #dc2626;
  border-color: #dc2626;
}

.hero-edge-label {
  position: absolute;
  top: 50%;
  right: 14px;
  color: rgba(203, 213, 225, .38);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .18em;
  writing-mode: vertical-rl;
}

.hero-copy-enter-active,
.hero-copy-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.hero-copy-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.hero-copy-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.range-section {
  padding-top: 76px;
  padding-bottom: 78px;
}

.section-heading-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.section-heading-row .site-kicker {
  margin-bottom: 12px;
}

.section-heading-row .site-section-title {
  margin-bottom: 0;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding-bottom: 5px;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 750;
}

.text-link:hover {
  color: #dc2626;
}

.range-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 15px;
}

.range-card {
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.range-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, .1);
}

.range-image {
  position: relative;
  display: grid;
  height: 165px;
  overflow: hidden;
  place-items: center;
  background: linear-gradient(135deg, #1b2c46, #0e1728);
  color: #fff;
}

.range-image::before,
.range-image::after {
  position: absolute;
  content: "";
}

.range-image::before {
  top: -56px;
  right: -38px;
  width: 176px;
  height: 176px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 50%;
}

.range-image::after {
  right: 0;
  bottom: 0;
  left: 0;
  height: 4px;
  background: #dc2626;
}

.range-image-2 { background: linear-gradient(135deg, #233851, #101a2b); }
.range-image-3 { background: linear-gradient(135deg, #293b51, #131d2e); }
.range-image-4 { background: linear-gradient(135deg, #1b3048, #101827); }

.range-image :deep(.v-icon) {
  position: relative;
  z-index: 1;
  color: #e2e8f0;
  filter: drop-shadow(0 7px 12px rgba(0, 0, 0, .3));
}

.range-index {
  position: absolute;
  top: 13px;
  left: 15px;
  color: rgba(255, 255, 255, .62);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .1em;
}

.range-image-line {
  position: absolute;
  bottom: 28px;
  left: 20%;
  width: 60%;
  height: 1px;
  background: rgba(255, 255, 255, .25);
}

.range-card-copy {
  padding: 17px 17px 18px;
}

.range-card-copy h3 {
  margin: 0 0 8px;
  color: #0f172a;
  font-size: 15px;
}

.range-card-copy p {
  min-height: 57px;
  margin: 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.6;
}

.range-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 13px;
  color: #dc2626;
  font-size: 11px;
  font-weight: 800;
}

.support-promo {
  overflow: hidden;
  background: #f1f5f9;
}

.support-promo-inner {
  display: grid;
  width: min(1120px, 100% - 48px);
  min-height: 380px;
  grid-template-columns: .95fr 1.05fr;
  align-items: center;
  gap: 60px;
  margin: 0 auto;
  padding: 45px 0;
}

.support-graphic {
  position: relative;
  display: grid;
  min-height: 280px;
  place-items: center;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(135deg, #15253b, #0c1628);
  color: #fff;
}

.support-graphic::before,
.support-graphic::after {
  position: absolute;
  right: -25px;
  bottom: -80px;
  left: -30px;
  height: 140px;
  transform: rotate(-6deg);
  background: #dc2626;
  content: "";
}

.support-graphic::after {
  bottom: -108px;
  background: #f8fafc;
}

.support-ring {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(255, 255, 255, .15);
  border-radius: 50%;
  box-shadow: 0 0 0 28px rgba(255,255,255,.025), 0 0 0 58px rgba(255,255,255,.025);
}

.support-graphic :deep(.v-icon) {
  position: relative;
  z-index: 1;
  color: #f8fafc;
}

.support-graphic-tag {
  position: absolute;
  top: 18px;
  left: 20px;
  color: #cbd5e1;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .16em;
}

.support-copy .site-kicker {
  margin-bottom: 13px;
}

.support-copy h2,
.home-contact-copy h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(28px, 3.4vw, 40px);
  font-weight: 900;
  letter-spacing: -.035em;
  line-height: 1.1;
}

.support-copy > p:not(.site-kicker) {
  max-width: 480px;
  margin: 15px 0 22px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
}

.support-button {
  min-height: 44px;
}

.service-preview {
  padding-top: 78px;
  padding-bottom: 76px;
}

.service-list {
  border-top: 1px solid #dce3ec;
}

.service-row {
  display: grid;
  min-height: 74px;
  grid-template-columns: 52px 42px 1fr 24px;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid #dce3ec;
  color: inherit;
  text-decoration: none;
  transition: padding 150ms ease, color 150ms ease;
}

.service-row:hover {
  padding-right: 8px;
  padding-left: 8px;
  color: #dc2626;
}

.service-row-index {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 800;
}

.service-row-icon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 8px;
  background: #f1f5f9;
  color: #dc2626;
}

.service-row strong {
  color: #0f172a;
  font-size: 15px;
}

.service-row-arrow {
  color: #64748b;
}

.brand-strip {
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.brand-strip-inner {
  width: min(1120px, 100% - 48px);
  margin: 0 auto;
  padding: 28px 0;
}

.brand-strip-inner > p {
  margin: 0 0 21px;
  color: #64748b;
  text-align: center;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.brand-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 18px 28px;
  color: #475569;
  font-size: 17px;
  font-weight: 900;
  letter-spacing: .04em;
}

.brand-list span:nth-child(even) {
  color: #1e293b;
  font-size: 14px;
  letter-spacing: .12em;
}

.home-contact {
  display: flex;
  align-items: center;
  gap: 26px;
  padding-top: 64px;
  padding-bottom: 64px;
}

.home-contact-copy {
  margin-right: auto;
}

.home-contact-copy .site-kicker {
  margin-bottom: 12px;
}

.home-contact-copy h2 span {
  color: #dc2626;
}

.home-contact-copy > p:last-child {
  margin: 12px 0 0;
  color: #64748b;
  font-size: 13px;
}

.home-contact-number {
  color: #475569;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 750;
}

.home-contact-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

@media (max-width: 950px) {
  .hero-inner {
    min-height: 530px;
  }

  .range-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-contact {
    flex-wrap: wrap;
  }

  .home-contact-actions {
    flex-wrap: wrap;
  }
}

@media (max-width: 700px) {
  .hero-inner {
    width: calc(100% - 36px);
    min-height: 0;
    padding: 76px 0 88px;
  }

  .hero-copy h1 {
    font-size: clamp(40px, 11vw, 56px);
  }

  .hero-controls {
    bottom: 22px;
  }

  .hero-edge-label {
    display: none;
  }

  .range-section,
  .service-preview {
    padding-top: 54px;
    padding-bottom: 55px;
  }

  .support-promo-inner {
    width: calc(100% - 36px);
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 30px 0 38px;
  }

  .support-graphic {
    min-height: 220px;
  }

  .section-heading-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .range-grid {
    gap: 12px;
  }

  .range-image {
    height: 135px;
  }

  .range-card-copy {
    padding: 14px;
  }

  .range-card-copy h3 {
    font-size: 13px;
  }

  .range-card-copy p {
    min-height: 75px;
    font-size: 11px;
  }

  .home-contact {
    align-items: flex-start;
    flex-direction: column;
    gap: 17px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

@media (max-width: 420px) {
  .range-grid {
    grid-template-columns: 1fr;
  }

  .range-image {
    height: 165px;
  }

  .range-card-copy p {
    min-height: 0;
  }

  .service-row {
    grid-template-columns: 28px 38px 1fr 20px;
    gap: 8px;
  }

  .service-row strong {
    font-size: 13px;
  }
}
</style>
