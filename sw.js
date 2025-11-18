// Service Worker para Mini Pôneis LN PWA
const CACHE_NAME = 'mini-poneis-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Recursos para cache estático (caminhos corrigidos para raiz)
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/service-worker-register.js',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png',
    '/favicon.ico'
];

// Instalação do Service Worker
self.addEventListener('install', function(event) {
    console.log('🔧 ServiceWorker: Instalando...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(function(cache) {
                console.log('📦 ServiceWorker: Cache estático criado');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(function() {
                console.log('✅ ServiceWorker: Recursos em cache');
                return self.skipWaiting();
            })
            .catch(function(error) {
                console.error('❌ ServiceWorker: Erro no cache:', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', function(event) {
    console.log('🚀 ServiceWorker: Ativando...');
    
    event.waitUntil(
        caches.keys()
            .then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ ServiceWorker: Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(function() {
                console.log('✅ ServiceWorker: Ativado e pronto');
                return self.clients.claim();
            })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', function(event) {
    const requestUrl = new URL(event.request.url);
    
    // Ignorar requisições de outros domínios
    if (requestUrl.origin !== location.origin) {
        return;
    }
    
    console.log('🌐 ServiceWorker: Interceptando:', event.request.url);
    
    event.respondWith(
        caches.match(event.request)
            .then(function(cachedResponse) {
                if (cachedResponse) {
                    console.log('📦 ServiceWorker: Servindo do cache:', event.request.url);
                    return cachedResponse;
                }
                
                console.log('🌐 ServiceWorker: Buscando na rede:', event.request.url);
                return fetch(event.request)
                    .then(function(networkResponse) {
                        // Cachear recursos dinâmicos
                        if (event.request.method === 'GET') {
                            const responseClone = networkResponse.clone();
                            caches.open(DYNAMIC_CACHE)
                                .then(function(cache) {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return networkResponse;
                    })
                    .catch(function(error) {
                        console.log('❌ ServiceWorker: Erro de rede:', error);
                        
                        // Fallback para página principal quando offline
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Fallback para outros recursos
                        return caches.match(event.request);
                    });
            })
    );
});

// Sincronização em background
self.addEventListener('sync', function(event) {
    console.log('🔄 ServiceWorker: Sincronização em background:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Implementar lógica de sincronização se necessário
            Promise.resolve()
        );
    }
});

// Notificações push (se implementado no futuro)
self.addEventListener('push', function(event) {
    console.log('📱 ServiceWorker: Notificação push recebida');
    
    const options = {
        body: event.data ? event.data.text() : 'Nova notificação do Mini Pôneis LN',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Mini Pôneis LN', options)
    );
});

// Clique em notificação
self.addEventListener('notificationclick', function(event) {
    console.log('🔔 ServiceWorker: Notificação clicada');
    
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

// Mensagens do cliente
self.addEventListener('message', function(event) {
    console.log('📨 ServiceWorker: Mensagem recebida:', event.data);
    
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            type: 'VERSION',
            version: CACHE_NAME
        });
    }
});

// Log de inicialização
console.log('🐴 Mini Pôneis LN - Service Worker carregado');
console.log('📦 Cache estático:', STATIC_CACHE);
console.log('🔄 Cache dinâmico:', DYNAMIC_CACHE);
console.log('✅ PWA pronto para funcionar offline!');

