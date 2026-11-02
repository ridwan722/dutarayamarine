<script setup lang="ts">
import { collection } from "firebase/firestore";
import { computed } from "vue";
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
const route = useRoute();
const { translate } = useSiteLocale();

usePageSeo({
  title: computed(() => translate("Marine Equipment & Ship Spare Parts | Duta Raya Marine", "Peralatan Kelautan & Suku Cadang Kapal | Duta Raya Marine")),
  description: computed(() => translate("Source genuine, OEM, and aftermarket ship spare parts, marine equipment, consumables, hydraulic components, and HVAC products in Batam, Indonesia.", "Dapatkan suku cadang kapal genuine, OEM, dan aftermarket, peralatan kelautan, bahan habis pakai, komponen hidraulik, serta produk HVAC di Batam, Indonesia.")),
  path: "/products",
  keywords: seoKeywords.products,
});

const db = useFirestore();
const categorySource = useCollection<CategoryProductServiceRecord>(
  collection(db, "category-product-service"),
  {
    ssrKey: "public-category-product-service-list",
    wait: true,
  },
);

const categoriesPending = categorySource.pending;
const categoriesError = categorySource.error;

function categoryDocumentId(category: CategoryProductServiceRecord) {
  return category.id || category.id_category_product_service || "";
}

function categoryName(
  category: CategoryProductServiceRecord,
  index = 0,
) {
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

const engineBrands = ["MAN B&W", "Wärtsilä", "Yanmar", "Mitsubishi", "Caterpillar", "Cummins", "Daihatsu", "MaK", "Niigata", "Hyundai HiMSEN", "Doosan", "Volvo Penta", "MTU", "Deutz", "Perkins", "Scania", "Isuzu", "Kubota", "John Deere"];
const hydraulicBrands = ["Rexroth", "Parker", "Eaton", "Danfoss"];
const compressorBrands = ["Bitzer", "Carrier", "Copeland", "Danfoss", "Carlyle", "Frascold", "Dorin", "Sabroe", "Mycom", "Howden", "GEA", "York", "Trane", "Daikin", "RefComp", "Bock", "Atlas Copco", "Ingersoll Rand", "Sullair", "Kaeser", "Sperre", "Sauer", "Hamworthy"];
</script>

<template>
  <NuxtPage v-if="route.params.id" />

  <div v-else class="site-container">
    <header class="site-page-heading">
      <p class="site-kicker">{{ translate("Products", "Produk") }}</p>
      <h1 class="site-title">{{ translate("Marine equipment &", "Peralatan kelautan &") }}<br /><span>{{ translate("ship spare parts.", "suku cadang kapal.") }}</span></h1>
      <p class="site-lead">
        {{ translate("We supply genuine, OEM, and aftermarket parts, consumables, and refrigeration equipment for vessel and project requirements.", "Kami memasok suku cadang genuine, OEM, dan aftermarket, bahan habis pakai, serta peralatan refrigerasi untuk kebutuhan kapal dan proyek.") }}
      </p>
    </header>

    <section class="category-catalog" :aria-label="translate('Product categories', 'Kategori produk')">
      <div v-if="categoriesPending" class="category-grid" aria-busy="true" :aria-label="translate('Loading categories', 'Memuat kategori')">
        <article v-for="index in 6" :key="index" class="category-card category-card-skeleton">
          <div class="category-card-media"></div>
          <div class="category-card-content">
            <span class="category-skeleton-line category-skeleton-title"></span>
          </div>
        </article>
      </div>

      <div v-else-if="categoriesError" class="product-state" role="alert">
        <v-icon icon="mdi-cloud-alert-outline" size="32" />
        <div>
          <strong>{{ translate("Categories are temporarily unavailable", "Kategori sementara tidak tersedia") }}</strong>
          <p>{{ translate("Please try again in a moment.", "Silakan coba lagi beberapa saat.") }}</p>
        </div>
      </div>

      <div v-else-if="categories.length" class="category-grid">
        <NuxtLink
          v-for="(category, index) in categories"
          :key="categoryDocumentId(category)"
          :to="categoryRoute(category)"
          class="category-card"
        >
          <div class="category-card-media" :class="{ 'has-photo': categoryPhoto(category) }">
            <img
              v-if="categoryPhoto(category)"
              :src="categoryPhoto(category)"
              :alt="categoryName(category, index)"
              loading="lazy"
            />
            <v-icon v-else icon="mdi-package-variant-closed" size="54" />
          </div>
          <div class="category-card-content">
            <h2>{{ categoryName(category, index) }}</h2>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="product-state">
        <v-icon icon="mdi-shape-outline" size="32" />
        <div>
          <strong>{{ translate("No categories published yet", "Belum ada kategori yang dipublikasikan") }}</strong>
          <p>{{ translate("New categories will appear here automatically.", "Kategori baru akan tampil otomatis di sini.") }}</p>
        </div>
      </div>
    </section>

    <section class="supported-brands">
      <header class="site-page-heading">
        <p class="site-kicker">{{ translate("Brand coverage", "Cakupan merek") }}</p>
        <h2 class="site-section-title">{{ translate("Supported equipment brands", "Merek peralatan yang didukung") }}</h2>
        <p class="site-lead">{{ translate("Brand support varies by equipment and availability. Share the model and part number so we can check your requirement.", "Dukungan merek bergantung pada peralatan dan ketersediaan. Sampaikan model dan nomor suku cadang agar kami dapat memeriksa kebutuhan Anda.") }}</p>
      </header>
      <div class="brand-group">
        <h3>{{ translate("Engine brands", "Merek mesin") }}</h3>
        <div class="site-tags"><span v-for="brand in engineBrands" :key="brand">{{ brand }}</span></div>
      </div>
      <div class="brand-group">
        <h3>{{ translate("Hydraulic brands", "Merek hidraulik") }}</h3>
        <div class="site-tags"><span v-for="brand in hydraulicBrands" :key="brand">{{ brand }}</span></div>
      </div>
      <div class="brand-group">
        <h3>{{ translate("Compressor brands", "Merek kompresor") }}</h3>
        <div class="site-tags"><span v-for="brand in compressorBrands" :key="brand">{{ brand }}</span></div>
      </div>
    </section>

    <section class="site-cta">
      <div>
        <h2>{{ translate("Looking for a specific part or supply?", "Mencari suku cadang atau perlengkapan tertentu?") }}</h2>
        <p>{{ translate("Send us the equipment details, part number, or vessel requirement.", "Kirimkan detail peralatan, nomor suku cadang, atau kebutuhan kapal kepada kami.") }}</p>
      </div>
      <NuxtLink to="/contact">{{ translate("Request a quotation", "Minta penawaran") }} <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 32px 28px;
}

