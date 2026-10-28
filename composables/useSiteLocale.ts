export type SiteLocale = "en" | "id";

function isSiteLocale(value: unknown): value is SiteLocale {
  return value === "en" || value === "id";
}

export function useSiteLocale() {
  const localeCookie = useCookie<SiteLocale>("site-language", {
    default: () => "en",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  const locale = useState<SiteLocale>("site-language", () =>
    isSiteLocale(localeCookie.value) ? localeCookie.value : "en",
  );

  function setLocale(value: SiteLocale) {
    locale.value = value;
    localeCookie.value = value;
  }

  function translate<T>(english: T, indonesian: T): T {
    return locale.value === "id" ? indonesian : english;
  }

  return {
    locale,
    setLocale,
    translate,
  };
}
