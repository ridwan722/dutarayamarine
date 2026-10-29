<script setup lang="ts">
import { computed } from "vue";
import { seoKeywords } from "~/seo.config";

definePageMeta({ layout: "website" });
const { translate } = useSiteLocale();

usePageSeo({
  title: computed(() => translate("Contact Our Marine Supply Team | Duta Raya Marine", "Hubungi Tim Pasokan Kelautan Kami | Duta Raya Marine")),
  description: computed(() => translate("Contact PT Duta Raya Marine in Batam or Jakarta for marine equipment, ship spare parts, technical services, quotations, and emergency port support.", "Hubungi PT Duta Raya Marine di Batam atau Jakarta untuk peralatan kelautan, suku cadang kapal, layanan teknis, penawaran, dan dukungan darurat pelabuhan.")),
  path: "/contact",
  keywords: seoKeywords.contact,
});

const offices = [
  {
    city: "Batam",
    address: "Ruko Dream Land Blok H3 No. 05, Dreamland Square, Marina City Tanjung Riau, Sekupang, Batam, Kepulauan Riau 29425",
  },
  {
    city: "Jakarta",
    address: "Jln. Raya Pasar Minggu No. 15A, Jakarta Selatan",
  },
];
</script>

<template>
  <div class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">{{ translate("Contact", "Kontak") }}</p>
      <h1 class="site-title">{{ translate("Contact our marine", "Hubungi tim pasokan") }}<br /><span>{{ translate("supply team.", "kelautan kami.") }}</span></h1>
      <p class="site-lead">
        {{ translate("Contact our team for procurement requests, engineering consultations, or round-the-clock emergency port support.", "Hubungi tim kami untuk permintaan pengadaan, konsultasi teknik, atau dukungan darurat pelabuhan sepanjang waktu.") }}
      </p>
    </header>

    <section class="site-info-grid">
      <article v-for="office in offices" :key="office.city" class="site-info-card">
          <h2><v-icon icon="mdi-map-marker" color="#dc2626" /> {{ office.city }}</h2>
        <address>{{ office.address }}</address>
      </article>

      <article class="site-info-card communication-card">
        <h2><v-icon icon="mdi-phone-in-talk" color="#dc2626" /> {{ translate("Direct contact", "Kontak langsung") }}</h2>
        <a ><v-icon icon="mdi-email-outline" /> sales@dutarayamarine.com</a>
        <a href="https://www.dutarayamarine.com" target="_blank" rel="noreferrer"><v-icon icon="mdi-web" /> www.dutarayamarine.com</a>
      </article>

      <article class="site-info-card contact-prompt">
        <div class="contact-prompt-icon"><v-icon icon="mdi-whatsapp" size="28" /></div>
        <div>
          <h2 class="site-section-title">{{ translate("Send us an inquiry", "Kirim inquiry kepada kami") }}</h2>
          <p class="site-section-copy">
            {{ translate("Use the WhatsApp button to share your company, vessel, and requirement details. You can also email sales@dutarayamarine.com.", "Gunakan tombol WhatsApp untuk membagikan detail perusahaan, kapal, dan kebutuhan Anda. Anda juga dapat mengirim email ke sales@dutarayamarine.com.") }}
          </p>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.communication-card a,
.communication-card span {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 13px;
  color: #475569;
  text-decoration: none;
  font-size: 13px;
}

.communication-card a:hover {
  color: #dc2626;
}

.communication-card a :deep(.v-icon),
.communication-card span :deep(.v-icon) {
  color: #64748b;
}

.contact-prompt {
  display: flex;
  align-items: center;
  gap: 20px;
  border-color: #22c55e;
}

.contact-prompt-icon {
  display: grid;
  width: 56px;
  height: 56px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 14px;
  background: #dcfce7;
  color: #16a34a;
}

.contact-prompt .site-section-title {
  font-size: 21px;
}

.contact-prompt .site-section-copy {
  margin-bottom: 0;
}

@media (max-width: 600px) {
  .contact-prompt {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
