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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-42718091-1', 'auto');
ga('send', 'pageview');
