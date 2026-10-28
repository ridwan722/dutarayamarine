import type { MaybeRefOrGetter } from "vue";
import { toValue } from "vue";

const SITE_URL = "https://www.dutarayamarine.com";
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/carousel-1.jpg`;

interface PageSeoOptions {
  title: MaybeRefOrGetter<string>;
  description: MaybeRefOrGetter<string>;
  path: string;
  keywords: readonly string[];
  image?: string;
}

export function usePageSeo({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_SOCIAL_IMAGE,
}: PageSeoOptions) {
  const canonicalUrl = new URL(path, `${SITE_URL}/`).toString();
  const { translate } = useSiteLocale();

  useSeoMeta({
    title: () => toValue(title),
    description: () => toValue(description),
    keywords: keywords.join(", "),
    ogTitle: () => toValue(title),
    ogDescription: () => toValue(description),
    ogType: "website",
    ogUrl: canonicalUrl,
    ogImage: image,
    ogImageAlt: () =>
      translate(
        "PT. Duta Raya Marine vessel support and marine services",
        "Dukungan kapal dan layanan kelautan PT. Duta Raya Marine",
      ),
    twitterCard: "summary_large_image",
    twitterTitle: () => toValue(title),
    twitterDescription: () => toValue(description),
    twitterImage: image,
    twitterImageAlt: () =>
      translate(
        "PT. Duta Raya Marine vessel support and marine services",
        "Dukungan kapal dan layanan kelautan PT. Duta Raya Marine",
      ),
  });

  useHead({
    link: [{ key: "canonical", rel: "canonical", href: canonicalUrl }],
  });
}
