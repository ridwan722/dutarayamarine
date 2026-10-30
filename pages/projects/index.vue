<script setup lang="ts">
import { collection } from "firebase/firestore";
import { computed, nextTick, onMounted, watch } from "vue";
import { useCollection, useFirestore } from "vuefire";
import { seoKeywords } from "~/seo.config";
import type { ProjectWeb, ProjectWebRecord } from "~/types/projectWeb";
import {
  formatProjectDate,
  getProjectExcerpt,
  getProjectPhotos,
  getProjectTitle,
  getProjectTimestamp,
} from "~/utils/projectWeb";

definePageMeta({ layout: "website" });
const { locale, translate } = useSiteLocale();

usePageSeo({
  title: computed(() => translate("Marine Projects & Vessel Support | Duta Raya Marine", "Proyek Kelautan & Dukungan Kapal | Duta Raya Marine")),
  description: computed(() => translate("Explore marine machinery, HVAC, vessel supply, and technical service projects from Duta Raya Marine in Batam and Jakarta.", "Jelajahi proyek permesinan kelautan, HVAC, pasokan kapal, dan layanan teknis Duta Raya Marine di Batam dan Jakarta.")),
  path: "/projects",
  keywords: seoKeywords.projects,
  image: "https://www.dutarayamarine.com/carousel-3.jpg",
});

const db = useFirestore();
const projectSource = useCollection<ProjectWebRecord>(
  collection(db, "project-web"),
  {
    ssrKey: "public-project-web-list",
    wait: true,
  },
);

const pending = projectSource.pending;
const loadError = projectSource.error;
const projectScrollPosition = useState<number | null>(
  "projects-scroll-position",
  () => null,
);

const projects = computed<ProjectWeb[]>(() =>
  [...(projectSource.value ?? [])]
    .map((project) => project as ProjectWeb)
    .sort(
      (first, second) =>
        getProjectTimestamp(second.createdAt) -
        getProjectTimestamp(first.createdAt),
    ),
);

const portfolioStatus = computed(() => {
  if (pending.value) return translate("Loading live portfolio", "Memuat portofolio langsung");
  if (loadError.value) return translate("Portfolio connection unavailable", "Koneksi portofolio tidak tersedia");

  const count = projects.value.length;
  if (locale.value === "id") return `${count} proyek dipublikasikan`;
  return `${count} ${count === 1 ? "project" : "projects"} published`;
});

function projectImage(project: ProjectWeb, index: number) {
  return getProjectPhotos(project)[0] || `/carousel-${(index % 3) + 1}.jpg`;
}

function projectPath(project: ProjectWeb) {
  return project.judul
    ? `/projects/${encodeURIComponent(project.judul)}`
    : "/projects";
}

function localizedProjectTitle(project: ProjectWeb) {
  return getProjectTitle(project, locale.value) || translate("Marine Project", "Proyek Kelautan");
}

function rememberProjectScrollPosition(event: MouseEvent, project: ProjectWeb) {
  if (
    !project.judul ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  projectScrollPosition.value = window.scrollY;
}

async function restoreProjectScrollPosition(position: number) {
  await nextTick();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: position, left: 0, behavior: "auto" });
      projectScrollPosition.value = null;
    });
  });
}

onMounted(() => {
  const savedPosition = projectScrollPosition.value;
  if (savedPosition === null) return;

  if (!pending.value) {
    void restoreProjectScrollPosition(savedPosition);
    return;
  }

  const stopWatching = watch(
    pending,
    (isPending) => {
      if (isPending) return;

      stopWatching();
      void restoreProjectScrollPosition(savedPosition);
    },
    { flush: "post" },
  );
});
</script>

