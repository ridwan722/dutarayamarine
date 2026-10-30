<script setup lang="ts">
import { collection, limit, query, where } from "firebase/firestore";
import { computed } from "vue";
import { useCollection, useFirestore } from "vuefire";
import type { ProjectWeb, ProjectWebRecord } from "~/types/projectWeb";
import {
  formatProjectDate,
  getProjectClosing,
  getProjectExcerpt,
  getProjectParagraphs,
  getProjectPhotos,
  getProjectSubtitle,
  getProjectTitle,
} from "~/utils/projectWeb";

definePageMeta({ layout: "website" });
const { locale, translate } = useSiteLocale();

const route = useRoute();
const projectTitle = computed(() => {
  const title = route.params.judul;
  return Array.isArray(title) ? title[0] || "" : String(title || "");
});

const db = useFirestore();
const projectQuery = computed(() =>
  query(
    collection(db, "project-web"),
    where("judul", "==", projectTitle.value),
    limit(1),
  ),
);
const projectSource = useCollection<ProjectWebRecord>(
  projectQuery,
  {
    ssrKey: `public-project-web-title-${projectTitle.value}`,
    wait: true,
  },
);

const pending = projectSource.pending;
const loadError = projectSource.error;
const project = computed(
  () => (projectSource.value?.[0] as ProjectWeb | undefined) || undefined,
);
const photos = computed(() => getProjectPhotos(project.value));
const localizedTitle = computed(
  () =>
    getProjectTitle(project.value, locale.value) ||
    translate("Marine Project", "Proyek Kelautan"),
);
const localizedSubtitle = computed(() =>
  getProjectSubtitle(project.value, locale.value),
);
const paragraphs = computed(() =>
  getProjectParagraphs(project.value, locale.value),
);
const localizedClosing = computed(() =>
  getProjectClosing(project.value, locale.value),
);
const primaryImage = computed(() => photos.value[0] || "/carousel-3.jpg");
const galleryPhotos = computed(() => photos.value);

const seoTitle = computed(() =>
  project.value
    ? `${localizedTitle.value} | ${translate("Duta Raya Marine Projects", "Proyek Duta Raya Marine")}`
    : translate(
        "Marine Project Detail | Duta Raya Marine",
        "Detail Proyek Kelautan | Duta Raya Marine",
      ),
);
const seoDescription = computed(() =>
  getProjectExcerpt(project.value, locale.value),
);
const canonicalUrl = computed(
  () =>
    `https://www.dutarayamarine.com/projects/${encodeURIComponent(projectTitle.value)}`,
);
const socialImage = computed(() =>
  primaryImage.value.startsWith("http")
    ? primaryImage.value
    : "https://www.dutarayamarine.com/carousel-3.jpg",
);

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDescription.value,
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDescription.value,
  ogType: "article",
  ogUrl: () => canonicalUrl.value,
  ogImage: () => socialImage.value,
  ogImageAlt: () => localizedTitle.value,
  twitterCard: "summary_large_image",
  twitterTitle: () => seoTitle.value,
  twitterDescription: () => seoDescription.value,
  twitterImage: () => socialImage.value,
});

useHead(() => ({
  link: [
    {
      key: "canonical",
      rel: "canonical",
      href: canonicalUrl.value,
    },
  ],
}));
</script>

