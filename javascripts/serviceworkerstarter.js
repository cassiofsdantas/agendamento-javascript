//Funcao que inicia a chamada do service worker na aplicação
if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) 
    {
        console.log("[PWA Builder] active service worker found, no need to register");
    } 
    else {
        navigator.serviceWorker
            .register("/sw.js", {
                scope: "./"
            })
            .then(function (reg) {
                console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
            });
    }
}