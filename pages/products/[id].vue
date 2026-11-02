<script setup lang="ts">
import { collection, doc } from "firebase/firestore";
import { computed } from "vue";
import { useCollection, useDocument, useFirestore } from "vuefire";
import { seoKeywords } from "~/seo.config";

interface CatalogPhoto {
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
  foto?: Array<CatalogPhoto | string>;
}

interface ProductServiceRecord {
  id?: string;
  id_product_service?: string;
  product_service?: string;
  product_service_en?: string;
  nama_product_service?: string;
  nama_product_service_en?: string;
  nama?: string;
  name?: string;
  name_en?: string;
  description_product_service?: string;
  description_product_service_en?: string;
  description?: string;
  description_en?: string;
  tags?: string[] | string;
  foto?: Array<CatalogPhoto | string>;
  createdAt?: number | { seconds?: number; toMillis?: () => number };
}

definePageMeta({ layout: "website" });

const route = useRoute();
const { translate } = useSiteLocale();
const db = useFirestore();

const categoryId = computed(() => {
  const routeId = route.params.id;
  return Array.isArray(routeId) ? routeId[0] || "" : String(routeId || "");
});

const categoryReference = computed(() =>
  categoryId.value
    ? doc(db, "category-product-service", categoryId.value)
    : null,
);

const categorySource = useDocument<CategoryProductServiceRecord>(
  categoryReference,
  {
    ssrKey: `public-product-category-${categoryId.value}`,
    wait: true,
  },
);

const productsReference = computed(() =>
  categoryId.value
    ? collection(
        db,
        "category-product-service",
        categoryId.value,
        "product-service",
      )
    : null,
);

const productSource = useCollection<ProductServiceRecord>(productsReference, {
  ssrKey: `public-product-category-${categoryId.value}-products`,
  wait: true,
});

const categoryPending = categorySource.pending;
const categoryError = categorySource.error;
const productsPending = productSource.pending;
const productsError = productSource.error;

function resolveCategoryName(
  category: CategoryProductServiceRecord | undefined,
) {
  if (!category) {
    return translate("Product category", "Kategori produk");
  }

  const indonesian =
    category.category_product_service ||
    category.nama_category_product_service ||
    category.nama_category ||
    category.nama ||
    category.name ||
    translate("Product category", "Kategori produk");
  const english =
    category.category_product_service_en ||
    category.nama_category_product_service_en ||
    category.nama_category_en ||
    category.name_en ||
    indonesian;

  return translate(english, indonesian);
}

const categoryName = computed(() =>
  resolveCategoryName(categorySource.value),
);

usePageSeo({
  title: computed(() =>
    translate(
      `${categoryName.value} | Marine Products | Duta Raya Marine`,
      `${categoryName.value} | Produk Kelautan | Duta Raya Marine`,
    ),
  ),
  description: computed(() =>
    translate(
      `Browse ${categoryName.value} products supplied by Duta Raya Marine for vessel and project requirements.`,
      `Lihat produk ${categoryName.value} yang dipasok Duta Raya Marine untuk kebutuhan kapal dan proyek.`,
    ),
  ),
  path: `/products/${encodeURIComponent(categoryId.value)}`,
  keywords: seoKeywords.products,
});

function getCreatedAt(value: ProductServiceRecord["createdAt"]) {
  if (typeof value === "number") return value;
  if (typeof value?.toMillis === "function") return value.toMillis();
  return typeof value?.seconds === "number" ? value.seconds * 1000 : 0;
}

const products = computed(() =>
  [...(productSource.value ?? [])].sort(
    (first, second) =>
      getCreatedAt(second.createdAt) - getCreatedAt(first.createdAt),
  ),
);

function productName(product: ProductServiceRecord, index = 0) {
  const indonesian =
    product.product_service ||
    product.nama_product_service ||
    product.nama ||
    product.name ||
    `Produk ${index + 1}`;
  const english =
    product.product_service_en ||
    product.nama_product_service_en ||
    product.name_en ||
    indonesian;

  return translate(english, indonesian);
}

function productDescription(product: ProductServiceRecord) {
  const indonesian =
    product.description_product_service ||
    product.description ||
    product.description_product_service_en ||
    product.description_en ||
    "Hubungi kami untuk spesifikasi dan ketersediaan produk.";
  const english =
    product.description_product_service_en ||
    product.description_en ||
    product.description_product_service ||
    product.description ||
    "Contact us for product specifications and availability.";

  return translate(english, indonesian);
}