<template>
  <div class="project-detail-page">
    <section v-if="pending" class="detail-loading site-container" :aria-label="translate('Loading project', 'Memuat proyek')">
      <span class="detail-loading-kicker"></span>
      <span class="detail-loading-title"></span>
      <span class="detail-loading-copy"></span>
      <span class="detail-loading-copy detail-loading-copy-short"></span>
      <span class="detail-loading-image"></span>
    </section>

    <section v-else-if="loadError" class="detail-state site-container" role="alert">
      <span class="detail-state-icon">
        <v-icon icon="mdi-cloud-alert-outline" size="32" />
      </span>
      <p class="site-kicker">{{ translate("Connection error", "Kesalahan koneksi") }}</p>
      <h1>{{ translate("Project data could not be loaded.", "Data proyek tidak dapat dimuat.") }}</h1>
      <p>
        {{ translate("Please check the Firestore connection and public read permission for this document.", "Periksa koneksi Firestore dan izin baca publik untuk dokumen ini.") }}
      </p>
      <NuxtLink to="/projects">
        <v-icon icon="mdi-arrow-left" size="17" /> {{ translate("Back to projects", "Kembali ke proyek") }}
      </NuxtLink>
    </section>

    <section v-else-if="!project" class="detail-state site-container">
      <span class="detail-state-icon">
        <v-icon icon="mdi-file-question-outline" size="32" />
      </span>
      <p class="site-kicker">{{ translate("Project not found", "Proyek tidak ditemukan") }}</p>
      <h1>{{ translate("This project is not available.", "Proyek ini tidak tersedia.") }}</h1>
      <p>{{ translate("The document may have been removed or the project URL is incorrect.", "Dokumen mungkin telah dihapus atau URL proyek tidak benar.") }}</p>
      <NuxtLink to="/projects">
        <v-icon icon="mdi-arrow-left" size="17" /> {{ translate("Back to projects", "Kembali ke proyek") }}
      </NuxtLink>
    </section>

    <template v-else>
      <header class="detail-hero">
        <div
          class="detail-hero-background"
          :style="{ backgroundImage: `url('${primaryImage}')` }"
          aria-hidden="true"
        ></div>
        <div class="detail-hero-inner">
          <div class="detail-hero-copy">
            <NuxtLink to="/projects" class="detail-back-link">
              <v-icon icon="mdi-arrow-left" size="16" /> {{ translate("All projects", "Semua proyek") }}
            </NuxtLink>
            <p class="detail-kicker">
              <span aria-hidden="true"></span>
              {{ formatProjectDate(project.createdAt, locale) }}
            </p>
            <h1 >{{ localizedTitle }}</h1>
            <p v-if="localizedSubtitle" class="detail-subtitle">
              {{ localizedSubtitle }}
            </p>
          </div>
          <!-- <span class="detail-photo-count">
            {{ photos.length }} {{ photos.length === 1 ? "photo" : "photos" }}
          </span> -->
        </div>
      </header>

      <main class="detail-content site-container">
        
        <article class="detail-article">
          <NuxtLink to="/projects" class="detail-back-link2">
              <v-icon icon="mdi-arrow-left" size="16" /> {{ translate("All projects", "Semua proyek") }}
            </NuxtLink>
          <!-- <p class="site-kicker">{{ translate("Project overview", "Gambaran proyek") }}</p>
          <h2 class="site-section-title">{{ translate("The project story", "Cerita proyek") }}</h2> -->
            <h1 >{{ localizedTitle }}</h1>
          <div v-if="paragraphs.length" class="detail-paragraphs">
            <p v-for="(paragraph, index) in paragraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
          <p v-else class="detail-empty-copy">
            {{ translate("Project documentation will be added by the Duta Raya Marine team.", "Dokumentasi proyek akan ditambahkan oleh tim Duta Raya Marine.") }}
          </p>

         <div class="detail-gallery-grid">
          <figure v-for="(photo, index) in galleryPhotos" :key="`${photo.slice(0, 60)}-${index}`">
            <img
              :src="photo"
              :alt="`${localizedTitle} ${translate('photo', 'foto')} ${index + 1}`"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

          <blockquote v-if="localizedClosing" class="detail-closing">
            <span aria-hidden="true"><v-icon icon="mdi-format-quote-open" size="28" /></span>
            <p>{{ localizedClosing }}</p>
          </blockquote>
        </article>

        <aside class="detail-sidebar" :aria-label="translate('Project information', 'Informasi proyek')">
          <p class="detail-sidebar-label">{{ translate("Project information", "Informasi proyek") }}</p>
          <dl>
            <div>
              <dt>{{ translate("Published", "Dipublikasikan") }}</dt>
              <dd>{{ formatProjectDate(project.createdAt, locale) }}</dd>
            </div>
            <div>
              <dt>{{ translate("Documentation", "Dokumentasi") }}</dt>
              <dd>{{ photos.length }} {{ locale === "id" ? "foto" : photos.length === 1 ? "photo" : "photos" }}</dd>
            </div>
            <!-- <div>
              <dt>{{ translate("Reference ID", "ID referensi") }}</dt>
              <dd>{{ project.id_project_web || project.id }}</dd>
            </div> -->
          </dl>
          <NuxtLink to="/contact">
            {{ translate("Discuss a similar project", "Diskusikan proyek serupa") }} <v-icon icon="mdi-arrow-up-right" size="17" />
          </NuxtLink>
        </aside>
      </main>

      <section class="detail-next-step">
        <div class="detail-next-step-inner">
          <div>
            <p>{{ translate("Have a related requirement?", "Memiliki kebutuhan terkait?") }}</p>
            <h2>{{ translate("Let’s plan the next project.", "Mari rencanakan proyek berikutnya.") }}</h2>
          </div>
          <NuxtLink to="/contact">
            {{ translate("Contact our team", "Hubungi tim kami") }} <v-icon icon="mdi-arrow-right" size="18" />
          </NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.project-detail-page {
  min-height: 70vh;
  background: #fff;
}

