(function(){
  const cfg = () => window.TRIADA_CONFIG || {};
  const demo = {
    ok:true, generatedAt:new Date().toISOString(),
    projects:[], creators:[], challenges:[], competences:[], publications:[]
  };
  function configured(){ const u=cfg().API_URL||''; return /^https:\/\//.test(u) && !u.includes('PASTE_'); }
  async function get(action, params={}){
    if(!configured()) return action==='bootstrap'?demo:{ok:false,error:'API не подключён'};
    const u=new URL(cfg().API_URL);
    u.searchParams.set('action',action);
    Object.entries(params).forEach(([k,v])=>u.searchParams.set(k,v));
    const r=await fetch(u.toString(),{redirect:'follow',cache:'no-store'});
    if(!r.ok) throw new Error('Ошибка API: '+r.status);
    return r.json();
  }
  async function submit(payload){
    if(!configured()) throw new Error('Сначала подключите Apps Script API в assets/js/config.js');
    const r=await fetch(cfg().API_URL,{method:'POST',redirect:'follow',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    if(!r.ok) throw new Error('Не удалось отправить форму');
    return r.json();
  }
  window.TriadaAPI={get,submit,configured};
})();
