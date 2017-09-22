importScripts(
  'https://unpkg.com/workbox-sw@2.0.1/build/importScripts/workbox-sw.prod.v2.0.1.js',
  'https://unpkg.com/workbox-google-analytics@2.0.0/build/importScripts/workbox-google-analytics.prod.v2.0.0.js'
);

const workboxSW = new WorkboxSW({clientsClaim: true, skipWaiting: true});
workboxSW.precache([]);

workbox.googleAnalytics.initialize();
