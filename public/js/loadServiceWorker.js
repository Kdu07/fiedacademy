if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    console.log("Window loaded, checking service worker...");
    
    try {
      // Check if there's a controller already
      if (navigator.serviceWorker.controller) {
        console.log("Page already controlled by a service worker");
      }
      
      // Register service worker
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      console.log("Service Worker registered:", registration.scope);
      
      // Handle waiting worker
      if (registration.waiting) {
        console.log("New service worker waiting");
        registration.waiting.postMessage({action: 'skipWaiting'});
      }
      
      // Handle installation
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log("New service worker installing");
        
        newWorker.addEventListener('statechange', () => {
          console.log(`Service worker state: ${newWorker.state}`);
          
          if (newWorker.state === 'installed') {
            // Force new worker to activate
            newWorker.postMessage({action: 'skipWaiting'});
          }
        });
      });
      
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
  
  // Check for controller changes (happens after skipWaiting)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log("Service worker controller changed - reloading page");
    window.location.reload();
  });
}