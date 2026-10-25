<script setup lang="ts">
import { seoKeywords } from "~/seo.config";

definePageMeta({ layout: "website" });

usePageSeo({
  title: "About Our Marine Supply Company | Duta Raya Marine",
  description:
    "Learn about PT Duta Raya Marine, a Batam-based supplier of marine and offshore equipment, machinery, spare parts, and technical support.",
  path: "/about",
  keywords: seoKeywords.about,
});

const values = [
  {
    icon: "mdi-shield-check-outline",
    title: "Safety & QHSE",
    desc: "Safety is a priority across workshop activities and shipboard assignments, alongside environmental responsibility.",
  },
  {
    icon: "mdi-check-decagram-outline",
    title: "Quality & reliability",
    desc: "We source genuine, OEM, and aftermarket parts to match equipment requirements and project specifications.",
  },
  {
    icon: "mdi-clock-fast",
    title: "Responsive delivery",
    desc: "We coordinate procurement and delivery to support safe, efficient, and continuous vessel operations.",
  },
];

const mission = [
  "Supply quality marine and offshore equipment, spare parts, consumables, and project requirements to industry standards.",
  "Respond to vessel, shipyard, offshore, and marine project requirements quickly and accurately.",
  "Coordinate procurement and on-time delivery to support uninterrupted operations.",
  "Build lasting relationships through professional service, trust, integrity, safety, and reliability.",
];
</script>

<template>
  <div class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">Tentang kami</p>
      <h1 class="site-title">Marine &amp; offshore<br /><span>supply partner.</span></h1>
      <p class="site-lead">
        Duta Raya Marine is a Batam-based marine and offshore company specializing
        in mechanical equipment, machinery, and spare parts.
      </p>
    </header>

    <section class="about-story site-panel">
      <div class="about-story-logo">
        <img src="/Logo-DRM.png" alt="Logo PT. Duta Raya Marine" />
      </div>
      <div>
        <h2 class="site-section-title">Supporting safe, efficient vessel operations</h2>
        <p class="site-section-copy">
          We serve shipowners, shipyards, offshore operators, and marine
          industries with genuine, OEM, and aftermarket spare parts for a wide
          range of marine machinery. Our supply covers main and auxiliary
          engines, generators, pumps, hydraulic systems, gearboxes, and cooling
          systems, supported by responsive technical assistance and dependable
          sourcing.
        </p>
        <p class="site-section-copy">
          Our vision is to become a trusted, professional marine and offshore
          supplier. We aim to provide quality products and solutions, respond
          accurately to customer and project needs, deliver on time, and build
          long-term relationships based on trust and integrity.
        </p>
      </div>
    </section>

    <section class="about-mission">
      <div class="site-page-heading">
        <p class="site-kicker">Misi kami</p>
        <h2 class="site-section-title">How we support marine operations</h2>
      </div>
      <div class="site-card-grid">
        <article v-for="(item, index) in mission" :key="item" class="site-card mission-card">
          <span class="mission-index">0{{ index + 1 }}</span>
          <p>{{ item }}</p>
        </article>
      </div>
    </section>

    <section class="about-values">
      <div class="site-page-heading">
        <p class="site-kicker">Komitmen kami</p>
        <h2 class="site-section-title">What guides our work</h2>
      </div>
      <div class="site-card-grid">
        <article v-for="value in values" :key="value.title" class="site-card">
          <div class="site-card-icon"><v-icon :icon="value.icon" size="25" /></div>
          <h3>{{ value.title }}</h3>
          <p>{{ value.desc }}</p>
        </article>
      </div>
    </section>

    <section class="site-cta">
      <div>
        <h2>Let’s discuss your next requirement.</h2>
        <p>Tell us about your vessel, equipment, or service needs.</p>
      </div>
      <NuxtLink to="/contact">Hubungi kami <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.about-story {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  align-items: center;
  gap: 38px;
}

.about-story-logo {
  display: grid;
  min-height: 230px;
  place-items: center;
  border-radius: 14px;
  background: #f8fafc;
}

.about-story-logo img {
  width: min(65%, 230px);
  max-height: 140px;
  object-fit: contain;
}

.about-story .site-section-copy + .site-section-copy {
  margin-top: 12px;
}

.about-values {
  margin-top: 58px;
}

.about-mission {
  margin-top: 58px;
}

.about-mission .site-page-heading {
  margin-bottom: 24px;
}

.mission-card p {
  margin: 14px 0 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.65;
}

.mission-index {
  color: #dc2626;
  font-size: 20px;
  font-weight: 900;
}

.about-values .site-page-heading {
  margin-bottom: 24px;
}

@media (max-width: 700px) {
  .about-story {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .about-story-logo {
    min-height: 170px;
  }
}
</style>
