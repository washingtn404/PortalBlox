// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  // atualiza o ano no rodapé
  const yearEls = [document.getElementById('year'), document.getElementById('year2')];
  const year = new Date().getFullYear();
  yearEls.forEach(el => { if(el) el.textContent = year });

  // carrega notícias de news.json (exemplo local) - troque pelo seu endpoint quando tiver
  fetch('news.json')
    .then(res => {
      if (!res.ok) throw new Error('Não foi possível carregar notícias');
      return res.json();
    })
    .then(data => renderNews(data.articles || []))
    .catch(err => {
      console.warn('Erro ao buscar notícias:', err);
      const container = document.getElementById('news-list');
      if(container) container.innerHTML = '<p class="muted">Não foi possível carregar as notícias agora.</p>';
    });
});

function renderNews(articles) {
  const container = document.getElementById('news-list');
  if(!container) return;
  if(!articles.length){
    container.innerHTML = '<p>Sem notícias no momento. Volte mais tarde.</p>';
    return;
  }
  container.innerHTML = '';
  articles.forEach(a => {
    const div = document.createElement('div');
    div.className = 'news-item';
    div.innerHTML = `
      <h4>${escapeHtml(a.title)}</h4>
      <p>${escapeHtml(a.excerpt || a.description || '')}</p>
      <small style="color:var(--muted)">${a.date || ''}</small>
    `;
    container.appendChild(div);
  });
}

// util pequena para evitar injeção
function escapeHtml(str){
  if(!str) return '';
  return str.replace(/[&<>"']/g, s => {
    const map = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
    return map[s];
  });
}
