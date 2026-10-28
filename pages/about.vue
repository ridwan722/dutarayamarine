<script setup lang="ts">
import { computed } from "vue";
import { seoKeywords } from "~/seo.config";

definePageMeta({ layout: "website" });
const { translate } = useSiteLocale();

usePageSeo({
  title: computed(() => translate("About Our Marine Supply Company | Duta Raya Marine", "Tentang Perusahaan Pemasok Kelautan Kami | Duta Raya Marine")),
  description: computed(() => translate("Learn about PT Duta Raya Marine, a Batam-based supplier of marine and offshore equipment, machinery, spare parts, and technical support.", "Kenali PT Duta Raya Marine, pemasok peralatan kelautan dan lepas pantai, permesinan, suku cadang, serta dukungan teknis yang berbasis di Batam.")),
  path: "/about",
  keywords: seoKeywords.about,
});

const values = computed(() => [
  {
    icon: "mdi-shield-check-outline",
    title: translate("Safety & QHSE", "Keselamatan & QHSE"),
    desc: translate("Safety is a priority across workshop activities and shipboard assignments, alongside environmental responsibility.", "Keselamatan menjadi prioritas dalam kegiatan bengkel dan pekerjaan di atas kapal, disertai tanggung jawab terhadap lingkungan."),
  },
  {
    icon: "mdi-check-decagram-outline",
    title: translate("Quality & reliability", "Kualitas & keandalan"),
    desc: translate("We source genuine, OEM, and aftermarket parts to match equipment requirements and project specifications.", "Kami menyediakan suku cadang genuine, OEM, dan aftermarket yang sesuai dengan kebutuhan peralatan dan spesifikasi proyek."),
  },
  {
    icon: "mdi-clock-fast",
    title: translate("Responsive delivery", "Pengiriman responsif"),
    desc: translate("We coordinate procurement and delivery to support safe, efficient, and continuous vessel operations.", "Kami mengoordinasikan pengadaan dan pengiriman untuk mendukung operasional kapal yang aman, efisien, dan berkelanjutan."),
  },
]);

const mission = computed(() => [
  translate("Supply quality marine and offshore equipment, spare parts, consumables, and project requirements to industry standards.", "Memasok peralatan kelautan dan lepas pantai, suku cadang, bahan habis pakai, dan kebutuhan proyek berkualitas sesuai standar industri."),
  translate("Respond to vessel, shipyard, offshore, and marine project requirements quickly and accurately.", "Merespons kebutuhan kapal, galangan, lepas pantai, dan proyek kelautan secara cepat dan akurat."),
  translate("Coordinate procurement and on-time delivery to support uninterrupted operations.", "Mengoordinasikan pengadaan dan pengiriman tepat waktu untuk mendukung operasional tanpa hambatan."),
  translate("Build lasting relationships through professional service, trust, integrity, safety, and reliability.", "Membangun hubungan jangka panjang melalui layanan profesional, kepercayaan, integritas, keselamatan, dan keandalan."),
]);
</script>

<template>
  <div class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">{{ translate("About us", "Tentang kami") }}</p>
      <h1 class="site-title">{{ translate("Marine & offshore", "Mitra pasokan kelautan") }}<br /><span>{{ translate("supply partner.", "& lepas pantai.") }}</span></h1>
      <p class="site-lead">
        {{ translate("Duta Raya Marine is a Batam-based marine and offshore company specializing in mechanical equipment, machinery, and spare parts.", "Duta Raya Marine adalah perusahaan kelautan dan lepas pantai berbasis di Batam yang berspesialisasi dalam peralatan mekanikal, permesinan, dan suku cadang.") }}
      </p>
    </header>

    <section class="about-story site-panel">
      <div class="about-story-logo">
        <img src="/Logo-DRM.png" :alt="translate('PT. Duta Raya Marine logo', 'Logo PT. Duta Raya Marine')" />
      </div>
      <div>
        <h2 class="site-section-title">{{ translate("Supporting safe, efficient vessel operations", "Mendukung operasional kapal yang aman dan efisien") }}</h2>
        <p class="site-section-copy">
          {{ translate("We serve shipowners, shipyards, offshore operators, and marine industries with genuine, OEM, and aftermarket spare parts for a wide range of marine machinery. Our supply covers main and auxiliary engines, generators, pumps, hydraulic systems, gearboxes, and cooling systems, supported by responsive technical assistance and dependable sourcing.", "Kami melayani pemilik kapal, galangan, operator lepas pantai, dan industri kelautan dengan suku cadang genuine, OEM, dan aftermarket untuk berbagai permesinan kelautan. Pasokan kami mencakup mesin utama dan bantu, generator, pompa, sistem hidraulik, gearbox, dan sistem pendingin, didukung bantuan teknis yang responsif serta sumber pasokan yang andal.") }}
        </p>
        <p class="site-section-copy">
          {{ translate("Our vision is to become a trusted, professional marine and offshore supplier. We aim to provide quality products and solutions, respond accurately to customer and project needs, deliver on time, and build long-term relationships based on trust and integrity.", "Visi kami adalah menjadi pemasok kelautan dan lepas pantai yang tepercaya dan profesional. Kami bertujuan menyediakan produk dan solusi berkualitas, merespons kebutuhan pelanggan dan proyek secara akurat, mengirimkan tepat waktu, serta membangun hubungan jangka panjang berdasarkan kepercayaan dan integritas.") }}
        </p>
      </div>
    </section>

    <section class="about-mission">
      <div class="site-page-heading">
        <p class="site-kicker">{{ translate("Our mission", "Misi kami") }}</p>
        <h2 class="site-section-title">{{ translate("How we support marine operations", "Cara kami mendukung operasional kelautan") }}</h2>
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
        <p class="site-kicker">{{ translate("Our commitment", "Komitmen kami") }}</p>
        <h2 class="site-section-title">{{ translate("What guides our work", "Prinsip yang memandu pekerjaan kami") }}</h2>
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
        <h2>{{ translate("Let’s discuss your next requirement.", "Mari diskusikan kebutuhan Anda berikutnya.") }}</h2>
        <p>{{ translate("Tell us about your vessel, equipment, or service needs.", "Ceritakan kebutuhan kapal, peralatan, atau layanan Anda kepada kami.") }}</p>
      </div>
      <NuxtLink to="/contact">{{ translate("Contact us", "Hubungi kami") }} <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
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
