import type {
  ProjectWebRecord,
  ProjectWebTimestamp,
} from "~/types/projectWeb";
import type { SiteLocale } from "~/composables/useSiteLocale";

function localizedText(
  indonesian?: string,
  english?: string,
  locale: SiteLocale = "en",
): string {
  const primary = locale === "id" ? indonesian : english;
  const fallback = locale === "id" ? english : indonesian;
  return primary?.trim() || fallback?.trim() || "";
}

export function getProjectTitle(
  project?: ProjectWebRecord | null,
  locale: SiteLocale = "en",
): string {
  return localizedText(project?.judul, project?.judul_en, locale);
}

export function getProjectSubtitle(
  project?: ProjectWebRecord | null,
  locale: SiteLocale = "en",
): string {
  return localizedText(project?.sub_judul, project?.sub_judul_en, locale);
}

export function getProjectClosing(
  project?: ProjectWebRecord | null,
  locale: SiteLocale = "en",
): string {
  return localizedText(
    project?.paragraf_penutup,
    project?.paragraf_penutup_en,
    locale,
  );
}

export function getProjectPhotos(project?: ProjectWebRecord | null): string[] {
  if (!Array.isArray(project?.foto)) return [];

  return project.foto
    .map((photo) => (typeof photo === "string" ? photo : photo?.url))
    .filter((url): url is string => Boolean(url?.trim()));
}

export function getProjectParagraphs(
  project?: ProjectWebRecord | null,
  locale: SiteLocale = "en",
): string[] {
  const primary = locale === "id" ? project?.paragraf : project?.paragraf_en;
  const fallback = locale === "id" ? project?.paragraf_en : project?.paragraf;

  function normalize(value?: string[] | string): string[] {
    if (Array.isArray(value)) {
      return value.filter(
        (paragraph): paragraph is string =>
          typeof paragraph === "string" && Boolean(paragraph.trim()),
      );
    }

    if (typeof value === "string" && value.trim()) return [value];
    return [];
  }

  const primaryParagraphs = normalize(primary);
  if (primaryParagraphs.length) return primaryParagraphs;

  return normalize(fallback);
}

export function getProjectTimestamp(value?: ProjectWebTimestamp): number {
  if (!value) return 0;
  if (value instanceof Date) return value.getTime();

  if (typeof value === "number") {
    return value < 1_000_000_000_000 ? value * 1000 : value;
  }

  if (typeof value === "string") {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) {
      return numericValue < 1_000_000_000_000
        ? numericValue * 1000
        : numericValue;
    }

    const parsedValue = Date.parse(value);
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
  }

  if (typeof value.toMillis === "function") {
    try {
      return value.toMillis();
    } catch {
      return 0;
    }
  }

  const seconds = value.seconds ?? value._seconds;
  return typeof seconds === "number" ? seconds * 1000 : 0;
}

export function formatProjectDate(
  value?: ProjectWebTimestamp,
  locale: SiteLocale = "en",
): string {
  const timestamp = getProjectTimestamp(value);
  if (!timestamp) return locale === "id" ? "Pembaruan proyek" : "Project update";

  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(timestamp));
}

export function getProjectExcerpt(
  project?: ProjectWebRecord | null,
  locale: SiteLocale = "en",
): string {
  const source =
    getProjectSubtitle(project, locale) ||
    getProjectParagraphs(project, locale)[0]?.trim() ||
    getProjectClosing(project, locale) ||
    (locale === "id"
      ? "Jelajahi proyek kelautan dari Duta Raya Marine ini."
      : "Explore this marine project from Duta Raya Marine.");

  return source.length > 180 ? `${source.slice(0, 177).trimEnd()}…` : source;
}
