// Import required Workbox modules
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache and route all assets using the manifest file
precacheAndRoute(self.__WB_MANIFEST);

// Define a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache pages for 30 days
    }),
  ],
});

// Warm the cache for specific URLs using the pageCache strategy
warmStrategyCache({
  urls: ["/index.html", "/"], // URLs to pre-cache
  strategy: pageCache,
});

// Register a route for navigating requests using the pageCache strategy
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Register a route for caching assets like styles, scripts, and workers
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
