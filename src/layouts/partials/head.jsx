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
      <meta name="keywords" content={siteConfig.keywords} />
      <meta name="theme-color" content={siteConfig.themeColor} />
      <link rel="canonical" href={resolvedCanonical} />
      <meta name="robots" content={robots} />
      <link rel="alternate" hrefLang="es-mx" href={resolvedCanonical} />
      <link rel="alternate" hrefLang="x-default" href={resolvedCanonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={siteConfig.locale} />

      <meta name="twitter:card" content={siteConfig.twitterCard} />
      {siteConfig.twitterSite ? (
        <meta name="twitter:site" content={siteConfig.twitterSite} />
      ) : null}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />

      <link rel="icon" type="image/svg+xml" href={siteConfig.favicon} />

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
