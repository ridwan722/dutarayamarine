<script setup lang="ts">
import { doc } from "firebase/firestore";
import { computed, ref, watch } from "vue";
import { useDocument, useFirestore } from "vuefire";
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
  specification?: string;
  specification_en?: string;
  spesifikasi?: string;
  brand?: string;
  merk?: string;
  model?: string;
  part_number?: string;
  partNumber?: string;
  tags?: string[] | string;
  foto?: Array<CatalogPhoto | string>;
}

definePageMeta({ layout: "website" });

const route = useRoute();
const { translate } = useSiteLocale();
const db = useFirestore();

function routeParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : String(value || "");
}

const categoryId = computed(() => routeParam(route.params.id));
const productId = computed(() => routeParam(route.params.productId));

const categoryReference = computed(() =>
  categoryId.value
    ? doc(db, "category-product-service", categoryId.value)
    : null,
);

const productReference = computed(() =>
  categoryId.value && productId.value
    ? doc(
        db,
        "category-product-service",
        categoryId.value,
        "product-service",
        productId.value,
      )
    : null,
);

const categorySource = useDocument<CategoryProductServiceRecord>(
  categoryReference,
  {
    ssrKey: `public-product-detail-${categoryId.value}-category`,
    wait: true,
  },
);

const productSource = useDocument<ProductServiceRecord>(productReference, {
  ssrKey: `public-product-detail-${categoryId.value}-${productId.value}`,
  wait: true,
});

const categoryPending = categorySource.pending;
const productPending = productSource.pending;
const productError = productSource.error;

const categoryName = computed(() => {
  const category = categorySource.value;
  if (!category) return translate("Product category", "Kategori produk");

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
});

const productName = computed(() => {
  const product = productSource.value;
  if (!product) return translate("Product details", "Detail produk");

  const indonesian =
    product.product_service ||
    product.nama_product_service ||
    product.nama ||
    product.name ||
    translate("Marine product", "Produk kelautan");
  const english =
    product.product_service_en ||
    product.nama_product_service_en ||
    product.name_en ||
    indonesian;

  return translate(english, indonesian);
});

const productDescription = computed(() => {
  const product = productSource.value;
  if (!product) return "";

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
});

const productSpecification = computed(() => {
  const product = productSource.value;
  if (!product) return "";
  return translate(
    product.specification_en ||
      product.specification ||
      product.spesifikasi ||
      "",
    product.spesifikasi ||
      product.specification ||
      product.specification_en ||
      "",
  );
});

const productPhotos = computed(() => {
  const photos = productSource.value?.foto ?? [];
  return [
    ...new Set(
      photos
        .map((photo) =>
          typeof photo === "string" ? photo : photo?.url || "",
        )
        .filter(Boolean),
    ),
  ];
});

const activePhotoIndex = ref(0);
const activePhoto = computed(
  () => productPhotos.value[activePhotoIndex.value] || "",
);

watch(productPhotos, () => {
  activePhotoIndex.value = 0;
});

const productTags = computed(() => {
  const tags = productSource.value?.tags;
  if (Array.isArray(tags)) return tags.filter(Boolean);
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
});

const productFacts = computed(() => {
  const product = productSource.value;
  if (!product) return [];

  return [
    {
      label: translate("Brand", "Merek"),
      value: product.brand || product.merk || "",
    },
    { label: "Model", value: product.model || "" },
    {
      label: translate("Part number", "Nomor suku cadang"),
      value: product.part_number || product.partNumber || "",
    },
  ].filter((fact) => fact.value);
});

const categoryRoute = computed(() => ({
  name: "products-id",
  params: { id: categoryId.value },
}));

usePageSeo({
  title: computed(() => `${productName.value} | Duta Raya Marine`),
  description: computed(() => productDescription.value),
  path: `/products/${encodeURIComponent(categoryId.value)}/${encodeURIComponent(productId.value)}`,
  keywords: seoKeywords.products,
});
</script>

