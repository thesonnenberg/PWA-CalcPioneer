const CACHE_NAME = 'my-cache-name-v1';
const URLS_TO_CACHE = [
    '/calculator.html',
    '/manifest.json',
    '/favicon.ico',
    '/images/icon_400x400.png',
    '/gui_manager.js',
    '/math_parser.js',
    '/styles.css',
];

// Installing and Caching Resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
    );
});

// Fetch Event Handling
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    console.log(`Error: Failed to fetch resource: ${event.request.url}`)
                });
            })
    );
});


// Activate Event - Cache Management
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
