/* Name vom Cache */
const STATIC_CACHE_NAME = 'static-cache-v1';
/* es wird empfohlen, Versionen, von den Cache-Objekten zu führen */


/* Array von Dateien, die gecachet werden */
const FILES_TO_CACHE = [
    'offline.html'
];

// install-event wird bei der register()-Methode aufgerufen
self.addEventListener('install', evt => {
    console.log('ServiceWorker: Install sw');
    evt.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log('ServiceWorker: Pre-caching offline page');
                return cache.addAll(FILES_TO_CACHE);
            })
    );
    // gleich aktivieren
    self.skipWaiting();
});

self.addEventListener('fetch', evt => {
    // Fetch-Event abfangen
    console.log('ServiceWorker: Fetch event', evt.request.url);
    console.log('ServiceWorker: Fetch event, event.request: ', evt.request);     
    //#region Offline Szenario: Eigene Datei anstatt vom 404-Dino
    // nur die Requests von Seiten-Navigation (HTML-requests)
    // alle anderen requests für Scripte (script:src), CSS (link:css), Bilder (img:src) usw. gehen an Network    
    if (evt.request.mode !== 'navigate') {       
        return;
    }
    // Current page responds with a 200 when offline  
    evt.respondWith(
        fetch(evt.request)
        .catch(() => {
            return caches.open(STATIC_CACHE_NAME)
            .then((caches) => {
                return caches.match('offline.html')
            })
        })        
    )
    //#endregion
});