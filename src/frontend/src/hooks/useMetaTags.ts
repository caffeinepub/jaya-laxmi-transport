import { useEffect } from "react";

interface MetaTagsOptions {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export function useMetaTags(options: MetaTagsOptions) {
  useEffect(() => {
    const {
      title,
      description,
      keywords,
      ogTitle,
      ogDescription,
      ogImage,
      ogType,
      twitterCard,
    } = options;

    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${name}"]`,
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    if (ogTitle) setMeta("og:title", ogTitle, true);
    if (ogDescription) setMeta("og:description", ogDescription, true);
    if (ogImage) setMeta("og:image", ogImage, true);
    if (ogType) setMeta("og:type", ogType, true);
    setMeta(
      "twitter:card",
      twitterCard ?? (ogImage ? "summary_large_image" : "summary"),
    );
    if (ogTitle) setMeta("twitter:title", ogTitle);
    if (ogDescription) setMeta("twitter:description", ogDescription);
  }, [options]);
}
