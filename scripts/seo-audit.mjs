import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const origin = "https://elbedi.com";
const expectedRoutes = [
  "/",
  "/estudio",
  "/servicios",
  "/servicios/sitios-web-inteligentes",
  "/servicios/agentes-ia-whatsapp",
  "/servicios/sistemas-agenticos",
  "/servicios/analitica-web-ia",
  "/websites",
];

const failures = [];
const warnings = [];
const passes = [];

const fail = (message) => failures.push(message);
const warn = (message) => warnings.push(message);
const pass = (message) => passes.push(message);

function routeFile(route) {
  return route === "/"
    ? join(dist, "index.html")
    : join(dist, route.slice(1), "index.html");
}

function tags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
}

function attributes(tag) {
  const values = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)) {
    values[match[1].toLowerCase()] = match[3];
  }
  return values;
}

function meta(html, key, value) {
  return tags(html, "meta")
    .map(attributes)
    .find((item) => item[key] === value)?.content;
}

function links(html, rel) {
  return tags(html, "link")
    .map(attributes)
    .filter((item) => item.rel?.split(/\s+/).includes(rel));
}

function textContent(value) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function auditPage(route) {
  const file = routeFile(route);
  if (!existsSync(file)) {
    fail(`${route}: no existe ${file}`);
    return;
  }

  const html = readFileSync(file, "utf8");
  const label = route === "/" ? "inicio" : route;
  const titles = html.match(/<title>([\s\S]*?)<\/title>/gi) ?? [];
  const descriptions = tags(html, "meta")
    .map(attributes)
    .filter((item) => item.name === "description");
  const canonicals = links(html, "canonical");
  const h1s = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) ?? [];
  const htmlLang = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1];

  if (titles.length !== 1) fail(`${label}: debe existir un solo <title>; hay ${titles.length}`);
  else {
    const title = textContent(titles[0]);
    if (title.length < 25 || title.length > 65) {
      warn(`${label}: título de ${title.length} caracteres`);
    }
  }

  if (descriptions.length !== 1) {
    fail(`${label}: debe existir una sola meta description; hay ${descriptions.length}`);
  } else {
    const length = descriptions[0].content?.length ?? 0;
    if (length < 90 || length > 170) warn(`${label}: descripción de ${length} caracteres`);
  }

  const expectedCanonical = `${origin}${route === "/" ? "/" : route}`;
  if (canonicals.length !== 1 || canonicals[0].href !== expectedCanonical) {
    fail(`${label}: canonical incorrecta; esperado ${expectedCanonical}`);
  }

  if (h1s.length !== 1) fail(`${label}: debe existir un H1; hay ${h1s.length}`);
  if (htmlLang !== "es-MX") fail(`${label}: lang debe ser es-MX; recibido ${htmlLang ?? "ninguno"}`);
  if (meta(html, "name", "keywords")) fail(`${label}: contiene meta keywords obsoleto`);

  const robots = meta(html, "name", "robots");
  if (!robots?.includes("index") || !robots?.includes("follow")) {
    fail(`${label}: directiva robots index,follow ausente`);
  }

  for (const property of ["og:title", "og:description", "og:image", "og:image:alt", "og:url"]) {
    if (!meta(html, "property", property)) fail(`${label}: falta ${property}`);
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt"]) {
    if (!meta(html, "name", name)) fail(`${label}: falta ${name}`);
  }

  const schemaScripts = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  if (schemaScripts.length === 0) {
    fail(`${label}: no contiene datos estructurados JSON-LD`);
  } else {
    for (const script of schemaScripts) {
      const json = script.replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, "");
      try {
        JSON.parse(json);
      } catch (error) {
        fail(`${label}: JSON-LD inválido (${error.message})`);
      }
    }
  }

  const imageTags = tags(html, "img").map(attributes);
  const withoutAlt = imageTags.filter((image) => !("alt" in image));
  if (withoutAlt.length) fail(`${label}: ${withoutAlt.length} imágenes sin atributo alt`);
  const withoutDimensions = imageTags.filter(
    (image) => !("width" in image) || !("height" in image),
  );
  if (withoutDimensions.length) {
    warn(`${label}: ${withoutDimensions.length} imágenes sin dimensiones intrínsecas`);
  }

  if (textContent(html).length < 500) warn(`${label}: contenido textual prerenderizado escaso`);
  pass(`${label}: metadatos, canonical, H1 y JSON-LD validados`);
}

