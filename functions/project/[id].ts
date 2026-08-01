interface AssetFetcher {
  fetch(input: Request | string): Promise<Response>;
}

interface Env {
  ASSETS: AssetFetcher;
}

interface FunctionContext {
  request: Request;
  env: Env;
  params: {
    id?: string | string[];
  };
  next(): Promise<Response>;
}

interface ProjectMetadata {
  title: string;
  description: string;
  image: string;
}

const SITE_URL = "https://portfolio-4rr.pages.dev";
const SITE_NAME = "Muhammad Ibrahim Khan Portfolio";
const AUTHOR_NAME = "Muhammad Ibrahim Khan";

const PROJECT_METADATA: Record<string, ProjectMetadata> = {
  zenatrace: {
    title: "ZenaTrace Pharmaceutical Traceability Platform",
    description:
      "Developed and validated a multi-tenant web platform for pharmaceutical serialization and supply-chain traceability, with a separate Flutter mobile R&D track.",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/login_screen_s1pyac.png",
  },
  "ehr-system": {
    title: "Multi-Tenant EHR Legacy Support and Modernization",
    description:
      "Supported a live multi-tenant EHR while contributing to its transition from .NET Framework and WebForms toward Angular and .NET 8 APIs.",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818755/Pace-Plus-New1_idmoey.png",
  },
  "onc-ehi-export": {
    title: "ONC EHI Export and Supporting Security Controls",
    description:
      "Developed backend functionality for ONC 170.315(b)(10) EHI export, including patient and population exports, structured artifacts, access controls, and audit history.",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace_gw6mnj.png",
  },
  "erp-system": {
    title: "Enterprise ERP Platform Modernization",
    description:
      "Designed and developed inventory, warehouse, logistics, order, and export workflows while supporting the move from ASP.NET MVC toward .NET 8 and Angular.",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169939/dark_mode_nk6xdb.png",
  },
  "selenium-bot": {
    title: "Selenium Browser Automation System",
    description:
      "Built a browser-automation system for data extraction, form workflows, location-sensitive execution, and reliable processing across dynamic websites.",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596210/selenium-bot_jaehdr.png",
  },
  "home-automation": {
    title: "IoT Home Automation System",
    description:
      "Built a Flutter app, Django APIs, and ESP8266/Arduino device logic for a supervised home-automation thesis combining mobile software and physical hardware.",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/System_Architecture_Diagram_czwwia.png",
  },
  "private-cloud": {
    title: "OpenStack Private Cloud Lab",
    description:
      "Built a five-node OpenStack private-cloud lab covering networking, virtualization, provisioning, identity, and tenant-isolated cloud operations.",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596192/topology-diagram_ahrcs1.png",
  },
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceTitle(html: string, title: string): string {
  const tag = `<title>${escapeHtml(title)}</title>`;

  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, tag);
  }

  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function replaceMetaTag(
  html: string,
  attribute: "name" | "property",
  key: string,
  content: string,
): string {
  const pattern = new RegExp(
    `<meta\\s+${attribute}=["']${escapeRegExp(key)}["'][^>]*>`,
    "i",
  );
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function replaceCanonical(html: string, url: string): string {
  const pattern = /<link\s+rel=["']canonical["'][^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeHtml(url)}" />`;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function getImageType(imageUrl: string): string {
  const pathname = new URL(imageUrl).pathname.toLowerCase();

  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) {
    return "image/jpeg";
  }

  if (pathname.endsWith(".webp")) {
    return "image/webp";
  }

  return "image/png";
}

function addProjectStructuredData(
  html: string,
  canonicalUrl: string,
  metadata: ProjectMetadata,
): string {
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#project`,
    name: metadata.title,
    description: metadata.description,
    url: canonicalUrl,
    image: metadata.image,
    creator: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  }).replaceAll("<", "\\u003c");

  const script = `<script id="project-structured-data" type="application/ld+json">${structuredData}</script>`;

  return html.replace("</head>", `  ${script}\n  </head>`);
}

function applyProjectMetadata(
  html: string,
  projectId: string,
  metadata: ProjectMetadata,
): string {
  const canonicalUrl = `${SITE_URL}/project/${projectId}`;
  const pageTitle = `${metadata.title} | ${AUTHOR_NAME}`;
  const imageType = getImageType(metadata.image);
  const imageAlt = `${metadata.title} case study`;

  let updatedHtml = replaceTitle(html, pageTitle);
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "name",
    "description",
    metadata.description,
  );
  updatedHtml = replaceCanonical(updatedHtml, canonicalUrl);
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "property",
    "og:title",
    pageTitle,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "property",
    "og:description",
    metadata.description,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "property",
    "og:type",
    "article",
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "property",
    "og:url",
    canonicalUrl,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "property",
    "og:image",
    metadata.image,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "property",
    "og:image:secure_url",
    metadata.image,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "property",
    "og:image:type",
    imageType,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "property",
    "og:image:alt",
    imageAlt,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "name",
    "twitter:title",
    pageTitle,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "name",
    "twitter:description",
    metadata.description,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "name",
    "twitter:image",
    metadata.image,
  );
  updatedHtml = replaceMetaTag(
    updatedHtml,
    "name",
    "twitter:image:alt",
    imageAlt,
  );

  return addProjectStructuredData(
    updatedHtml,
    canonicalUrl,
    metadata,
  );
}

export async function onRequest(
  context: FunctionContext,
): Promise<Response> {
  if (
    context.request.method !== "GET" &&
    context.request.method !== "HEAD"
  ) {
    return context.next();
  }

  const routeId = context.params.id;
  const projectId = typeof routeId === "string" ? routeId : "";
  const metadata = PROJECT_METADATA[projectId];

  if (!metadata) {
    return context.next();
  }

  const indexUrl = new URL("/index.html", context.request.url);
  const assetResponse = await context.env.ASSETS.fetch(
    indexUrl.toString(),
  );

  if (!assetResponse.ok) {
    return context.next();
  }

  const html = await assetResponse.text();
  const updatedHtml = applyProjectMetadata(
    html,
    projectId,
    metadata,
  );
  const headers = new Headers(assetResponse.headers);

  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  headers.set("X-Robots-Tag", "index, follow");

  return new Response(
    context.request.method === "HEAD" ? null : updatedHtml,
    {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    },
  );
}
