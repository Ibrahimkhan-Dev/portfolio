import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer, type Plugin } from "vite";

export function prerenderHome(root: string, outDir: string): Plugin {
  return {
    name: "prerender-home",
    apply: "build",
    async writeBundle(_options, bundle) {
      const criticalCss = Object.values(bundle).find(
        (file) => file.type === "asset" && file.fileName.includes("/critical-") && file.fileName.endsWith(".css"),
      );
      if (criticalCss?.type !== "asset" || typeof criticalCss.source !== "string") {
        throw new Error("The home page stylesheet was not generated.");
      }

      const indexPath = path.join(outDir, "index.html");
      const shell = await readFile(indexPath, "utf8");
      const styles = shell.match(/<link rel="stylesheet"[^>]*>/)?.[0];
      const rootElement = '<div id="root"></div>';
      if (!styles || !shell.includes(rootElement)) {
        throw new Error("The generated HTML is missing its stylesheet or React root.");
      }

      const renderer = await createServer({
        configFile: false,
        root,
        appType: "custom",
        esbuild: { jsx: "automatic" },
        resolve: { alias: { "@": path.join(root, "src") } },
        server: { middlewareMode: true, hmr: false, watch: null },
      });

      try {
        const { renderHome } = await renderer.ssrLoadModule("/src/prerender-home.tsx");
        const markup = renderHome();
        if (!markup.includes('id="hero-heading"')) {
          throw new Error("The home page did not render.");
        }

        const home = shell
          .replace(styles, () => [
            `<style>${criticalCss.source}</style>`,
            styles.replace(/>$/, ' media="print" onload="this.media=\'all\'">'),
            `<noscript>${styles}</noscript>`,
          ].join("\n"))
          .replace(rootElement, () => `<div id="root" data-prerendered="home">${markup}</div>`);

        await Promise.all([
          writeFile(indexPath, home),
          writeFile(path.join(outDir, "app-shell.html"), shell),
          writeFile(path.join(outDir, "404.html"), shell),
        ]);
      } finally {
        await renderer.close();
      }
    },
  };
}