function walkHtml(directory) {
  const files = [];
  if (!existsSync(directory)) return files;
  for (const name of readdirSync(directory)) {
    const file = join(directory, name);
    if (statSync(file).isDirectory()) files.push(...walkHtml(file));
    else if (extname(file) === ".html") files.push(file);
  }
  return files;
}

function normalizeInternalHref(href) {
  const path = href.split("#")[0].split("?")[0];
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function auditInternalLinks() {
  const builtRoutes = new Set(
    walkHtml(dist).map((file) => {
      const relative = normalize(file.slice(dist.length + 1)).replaceAll("\\", "/");
      if (relative === "index.html") return "/";
      return `/${relative.replace(/\/index\.html$/, "")}`;
    }),
  );

  for (const file of walkHtml(dist)) {
    const html = readFileSync(file, "utf8");
    for (const anchor of tags(html, "a").map(attributes)) {
      const href = anchor.href;
      if (!href?.startsWith("/") || href.startsWith("//")) continue;
      const route = normalizeInternalHref(href);
      if (route.includes(".")) continue;
      if (!builtRoutes.has(route)) fail(`Enlace interno roto: ${href} en ${file}`);
    }
  }
  pass("Enlaces internos rastreables validados");
}

function auditInfrastructure() {
  const sitemapIndex = join(dist, "sitemap-index.xml");
  const sitemapCandidates = existsSync(dist)
    ? readdirSync(dist).filter((name) => /^sitemap.*\.xml$/.test(name))
    : [];
  if (!existsSync(sitemapIndex)) fail("No se generó sitemap-index.xml");

  const sitemapText = sitemapCandidates
    .map((name) => readFileSync(join(dist, name), "utf8"))
    .join("\n");
  const sitemapLocations = new Set(
    [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
  );
  for (const route of expectedRoutes) {
    // Los serializadores XML representan el origin raíz sin slash; ambas
    // formas son la misma URL HTTP. El resto de las rutas sí se compara exacto.
    const url = route === "/" ? origin : `${origin}${route}`;
    if (!sitemapLocations.has(url)) fail(`Sitemap no contiene ${url}`);
  }

  const robotsFile = join(dist, "robots.txt");
  if (!existsSync(robotsFile)) fail("Falta robots.txt");
  else {
    const robots = readFileSync(robotsFile, "utf8");
    if (!robots.includes("sitemap-index.xml")) fail("robots.txt no declara sitemap-index.xml");
    for (const bot of ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"]) {
      if (!robots.includes(bot)) fail(`robots.txt no declara acceso para ${bot}`);
    }
  }

  for (const file of [
    "llms.txt",
    "llms-full.txt",
    ".well-known/security.txt",
    "images/og/elbedi-ai-studio.jpg",
    "images/og/elbedi-websites.jpg",
  ]) {
    if (!existsSync(join(dist, file))) fail(`Falta activo de infraestructura: ${file}`);
  }

  try {
    JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
    pass("vercel.json válido");
  } catch (error) {
    fail(`vercel.json inválido: ${error.message}`);
  }
}

if (!existsSync(dist)) {
  console.error("No existe dist/. Ejecuta npm run build antes de la auditoría.");
  process.exit(1);
}

for (const route of expectedRoutes) auditPage(route);
auditInternalLinks();
auditInfrastructure();

console.log(`\nSEO audit: ${passes.length} aprobaciones, ${warnings.length} advertencias, ${failures.length} errores.`);
for (const item of passes) console.log(`  ✓ ${item}`);
for (const item of warnings) console.warn(`  ! ${item}`);
for (const item of failures) console.error(`  ✗ ${item}`);

if (failures.length) process.exit(1);
