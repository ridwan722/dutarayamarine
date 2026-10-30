<script setup lang="ts">
type DocumentLink = {
  label: string;
  href: string;
  external?: boolean;
};

type DocumentSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: DocumentLink[];
};

defineProps<{
  kicker: string;
  title: string;
  lead: string;
  updatedLabel: string;
  updatedValue: string;
  navigationLabel: string;
  sections: DocumentSection[];
  contactTitle: string;
  contactBody: string;
  contactLabel: string;
}>();
</script>

<template>
  <div class="site-container policy-container">
    <header class="policy-heading">
      <p class="site-kicker">{{ kicker }}</p>
      <h1 class="site-title">{{ title }}</h1>
      <p class="site-lead">{{ lead }}</p>
      <!-- <p class="policy-updated">
        <v-icon icon="mdi-calendar-blank-outline" size="16" />
        {{ updatedLabel }} <strong>{{ updatedValue }}</strong>
      </p> -->
    </header>

    <div class="policy-layout">
      <aside class="policy-navigation" :aria-label="navigationLabel">
        <p>{{ navigationLabel }}</p>
        <a v-for="(section, index) in sections" :key="section.id" :href="`#${section.id}`">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          {{ section.title }}
        </a>
      </aside>

      <article class="policy-document">
        <section
          v-for="(section, index) in sections"
          :id="section.id"
          :key="section.id"
          class="policy-section"
        >
          <div class="policy-section-heading">
            <span>{{ String(index + 1).padStart(2, "0") }}</span>
            <h2>{{ section.title }}</h2>
          </div>

          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>

          <ul v-if="section.bullets?.length">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>

          <div v-if="section.links?.length" class="policy-resources">
            <template v-for="link in section.links" :key="link.href">
              <a
                v-if="link.external"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.label }}
                <v-icon icon="mdi-open-in-new" size="14" />
              </a>
              <NuxtLink v-else :to="link.href">
                {{ link.label }}
                <v-icon icon="mdi-arrow-right" size="14" />
              </NuxtLink>
            </template>
          </div>
        </section>

        <section class="policy-contact" aria-labelledby="policy-contact-title">
          <div class="policy-contact-icon"><v-icon icon="mdi-email-outline" size="24" /></div>
          <div>
            <h2 id="policy-contact-title">{{ contactTitle }}</h2>
            <p>{{ contactBody }}</p>
            <a href="mailto:sales@dutarayamarine.com">{{ contactLabel }}</a>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>

<style scoped>
.policy-container {
  width: min(1180px, 100% - 48px);
  padding-top: 72px;
}

.policy-heading {
  max-width: 820px;
  margin-bottom: 46px;
}

.policy-heading .site-title {
  max-width: 760px;
}

.policy-updated {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 22px 0 0;
  color: #64748b;
  font-size: 12px;
}

.policy-updated strong {
  color: #334155;
  font-weight: 750;
}

.policy-layout {
  display: grid;
  grid-template-columns: minmax(210px, .3fr) minmax(0, 1fr);
  align-items: start;
  gap: clamp(30px, 5vw, 64px);
}

.policy-navigation {
  position: sticky;
  top: 96px;
  display: flex;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  flex-direction: column;
  gap: 4px;
}

.policy-navigation > p {
  margin: 0 0 10px;
  color: #0f172a;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.policy-navigation a {
  display: grid;
  grid-template-columns: 25px 1fr;
  gap: 7px;
  padding: 8px 6px;
  border-radius: 5px;
  color: #526074;
  text-decoration: none;
  font-size: 11px;
  font-weight: 650;
  line-height: 1.35;
  transition: background 160ms ease, color 160ms ease;
}

.policy-navigation a span {
  color: #dc2626;
  font-size: 9px;
  font-weight: 850;
}

.policy-navigation a:hover {
  background: #fff;
  color: #b91c1c;
}

.policy-document {
  min-width: 0;
  padding: clamp(26px, 5vw, 52px);
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 18px 48px rgba(15, 23, 42, .06);
}

.policy-section {
  scroll-margin-top: 100px;
  padding-bottom: 34px;
  border-bottom: 1px solid #e8edf3;
}

.policy-section + .policy-section {
  padding-top: 34px;
}

.policy-section-heading {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 15px;
}

.policy-section-heading > span {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 8px;

  color: #dc2626;
  font-size: 10px;
  font-weight: 900;
}

.policy-section h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(17px, 2vw, 21px);
  letter-spacing: -.015em;
  line-height: 1.25;
}

.policy-section p,
.policy-section li,
.policy-contact p {
  color: #526074;
  font-size: 13px;
  line-height: 1.75;
}

.policy-section p {
  margin: 0;
}

.policy-section p + p {
  margin-top: 12px;
}

.policy-section ul {
  display: grid;
  gap: 8px;
  margin: 15px 0 0;
  padding-left: 19px;
}

.policy-section li::marker {
  color: #dc2626;
}

.policy-resources {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.policy-resources a {
  display: inline-flex;
  min-height: 35px;
  align-items: center;
  gap: 7px;
  padding: 0 11px;
  border: 1px solid #dbe2ea;
  border-radius: 6px;
  background: #f8fafc;
  color: #334155;
  text-decoration: none;
  font-size: 10px;
  font-weight: 800;
  transition: border-color 160ms ease, color 160ms ease;
}

.policy-resources a:hover {
  border-color: #fca5a5;
  color: #b91c1c;
}

.policy-contact {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 38px;
  padding: 22px;
  border: 1px solid #fecaca;
  border-radius: 12px;
  background: #fff8f8;
}

.policy-contact-icon {
  display: grid;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 10px;
  background: #dc2626;
  color: #fff;
}

.policy-contact h2 {
  margin: 0 0 5px;
  color: #0f172a;
  font-size: 16px;
}

.policy-contact p {
  margin: 0 0 10px;
}

.policy-contact a {
  color: #b91c1c;
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
}

.policy-contact a:hover {
  text-decoration: underline;
}

@media (max-width: 860px) {
  .policy-layout {
    grid-template-columns: 1fr;
  }

  .policy-navigation {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .policy-navigation > p {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .policy-container {
    width: calc(100% - 32px);
    padding-top: 48px;
  }

  .policy-heading {
    margin-bottom: 32px;
  }

  .policy-navigation {
    grid-template-columns: 1fr;
  }

  .policy-document {
    padding: 24px 18px;
    border-radius: 12px;
  }

  .policy-section,
  .policy-section + .policy-section {
    padding-top: 26px;
    padding-bottom: 26px;
  }

  .policy-section:first-child {
    padding-top: 0;
  }

  .policy-contact {
    flex-direction: column;
  }
}
</style>
