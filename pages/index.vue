<script setup lang="ts">
import { collection } from "firebase/firestore";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useCollection, useFirestore } from "vuefire";
import { seoKeywords } from "~/seo.config";

interface CategoryPhoto {
  url?: string;
}

interface CategoryProductServiceRecord {
  id?: string;
  id_category_product_service?: string;
  category_product_service?: string;
  category_product_service_en?: string;
  nama_category_product_service?: string;
  nama_category_product_service_en?: string;
  nama_category?: string;
  nama_category_en?: string;
  nama?: string;
  name?: string;
  name_en?: string;
  foto?: Array<CategoryPhoto | string>;
}

definePageMeta({ layout: "website" });

const { translate } = useSiteLocale();
const seoTitle = computed(() =>
  translate(
    "Duta Raya Marine | Marine Supplier & Ship Spare Parts in Batam & Jakarta",
    "Duta Raya Marine | Marine Supplier & Ship Spare Parts in Batam & Jakarta",
  ),
);
const seoDescription = computed(() =>
  translate(
    "PT Duta Raya Marine supplies marine equipment, ship spare parts, HVAC, and technical services for vessels, shipyards, and offshore operators in Batam and Jakarta.",
    "PT Duta Raya Marine memasok peralatan kelautan, suku cadang kapal, HVAC, dan layanan teknis untuk kapal, galangan, serta operator lepas pantai di Batam dan Jakarta.",
  ),
);

usePageSeo({
  title: seoTitle,
  description: seoDescription,
  path: "/",
  keywords: seoKeywords.home,
});

