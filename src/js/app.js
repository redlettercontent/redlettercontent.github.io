window.addEventListener('load', () => {
  for (const a of document.querySelectorAll('nav > ul > li > a')) {
    if (a.href === location.href) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});
