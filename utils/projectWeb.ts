import type {
  ProjectWebRecord,
  ProjectWebTimestamp,
} from "~/types/projectWeb";

export function getProjectPhotos(project?: ProjectWebRecord | null): string[] {
  if (!Array.isArray(project?.foto)) return [];

  return project.foto
    .map((photo) => (typeof photo === "string" ? photo : photo?.url))
    .filter((url): url is string => Boolean(url?.trim()));
}

export function getProjectParagraphs(
  project?: ProjectWebRecord | null,
): string[] {
  if (Array.isArray(project?.paragraf)) {
    return project.paragraf.filter(
      (paragraph): paragraph is string =>
        typeof paragraph === "string" && Boolean(paragraph.trim()),
    );
  }

  if (typeof project?.paragraf === "string" && project.paragraf.trim()) {
    return [project.paragraf];
  }

  return [];
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

export function formatProjectDate(value?: ProjectWebTimestamp): string {
  const timestamp = getProjectTimestamp(value);
  if (!timestamp) return "Project update";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(timestamp));
}

export function getProjectExcerpt(project?: ProjectWebRecord | null): string {
  const source =
    project?.sub_judul?.trim() ||
    getProjectParagraphs(project)[0]?.trim() ||
    project?.paragraf_penutup?.trim() ||
    "Explore this marine project from Duta Raya Marine.";

  return source.length > 180 ? `${source.slice(0, 177).trimEnd()}…` : source;
}
