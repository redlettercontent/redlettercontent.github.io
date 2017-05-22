importScripts(
  'https://unpkg.com/workbox-sw@1.0.0',
  'https://unpkg.com/workbox-google-analytics@1.0.0'
);

const workboxSW = new WorkboxSW({clientsClaim: true, skipWaiting: true});
workboxSW.precache([]);

workbox.googleAnalytics.initialize();