useHead(() => ({
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
        description: seoDescription.value,
        address: [
          {
            "@type": "PostalAddress",
            streetAddress:
              "Ruko Dreamland H3 No. 05, Tanjung Riau, Sekupang, Kota Batam, Kepulauan Riau.",
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
}));

const slides = computed(() => [
  {
    image: "/carousel-1.jpg",
    kicker: translate("Duta Raya Marine · Batam, Indonesia", "Duta Raya Marine · Batam, Indonesia"),
    title: translate("Marine equipment", "Peralatan kelautan"),
    accent: translate("& ship spare parts.", "& suku cadang kapal."),
    description: translate("Marine machinery, genuine and OEM spare parts, and responsive technical support for shipowners, shipyards, and offshore operators.", "Permesinan kelautan, suku cadang genuine dan OEM, serta dukungan teknis responsif untuk pemilik kapal, galangan, dan operator lepas pantai."),
    action: translate("Explore our services", "Jelajahi layanan kami"),
    to: "/services",
  },
  {
    image: "/carousel-2.jpg",
    kicker: translate("Parts & equipment", "Suku cadang & peralatan"),
    title: translate("The right equipment", "Peralatan yang tepat"),
    accent: translate("for every voyage.", "untuk setiap pelayaran."),
    description: translate("From main and auxiliary engines to pumps, hydraulics, and cooling systems, find parts matched to your equipment.", "Dari mesin utama dan bantu hingga pompa, hidraulik, dan sistem pendingin, temukan suku cadang yang sesuai dengan peralatan Anda."),
    action: translate("Browse product range", "Lihat rangkaian produk"),
    to: "/products",
  },
  {
    image: "/carousel-3.jpg",
    kicker: translate("Based in Batam, Indonesia", "Berbasis di Batam, Indonesia"),
    title: translate("A responsive partner", "Mitra yang responsif"),
    accent: translate("at every port call.", "di setiap kunjungan pelabuhan."),
    description: translate("Talk to our team about procurement, mechanical repairs, HVAC service, or emergency port support.", "Hubungi tim kami untuk pengadaan, perbaikan mekanikal, layanan HVAC, atau dukungan darurat di pelabuhan."),
    action: translate("Talk to our team", "Hubungi tim kami"),
    to: "/contact",
  },
]);

const activeSlide = ref(0);
const currentSlide = computed(() => slides.value[activeSlide.value]!);
let slideTimer: ReturnType<typeof setInterval> | undefined;

const db = useFirestore();
const categorySource = useCollection<CategoryProductServiceRecord>(
  collection(db, "category-product-service"),
  {
    ssrKey: "public-home-category-product-service",
    wait: true,
  },
);

const categoriesPending = categorySource.pending;
const categoriesError = categorySource.error;

function categoryDocumentId(category: CategoryProductServiceRecord) {
  return category.id || category.id_category_product_service || "";
}

function categoryName(category: CategoryProductServiceRecord, index = 0) {
  const indonesian =
    category.category_product_service ||
    category.nama_category_product_service ||
    category.nama_category ||
    category.nama ||
    category.name ||
    `Kategori ${index + 1}`;
  const english =
    category.category_product_service_en ||
    category.nama_category_product_service_en ||
    category.nama_category_en ||
    category.name_en ||
    indonesian;

  return translate(english, indonesian);
}

const categories = computed(() =>
  [...(categorySource.value ?? [])]
    .filter((category) => categoryDocumentId(category))
    .sort((first, second) =>
      categoryName(first).localeCompare(categoryName(second)),
    ),
);

function categoryPhoto(category: CategoryProductServiceRecord) {
  const photo = category.foto?.[0];
  if (typeof photo === "string") return photo;
  return typeof photo?.url === "string" ? photo.url : "";
}

function categoryRoute(category: CategoryProductServiceRecord) {
  return {
    name: "products-id",
    params: { id: categoryDocumentId(category) },
  };
}

const services = computed(() => [
  { icon: "mdi-cog-sync", title: translate("Mechanical & engine", "Mekanikal & mesin"), to: "/services" },
  { icon: "mdi-air-conditioner", title: translate("HVAC & refrigeration", "HVAC & refrigerasi"), to: "/services" },
  { icon: "mdi-tune-vertical", title: translate("Automation & control", "Otomasi & kontrol"), to: "/services" },
]);

function changeSlide(direction: number) {
  activeSlide.value =
    (activeSlide.value + direction + slides.value.length) % slides.value.length;
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
    <section class="hero-carousel" :aria-label="translate('Marine solutions highlights', 'Sorotan solusi kelautan')">
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
          <div class="hero-pagination" :aria-label="translate('Choose slide', 'Pilih slide')">
            <button
              v-for="(_, index) in slides"
              :key="index"
              type="button"
              :aria-label="translate(`Show slide ${index + 1}`, `Tampilkan slide ${index + 1}`)"
              :aria-current="activeSlide === index ? 'true' : undefined"
              :class="{ active: activeSlide === index }"
              @click="activeSlide = index"
            />
          </div>
          <!-- <span class="slide-count">0{{ activeSlide + 1 }} <i>/</i> 0{{ slides.length }}</span> -->
          <div class="hero-arrows">
            <button type="button" :aria-label="translate('Previous slide', 'Slide sebelumnya')" @click="changeSlide(-1)"><v-icon icon="mdi-arrow-left" /></button>
            <button type="button" :aria-label="translate('Next slide', 'Slide berikutnya')" @click="changeSlide(1)"><v-icon icon="mdi-arrow-right" /></button>
          </div>
        </div>
      </div>
      <div class="hero-edge-label">{{ translate("BUILT FOR MARINE OPERATIONS", "DIBANGUN UNTUK OPERASI KELAUTAN") }}</div>
    </section>

    <section class="home-intro site-container" aria-labelledby="home-intro-title">
      <div class="home-intro-heading">
        <div>
          <p class="site-kicker">{{ translate("Marine supply & technical partner", "Mitra pasokan & teknis kelautan") }}</p>
          <h2 id="home-intro-title">
            {{ translate("Supporting vessel operations", "Mendukung operasional kapal") }}
            <span>{{ translate("from requirement to delivery.", "dari kebutuhan hingga pengiriman.") }}</span>
          </h2>
        </div>
        <div class="home-intro-summary">
          <p>{{ translate("PT Duta Raya Marine supports shipowners, shipyards, offshore operators, and industrial projects with marine equipment, ship spare parts, consumables, and coordinated technical services.", "PT Duta Raya Marine mendukung pemilik kapal, galangan, operator lepas pantai, dan proyek industri melalui penyediaan peralatan kelautan, suku cadang kapal, bahan habis pakai, serta layanan teknis yang terkoordinasi.") }}</p>
          <p>{{ translate("From our operations in Batam and Jakarta, we help customers identify suitable parts, review equipment details, and arrange practical support for planned maintenance or urgent vessel requirements.", "Melalui operasional kami di Batam dan Jakarta, kami membantu pelanggan mengidentifikasi suku cadang yang sesuai, memeriksa detail peralatan, serta mengatur dukungan praktis untuk pemeliharaan terencana maupun kebutuhan kapal yang mendesak.") }}</p>
        </div>
      </div>

      <div class="home-intro-capabilities">
        <article class="home-intro-capability">
          <div class="home-intro-capability-top">
            <span>01</span>
            <v-icon icon="mdi-package-variant-closed" size="25" />
          </div>
          <h3>{{ translate("Parts & equipment sourcing", "Pengadaan suku cadang & peralatan") }}</h3>
          <p>{{ translate("We source genuine, OEM, and aftermarket options for main and auxiliary engines, hydraulic systems, pumps, compressors, refrigeration equipment, and other onboard machinery.", "Kami menyediakan pilihan genuine, OEM, dan aftermarket untuk mesin utama dan bantu, sistem hidraulik, pompa, kompresor, peralatan refrigerasi, serta berbagai mesin di atas kapal.") }}</p>
        </article>

        <article class="home-intro-capability">
          <div class="home-intro-capability-top">
            <span>02</span>
            <v-icon icon="mdi-wrench-cog-outline" size="25" />
          </div>
          <h3>{{ translate("Technical service coordination", "Koordinasi layanan teknis") }}</h3>
          <p>{{ translate("Our scope includes mechanical repair, engine and turbocharger work, hydraulic maintenance, HVAC and refrigeration support, plus automation and control troubleshooting.", "Cakupan kami meliputi perbaikan mekanikal, pekerjaan mesin dan turbocharger, pemeliharaan hidraulik, dukungan HVAC dan refrigerasi, serta pemeriksaan sistem otomasi dan kontrol.") }}</p>
        </article>

        <article class="home-intro-capability">
          <div class="home-intro-capability-top">
            <span>03</span>
            <v-icon icon="mdi-ferry" size="25" />
          </div>
          <h3>{{ translate("Support for vessel schedules", "Dukungan untuk jadwal kapal") }}</h3>
          <p>{{ translate("We work around vessel schedules and project requirements, helping coordinate quotations, availability checks, delivery arrangements, and technical attendance when required.", "Kami menyesuaikan dukungan dengan jadwal kapal dan kebutuhan proyek, mulai dari penawaran, pemeriksaan ketersediaan, pengaturan pengiriman, hingga kehadiran teknis bila diperlukan.") }}</p>
        </article>
      </div>

      <div class="home-intro-note">
        <div>
          <strong>{{ translate("To help us check your requirement", "Agar kebutuhan Anda dapat kami periksa") }}</strong>
          <p>{{ translate("Share the equipment maker, model, serial number, part number, quantity, vessel location, and required delivery date. Photos or nameplate details are also helpful.", "Sampaikan merek peralatan, model, nomor seri, nomor suku cadang, jumlah, lokasi kapal, dan tanggal kebutuhan. Foto atau detail nameplate juga akan sangat membantu.") }}</p>
        </div>
        <div class="home-intro-links">
          <NuxtLink to="/about">{{ translate("About our company", "Tentang perusahaan") }} <v-icon icon="mdi-arrow-right" size="17" /></NuxtLink>
          <NuxtLink to="/contact">{{ translate("Discuss your requirement", "Diskusikan kebutuhan") }} <v-icon icon="mdi-arrow-up-right" size="17" /></NuxtLink>
        </div>
      </div>
    </section>

    <section class="range-section site-container">
      <div class="section-heading-row">
        <div>
          <p class="site-kicker">{{ translate("What we supply", "Yang kami sediakan") }}</p>
          <h2 class="site-section-title">{{ translate("Marine parts &", "Suku cadang kelautan &") }} <span class="site-red"> {{ translate("equipment supply", "pasokan peralatan") }}</span></h2>
        </div>
        <NuxtLink class="text-link" to="/products">{{ translate("View all categories", "Lihat semua kategori") }} <v-icon icon="mdi-arrow-right" size="17" /></NuxtLink>
      </div>

      <div v-if="categoriesPending" class="range-grid" aria-busy="true" :aria-label="translate('Loading categories', 'Memuat kategori')">
        <article v-for="index in 4" :key="index" class="range-card range-card-skeleton">
          <div class="range-image"></div>
          <div class="range-card-copy">
            <span class="range-skeleton-line range-skeleton-title"></span>
          </div>
        </article>
      </div>

      <div v-else-if="categoriesError" class="range-state" role="alert">
        <v-icon icon="mdi-cloud-alert-outline" size="28" />
        <div>
          <strong>{{ translate("Categories are temporarily unavailable", "Kategori sementara tidak tersedia") }}</strong>
          <p>{{ translate("Please try again in a moment.", "Silakan coba lagi beberapa saat.") }}</p>
        </div>
      </div>

      <div v-else-if="categories.length" class="range-grid">
        <NuxtLink
          v-for="(category, index) in categories"
          :key="categoryDocumentId(category)"
          :to="categoryRoute(category)"
          class="range-card"
        >
          <div class="range-image" :class="{ 'has-photo': categoryPhoto(category) }">
            <img
              v-if="categoryPhoto(category)"
              class="range-photo"
              :src="categoryPhoto(category)"
              :alt="categoryName(category, index)"
              loading="lazy"
            />
            <v-icon v-if="!categoryPhoto(category)" icon="mdi-package-variant-closed" size="54" />
          </div>
          <div class="range-card-copy">
            <h3>{{ categoryName(category, index) }}</h3>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="range-state">
        <v-icon icon="mdi-package-variant" size="28" />
        <div>
          <strong>{{ translate("No categories published yet", "Belum ada kategori yang dipublikasikan") }}</strong>
          <p>{{ translate("New categories will appear here automatically.", "Kategori baru akan tampil otomatis di sini.") }}</p>
        </div>
      </div>
    </section>

    <section class="support-promo">
      <div class="support-promo-inner">
        <div class="support-graphic" aria-hidden="true">
          <div class="support-ring"></div>
          <v-icon icon="mdi-wrench-cog-outline" size="74" />
          <span class="support-graphic-tag">{{ translate("TECHNICAL SUPPORT", "DUKUNGAN TEKNIS") }}</span>
        </div>
        <div class="support-copy">
          <p class="site-kicker">{{ translate("Service & support", "Layanan & dukungan") }}</p>
          <h2>{{ translate("Keeping your vessel", "Menjaga kapal Anda") }}<br />{{ translate("ready for the next voyage.", "siap untuk pelayaran berikutnya.") }}</h2>
          <p>{{ translate("From engine overhaul and hydraulic repairs to refrigeration commissioning, we coordinate practical technical support for your vessel.", "Dari overhaul mesin dan perbaikan hidraulik hingga commissioning refrigerasi, kami mengoordinasikan dukungan teknis praktis untuk kapal Anda.") }}</p>
          <NuxtLink class="support-button" to="/services">{{ translate("Discover our services", "Temukan layanan kami") }} <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
        </div>
      </div>
    </section>

    <section class="service-preview site-container">
      <div class="section-heading-row">
        <div>
          <p class="site-kicker">{{ translate("How we support", "Cara kami mendukung") }}</p>
          <h2 class="site-section-title">{{ translate("Technical expertise.", "Keahlian teknis.") }}<br /><span class="site-red">{{ translate("Practical response.", "Respons praktis.") }}</span></h2>
        </div>
        <NuxtLink class="text-link" to="/services">{{ translate("All services", "Semua layanan") }} <v-icon icon="mdi-arrow-right" size="17" /></NuxtLink>
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
        <p>{{ translate("Supported engine & compressor brands", "Merek mesin & kompresor yang didukung") }}</p>
        <div class="brand-list"><span>MAN B&amp;W</span><span>WÄRTSILÄ</span><span>YANMAR</span><span>CATERPILLAR</span><span>BITZER</span><span>CARRIER</span></div>
      </div>
    </section>

    <section class="home-contact site-container">
      <div class="home-contact-copy">
        <p class="site-kicker">{{ translate("Start a conversation", "Mulai percakapan") }}</p>
        <h2>{{ translate("Have a requirement?", "Memiliki kebutuhan?") }}<br /><span>{{ translate("We’re ready to help.", "Kami siap membantu.") }}</span></h2>
        <p>{{ translate("Contact us for procurement, engineering consultation, or round-the-clock emergency port support.", "Hubungi kami untuk pengadaan, konsultasi teknik, atau dukungan darurat sepanjang waktu.") }}</p>
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

.home-intro {
  padding-top: 76px;
  padding-bottom: 72px;
}

.home-intro-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(340px, .95fr);
  align-items: end;
  gap: 70px;
}

.home-intro-heading .site-kicker {
  margin-bottom: 15px;
}

.home-intro-heading h2 {
  max-width: 650px;
  margin: 0;
  color: #0f172a;
  font-size: clamp(34px, 4.5vw, 54px);
  font-weight: 900;
  letter-spacing: -.045em;
  line-height: 1.05;
}

.home-intro-heading h2 span {
  display: block;
  color: #dc2626;
}

.home-intro-summary {
  padding-left: 26px;
  border-left: 3px solid #dc2626;
}

.home-intro-summary p {
  margin: 0;
  color: #526176;
  font-size: 14px;
  line-height: 1.75;
}

.home-intro-summary p + p {
  margin-top: 12px;
}

.home-intro-capabilities {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 46px;
  border-top: 1px solid #dce3ec;
  border-bottom: 1px solid #dce3ec;
}

.home-intro-capability {
  min-width: 0;
  padding: 30px 30px 32px;
}

.home-intro-capability + .home-intro-capability {
  border-left: 1px solid #dce3ec;
}

.home-intro-capability-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}

.home-intro-capability-top > span {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .12em;
}

.home-intro-capability-top :deep(.v-icon) {
  color: #dc2626;
}

.home-intro-capability h3 {
  margin: 0;
  color: #0f172a;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.3;
}

.home-intro-capability p {
  margin: 12px 0 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.75;
}

.home-intro-note {
  display: flex;
  align-items: center;
  gap: 42px;
  margin-top: 28px;
  padding: 23px 26px;
  background: #f1f5f9;
}

.home-intro-note > div:first-child {
  max-width: 750px;
  margin-right: auto;
}

.home-intro-note strong {
  display: block;
  margin-bottom: 5px;
  color: #0f172a;
  font-size: 13px;
}

.home-intro-note p {
  margin: 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.65;
}

.home-intro-links {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 20px;
}

.home-intro-links a {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 750;
}

.home-intro-links a:hover {
  color: #dc2626;
}

.range-section {
  padding-top: 36px;
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
  gap: 32px 28px;
}

.range-card {
  min-width: 0;
  color: #0b3c68;
  text-align: center;
  text-decoration: none;
}

.range-card:hover h3 {
  color: #dc2626;
}

.range-image {
  display: flex;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #64748b;
}

.range-photo {
  display: block;
  flex: 0 0 auto;
  width: auto;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  object-position: center center;
}

.range-image :deep(.v-icon) {
  color: #64748b;
}

.range-card-copy {
  padding: 10px 4px 0;
}

.range-card-copy h3 {
  margin: 0;
  color: #0b3c68;
  font-size: clamp(16px, 1.65vw, 20px);
  font-weight: 650;
  line-height: 1.35;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 160ms ease;
}

.range-state {
  display: flex;
  min-height: 150px;
  align-items: center;
  justify-content: center;
  gap: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
  color: #64748b;
  text-align: left;
}

.range-state strong {
  display: block;
  margin-bottom: 4px;
  color: #0f172a;
  font-size: 14px;
}

.range-state p {
  margin: 0;
  font-size: 12px;
}

.range-card-skeleton {
  pointer-events: none;
}

.range-card-skeleton .range-image,
.range-skeleton-line {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 45%, #e2e8f0 65%);
  background-size: 200% 100%;
  animation: range-shimmer 1.4s infinite linear;
}

.range-card-skeleton .range-image::before,
.range-card-skeleton .range-image::after {
  display: none;
}

.range-skeleton-line {
  display: block;
  height: 10px;
  margin-top: 10px;
  border-radius: 999px;
}

.range-skeleton-title {
  width: 68%;
  height: 14px;
  margin: 0 auto;
}

@keyframes range-shimmer {
  to { background-position: -200% 0; }
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

  .home-intro-heading {
    grid-template-columns: minmax(0, 1fr) minmax(300px, .9fr);
    gap: 38px;
  }

  .home-intro-capability {
    padding-right: 22px;
    padding-left: 22px;
  }

  .home-intro-note {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }

  .home-intro-links {
    flex-wrap: wrap;
  }

  .range-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

  .home-intro {
    padding-top: 56px;
    padding-bottom: 55px;
  }

  .home-intro-heading {
    grid-template-columns: 1fr;
    gap: 27px;
  }

  .home-intro-heading h2 {
    font-size: clamp(34px, 9vw, 46px);
  }

  .home-intro-summary {
    padding-left: 20px;
  }

  .home-intro-capabilities {
    grid-template-columns: 1fr;
    margin-top: 34px;
  }

  .home-intro-capability {
    padding: 26px 4px 28px;
  }

  .home-intro-capability + .home-intro-capability {
    border-top: 1px solid #dce3ec;
    border-left: 0;
  }

  .home-intro-capability-top {
    margin-bottom: 18px;
  }

  .home-intro-note {
    padding: 21px 20px;
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 18px;
  }

  .range-card-copy {
    padding: 9px 2px 0;
  }

  .range-card-copy h3 {
    font-size: 16px;
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
  .home-intro-links {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .range-grid {
    grid-template-columns: 1fr;
    gap: 30px;
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
