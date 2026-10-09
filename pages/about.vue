<script setup lang="ts">
definePageMeta({ layout: "website" });

const values = [
  {
    icon: "mdi-shield-check-outline",
    title: "Safety first",
    desc: "We put people, vessel safety, and environmental responsibility at the center of every assignment.",
  },
  {
    icon: "mdi-check-decagram-outline",
    title: "Quality and precision",
    desc: "We focus on suitable, dependable components and careful technical execution for marine operations.",
  },
  {
    icon: "mdi-clock-fast",
    title: "Timely response",
    desc: "We coordinate sourcing, delivery, and technical support around operational needs and schedules.",
  },
];
</script>

<template>
  <div class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">Tentang kami</p>
      <h1 class="site-title">Your partner in<br /><span>marine operations.</span></h1>
      <p class="site-lead">
        PT. Duta Raya Marine is an integrated marine and offshore solution
        provider based in Batam, Indonesia.
      </p>
    </header>

    <section class="about-story site-panel">
      <div class="about-story-logo">
        <img src="/Logo-DRM.png" alt="Logo PT. Duta Raya Marine" />
      </div>
      <div>
        <h2 class="site-section-title">Dependable support for demanding environments</h2>
        <p class="site-section-copy">
          We support shipowners, shipyards, offshore platforms, and oil and gas
          operators with high-grade equipment supply, vessel provisioning,
          critical spare parts, and multidisciplinary technical engineering
          services. Our team works to understand each requirement and coordinate
          a practical response, from initial assessment through delivery or
          service handover.
        </p>
        <p class="site-section-copy">
          With operational offices in Batam and Jakarta, we serve customers
          across Indonesia and support marine operations with responsive
          coordination and technical care.
        </p>
      </div>
    </section>

    <section class="about-values">
      <div class="site-page-heading">
        <p class="site-kicker">Cara kami bekerja</p>
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
