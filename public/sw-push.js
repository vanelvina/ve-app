// public/sw-push.js
// Handles background push events and shows native system notifications.

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { 
      title: 'Van Elvina', 
      body: event.data ? event.data.text() : 'New update received!' 
    };
  }

  const title = data.title || 'Van Elvina';
  const options = {
    body: data.body || 'New message from Van Elvina',
    icon: data.icon || '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      // Check if there is already a window tab open with the same target URL
      const targetUrl = new URL(event.notification.data.url, self.location.origin).href;
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