<template>
  <div class="projects-page">
    <section class="projects-hero">
      <div class="projects-hero-inner">
        <div class="projects-hero-copy">
          <p class="projects-kicker">
            <span aria-hidden="true"></span> {{ translate("Project portfolio", "Portofolio proyek") }}
          </p>
          <h1>{{ translate("Marine work,", "Pekerjaan kelautan,") }}<br /><em>{{ translate("documented clearly.", "terdokumentasi dengan jelas.") }}</em></h1>
          <p>
            {{ translate("Explore project documentation from our marine supply and technical service work.", "Jelajahi dokumentasi proyek dari pekerjaan pasokan kelautan dan layanan teknis kami.") }}
          </p>
          <a href="#project-list" class="projects-primary-action">
            {{ translate("Explore projects", "Jelajahi proyek") }} <v-icon icon="mdi-arrow-down" size="18" />
          </a>
        </div>

        <div class="projects-hero-visual">
          <img
            src="/carousel-3.jpg"
            :alt="translate('Aerial view of a marine vessel deck at sea', 'Pemandangan udara dek kapal di laut')"
          />
          <div class="projects-hero-note" aria-live="polite">
            <span>{{ translate("Live project library", "Pustaka proyek langsung") }}</span>
            <strong>{{ portfolioStatus }}</strong>
          </div>
        </div>
      </div>
    </section>

    <main id="project-list" class="projects-content site-container">
      <section class="projects-intro" aria-labelledby="project-list-title">
        <div>
          <p class="site-kicker">{{ translate("Our projects", "Proyek kami") }}</p>
          <h2 id="project-list-title" class="site-section-title">
            {{ translate("Project stories from", "Cerita proyek dari") }}<br /><span class="site-red">{{ translate("the field.", "lapangan.") }}</span>
          </h2>
        </div>
        <p>
          {{ translate("Each entry contains the project overview, written documentation, and photos maintained by the Duta Raya Marine team.", "Setiap entri memuat gambaran proyek, dokumentasi tertulis, dan foto yang dikelola oleh tim Duta Raya Marine.") }}
        </p>
      </section>

      <section v-if="pending" class="project-grid" :aria-label="translate('Loading projects', 'Memuat proyek')">
        <article v-for="index in 3" :key="index" class="project-card project-card-skeleton">
          <div class="skeleton-image"></div>
          <div class="project-card-body">
            <span class="skeleton-line skeleton-line-small"></span>
            <span class="skeleton-line skeleton-line-title"></span>
            <span class="skeleton-line"></span>
            <span class="skeleton-line skeleton-line-short"></span>
          </div>
        </article>
      </section>

      <section v-else-if="loadError" class="project-state" role="alert">
        <span class="project-state-icon">
          <v-icon icon="mdi-cloud-alert-outline" size="30" />
        </span>
        <p class="site-kicker">{{ translate("Connection error", "Kesalahan koneksi") }}</p>
        <h2>{{ translate("Project data could not be loaded.", "Data proyek tidak dapat dimuat.") }}</h2>
        <p>
          {{ translate("Please check the Firestore connection and public read permission for the", "Periksa koneksi Firestore dan izin baca publik untuk koleksi") }}
          <code>project-web</code>{{ translate(" collection, then reload this page.", ", lalu muat ulang halaman ini.") }}
        </p>
      </section>

      <section v-else-if="projects.length === 0" class="project-state">
        <span class="project-state-icon">
          <v-icon icon="mdi-folder-open-outline" size="30" />
        </span>
        <p class="site-kicker">{{ translate("Project library", "Pustaka proyek") }}</p>
        <h2>{{ translate("No projects have been published yet.", "Belum ada proyek yang dipublikasikan.") }}</h2>
        <p>
          {{ translate("New documents added to the", "Dokumen baru yang ditambahkan ke koleksi") }}
          <code>project-web</code>{{ translate(" collection will appear here automatically.", " akan muncul di sini secara otomatis.") }}
        </p>
      </section>

      <section v-else class="project-grid" :aria-label="translate('Published projects', 'Proyek yang dipublikasikan')">
        <NuxtLink
          v-for="(project, index) in projects"
          :key="project.id"
          :to="projectPath(project)"
          class="project-card"
          :aria-label="`${translate('Read project', 'Baca proyek')}: ${localizedProjectTitle(project)}`"
          @click="rememberProjectScrollPosition($event, project)"
        >
          <div class="project-card-image">
            <img
              :src="projectImage(project, index)"
              :alt="localizedProjectTitle(project)"
              loading="lazy"
              decoding="async"
            />
            <span class="project-card-index">{{ String(index + 1).padStart(2, "0") }}</span>
          </div>
          <div class="project-card-body">
            <div class="project-card-meta">
              <span>{{ formatProjectDate(project.createdAt, locale) }}</span>
              <span>
                {{ getProjectPhotos(project).length }}
                {{ locale === "id" ? "foto" : getProjectPhotos(project).length === 1 ? "photo" : "photos" }}
              </span>
            </div>
            <h3>{{ localizedProjectTitle(project) }}</h3>
            <p>{{ getProjectExcerpt(project, locale) }}</p>
            <span class="project-card-link">
              {{ translate("View project details", "Lihat detail proyek") }} <v-icon icon="mdi-arrow-up-right" size="17" />
            </span>
          </div>
        </NuxtLink>
      </section>

      <section class="project-enquiry">
        <div>
          <p class="project-enquiry-label">{{ translate("Start a project enquiry", "Mulai inquiry proyek") }}</p>
          <h2>{{ translate("Tell us what needs to move forward.", "Sampaikan kebutuhan agar dapat dilanjutkan.") }}</h2>
          <p>
            {{ translate("Send the vessel name, location, equipment model, technical scope, and target schedule for a focused review.", "Kirimkan nama kapal, lokasi, model peralatan, ruang lingkup teknis, dan target jadwal untuk peninjauan yang terarah.") }}
          </p>
        </div>
        <NuxtLink to="/contact">
          {{ translate("Contact our project team", "Hubungi tim proyek kami") }} <v-icon icon="mdi-arrow-right" size="19" />
        </NuxtLink>
      </section>
    </main>
  </div>
