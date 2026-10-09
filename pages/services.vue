<script setup lang="ts">
definePageMeta({ layout: "website" });

const services = [
  {
    icon: "mdi-cog-sync",
    title: "Mechanical Services & Engine Overhaul",
    desc: "Main and auxiliary engine overhauls, pump overhauls, hydraulic repairs, turbocharger maintenance, shaft alignment, and radiator or heat exchanger retubing.",
  },
  {
    icon: "mdi-air-conditioner",
    title: "HVAC & Refrigeration Services",
    desc: "Marine climate control, accommodation air conditioning, AHU and FCU maintenance, chiller overhaul, compressor repair, leak testing, and refrigerant recharging.",
  },
  {
    icon: "mdi-tune-vertical",
    title: "Automation & Control Services",
    desc: "PLC and HMI troubleshooting, control panel rewiring, sensor calibration, VFD maintenance, alarm system service, and onboard repair support.",
  },
  {
    icon: "mdi-hammer-wrench",
    title: "Carpentry, Marine Interior & Deck Services",
    desc: "Crew cabin renovation, joinery works, marine-grade flooring and insulation, crane and winch inspection, hydraulic servicing, and deck machinery maintenance.",
  },
];

const steps = [
  { num: "01", title: "Inquiry & assessment", desc: "We review the required parts, specifications, vessel, or repair scope." },
  { num: "02", title: "Sourcing & quotation", desc: "We prepare a proposal with relevant product details and expected lead times." },
  { num: "03", title: "Service or delivery", desc: "We coordinate delivery to the agreed port, berth, or project location." },
  { num: "04", title: "Handover", desc: "We complete the work with a joint inspection and service handover." },
];
</script>

<template>
  <div class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">Layanan</p>
      <h1 class="site-title">Technical support<br /><span>where you need it.</span></h1>
      <p class="site-lead">
        Our multidisciplinary team supports maintenance, repair, and onboard
        requirements for marine and offshore operations.
      </p>
    </header>

    <section class="site-card-grid" aria-label="Layanan teknis">
      <article v-for="service in services" :key="service.title" class="site-card">
        <div class="site-card-icon"><v-icon :icon="service.icon" size="25" /></div>
        <h3>{{ service.title }}</h3>
        <p>{{ service.desc }}</p>
      </article>
    </section>

    <section class="service-process">
      <header class="site-page-heading">
        <p class="site-kicker">Alur kerja</p>
        <h2 class="site-section-title">From inquiry to handover</h2>
      </header>
      <div class="process-grid">
        <article v-for="step in steps" :key="step.num" class="process-step">
          <span>{{ step.num }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </article>
      </div>
    </section>

    <section class="site-cta">
      <div>
        <h2>Need technical support?</h2>
        <p>Share your service scope and vessel location with our team.</p>
      </div>
      <NuxtLink to="/contact">Discuss your requirement <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.service-process {
  margin-top: 64px;
}

.service-process .site-page-heading {
  margin-bottom: 22px;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.process-step {
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
}

.process-step > span {
  color: #dc2626;
  font-size: 20px;
  font-weight: 900;
}

.process-step h3 {
  margin: 12px 0 7px;
  color: #0f172a;
  font-size: 15px;
}

.process-step p {
  margin: 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.6;
}

.site-cta {
  margin-top: 40px;
}

@media (max-width: 850px) {
  .process-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 500px) {
  .process-grid {
    grid-template-columns: 1fr;
  }
}
</style>
