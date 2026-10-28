<script setup lang="ts">
import { computed } from "vue";
import { seoKeywords } from "~/seo.config";

definePageMeta({ layout: "website" });
const { translate } = useSiteLocale();

usePageSeo({
  title: computed(() => translate("Marine Engineering & HVAC Services | Duta Raya Marine", "Layanan Teknik Kelautan & HVAC | Duta Raya Marine")),
  description: computed(() => translate("Marine engineering services in Batam for engine overhaul, mechanical repair, hydraulics, HVAC, refrigeration, automation, testing, and commissioning.", "Layanan teknik kelautan di Batam untuk overhaul mesin, perbaikan mekanikal, hidraulik, HVAC, refrigerasi, otomasi, pengujian, dan commissioning.")),
  path: "/services",
  keywords: seoKeywords.services,
});

const services = computed(() => [
  {
    icon: "mdi-cog-sync",
    title: translate("Mechanical Services", "Layanan Mekanikal"),
    items: [
      translate("Main and auxiliary engine general, top, and major overhaul", "General, top, dan major overhaul mesin utama dan bantu"),
      translate("Engine repair, maintenance, troubleshooting, and performance testing", "Perbaikan, pemeliharaan, troubleshooting, dan pengujian performa mesin"),
      translate("Hydraulic system repair and overhaul", "Perbaikan dan overhaul sistem hidraulik"),
      translate("Marine piping installation and repair", "Instalasi dan perbaikan perpipaan kelautan"),
      translate("Gearbox, propeller, windlass, crane, and valve repair", "Perbaikan gearbox, propeller, windlass, crane, dan valve"),
      translate("Cargo pump, boiler, pump, and motor repair", "Perbaikan cargo pump, boiler, pompa, dan motor"),
      translate("Turbocharger maintenance and overhaul", "Pemeliharaan dan overhaul turbocharger"),
      translate("Heat exchanger and cooler cleaning or repair", "Pembersihan atau perbaikan heat exchanger dan cooler"),
      translate("Shaft, coupling, and alignment works", "Pekerjaan shaft, coupling, dan alignment"),
      translate("Marine equipment repair, installation, and commissioning", "Perbaikan, instalasi, dan commissioning peralatan kelautan"),
      translate("Electrical and automation services", "Layanan elektrikal dan otomasi"),
    ],
  },
  {
    icon: "mdi-air-conditioner",
    title: translate("HVAC & Refrigeration Services", "Layanan HVAC & Refrigerasi"),
    items: [
      translate("Marine HVAC and air conditioning services", "Layanan HVAC kelautan dan pendingin udara"),
      translate("Chiller repair, maintenance, and overhaul", "Perbaikan, pemeliharaan, dan overhaul chiller"),
      translate("Refrigeration compressor repair and overhaul", "Perbaikan dan overhaul kompresor refrigerasi"),
      translate("Refrigeration system repair and troubleshooting", "Perbaikan dan troubleshooting sistem refrigerasi"),
      translate("AHU and FCU maintenance", "Pemeliharaan AHU dan FCU"),
      translate("Condenser and evaporator cleaning or repair", "Pembersihan atau perbaikan condenser dan evaporator"),
      translate("Refrigerant leak detection and repair", "Deteksi dan perbaikan kebocoran refrigeran"),
      translate("Vacuum, pressure testing, and refrigerant charging", "Vacuum, pressure testing, dan pengisian refrigeran"),
      translate("Refrigeration piping installation and repair", "Instalasi dan perbaikan perpipaan refrigerasi"),
      translate("Ducting installation, repair, and modification", "Instalasi, perbaikan, dan modifikasi ducting"),
      translate("Cold room and provision room refrigeration", "Refrigerasi cold room dan provision room"),
      translate("HVAC retrofit, preventive and corrective maintenance", "Retrofit HVAC serta pemeliharaan preventif dan korektif"),
      translate("HVAC system testing and commissioning", "Pengujian dan commissioning sistem HVAC"),
    ],
  },
]);

