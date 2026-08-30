(function () {
  const text = {
    EN: {
      heading: 'Latest work',
      aiTitle: 'AI Academy',
      aiBody: 'An internal learning initiative that turns AI literacy into practical capability through structured programs, tools and applied cases.',
      researchTitle: 'Closed-loop field management with AI',
      researchBody: 'PhD research combining neural-operator surrogates, multi-fidelity modeling and reinforcement learning for autonomous field-development optimization.',
      open: 'Open GitHub', visitors: 'Visitors'
    },
    RU: {
      heading: 'Новые проекты',
      aiTitle: 'Академия ИИ',
      aiBody: 'Внутренняя образовательная инициатива, которая превращает грамотность в области ИИ в практические навыки через системные программы, инструменты и прикладные кейсы.',
      researchTitle: 'Управление разработкой в замкнутом цикле с ИИ',
      researchBody: 'Исследование PhD, объединяющее суррогаты на основе нейронных операторов, многоуровневое моделирование и обучение с подкреплением для автономной оптимизации разработки.',
      open: 'Открыть GitHub', visitors: 'Посетители'
    }
  };

  function language() {
    const label = document.querySelector('.change-lng__p');
    return label && label.textContent.trim() === 'RU' ? 'RU' : 'EN';
  }

  function card(title, body, href, stack) {
    return `<div class="card-small-bg latest-card"><div class="card-small-stack"><p class="paragraph-text card-small-stack-text">${stack}</p></div><div class="card-small-description"><h3 class="subtitle-text card-small-header-text">${title}</h3><p class="paragraph-text card-small-description-text">${body}</p></div><div class="card-small-footer"><a class="main-link" href="${href}" target="_blank" rel="noopener"><span>#</span><span class="latest-open"></span></a></div></div>`;
  }

  function updateLatest() {
    const t = text[language()];
    const heading = document.querySelector('.latest-work-heading');
    if (heading) heading.textContent = t.heading;
    const cards = document.querySelectorAll('.latest-card');
    if (cards[0]) { cards[0].querySelector('.card-small-header-text').textContent = t.aiTitle; cards[0].querySelector('.card-small-description-text').textContent = t.aiBody; }
    if (cards[1]) { cards[1].querySelector('.card-small-header-text').textContent = t.researchTitle; cards[1].querySelector('.card-small-description-text').textContent = t.researchBody; }
    document.querySelectorAll('.latest-open').forEach(el => el.textContent = t.open);
    const visitorLabel = document.querySelector('.visitor-label');
    if (visitorLabel) visitorLabel.textContent = t.visitors + ': ';
  }

  function mount() {
    const host = document.querySelector('.project-pet-itproject');
    if (!host || document.querySelector('.latest-work')) return false;
    const block = document.createElement('div');
    block.className = 'latest-work';
    block.innerHTML = `<div class="latest-work-title"><h2 class="latest-work-heading"></h2></div><div class="project-pet-itproject-grid latest-work-grid">${card('', '', 'https://github.com/IldarFIZ/ai_academy', 'AI · LLM · EDUCATION')}${card('', '', 'https://scholar.google.com/citations?hl=en&user=s3M3qVAAAAAJ', 'FNO · U-FNO · RL')}</div>`;
    host.prepend(block);
    const footer = document.querySelector('.footer-content');
    if (footer) {
      const counter = document.createElement('div');
      counter.className = 'visitor-counter';
      counter.innerHTML = '<span class="visitor-label"></span><strong id="visitCount">…</strong>';
      footer.append(counter);
    }
    updateLatest();
    const label = document.querySelector('.change-lng__p');
    if (label) new MutationObserver(updateLatest).observe(label, { childList: true, characterData: true, subtree: true });
    return true;
  }

  let tries = 0;
  const timer = setInterval(() => { if (mount() || ++tries > 50) clearInterval(timer); }, 100);
  window.portfolioCounter = function (result) {
    const el = document.getElementById('visitCount');
    if (el) el.textContent = result && result.value !== undefined ? Number(result.value).toLocaleString() : '—';
  };
})();