.detail-loading {
  display: flex;
  min-height: 650px;
  flex-direction: column;
}

.detail-loading > span {
  display: block;
  border-radius: 4px;
  background: linear-gradient(90deg, #eef2f6 25%, #f8fafc 50%, #eef2f6 75%);
  background-size: 200% 100%;
  animation: detail-shimmer 1.4s infinite linear;
}

.detail-loading-kicker {
  width: 150px;
  height: 13px;
}

.detail-loading-title {
  width: min(650px, 90%);
  height: 60px;
  margin-top: 30px;
}

.detail-loading-copy {
  width: min(720px, 100%);
  height: 16px;
  margin-top: 22px;
}

.detail-loading-copy-short {
  width: min(520px, 80%);
  margin-top: 10px;
}

.detail-loading-image {
  width: 100%;
  height: 320px;
  margin-top: 45px;
}

@keyframes detail-shimmer {
  to {
    background-position: -200% 0;
  }
}

.detail-state {
  display: flex;
  min-height: 600px;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

.detail-state-icon {
  display: grid;
  width: 68px;
  height: 68px;
  margin-bottom: 20px;
  place-items: center;
  border-radius: 50%;
  background: #fef2f2;
  color: #dc2626;
}

.detail-state .site-kicker {
  justify-content: center;
  margin-bottom: 10px;
}

.detail-state h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(28px, 4vw, 42px);
}

.detail-state > p:last-of-type {
  max-width: 560px;
  margin: 14px 0 24px;
  color: #64748b;
  line-height: 1.7;
}

.detail-state > a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 8px;
  padding: 0 17px;
  border-radius: 6px;
  background: #d51f2b;
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
}

.detail-hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: #0b162a;
  color: #fff;
}

.detail-hero::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(3, 8, 18, 0.96) 0%,
    rgba(5, 12, 25, 0.84) 42%,
    rgba(7, 14, 26, 0.42) 68%,
    rgba(7, 14, 26, 0.2) 100%
  );
  content: "";
}

.detail-hero-background {
  position: absolute;
  z-index: -2;
  inset: 0;
  background-position: center;
  background-size: cover;
  transform: scale(1.02);
}

.detail-hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(1200px, 100% - 48px);
  min-height: 220px;
  grid-template-columns: 1fr;
  align-items: center;
  margin: 0 auto;
  padding: 58px 0;
}

.detail-hero-copy {
  max-width: 700px;
}

.detail-back-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 32px;
  color: #b9c6d6;
  text-decoration: none;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.detail-back-link:hover {
  color: #fff;
}

.detail-back-link2 {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
  color: #939393;
  text-decoration: none;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.detail-back-link2:hover {
  color: #1e1e1e;
}

.detail-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  color: #d9e2ed;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.detail-kicker span {
  width: 30px;
  height: 3px;
  background: #ef3038;
}

