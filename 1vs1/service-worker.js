self.addEventListener('notificatinclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://pawelek79.github.io/bub/1vs1/')
    );
});