function productPhoto(product: ProductServiceRecord) {
  const photo = product.foto?.[0];
  if (typeof photo === "string") return photo;
  return typeof photo?.url === "string" ? photo.url : "";
}

function productKey(product: ProductServiceRecord, index: number) {
  return product.id || product.id_product_service || `product-${index}`;
}

function productDocumentId(product: ProductServiceRecord) {
  return product.id || product.id_product_service || "";
}

function productRoute(product: ProductServiceRecord) {
  return `/products/${encodeURIComponent(categoryId.value)}/${encodeURIComponent(productDocumentId(product))}`;
}

function productTags(product: ProductServiceRecord) {
  if (Array.isArray(product.tags)) return product.tags.filter(Boolean);
  if (typeof product.tags === "string") {
    return product.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}
</script>

<template>
  <NuxtPage v-if="route.params.productId" />

  <div v-else class="site-container category-products-page">
    <nav class="catalog-breadcrumb" :aria-label="translate('Breadcrumb', 'Navigasi halaman')">
      <NuxtLink to="/products">{{ translate("Products", "Produk") }}</NuxtLink>
      <v-icon icon="mdi-chevron-right" size="17" />
      <span>{{ categoryName }}</span>
    </nav>

    <header class="site-page-heading category-heading">
      <p class="site-kicker">{{ translate("Product category", "Kategori produk") }}</p>
      <h1 class="site-title">{{ categoryName }}</h1>
      <p class="site-lead">
        {{ translate("Explore the available products in this category. Contact our team for specifications, brands, pricing, and current availability.", "Jelajahi produk yang tersedia dalam kategori ini. Hubungi tim kami untuk spesifikasi, merek, harga, dan ketersediaan terkini.") }}
      </p>
    </header>

    <div v-if="categoryError" class="product-state" role="alert">
      <v-icon icon="mdi-cloud-alert-outline" size="32" />
      <div>
        <strong>{{ translate("This category is temporarily unavailable", "Kategori ini sementara tidak tersedia") }}</strong>
        <p>{{ translate("Please return to the product categories and try again.", "Silakan kembali ke daftar kategori produk dan coba lagi.") }}</p>
      </div>
    </div>

    <div v-else-if="!categoryPending && !categorySource" class="product-state">
      <v-icon icon="mdi-folder-question-outline" size="32" />
      <div>
        <strong>{{ translate("Category not found", "Kategori tidak ditemukan") }}</strong>
        <p>{{ translate("The category may have been removed or renamed.", "Kategori mungkin telah dihapus atau diubah namanya.") }}</p>
      </div>
    </div>

    <section v-else class="product-catalog" :aria-label="translate('Products in this category', 'Produk dalam kategori ini')">
      <div v-if="productsPending || categoryPending" class="site-card-grid product-grid" aria-busy="true" :aria-label="translate('Loading products', 'Memuat produk')">
        <article v-for="index in 6" :key="index" class="site-card product-card product-card-skeleton">
          <div class="product-card-media"></div>
          <div class="product-card-content">
            <span class="product-skeleton-line product-skeleton-title"></span>
            <span class="product-skeleton-line"></span>
            <span class="product-skeleton-line product-skeleton-short"></span>
          </div>
        </article>
      </div>

      <div v-else-if="productsError" class="product-state" role="alert">
        <v-icon icon="mdi-cloud-alert-outline" size="32" />
        <div>
          <strong>{{ translate("Products are temporarily unavailable", "Produk sementara tidak tersedia") }}</strong>
          <p>{{ translate("Please try again in a moment.", "Silakan coba lagi beberapa saat.") }}</p>
        </div>
      </div>

      <div v-else-if="products.length" class="site-card-grid product-grid">
        <NuxtLink
          v-for="(product, index) in products"
          :key="productKey(product, index)"
          :to="productRoute(product)"
          class="site-card product-card"
        >
          <div class="product-card-media" :class="{ 'has-photo': productPhoto(product) }">
            <img
              v-if="productPhoto(product)"
              :src="productPhoto(product)"
              :alt="productName(product, index)"
              loading="lazy"
            />
            <v-icon v-else icon="mdi-package-variant-closed" size="54" />
          </div>
          <div class="product-card-content">
            <span class="product-category">{{ categoryName }}</span>
            <h2>{{ productName(product, index) }}</h2>
            <p>{{ productDescription(product) }}</p>
            <div v-if="productTags(product).length" class="site-tags product-tags">
              <span v-for="(tag, tagIndex) in productTags(product)" :key="`${tag}-${tagIndex}`">{{ tag }}</span>
            </div>
            <span class="product-card-link">
              {{ translate("View product details", "Lihat detail produk") }}
              <v-icon icon="mdi-arrow-right" size="16" />
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="product-state">
        <v-icon icon="mdi-package-variant" size="32" />
        <div>
          <strong>{{ translate("No products published in this category yet", "Belum ada produk yang dipublikasikan dalam kategori ini") }}</strong>
          <p>{{ translate("New products will appear here automatically.", "Produk baru akan tampil otomatis di sini.") }}</p>
        </div>
      </div>
    </section>

    <section class="site-cta">
      <div>
        <h2>{{ translate("Need a product that is not listed?", "Butuh produk yang belum terdaftar?") }}</h2>
        <p>{{ translate("Send us the equipment details, part number, or vessel requirement.", "Kirimkan detail peralatan, nomor suku cadang, atau kebutuhan kapal kepada kami.") }}</p>
      </div>
      <NuxtLink to="/contact">{{ translate("Request a quotation", "Minta penawaran") }} <v-icon icon="mdi-arrow-right" size="18" /></NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.category-products-page {
  padding-top: 32px;
}

.catalog-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 34px;
  padding-bottom: 14px;
  border-bottom: 1px solid #dbe3ec;
  color: #94a3b8;
  font-size: 12px;
}

