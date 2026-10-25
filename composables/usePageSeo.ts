const SITE_URL = "https://www.dutarayamarine.com";
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/carousel-1.jpg`;

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function usePageSeo({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
}: PageSeoOptions) {
  const canonicalUrl = new URL(path, `${SITE_URL}/`).toString();
  const imageAlt = "PT. Duta Raya Marine vessel support and marine services";

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: "website",
    ogUrl: canonicalUrl,
    ogImage: image,
    ogImageAlt: imageAlt,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: imageAlt,
  });

  useHead({
    link: [{ key: "canonical", rel: "canonical", href: canonicalUrl }],
  });
}
