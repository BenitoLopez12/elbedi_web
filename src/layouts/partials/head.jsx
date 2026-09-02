import siteConfig from "../../config/siteConfig.js";

const toAbsoluteUrl = (value) => {
  if (!value) return siteConfig.url;

  try {
    return new URL(value).toString();
  } catch {
    return new URL(value, siteConfig.url).toString();
  }
};

const normalizeSchema = (schema) => {
  if (!schema) return [];
  if (Array.isArray(schema)) {
    return schema.filter((item) => item && typeof item === "object");
  }

  return typeof schema === "object" ? [schema] : [];
};

export default function Head({
  title = siteConfig.title,
  description = siteConfig.description,
  canonicalUrl = siteConfig.url,
  ogImage = siteConfig.mainImage,
  ogImageAlt = siteConfig.mainImageAlt,
  ogImageWidth = siteConfig.mainImageWidth,
  ogImageHeight = siteConfig.mainImageHeight,
  ogImageType = siteConfig.mainImageType,
  pageType = "website",
  datePublished,
  dateModified,
  robots = siteConfig.robots,
  schema = [],
}) {
  const resolvedCanonical = toAbsoluteUrl(canonicalUrl);
  const resolvedImage = toAbsoluteUrl(ogImage);
  const schemaItems = normalizeSchema(schema);

  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="author" content={siteConfig.siteName} />
      <meta name="application-name" content={siteConfig.siteName} />
      <meta name="color-scheme" content="dark light" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content={siteConfig.themeColor} />
      <link rel="canonical" href={resolvedCanonical} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />

      {siteConfig.verification.google ? (
        <meta
          name="google-site-verification"
          content={siteConfig.verification.google}
        />
      ) : null}
      {siteConfig.verification.bing ? (
        <meta name="msvalidate.01" content={siteConfig.verification.bing} />
      ) : null}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:secure_url" content={resolvedImage} />
      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={siteConfig.locale} />
      {datePublished ? (
        <meta property="article:published_time" content={datePublished} />
      ) : null}
      {dateModified ? (
        <meta property="article:modified_time" content={dateModified} />
      ) : null}

      <meta name="twitter:card" content={siteConfig.twitterCard} />
      {siteConfig.twitterSite ? (
        <meta name="twitter:site" content={siteConfig.twitterSite} />
      ) : null}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* traffic lens */}
      <script
        defer
        src="https://analytics.elbedi.com/s.js"
        data-site="tl_59f957b67e7c"
      ></script>

      <link
        rel="preload"
        href="/fonts/avenir.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Bauhaus93.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />
      <link
        rel="icon"
        type="image/svg+xml"
        sizes="any"
        href={siteConfig.favicon}
      />

      {schemaItems.map((item, index) => (
        <script
          key={`${index}-${item["@type"] ?? "schema"}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </head>
  );
}