.detail-hero-copy h1 {
  margin: 0;
  color: #fff;
  /* font-size: clamp(38px, 5.2vw, 64px); */
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.detail-subtitle {
  max-width: 600px;
  margin: 22px 0 0;
  color: #b9c6d6;
  font-size: 15px;
  line-height: 1.75;
}

.detail-photo-count {
  position: absolute;
  right: 0;
  bottom: 30px;
  padding: 11px 14px;
  border-left: 3px solid #d51f2b;
  background: rgba(255, 255, 255, 0.94);
  color: #0f172a;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  align-items: start;
  gap: clamp(44px, 8vw, 100px);
  padding-top: 36px;
}

.detail-paragraphs {
  margin-top: 28px;
}

.detail-paragraphs p,
.detail-empty-copy {
  margin: 0;
  color: #536174;
  font-size: 16px;
  line-height: 1.9;
  white-space: pre-line;
}

.detail-paragraphs p + p {
  margin-top: 22px;
}

.detail-closing {
  position: relative;
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 18px;
  margin: 38px 0 0;
  padding: 28px 30px;
  border: 0;
  border-left: 4px solid #d51f2b;
  background: #f4f7fa;
}

.detail-closing > span {
  color: #d51f2b;
}

.detail-closing p {
  margin: 0;
  color: #26364a;
  font-size: 12px;
  font-weight: 650;
  line-height: 1.75;
  white-space: pre-line;
}

.detail-sidebar {
  position: sticky;
  top: 100px;
  padding: 26px;
  border: 1px solid #dfe6ed;
  border-top: 4px solid #d51f2b;
  background: #fff;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.06);
}

.detail-sidebar-label {
  margin: 0;
  color: #142036;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-sidebar dl {
  margin: 20px 0 24px;
}

.detail-sidebar dl > div {
  padding: 14px 0;
  border-bottom: 1px solid #e7ecf1;
}

.detail-sidebar dt {
  color: #8490a0;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.detail-sidebar dd {
  margin: 5px 0 0;
  color: #344154;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.55;
  overflow-wrap: anywhere;
}

.detail-sidebar > a {
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 14px;
  border-radius: 5px;
  background: #d51f2b;
  color: #fff;
  text-decoration: none;
  font-size: 11px;
  font-weight: 800;
}

.detail-gallery {
  padding-top: 0;
}

.detail-gallery header {
  margin-bottom: 26px;
}

.detail-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 170px));
  gap: 10px;
}

.detail-gallery-grid figure {
  aspect-ratio: 4 / 3;
  margin: 0;
  overflow: hidden;
  border-radius: 4px;
  background: #ffffff;
}

.detail-gallery-grid img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 160ms ease;
}

.detail-gallery-grid figure:hover img {
  opacity: 0.9;
}

.detail-next-step {
  padding: 0 0 80px;
}

.detail-next-step-inner {
  display: flex;
  width: min(1120px, 100% - 48px);
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin: 0 auto;
  padding: 34px 38px;
  background: #0b162a;
  color: #fff;
}

.detail-next-step p {
  margin: 0 0 7px;
  color: #f04449;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.detail-next-step h2 {
  margin: 0;
  font-size: clamp(23px, 3vw, 31px);
}

.detail-next-step a {
  display: inline-flex;
  min-height: 46px;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  padding: 0 18px;
  border-radius: 5px;
  background: #d51f2b;
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
}

@media (prefers-reduced-motion: reduce) {
  .detail-loading > span {
    animation: none;
  }

  .detail-gallery-grid img {
    transition: none;
  }
}

@media (max-width: 940px) {
  .detail-hero-inner {
    min-height: 200px;
  }

  .detail-hero-copy {
    max-width: 760px;
  }

  .detail-content {
    grid-template-columns: 1fr;
  }

  .detail-sidebar {
    position: static;
  }
}

@media (max-width: 720px) {
  .detail-hero::after {
    background: linear-gradient(
      180deg,
      rgba(3, 8, 18, 0.78),
      rgba(3, 8, 18, 0.92)
    );
  }

  .detail-hero-inner {
    width: calc(100% - 32px);
    min-height: 200px;
    padding: 44px 0 90px;
  }

  .detail-back-link {
    margin-bottom: 32px;
  }

  .detail-back-link2 {
    margin-bottom: 12px;
  }

  .detail-photo-count {
    right: auto;
    bottom: 22px;
    left: 0;
  }

  .detail-paragraphs p,
  .detail-empty-copy {
    font-size: 15px;
  }

  .detail-next-step-inner {
    width: calc(100% - 32px);
    align-items: flex-start;
    padding: 30px 26px;
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .detail-hero-copy h1 {
    font-size: 38px;
  }

  .detail-closing {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .detail-next-step a {
    width: 100%;
    justify-content: center;
  }
}
</style>
