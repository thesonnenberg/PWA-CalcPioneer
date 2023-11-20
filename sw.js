const CACHE_NAME = 'my-cache-name-v1';
const URLS_TO_CACHE = [
    '/',
    '/offline.html',
    // Include other resources like CSS, JavaScript, and images
    // ...
];

// Installing and Caching Resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Install and cache resources');
                return cache.addAll(URLS_TO_CACHE);
            })
            .catch(error => console.error('Caching failed:', error))
    );
});

// Fetch Event Handling
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached response if available
                if (response) {
                    return response;
                }
                // Fetch from network and cache the new resources
                return fetch(event.request).then(fetchResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            }).catch(() => {
                // Fallback to offline page if offline and resource not in cache
                return caches.match('/offline.html');
            })
    );
});

// Activate Event - Cache Management
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