<template>
  <div class="site-container product-detail-page">
    <nav class="product-breadcrumb" :aria-label="translate('Breadcrumb', 'Navigasi halaman')">
      <NuxtLink to="/products">{{ translate("Products", "Produk") }}</NuxtLink>
      <v-icon icon="mdi-chevron-right" size="17" />
      <NuxtLink :to="categoryRoute">{{ categoryName }}</NuxtLink>
      <v-icon icon="mdi-chevron-right" size="17" />
      <span>{{ productName }}</span>
    </nav>

    <div v-if="productPending || categoryPending" class="detail-loading" aria-busy="true">
      <div class="detail-loading-media"></div>
      <div class="detail-loading-copy">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div v-else-if="productError" class="detail-state" role="alert">
      <v-icon icon="mdi-cloud-alert-outline" size="34" />
      <div>
        <strong>{{ translate("Product details are temporarily unavailable", "Detail produk sementara tidak tersedia") }}</strong>
        <p>{{ translate("Please return to the category and try again.", "Silakan kembali ke kategori dan coba lagi.") }}</p>
      </div>
    </div>

    <div v-else-if="!productSource" class="detail-state">
      <v-icon icon="mdi-package-variant-remove" size="34" />
      <div>
        <strong>{{ translate("Product not found", "Produk tidak ditemukan") }}</strong>
        <p>{{ translate("This product may have been removed or renamed.", "Produk ini mungkin telah dihapus atau diubah namanya.") }}</p>
      </div>
    </div>

    <article v-else class="product-detail">
      <div class="product-gallery">
        <div class="product-main-photo" :class="{ 'has-photo': activePhoto }">
          <img v-if="activePhoto" :src="activePhoto" :alt="productName" />
          <v-icon v-else icon="mdi-package-variant-closed" size="78" />
        </div>

        <div v-if="productPhotos.length > 1" class="product-thumbnails" :aria-label="translate('Product photos', 'Foto produk')">
          <button
            v-for="(photo, index) in productPhotos"
            :key="`${photo}-${index}`"
            type="button"
            :class="{ active: activePhotoIndex === index }"
            :aria-label="translate(`Show product photo ${index + 1}`, `Tampilkan foto produk ${index + 1}`)"
            :aria-pressed="activePhotoIndex === index"
            @click="activePhotoIndex = index"
          >
            <img :src="photo" alt="" />
          </button>
        </div>
      </div>

      <div class="product-detail-copy">
        <NuxtLink class="product-category-link" :to="categoryRoute">{{ categoryName }}</NuxtLink>
        <h1>{{ productName }}</h1>
        <p class="product-description">{{ productDescription }}</p>

        <dl v-if="productFacts.length" class="product-facts">
          <div v-for="fact in productFacts" :key="fact.label">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>

        <div v-if="productSpecification" class="product-specification">
          <h2>{{ translate("Specifications", "Spesifikasi") }}</h2>
          <p>{{ productSpecification }}</p>
        </div>

        <div v-if="productTags.length" class="site-tags product-detail-tags">
          <span v-for="(tag, index) in productTags" :key="`${tag}-${index}`">{{ tag }}</span>
        </div>

        <NuxtLink class="quotation-button" to="/contact">
          {{ translate("Request a quotation", "Minta penawaran") }}
          <v-icon icon="mdi-arrow-right" size="18" />
        </NuxtLink>
      </div>
    </article>

    <div class="back-to-category">
      <NuxtLink :to="categoryRoute">
        <v-icon icon="mdi-arrow-left" size="17" />
        {{ translate("Back to category", "Kembali ke kategori") }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  padding-top: 32px;
}

.product-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 34px;
  padding-bottom: 14px;
  border-bottom: 1px solid #dbe3ec;
  color: #94a3b8;
  font-size: 12px;
}

.product-breadcrumb a {
  color: #475569;
  text-decoration: none;
  font-weight: 750;
}

.product-breadcrumb a:hover {
  color: #dc2626;
}

.product-breadcrumb span {
  overflow: hidden;
  color: #64748b;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-detail {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(30px, 4vw, 48px);
  align-items: start;
}

.product-main-photo {
  display: grid;
  min-height: 430px;
  overflow: hidden;
  place-items: center;
  border: 1px solid #d5dde7;
  border-radius: 2px;
  background: #fff;
  color: #64748b;
}

