<script setup lang="ts">
definePageMeta({ layout: "website" });

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
      <p class="site-kicker">Kontak</p>
      <h1 class="site-title">Let’s talk about<br /><span>your requirements.</span></h1>
      <p class="site-lead">
        Contact our team for product inquiries, quotations, engineering
        consultations, or urgent port support.
      </p>
    </header>

    <section class="site-info-grid">
      <article v-for="office in offices" :key="office.city" class="site-info-card">
        <h2><v-icon icon="mdi-map-marker" color="#dc2626" /> {{ office.city }} office</h2>
        <address>{{ office.address }}</address>
      </article>

      <article class="site-info-card communication-card">
        <h2><v-icon icon="mdi-phone-in-talk" color="#dc2626" /> Direct contact</h2>
        <a href="tel:+6282199988670"><v-icon icon="mdi-phone-outline" /> +62 821-9998-8670</a>
        <a href="mailto:sales@dutarayamarine.co"><v-icon icon="mdi-email-outline" /> sales@dutarayamarine.co</a>
        <span><v-icon icon="mdi-web" /> www.dutarayamarine.com</span>
      </article>
    </section>

    <section class="contact-prompt site-panel">
      <div class="contact-prompt-icon"><v-icon icon="mdi-whatsapp" size="28" /></div>
      <div>
        <h2 class="site-section-title">Send us an inquiry</h2>
        <p class="site-section-copy">
          Use the WhatsApp button at the bottom of the page to fill in your
          company and vessel details. Your inquiry will be saved and opened in
          WhatsApp for you to send.
        </p>
      </div>
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
  margin-top: 28px;
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
