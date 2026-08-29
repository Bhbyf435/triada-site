(function(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const qs=k=>new URLSearchParams(location.search).get(k)||'';
  const list=v=>Array.isArray(v)?v:(v?String(v).split(/[,;]+/).map(x=>x.trim()).filter(Boolean):[]);
  function stageLabel(s){return ({IDEA:'Идея',CONCEPT:'Концепция',LAB:'Лаборатория',PROTOTYPE:'Прототип',PILOT:'Пилот',DEMO:'Демонстрация',INDUSTRIAL:'Промышленная эксплуатация','SCALE-UP':'Масштабирование'})[s]||s||''}
  function projectCard(p){return `<article class="card project-card"><div class="eyebrow">${esc(p.direction||'Технологический проект')} · ${esc(stageLabel(p.stage))}</div><h3>${esc(p.name)}</h3><p>${esc(p.lead||p.problem||'')}</p><div class="meta"><span>${esc(p.need||'')}</span></div><div class="card-actions"><a class="button" href="project.html?id=${encodeURIComponent(p.id)}">Познакомиться с проектом</a><a class="text-link" href="cooperation.html?project=${encodeURIComponent(p.id)}">Обсудить с ТРИАДОЙ →</a></div></article>`}
  function creatorCard(c){return `<article class="card creator-card">${c.photo?`<img class="portrait" src="${esc(c.photo)}" alt="${esc(c.name)}">`:''}<div class="eyebrow">${esc((c.roles||[]).join(' · '))}</div><h3>${esc(c.name)}</h3><p>${esc(c.degree||c.title||c.tasks||'')}</p><a class="button secondary" href="creator.html?id=${encodeURIComponent(c.id)}">Познакомиться с создателем</a></article>`}
  function publicationCard(p){return `<article class="card"><div class="eyebrow">${esc(p.type||'Публикация')}</div><h3>${esc(p.title)}</h3><p>${esc(p.lead||'')}</p><a class="text-link" href="publications.html?id=${encodeURIComponent(p.id)}">Читать →</a></article>`}
  function bindMobileNav(){const b=document.querySelector('[data-nav-toggle]'), n=document.querySelector('[data-nav]');if(b&&n)b.onclick=()=>n.classList.toggle('open')}
  async function submitForm(form){const status=form.querySelector('[data-form-status]'); const data=Object.fromEntries(new FormData(form).entries()); try{status.textContent='Отправляем…';const r=await TriadaAPI.submit(data);if(!r.ok)throw new Error(r.error||'Ошибка');status.textContent='Спасибо. Заявка принята: '+r.id;form.reset()}catch(e){status.textContent=e.message}}
  window.TriadaUI={esc,qs,list,stageLabel,projectCard,creatorCard,publicationCard,bindMobileNav,submitForm};
  document.addEventListener('DOMContentLoaded',bindMobileNav);
})();
