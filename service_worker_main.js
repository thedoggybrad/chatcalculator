'use strict'

const CACHE_NAME = 'thedoggybradchatcalcu';
// The files we want to cache
const resourceList = [
  '/',
  'index.html',
  'favicons/favicon.ico',
  'https://thedoggybhttps://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
  'script.js',
  'style.css',
  'images/avatar.png',
  'images/user.png',
  'favicons/android-chrome-192x192.png',
  'favicons/android-chrome-512x512.png',
  'favicons/apple-touch-icon.png',
  'favicons/favicon-16x16.png',
  'favicons/favicon-32x32.png'
  ];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(resourceList);
  }));
});

function addToCache(cacheName, resourceList) {
  caches.open(cacheName).then(cache => {
    return cache.addAll(resourceList);
  });
}

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request);
  }));
});