</template>

<style scoped>
.projects-page {
  overflow: hidden;
  background: #fff;
}

.projects-hero {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(220, 38, 38, 0.1), transparent 32%),
    #0b162a;
  color: #fff;
}

.projects-hero::after {
  position: absolute;
  top: -180px;
  right: -140px;
  width: 440px;
  height: 440px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  box-shadow:
    0 0 0 70px rgba(255, 255, 255, 0.025),
    0 0 0 140px rgba(255, 255, 255, 0.018);
  content: "";
}

.projects-hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(1200px, 100% - 48px);
  min-height: 520px;
  grid-template-columns: minmax(0, 0.9fr) minmax(480px, 1.1fr);
  align-items: center;
  gap: clamp(40px, 6vw, 84px);
  margin: 0 auto;
  padding: 64px 0;
}

.projects-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  color: #d9e2ed;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.7px;
  text-transform: uppercase;
}

.projects-kicker span {
  width: 30px;
  height: 3px;
  background: #ef3038;
}

.projects-hero-copy h1 {
  margin: 0;
  color: #fff;
  font-size: clamp(40px, 5vw, 65px);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1.03;
}

.projects-hero-copy h1 em {
  color: #f04449;
  font-style: normal;
}

.projects-hero-copy > p:not(.projects-kicker) {
  max-width: 540px;
  margin: 22px 0 0;
  color: #b9c6d6;
  font-size: 15px;
  line-height: 1.75;
}

.projects-primary-action {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
  padding: 0 18px;
  border-radius: 6px;
  background: #d51f2b;
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
  transition: transform 160ms ease, background 160ms ease;
}

.projects-primary-action:hover {
  transform: translateY(-2px);
  background: #b91823;
}

.projects-hero-visual {
  position: relative;
  min-height: 380px;
}

.projects-hero-visual::before {
  position: absolute;
  z-index: -1;
  top: 30px;
  right: -24px;
  bottom: -24px;
  left: 34px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  content: "";
}

.projects-hero-visual img {
  display: block;
  width: 100%;
  height: 380px;
  object-fit: cover;
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.28);
}

.projects-hero-note {
  position: absolute;
  right: -1px;
  bottom: 0;
  display: flex;
  min-width: 270px;
  padding: 18px 22px;
  border-left: 4px solid #d51f2b;
  background: #fff;
  box-shadow: 0 16px 36px rgba(7, 15, 29, 0.2);
  flex-direction: column;
}

.projects-hero-note span {
  color: #dc2626;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.projects-hero-note strong {
  margin-top: 5px;
  color: #142036;
  font-size: 12px;
  line-height: 1.45;
}

.projects-content {
  padding-top: 76px;
}

.projects-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  align-items: end;
  gap: 54px;
  margin-bottom: 36px;
}

.projects-intro > p {
  margin: 0 0 3px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.75;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.project-card {
  overflow: hidden;
  border: 1px solid #e1e7ee;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.045);
  color: inherit;
  text-decoration: none;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.project-card:not(.project-card-skeleton):hover {
  transform: translateY(-4px);
  border-color: #f3b2b6;
  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.09);
}

.project-card-image {
  position: relative;
  height: 235px;
  overflow: hidden;
  background: #dbe4ed;
}

.project-card-image::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 58%, rgba(5, 12, 25, 0.5));
  content: "";
}

.project-card-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.project-card:hover .project-card-image img {
  transform: scale(1.035);
}

.project-card-index {
  position: absolute;
  z-index: 1;
  right: 14px;
  bottom: 14px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  color: #c81e29;
  font-size: 11px;
  font-weight: 900;
}

.project-card-body {
  padding: 23px;
}

.project-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
  color: #7b8798;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.project-card-body h3 {
  margin: 0;
  color: #0f172a;
  font-size: 20px;
  line-height: 1.35;
}

.project-card-body > p {
  min-height: 88px;
  margin: 11px 0 20px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.7;
}

.project-card-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 17px;
  border-top: 1px solid #edf1f5;
  color: #c81e29;
  font-size: 11px;
  font-weight: 850;
  text-transform: uppercase;
}

.project-card-skeleton {
  pointer-events: none;
}