const steps = computed(() => [
  { num: "01", title: translate("Requirement assessment", "Penilaian kebutuhan"), desc: translate("We evaluate the spare parts, specifications, or repair scope.", "Kami mengevaluasi suku cadang, spesifikasi, atau ruang lingkup perbaikan.") },
  { num: "02", title: translate("Sourcing & quotation", "Sourcing & penawaran"), desc: translate("We prepare a prompt, transparent proposal with components and lead times.", "Kami menyiapkan proposal yang cepat dan transparan dengan rincian komponen serta lead time.") },
  { num: "03", title: translate("On-site work or delivery", "Pekerjaan di lokasi atau pengiriman"), desc: translate("We coordinate delivery to the anchorage, berth, or shipyard and carry out the agreed work.", "Kami mengoordinasikan pengiriman ke anchorage, dermaga, atau galangan dan melaksanakan pekerjaan yang disepakati.") },
  { num: "04", title: translate("Commissioning & handover", "Commissioning & serah terima"), desc: translate("We arrange a joint inspection and sign-off, followed by job documentation.", "Kami mengatur inspeksi bersama dan persetujuan, dilanjutkan dengan dokumentasi pekerjaan.") },
]);
</script>

<template>
  <div class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">{{ translate("Services", "Layanan") }}</p>
      <h1 class="site-title">{{ translate("Marine engineering &", "Teknik kelautan &") }}<br /><span>{{ translate("HVAC services.", "layanan HVAC.") }}</span></h1>
      <p class="site-lead">
        {{ translate("Our team handles mechanical and HVAC requirements, from repair and maintenance to overhaul, commissioning, and delivery support.", "Tim kami menangani kebutuhan mekanikal dan HVAC, mulai dari perbaikan dan pemeliharaan hingga overhaul, commissioning, dan dukungan pengiriman.") }}
      </p>
    </header>

    <section class="site-card-grid service-grid" :aria-label="translate('Technical services', 'Layanan teknis')">
      <article v-for="service in services" :key="service.title" class="site-card">
        <div class="site-card-icon"><v-icon :icon="service.icon" size="25" /></div>
        <h3>{{ service.title }}</h3>
        <ul><li v-for="item in service.items" :key="item">{{ item }}</li></ul>
      </article>
    </section>

    <section class="qhse-panel">
      <div class="site-card-icon"><v-icon icon="mdi-shield-check-outline" size="25" /></div>
      <div>
        <p class="site-kicker">{{ translate("QHSE commitment", "Komitmen QHSE") }}</p>
        <h2 class="site-section-title">{{ translate("Safety is a priority in every assignment.", "Keselamatan adalah prioritas dalam setiap pekerjaan.") }}</h2>
        <p class="site-section-copy">{{ translate("Duta Raya Marine commits to zero-accident practices and environmental responsibility across workshop activities and shipboard assignments.", "Duta Raya Marine berkomitmen pada praktik zero accident dan tanggung jawab lingkungan dalam kegiatan bengkel maupun pekerjaan di atas kapal.") }}</p>
      </div>
    </section>

    <section class="service-process">
      <header class="site-page-heading">
        <p class="site-kicker">{{ translate("Workflow", "Alur kerja") }}</p>
        <h2 class="site-section-title">{{ translate("From inquiry to handover", "Dari inquiry hingga serah terima") }}</h2>
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
        <h2>{{ translate("Need technical support?", "Memerlukan dukungan teknis?") }}</h2>
        <p>{{ translate("Share your service scope and vessel location with our team.", "Sampaikan ruang lingkup layanan dan lokasi kapal kepada tim kami.") }}</p>
      </div>
      <NuxtLink to="/contact">{{ translate("Discuss your requirement", "Diskusikan kebutuhan Anda") }} <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.service-process {
  margin-top: 64px;
}

.service-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.service-grid .site-card {
  height: 100%;
}

.service-grid ul {
  display: grid;
  gap: 8px;
  margin: 16px 0 0;
  padding-left: 18px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.55;
}

.service-grid li::marker {
  color: #dc2626;
}

.qhse-panel {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin-top: 28px;
  padding: 26px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #f8fafc;
}

.qhse-panel .site-section-title {
  font-size: 21px;
}

.qhse-panel .site-section-copy {
  margin-bottom: 0;
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
  .service-grid {
    grid-template-columns: 1fr;
  }

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
