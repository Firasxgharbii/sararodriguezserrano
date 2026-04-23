import { defaultSiteContent, SiteContent, STORAGE_KEY } from "./siteContent";

type ParsedSiteContent = Partial<SiteContent> & {
  home?: Partial<SiteContent["home"]>;
  about?: Partial<SiteContent["about"]>;
  contact?: Partial<SiteContent["contact"]>;
  oeuvres?: Partial<SiteContent["oeuvres"]> & {
    items?: any[];
  };
  portfolio?: Partial<SiteContent["portfolio"]>;
};

export function getMergedSiteContent(): SiteContent {
  if (typeof window === "undefined") {
    return defaultSiteContent;
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return defaultSiteContent;
  }

  try {
    const parsed: ParsedSiteContent = JSON.parse(stored);

    return {
      ...defaultSiteContent,
      ...parsed,

      home: {
        ...defaultSiteContent.home,
        ...(parsed.home ?? {}),
        heroImageStyle: {
          ...defaultSiteContent.home.heroImageStyle,
          ...(parsed.home?.heroImageStyle ?? {}),
        },
      },

      about: {
        ...defaultSiteContent.about,
        ...(parsed.about ?? {}),
        profileImage: {
          ...defaultSiteContent.about.profileImage,
          ...(parsed.about?.profileImage ?? {}),
        },
        publications:
          parsed.about?.publications ?? defaultSiteContent.about.publications,
        collections:
          parsed.about?.collections ?? defaultSiteContent.about.collections,
        exhibitions:
          parsed.about?.exhibitions ?? defaultSiteContent.about.exhibitions,
        formations:
          parsed.about?.formations ?? defaultSiteContent.about.formations,
        distinctions:
          parsed.about?.distinctions ?? defaultSiteContent.about.distinctions,
      },

      contact: {
        ...defaultSiteContent.contact,
        ...(parsed.contact ?? {}),
        contactImage: {
          ...defaultSiteContent.contact.contactImage,
          ...(parsed.contact?.contactImage ?? {}),
        },
      },

      oeuvres: {
        ...defaultSiteContent.oeuvres,
        ...(parsed.oeuvres ?? {}),
        items: (parsed.oeuvres?.items ?? defaultSiteContent.oeuvres.items).map(
          (item: any, index: number) => ({
            ...(defaultSiteContent.oeuvres.items[index] ?? {}),
            ...item,
            galleryImages:
              item?.galleryImages ??
              defaultSiteContent.oeuvres.items[index]?.galleryImages ??
              [],
          })
        ),
      },

      portfolio: (
        parsed.portfolio ?? defaultSiteContent.portfolio
      ).map((item: any, index: number) => ({
        ...(defaultSiteContent.portfolio[index] ?? {}),
        ...item,
      })),
    };
  } catch {
    return defaultSiteContent;
  }
}

export const getSiteContent = getMergedSiteContent;