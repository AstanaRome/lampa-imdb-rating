(function(){
  const API_KEY = '31eb0e76';
  async function fetchIMDB(title){
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.imdbRating && data.imdbRating !== 'N/A' ? data.imdbRating : null;
  }
  function injectBadge(el, rating){
    if (!rating || el.querySelector('.imdb-badge')) return;
    const badge = document.createElement('div');
    badge.className = 'imdb-badge';
    badge.textContent = `IMDb ${rating}`;
    Object.assign(badge.style, {
      position: 'absolute',
      top: '6px',
      left: '6px',
      background: 'rgba(0,0,0,0.85)',
      color: '#f5c518',
      padding: '2px 6px',
      fontSize: '12px',
      fontWeight: 'bold',
      borderRadius: '4px',
      zIndex: 999
    });
    el.style.position = 'relative';
    el.appendChild(badge);
  }
  async function processPosters(){
    const cards = document.querySelectorAll('.card, .poster-card, .poster-item');
    for (let el of cards) {
      if (el.dataset.imdbDone) continue;
      el.dataset.imdbDone = '1';
      const title = el.getAttribute('data-title') || el.querySelector('img')?.alt;
      if (!title) continue;
      const rating = await fetchIMDB(title);
      injectBadge(el, rating);
    }
  }
  setInterval(processPosters, 3000);
})();