.category-card {
  min-width: 0;
  color: #0b3c68;
  text-align: center;
  text-decoration: none;
}

.category-card:hover h2 {
  color: #dc2626;
}

.category-card-media {
  display: grid;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  place-items: center;
  background: #fff;
  color: #64748b;
}

.category-card-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
}

.category-card-content {
  padding: 10px 4px 0;
}

.category-card-content h2 {
  margin: 0;
  color: #0b3c68;
  font-size: clamp(16px, 1.65vw, 20px);
  font-weight: 650;
  line-height: 1.35;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 160ms ease;
}

.product-state {
  display: flex;
  min-height: 190px;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #f8fafc;
  color: #64748b;
}

.product-state strong {
  display: block;
  margin-bottom: 5px;
  color: #0f172a;
  font-size: 15px;
}

.product-state p {
  margin: 0;
  font-size: 13px;
}

.category-card-skeleton {
  pointer-events: none;
}

.category-card-skeleton .category-card-media,
.category-skeleton-line {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 45%, #e2e8f0 65%);
  background-size: 200% 100%;
  animation: category-shimmer 1.4s infinite linear;
}

.category-card-skeleton .category-card-media::after {
  display: none;
}

.category-skeleton-line {
  display: block;
  height: 10px;
  margin-top: 11px;
  border-radius: 999px;
}

.category-skeleton-title {
  width: 68%;
  height: 14px;
  margin: 0 auto;
}

@keyframes category-shimmer {
  to { background-position: -200% 0; }
}

.site-cta {
  margin-top: 40px;
}

.supported-brands {
  margin-top: 64px;
}

.supported-brands .site-page-heading {
  margin-bottom: 24px;
}

.brand-group + .brand-group {
  margin-top: 24px;
}

.brand-group h3 {
  margin: 0 0 10px;
  color: #0f172a;
  font-size: 14px;
}

@media (max-width: 950px) {
  .category-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 18px;
  }

  .category-card-content {
    padding: 9px 2px 0;
  }

  .category-card-content h2 {
    font-size: 16px;
  }
}

@media (max-width: 420px) {
  .category-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
