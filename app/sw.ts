import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, NetworkOnly, CacheFirst, ExpirationPlugin } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: WorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ url }) => url.pathname.startsWith("/api/auth") || url.pathname.startsWith("/login") || url.pathname.startsWith("/forgot-password"),
      handler: new NetworkOnly(),
    },
    {
      // Bible data is immutable: cache hard to protect the upstream API quota
      // and allow offline study. bible.helloao.org serves chapter text.
      matcher: ({ url }) =>
        url.pathname.startsWith("/api/bible/") ||
        url.origin === "https://bible.helloao.org",
      handler: new CacheFirst({
        cacheName: "bible-api",
        plugins: [
          new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 30 * 24 * 3600 }),
        ],
      }),
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();