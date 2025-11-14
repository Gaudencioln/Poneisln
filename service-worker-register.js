// Registro do Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ ServiceWorker registrado com sucesso:', registration.scope);
                
                // Verificar se há atualizações
                registration.addEventListener('updatefound', function() {
                    const newWorker = registration.installing;
                    console.log('🔄 Nova versão do ServiceWorker encontrada');
                    
                    newWorker.addEventListener('statechange', function() {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('✨ Nova versão disponível. Recarregue a página para atualizar.');
                            
                            // Opcional: mostrar notificação para o usuário
                            if (confirm('Nova versão disponível! Deseja atualizar agora?')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            })
            .catch(function(error) {
                console.log('❌ Falha ao registrar ServiceWorker:', error);
            });
    });

    // Escutar mensagens do Service Worker
    navigator.serviceWorker.addEventListener('message', function(event) {
        console.log('📨 Mensagem do ServiceWorker:', event.data);
        
        if (event.data.type === 'CACHE_UPDATED') {
            console.log('📦 Cache atualizado com sucesso');
        }
    });

    // Verificar se está online/offline
    window.addEventListener('online', function() {
        console.log('🌐 Conexão restaurada');
        document.body.classList.remove('offline');
    });

    window.addEventListener('offline', function() {
        console.log('📴 Modo offline ativado');
        document.body.classList.add('offline');
    });
}

// Função para verificar status do cache
function verificarStatusCache() {
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
            console.log('📦 Caches disponíveis:', cacheNames);
            
            cacheNames.forEach(function(cacheName) {
                caches.open(cacheName).then(function(cache) {
                    cache.keys().then(function(requests) {
                        console.log(`📁 Cache ${cacheName} contém ${requests.length} recursos`);
                    });
                });
            });
        });
    }
}

// Verificar status do cache após carregamento
window.addEventListener('load', function() {
    setTimeout(verificarStatusCache, 2000);
});