.skeleton-image,
.skeleton-line {
  display: block;
  background: linear-gradient(90deg, #eef2f6 25%, #f8fafc 50%, #eef2f6 75%);
  background-size: 200% 100%;
  animation: project-shimmer 1.4s infinite linear;
}

.skeleton-image {
  height: 235px;
}

.skeleton-line {
  width: 100%;
  height: 11px;
  margin-top: 11px;
  border-radius: 3px;
}

.skeleton-line-small {
  width: 35%;
  margin-top: 0;
}

.skeleton-line-title {
  width: 72%;
  height: 22px;
  margin: 18px 0;
}

.skeleton-line-short {
  width: 64%;
}

@keyframes project-shimmer {
  to {
    background-position: -200% 0;
  }
}

.project-state {
  display: grid;
  min-height: 340px;
  place-items: center;
  padding: 52px 24px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  text-align: center;
}

.project-state-icon {
  display: grid;
  width: 64px;
  height: 64px;
  margin-bottom: 18px;
  place-items: center;
  border-radius: 50%;
  background: #fef2f2;
  color: #dc2626;
}

.project-state .site-kicker {
  justify-content: center;
  margin-bottom: 9px;
}

.project-state h2 {
  margin: 0;
  color: #0f172a;
  font-size: 24px;
}

.project-state > p:last-child {
  max-width: 600px;
  margin: 12px 0 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.7;
}

.project-state code {
  padding: 2px 5px;
  border-radius: 4px;
  background: #e8edf3;
  color: #334155;
}

.project-enquiry {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  gap: 34px;
  margin-top: 70px;
  padding: 38px 42px;
  background: #0b162a;
  color: #fff;
}

.project-enquiry::after {
  position: absolute;
  top: -60px;
  right: 140px;
  width: 220px;
  height: 220px;
  border: 28px solid rgba(255, 255, 255, 0.035);
  border-radius: 50%;
  content: "";
}

.project-enquiry > div,
.project-enquiry > a {
  position: relative;
  z-index: 1;
}

.project-enquiry-label {
  margin: 0 0 8px;
  color: #f04449;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.project-enquiry h2 {
  margin: 0;
  font-size: clamp(23px, 3vw, 31px);
  letter-spacing: -0.025em;
}

.project-enquiry div > p:last-child {
  max-width: 660px;
  margin: 9px 0 0;
  color: #b9c6d6;
  font-size: 13px;
  line-height: 1.65;
}

.project-enquiry > a {
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
  transition: background 160ms ease, transform 160ms ease;
}

.project-enquiry > a:hover {
  transform: translateY(-2px);
  background: #b91823;
}

@media (prefers-reduced-motion: reduce) {
  .projects-primary-action,
  .project-card,
  .project-card-image img,
  .project-enquiry > a {
    transition: none;
  }

  .skeleton-image,
  .skeleton-line {
    animation: none;
  }
}

@media (max-width: 960px) {
  .projects-hero-inner {
    grid-template-columns: 1fr;
    gap: 44px;
    padding: 70px 0 62px;
  }

  .projects-hero-copy {
    max-width: 720px;
  }

  .projects-hero-visual,
  .projects-hero-visual img {
    height: 360px;
    min-height: 360px;
  }

  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .projects-hero-inner {
    width: calc(100% - 32px);
    min-height: auto;
    padding-top: 52px;
  }

  .projects-hero-copy h1 {
    font-size: clamp(37px, 12vw, 52px);
  }

  .projects-hero-visual,
  .projects-hero-visual img {
    height: 290px;
    min-height: 290px;
  }

  .projects-hero-visual::before {
    display: none;
  }

  .projects-hero-note {
    right: 0;
    left: 20px;
    min-width: 0;
  }

  .projects-intro {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .project-card {
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  .project-card-image,
  .skeleton-image {
    height: auto;
    aspect-ratio: 4 / 3;
  }

  .project-card-index {
    right: 8px;
    bottom: 8px;
    width: 30px;
    height: 30px;
    font-size: 9px;
  }

  .project-card-body {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    padding: 14px;
  }

  .project-card-meta {
    align-items: flex-start;
    gap: 4px;
    margin-bottom: 9px;
    flex-direction: column;
    font-size: 8px;
  }

  .project-card-body h3 {
    overflow-wrap: anywhere;
    font-size: 16px;
  }

  .project-card-body > p {
    display: -webkit-box;
    overflow: hidden;
    min-height: 0;
    margin: 8px 0 14px;
    font-size: 11.5px;
    line-height: 1.55;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .project-card-link {
    gap: 6px;
    margin-top: auto;
    padding-top: 12px;
    font-size: 9px;
    line-height: 1.35;
  }

  .project-card-link .v-icon {
    flex: 0 0 auto;
  }

  .project-enquiry {
    align-items: flex-start;
    padding: 30px 26px;
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .projects-primary-action {
    width: 100%;
  }

  .projects-hero-visual,
  .projects-hero-visual img {
    height: 250px;
    min-height: 250px;
  }

  .projects-hero-note {
    left: 12px;
    padding: 14px 16px;
  }

}
</style>