.catalog-breadcrumb a {
  color: #475569;
  text-decoration: none;
  font-weight: 750;
}

.catalog-breadcrumb a:hover {
  color: #dc2626;
}

.catalog-breadcrumb span {
  overflow: hidden;
  color: #64748b;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-heading {
  margin-bottom: 36px;
}

.product-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.product-card {
  min-height: 420px;
  overflow: hidden;
  padding: 0;
  border: 1px solid #d5dde7;
  border-radius: 2px;
  color: inherit;
  text-decoration: none;
  transition: border-color 160ms ease;
}

.product-card:hover {
  transform: none;
  border-color: #0f2742;
  box-shadow: none;
}

.product-card:hover h2,
.product-card:hover .product-card-link {
  color: #dc2626;
}

.product-card-media {
  position: relative;
  display: grid;
  height: 220px;
  flex: 0 0 auto;
  overflow: hidden;
  place-items: center;
  border-bottom: 1px solid #dbe3ec;
  background: #fff;
  color: #64748b;
}

.product-card-media img {
  display: block;
  width: 100%;
  height: 100%;
  padding: 12px;
  object-fit: contain;
  object-position: center;
}

.product-category {
  display: block;
  max-width: 100%;
  overflow: hidden;
  margin-bottom: 11px;
  padding-left: 9px;
  border-left: 3px solid #dc2626;
  color: #64748b;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .09em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.product-card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 18px 20px 20px;
}

.product-card-content h2 {
  margin: 0 0 10px;
  color: #0f172a;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -.01em;
  line-height: 1.3;
  transition: color 160ms ease;
}

.product-card-content p {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  color: #64748b;
  font-size: 13px;
  line-height: 1.65;
}

.product-tags {
  margin-top: 15px;
  padding-top: 14px;
  border-top: 1px solid #edf1f5;
}

.product-tags span {
  padding: 3px 7px;
  border: 1px solid #dbe3ec;
  border-radius: 2px;
  background: #fff;
  color: #526174;
  font-size: 10px;
  font-weight: 700;
}

.product-card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 17px;
  color: #0f2742;
  font-size: 12px;
  font-weight: 800;
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
  border-radius: 2px;
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

.product-card-skeleton {
  pointer-events: none;
}

.product-card-skeleton .product-card-media,
.product-skeleton-line {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 45%, #e2e8f0 65%);
  background-size: 200% 100%;
  animation: product-shimmer 1.4s infinite linear;
}

.product-skeleton-line {
  display: block;
  height: 10px;
  margin-top: 11px;
  border-radius: 999px;
}

.product-skeleton-title {
  width: 72%;
  height: 16px;
  margin-top: 0;
}

.product-skeleton-short {
  width: 58%;
}

@keyframes product-shimmer {
  to { background-position: -200% 0; }
}

.site-cta {
  margin-top: 48px;
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .category-products-page {
    padding-top: 24px;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .product-card {
    min-height: 0;
  }
}
</style>