.product-main-photo img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 430px;
  object-fit: contain;
  background: #fff;
}

.product-thumbnails {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.product-thumbnails button {
  height: 74px;
  overflow: hidden;
  padding: 0;
  border: 1px solid #d5dde7;
  border-radius: 2px;
  background: #fff;
  cursor: pointer;
}

.product-thumbnails button.active {
  border: 2px solid #0f2742;
}

.product-thumbnails img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-detail-copy {
  padding-top: 20px;
  border-top: 3px solid #dc2626;
}

.product-category-link {
  display: inline-flex;
  margin-bottom: 17px;
  padding: 2px 0 2px 10px;
  border-left: 3px solid #0f2742;
  color: #475569;
  text-decoration: none;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.product-category-link:hover {
  color: #dc2626;
}

.product-detail-copy h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(28px, 3.4vw, 40px);
  font-weight: 800;
  letter-spacing: -.025em;
  line-height: 1.15;
}

.product-description {
  margin: 20px 0 0;
  padding-top: 18px;
  border-top: 1px solid #dbe3ec;
  color: #526174;
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-line;
}

.product-facts {
  display: grid;
  gap: 0;
  margin: 24px 0 0;
  border: 1px solid #dbe3ec;
  border-bottom: 0;
}

.product-facts div {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 16px;
  padding: 12px 14px;
  border-bottom: 1px solid #dbe3ec;
}

.product-facts div:nth-child(odd) {
  background: #f8fafc;
}

.product-facts dt {
  color: #64748b;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.product-facts dd {
  margin: 0;
  color: #1e293b;
  font-size: 13px;
  font-weight: 650;
}

.product-specification {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #dbe3ec;
}

.product-specification h2 {
  margin: 0 0 9px;
  color: #0f172a;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: .03em;
  text-transform: uppercase;
}

.product-specification p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre-line;
}

.product-detail-tags {
  margin-top: 24px;
  padding-top: 0;
}

.quotation-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 0 19px;
  border-radius: 2px;
  background: #0f2742;
  color: #fff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: .01em;
  transition: background 160ms ease;
}

.quotation-button:hover {
  background: #dc2626;
}

.detail-state {
  display: flex;
  min-height: 240px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 30px;
  border: 1px solid #e2e8f0;
  border-radius: 2px;
  background: #f8fafc;
  color: #64748b;
}

.detail-state strong {
  display: block;
  margin-bottom: 5px;
  color: #0f172a;
}

.detail-state p {
  margin: 0;
  font-size: 13px;
}

.detail-loading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(30px, 4vw, 48px);
}

.detail-loading-media,
.detail-loading-copy span {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 45%, #e2e8f0 65%);
  background-size: 200% 100%;
  animation: detail-shimmer 1.4s infinite linear;
}

.detail-loading-media {
  min-height: 430px;
  border-radius: 2px;
}

.detail-loading-copy span {
  display: block;
  width: 100%;
  height: 14px;
  margin-bottom: 16px;
  border-radius: 999px;
}

.detail-loading-copy span:first-child {
  width: 35%;
}

.detail-loading-copy span:nth-child(2) {
  width: 82%;
  height: 38px;
}

.detail-loading-copy span:last-child {
  width: 64%;
}

@keyframes detail-shimmer {
  to { background-position: -200% 0; }
}

.back-to-category {
  margin-top: 52px;
  padding-top: 20px;
  border-top: 1px solid #dbe3ec;
}

.back-to-category a {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #475569;
  text-decoration: none;
  font-size: 13px;
  font-weight: 750;
}

.back-to-category a:hover {
  color: #dc2626;
}

@media (max-width: 820px) {
  .product-detail,
  .detail-loading {
    grid-template-columns: 1fr;
  }

  .product-main-photo,
  .product-main-photo img,
  .detail-loading-media {
    min-height: 360px;
  }
}

@media (max-width: 560px) {
  .product-detail-page {
    padding-top: 24px;
  }

  .product-breadcrumb {
    align-items: flex-start;
  }

  .product-main-photo,
  .product-main-photo img,
  .detail-loading-media {
    min-height: 270px;
  }

  .product-thumbnails {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .product-facts div {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
