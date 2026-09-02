const siteConfig = {
  title: "ELBEDI | Inteligencia Artificial para Empresas en México",
  url: "https://elbedi.com",
  lang: "es-MX",
  locale: "es_MX",
  theme: "dark",
  description:
    "Estudio mexicano de inteligencia artificial para empresas. Diseñamos agentes, sistemas agénticos, automatización, analítica con IA y sitios web inteligentes.",
  siteName: "ELBEDI",
  legalName: "ELBEDI",
  alternateName: "ELBEDI AI Studio",
  slogan: "Diseñamos la inteligencia de tu negocio",
  themeColor: "#171027",
  mainImage: "/images/og/elbedi-ai-studio.jpg",
  mainImageAlt:
    "ELBEDI, estudio de inteligencia artificial para empresas en México",
  mainImageWidth: 1200,
  mainImageHeight: 630,
  mainImageType: "image/jpeg",
  websitesImage: "/images/og/elbedi-websites.jpg",
  websitesImageAlt: "ELBEDI Websites, diseño y desarrollo web en México",
  logo: "/images/logo.webp",
  logoWidth: 1290,
  logoHeight: 252,
  favicon: "/images/favicon.svg",
  robots:
    "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  twitterCard: "summary_large_image",
  twitterSite: "",
  socialProfiles: [
    "https://www.facebook.com/elbedi.studio",
    "https://www.instagram.com/elbedi_studio/",
    "https://www.tiktok.com/@elbedi_studio",
    "https://www.linkedin.com/company/elbedi",
  ],
  verification: {
    google: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    bing: import.meta.env.PUBLIC_BING_SITE_VERIFICATION ?? "",
  },
};

export default siteConfig;
