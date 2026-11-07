/* Fogón 2 — gram-based recipe keeper. Plain JS, no build step. */
(function () {
  'use strict';
  const G = window.Grams;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const h = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const app = $('#app');

  /* ---------- settings ---------- */
  const SKEY = 'fogon.settings';
  let S = { lang: (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en', eggWeight: 50, seed2: false };
  try { Object.assign(S, JSON.parse(localStorage.getItem(SKEY) || '{}')); } catch (e) { /* storage unavailable */ }
  const saveS = () => { try { localStorage.setItem(SKEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };
  const t = k => (I18N[S.lang] && I18N[S.lang][k]) || I18N.en[k] || k;

  /* ---------- IndexedDB (same database as Fogón 1, so saved data stays) ---------- */
  let dbp;
  function db() {
    if (!dbp) dbp = new Promise((res, rej) => {
      const r = indexedDB.open('fogon', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('recipes', { keyPath: 'id' });
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  async function tx(mode, fn) {
    const d = await db();
    return new Promise((res, rej) => {
      const x = d.transaction('recipes', mode), out = fn(x.objectStore('recipes'));
      x.oncomplete = () => res(out && out.result !== undefined ? out.result : out);
      x.onerror = () => rej(x.error);
    });
  }
  const dbAll = () => tx('readonly', s => s.getAll());
  const dbGet = id => tx('readonly', s => s.get(id));
  const dbPut = r => tx('readwrite', s => s.put(r));
  const dbDel = id => tx('readwrite', s => s.delete(id));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const clone = o => JSON.parse(JSON.stringify(o));

  /* convert a Fogón 1 recipe (ingredient text lines) */
  function migrate(r) {
    if (Array.isArray(r.items)) return r;
    const items = (r.ingredients || []).map(line => {
      const m = /^\s*(\d+(?:[.,]\d+)?)\s*(?:g|gr|grams?|gramos?)\b\.?\s*(?:de\s+|of\s+)?(.*)$/i.exec(line);
      if (m) return { n: m[2].trim(), g: parseFloat(m[1].replace(',', '.')) };
      if (/:\s*$/.test(line)) return { s: line.replace(/:\s*$/, '') };
      return { n: line, t: '' , chk: 1 };
    });
    return {
      id: r.id, lang: S.lang, title: r.title || '', servings: r.servings || null, servingsLabel: '',
      items, steps: r.steps || [], notes: [r.notes, r.source].filter(Boolean).join('\n'),
      check: items.some(i => i.chk) ? [S.lang === 'es' ? 'Receta de la versión anterior: agrega los gramos que faltan.' : 'Recipe from the old version: add the missing grams.'] : [],
      image: r.image || '', created: r.created || Date.now(), updated: r.updated || Date.now()
    };
  }

  /* ---------- helpers ---------- */
  function toast(msg, action) {
    const old = $('.toast'); if (old) old.remove();
    const el = document.createElement('div');
    el.className = 'toast'; el.setAttribute('role', 'status');
    el.innerHTML = `<span>${h(msg)}</span>` + (action ? `<button type="button">${h(action.label)}</button>` : '');
    document.body.appendChild(el);
    if (action) $('button', el).onclick = () => { el.remove(); action.fn(); };
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, action ? 6000 : 2400);
  }
  const ICON = {
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    minus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    pen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m-8 0l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    dots: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="19" cy="12" r="1.8" fill="currentColor"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    pot: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 30h36v6c0 9-6 14-18 14S14 45 14 36v-6z" fill="currentColor" opacity=".9"/><rect x="10" y="26" width="44" height="5" rx="2.5" fill="currentColor"/><path d="M24 20c0-3 3-3 3-6m5 6c0-3 3-3 3-6m5 6c0-3 3-3 3-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity=".5"/></svg>',
    warn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l10 18H2L12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 10v5m0 3v.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };
  const langToggle = () => `<button class="lang" type="button" data-act="lang" aria-label="${S.lang === 'en' ? 'Cambiar a español' : 'Switch to English'}"><span class="${S.lang === 'en' ? 'on' : ''}">ENG</span><span class="${S.lang === 'es' ? 'on' : ''}">SPA</span></button>`;
  const topbar = (title, backTo, right) => `<header class="bar">${backTo != null ? `<a class="iconbtn" href="#${backTo}" aria-label="${h(t('back'))}">${ICON.back}</a>` : ''}<h1 class="bar-title">${h(title)}</h1><div class="bar-right">${right || ''}</div></header>`;
  const fold = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const pnum = v => { const n = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isNaN(n) ? null : n; };
  const nice = x => String(Math.round(x * 100) / 100).replace('.', S.lang === 'es' ? ',' : '.');

  function compressImage(blob, max) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(blob), img = new Image();
      img.onload = () => {
        const s = Math.min(1, (max || 1200) / Math.max(img.naturalWidth, img.naturalHeight));
        const c = document.createElement('canvas');
        c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('img')); };
      img.src = url;
    });
  }

  /* ---------- library ---------- */
  let q = '';
  async function viewLibrary() {
    const all = (await dbAll()).sort((a, b) => a.title.localeCompare(b.title, S.lang));
    const fq = fold(q.trim());
    const list = all.filter(r => !fq || fold(r.title).includes(fq) || (r.items || []).some(i => fold(i.n).includes(fq)));
    app.innerHTML = `
      <header class="hero">
        <div class="brand"><img src="icons/icon-192.png" alt="" width="44" height="44"><div><h1>Fogón</h1><p>${h(t('tagline'))}</p></div></div>
        <div class="hero-right">${langToggle()}<a class="iconbtn" href="#settings" aria-label="${h(t('settings'))}">${ICON.gear}</a></div>
      </header>
      <div class="search"><span>${ICON.search}</span><input type="search" id="q" placeholder="${h(t('search'))}" value="${h(q)}" autocomplete="off" enterkeyhint="search"></div>
      <main class="list">
        ${all.length === 0 ? `<div class="empty"><div class="empty-pot">${ICON.pot}</div><h2>${h(t('emptyTitle'))}</h2><p>${h(t('emptyBody'))}</p></div>`
        : list.length === 0 ? `<p class="muted pad">${h(t('noMatches'))}</p>`
        : list.map(r => {
          const tot = G.total(r.items);
          const nChk = (r.check || []).length;
          return `<a class="rrow" href="#r/${r.id}">
            <span class="thumb">${r.image ? `<img src="${h(r.image)}" alt="" loading="lazy" onerror="this.remove()">` : ICON.pot}</span>
            <span class="row-body"><b>${h(r.title)}</b><small class="muted">${[r.servings ? r.servings + ' ' + (r.servingsLabel || t('servings').toLowerCase()) : '', tot ? G.fmtG(tot, r.lang) : ''].filter(Boolean).map(h).join(' · ')}</small></span>
            ${nChk ? `<span class="badge">${nChk} ${h(t('toCheckBadge'))}</span>` : ''}
          </a>`;
        }).join('')}
      </main>
      <a class="fab" href="#new">${ICON.plus}<span>${h(t('add'))}</span></a>`;
    const qi = $('#q');
    qi.oninput = () => { q = qi.value; const pos = qi.selectionStart; viewLibrary().then(() => { const n = $('#q'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) { /* */ } }); };
  }

  /* ---------- recipe view ---------- */
  const VS = {};   // per recipe view state
  let current = null, wakeLock = null;
  function vsFor(r) {
    if (!VS[r.id]) {
      const sb = (r.items || []).findIndex(i => i.sb && i.g != null);
      VS[r.id] = { mode: 'x', factor: 1, ing: sb >= 0 ? sb : (r.items || []).findIndex(i => i.s == null && i.g != null), checked: {}, done: {} };
    }
    return VS[r.id];
  }
  async function viewRecipe(id) {
    const r = await dbGet(id);
    if (!r) { location.hash = ''; return; }
    current = r;
    app.dataset.recipe = id;
    const lang = r.lang || S.lang;
    app.innerHTML = `
      ${topbar('', '', `${langToggle()}<button type="button" class="iconbtn" data-act="share" aria-label="${h(t('share'))}">${ICON.share}</button><a class="iconbtn" href="#edit/${r.id}" aria-label="${h(t('edit'))}">${ICON.pen}</a>`)}
      <article class="recipe" lang="${h(lang)}">
        ${r.image ? `<div class="r-img"><img src="${h(r.image)}" alt="" onerror="this.parentNode.remove()"></div>` : ''}
        <h1 class="r-title">${h(r.title)}</h1>
        ${(r.check || []).length ? `<section class="check"><h2>${ICON.warn}${h(t('toCheck'))}</h2><ul>${r.check.map(c => `<li>${h(c)}</li>`).join('')}</ul><p>${h(t('toCheckFoot'))}</p></section>` : ''}
        <section class="panel scaler" id="scaler"></section>
        <div id="scaled"></div>
        <h2 class="sec">${h(t('ingredients'))}</h2>
        <ul class="ings" id="ings"></ul>
        <h2 class="sec">${h(t('steps'))}</h2>
        <div id="steps"></div>
        ${r.notes ? `<h2 class="sec">${h(t('notes'))}</h2><div class="notes">${h(r.notes).replace(/\n/g, '<br>')}</div>` : ''}
        <div class="r-actions">
          ${'wakeLock' in navigator ? `<button type="button" class="btn ghost" data-act="wake">${ICON.sun}<span>${h(wakeLock ? t('awakeOn') : t('keepAwake'))}</span></button>` : ''}
          <button type="button" class="btn ghost danger" data-act="delete">${ICON.trash}<span>${h(t('del'))}</span></button>
        </div>
      </article>`;
    renderScaler(); renderBody();
  }
  function renderScaler() {
    const r = current, vs = vsFor(r), lang = r.lang || S.lang;
    const tot = G.total(r.items);
    const gramItems = r.items.map((it, i) => ({ it, i })).filter(o => o.it.s == null && o.it.g != null && o.it.g !== '');
    const modes = [['x', t('mX')], ['serv', t('mServ')], ['ing', t('mIng')], ['tot', t('mTot')]];
    let body = '';
    if (vs.mode === 'x') {
      body = `<div class="quick">${[0.5, 1, 1.5, 2, 3].map(f => `<button type="button" class="${Math.abs(vs.factor - f) < 0.001 ? 'on' : ''}" data-act="factor" data-f="${f}">${f === 0.5 ? '½' : f === 1.5 ? '1½' : f}×</button>`).join('')}</div>
        <label class="inline">× <input type="number" inputmode="decimal" step="any" min="0.05" id="sx" value="${nice(vs.factor)}"></label>`;
    } else if (vs.mode === 'serv') {
      body = r.servings
        ? `<div class="stepper"><button type="button" data-act="less" aria-label="−">${ICON.minus}</button><output>${nice(r.servings * vs.factor)}</output><button type="button" data-act="more" aria-label="+">${ICON.plus}</button></div><span class="muted small">${h(r.servingsLabel || t('servings').toLowerCase())} · ${h(t('servings'))}: ${r.servings} → ${nice(r.servings * vs.factor)}</span>`
        : `<p class="muted small">${h(t('servingsUnknown'))}</p>`;
    } else if (vs.mode === 'ing') {
      const it = r.items[vs.ing];
      body = `<label class="inline">${h(t('iHave'))} <input type="number" inputmode="decimal" step="any" min="1" id="sing" value="${it ? G.roundG(it.g * vs.factor) : ''}"> g ${h(t('of'))}</label>
        <select id="singsel">${gramItems.map(o => `<option value="${o.i}" ${o.i === vs.ing ? 'selected' : ''}>${h(o.it.n)} (${h(G.fmtG(o.it.g, lang))})</option>`).join('')}</select>`;
    } else {
      body = `<label class="inline">${h(t('iWant'))} <input type="number" inputmode="decimal" step="any" min="1" id="stot" value="${G.roundG(tot * vs.factor) || ''}"> g</label><p class="muted small">${h(t('totalNote'))}</p>`;
    }
    $('#scaler').innerHTML = `<div class="seg" role="radiogroup" aria-label="${h(t('scale'))}">${modes.map(([k, l]) => `<button type="button" role="radio" aria-checked="${vs.mode === k}" data-act="mode" data-m="${k}">${h(l)}</button>`).join('')}</div>
      <div class="scale-body">${body}</div>`;
    const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('input', () => { const v = pnum(el.value); if (v && v > 0) { vs.factor = fn(v); renderBody(); syncQuick(); } }); };
    bind('#sx', v => v);
    bind('#sing', v => v / r.items[vs.ing].g);
    bind('#stot', v => v / tot);
    const sel = $('#singsel'); if (sel) sel.onchange = () => { vs.ing = +sel.value; renderScaler(); };
  }
  function syncQuick() { $$('.quick button').forEach(b => b.classList.toggle('on', Math.abs(vsFor(current).factor - +b.dataset.f) < 0.001)); }
  function renderBody() {
    const r = current, vs = vsFor(r), lang = r.lang || S.lang, f = vs.factor;
    const scaled = Math.abs(f - 1) > 0.001;
    $('#scaled').innerHTML = `<div class="factor"><span>${h(t('factor'))} <b>×${nice(f)}</b> · ${h(t('totalNow'))} <b>${h(G.fmtG(G.total(r.items) * f, lang))}</b></span>${scaled ? `<button type="button" class="link" data-act="reset">${h(t('reset'))}</button>` : ''}</div>${scaled ? `<p class="callout">${h(t('scaledNote'))}</p>` : ''}`;
    $('#ings').innerHTML = r.items.map((it, i) => {
      const x = G.line(it, f, S, lang);
      if (x.section != null) return `<li class="ing-h">${h(x.section)}</li>`;
      return `<li class="ing ${vs.checked[i] ? 'checked' : ''}"><button type="button" data-act="tick" data-i="${i}" aria-pressed="${!!vs.checked[i]}">
        <span class="box"></span>
        <span class="amt">${x.amount ? h(x.amount) : `<i>${h(x.text || '—')}</i>`}</span>
        <span class="iname">${h(x.name)}${x.chk ? ` <span class="flag" title="${h(t('toCheck'))}">${ICON.warn}</span>` : ''}${x.hint ? `<small>${h(x.hint)}</small>` : ''}</span>
      </button></li>`;
    }).join('');
    let n = 0;
    $('#steps').innerHTML = (r.steps || []).length
      ? `<ol class="steps">${r.steps.map((s, i) => /^##\s*/.test(s)
        ? `<li class="step-h">${h(s.replace(/^##\s*/, ''))}</li>`
        : `<li class="step ${vs.done[i] ? 'done' : ''}"><button type="button" data-act="step" data-i="${i}"><span class="num">${++n}</span><span>${h(G.steps(s, f, lang))}</span></button></li>`).join('')}</ol><p class="muted small">${h(t('stepsHint'))}</p>`
      : `<p class="empty-steps">${h(t('noSteps'))}</p>`;
  }
  function asText(r) {
    const vs = vsFor(r), lang = r.lang || S.lang, f = vs.factor, out = [r.title];
    if (r.servings) out.push(t('servings') + ': ' + nice(r.servings * f) + (r.servingsLabel ? ' ' + r.servingsLabel : ''));
    out.push('', t('ingredients') + ':');
    r.items.forEach(it => {
      const x = G.line(it, f, S, lang);
      if (x.section != null) out.push('', x.section + ':');
      else out.push('• ' + (x.amount || x.text || '') + ' ' + x.name + (x.hint ? ' (' + x.hint + ')' : ''));
    });
    if ((r.steps || []).length) {
      out.push('', t('steps') + ':'); let n = 0;
      r.steps.forEach(s => out.push(/^##/.test(s) ? '\n' + s.replace(/^##\s*/, '') + ':' : (++n) + '. ' + G.steps(s, f, lang)));
    }
    if (r.notes) out.push('', r.notes);
    return out.join('\n');
  }

  /* ---------- editor ---------- */
  let draft = null, dirty = false, openRow = -1;
  async function viewEditor(mode, id) {
    if (mode === 'edit' && (!draft || draft.id !== id)) {
      const r = await dbGet(id); if (!r) { location.hash = ''; return; }
      draft = clone(r); dirty = false; openRow = -1;
    }
    if (mode === 'new' && (!draft || !draft._new)) {
      draft = { id: uid(), _new: 1, lang: S.lang, title: '', servings: null, servingsLabel: '', items: [{ n: '', g: '' }], steps: [], notes: '', check: [], image: '' };
      dirty = false; openRow = -1;
    }
    app.dataset.mode = mode;
    renderEditor(mode);
  }
  function itemRow(it, i, n) {
    const tools = `<button type="button" class="iconbtn sm" data-act="up" data-i="${i}" aria-label="${h(t('moveUp'))}" ${i === 0 ? 'disabled' : ''}>${ICON.up}</button>
      <button type="button" class="iconbtn sm" data-act="down" data-i="${i}" aria-label="${h(t('moveDown'))}" ${i === n - 1 ? 'disabled' : ''}>${ICON.down}</button>
      <button type="button" class="iconbtn sm" data-act="rm" data-i="${i}" aria-label="${h(t('remove'))}">${ICON.trash}</button>`;
    if (it.s != null) return `<div class="irow sec-row"><input data-i="${i}" data-f="s" value="${h(it.s)}" placeholder="${h(t('secPh'))}"><div class="itools">${tools}</div></div>`;
    const open = openRow === i;
    return `<div class="irow ${open ? 'open' : ''}">
      <div class="imain">
        <input class="ig" data-i="${i}" data-f="g" type="text" inputmode="decimal" value="${h(it.g == null ? '' : String(it.g).replace('.', S.lang === 'es' ? ',' : '.'))}" placeholder="0" aria-label="${h(t('grams'))}"><span class="gu">g</span>
        <input class="in" data-i="${i}" data-f="n" value="${h(it.n || '')}" placeholder="${h(t('ingName'))}">
        <button type="button" class="iconbtn sm ${it.chk ? 'flagged' : ''}" data-act="open" data-i="${i}" aria-expanded="${open}" aria-label="${h(t('more'))}">${it.chk ? ICON.warn : ICON.dots}</button>
      </div>
      ${open ? `<div class="idetail">
        <label class="field"><span>${h(t('textInstead'))}</span><input data-i="${i}" data-f="t" value="${h(it.t || '')}" placeholder="${h(t('textInsteadPh'))}"></label>
        <label class="field"><span>${h(t('perTsp'))}</span><input data-i="${i}" data-f="tsp" inputmode="decimal" value="${h(it.tsp || '')}" placeholder="ej. 6"></label>
        <label class="check-l"><input type="checkbox" data-i="${i}" data-f="egg" ${it.egg ? 'checked' : ''}> ${h(t('isEgg'))}</label>
        ${it.egg ? '' : `<div class="three">
          <label class="field"><span>${h(t('perPiece'))}</span><input data-i="${i}" data-f="pc0" inputmode="decimal" value="${h(it.pc ? it.pc[0] : '')}"></label>
          <label class="field"><span>${h(t('pieceOne'))}</span><input data-i="${i}" data-f="pc1" value="${h(it.pc ? it.pc[1] : '')}" placeholder="${h(t('pieceOnePh'))}"></label>
          <label class="field"><span>${h(t('pieceMany'))}</span><input data-i="${i}" data-f="pc2" value="${h(it.pc ? it.pc[2] : '')}" placeholder="${h(t('pieceManyPh'))}"></label></div>`}
        <label class="check-l"><input type="checkbox" data-i="${i}" data-f="chk" ${it.chk ? 'checked' : ''}> ${h(t('flagChk'))}</label>
        <div class="itools">${tools}</div>
      </div>` : ''}
    </div>`;
  }
  function renderEditor(mode) {
    const r = draft, back = mode === 'edit' ? 'r/' + r.id : '';
    const gramItems = r.items.map((it, i) => ({ it, i })).filter(o => o.it.s == null && o.it.n);
    const sbIdx = r.items.findIndex(i => i.sb);
    app.innerHTML = `${topbar(mode === 'edit' ? t('editRecipe') : t('newRecipe'), back, `<button type="button" class="btn small" data-act="save">${h(t('save'))}</button>`)}
      <form class="editor" id="ed" autocomplete="off" onsubmit="return false">
        <label class="field"><span>${h(t('title'))}</span><input data-f="title" value="${h(r.title)}" placeholder="${h(t('titlePh'))}"></label>
        ${(r.check || []).length || mode === 'edit' ? `<label class="field chkfield"><span>${ICON.warn} ${h(t('checkField'))}</span><textarea data-f="check" rows="${Math.max(2, (r.check || []).length + 1)}">${h((r.check || []).join('\n'))}</textarea><small class="muted">${h(t('checkHelp'))}</small></label>` : ''}
        <div class="two">
          <label class="field"><span>${h(t('servingsField'))}</span><input data-f="servings" type="number" inputmode="numeric" min="0" value="${h(r.servings || '')}" placeholder="${h(t('servingsPh'))}"></label>
          <label class="field"><span>${h(t('recipeLang'))}</span><select data-f="lang"><option value="en" ${r.lang === 'en' ? 'selected' : ''}>English</option><option value="es" ${r.lang === 'es' ? 'selected' : ''}>Español</option></select></label>
        </div>
        <label class="field"><span>${h(t('servingsLabel'))}</span><input data-f="servingsLabel" value="${h(r.servingsLabel || '')}" placeholder="${h(t('servingsLabelPh'))}"></label>
        <div class="field"><span>${h(t('ingredients'))}</span>
          <div class="irows">${r.items.map((it, i) => itemRow(it, i, r.items.length)).join('')}</div>
          <div class="row"><button type="button" class="btn ghost small" data-act="additem">${ICON.plus}${h(t('addIng'))}</button><button type="button" class="btn ghost small" data-act="addsec">${ICON.plus}${h(t('addSec'))}</button></div>
        </div>
        <label class="field"><span>${h(t('scaleBy'))}</span><select data-f="sb"><option value="-1">—</option>${gramItems.map(o => `<option value="${o.i}" ${o.i === sbIdx ? 'selected' : ''}>${h(o.it.n)}</option>`).join('')}</select></label>
        <label class="field"><span>${h(t('stepsField'))}</span><textarea data-f="steps" rows="9" placeholder="${h(t('stepsPh'))}">${h((r.steps || []).join('\n'))}</textarea><small class="muted">${h(t('stepsHelp'))}</small></label>
        <label class="field"><span>${h(t('notesField'))}</span><textarea data-f="notes" rows="4" placeholder="${h(t('notesPh'))}">${h(r.notes || '')}</textarea></label>
        <div class="field"><span>${h(t('photo'))}</span>
          <div class="photo"><div class="photo-prev">${r.image ? `<img src="${h(r.image)}" alt="">` : ICON.pot}</div>
            <div class="photo-btns"><label class="btn ghost small">${h(r.image ? t('changePhoto') : t('addPhoto'))}<input type="file" accept="image/*" data-act="photo" hidden></label>
            ${r.image ? `<button type="button" class="btn ghost small" data-act="nophoto">${h(t('removePhoto'))}</button>` : ''}</div></div>
        </div>
        <button type="button" class="btn wide" data-act="save">${h(t('save'))}</button>
      </form>`;
  }
  function onEditorInput(e) {
    const el = e.target, f = el.dataset.f; if (!f || !draft) return;
    dirty = true;
    if (el.dataset.i != null) {
      const it = draft.items[+el.dataset.i];
      if (f === 'g') it.g = el.value.trim() === '' ? null : pnum(el.value);
      else if (f === 'tsp') it.tsp = pnum(el.value) || undefined;
      else if (f === 'egg' || f === 'chk') { it[f] = el.checked ? 1 : 0; if (e.type === 'change') renderEditor(app.dataset.mode); }
      else if (f === 'pc0' || f === 'pc1' || f === 'pc2') { it.pc = it.pc || [null, '', '']; it.pc[+f.slice(2)] = f === 'pc0' ? pnum(el.value) : el.value; }
      else it[f] = el.value;
      return;
    }
    if (f === 'servings') draft.servings = parseInt(el.value, 10) || null;
    else if (f === 'steps') draft.steps = el.value.split('\n').map(s => s.trim()).filter(Boolean);
    else if (f === 'check') draft.check = el.value.split('\n').map(s => s.trim()).filter(Boolean);
    else if (f === 'sb') draft.items.forEach((it, i) => { if (i === +el.value) it.sb = 1; else delete it.sb; });
    else draft[f] = el.value;
  }
  async function saveDraft() {
    const r = clone(draft);
    r.title = (r.title || '').trim();
    if (!r.title) { toast(t('needTitle')); const i = $('[data-f=title]'); if (i) i.focus(); return; }
    r.items = r.items.filter(it => it.s != null ? it.s.trim() : (it.n || '').trim() || it.g != null).map(it => {
      if (it.s != null) return { s: it.s.trim() };
      const o = { n: (it.n || '').trim() };
      if (it.g != null && it.g !== '' && !isNaN(it.g)) o.g = +it.g; else if (it.t) o.t = it.t.trim();
      if (it.tsp) o.tsp = +it.tsp;
      if (it.egg) o.egg = 1;
      else if (it.pc && it.pc[0]) o.pc = [+it.pc[0], (it.pc[1] || '').trim(), (it.pc[2] || it.pc[1] || '').trim()];
      if (it.chk) o.chk = 1;
      if (it.sb) o.sb = 1;
      return o;
    });
    delete r._new;
    r.updated = Date.now(); r.created = r.created || Date.now();
    await dbPut(r);
    draft = null; dirty = false; delete VS[r.id];
    toast(t('saved'));
    location.hash = 'r/' + r.id;
  }

  /* ---------- settings ---------- */
  function viewSettings() {
    app.innerHTML = `${topbar(t('settings'), '', '')}
      <section class="panel">
        <div class="ctl"><span class="lbl">${h(t('language'))}</span>
          <div class="seg">${[['en', 'English'], ['es', 'Español']].map(([k, l]) => `<button type="button" role="radio" aria-checked="${S.lang === k}" data-act="setlang" data-l="${k}">${l}</button>`).join('')}</div></div>
        <label class="field"><span>${h(t('eggWeight'))}</span><input type="number" inputmode="decimal" min="20" max="90" id="egg" value="${h(S.eggWeight)}"><small class="muted">${h(t('eggHelp'))}</small></label>
      </section>
      <h2 class="sec">${h(t('rounding'))}</h2>
      <section class="panel"><p class="small">${h(t('roundingBody'))}</p></section>
      <h2 class="sec">${h(t('backup'))}</h2>
      <section class="panel"><p class="muted small">${h(t('backupHelp'))}</p>
        <div class="row"><button type="button" class="btn" data-act="export">${h(t('exportBtn'))}</button><label class="btn ghost">${h(t('importBtn'))}<input type="file" accept=".json,application/json" data-act="restore" hidden></label></div></section>
      <h2 class="sec">${h(t('about'))}</h2>
      <section class="panel"><p class="small">${h(t('aboutBody'))}</p><p class="muted small">Fogón 2.1</p></section>`;
    $('#egg').onchange = e => { const v = pnum(e.target.value); if (v >= 20 && v <= 90) { S.eggWeight = v; saveS(); } };
  }
  async function exportBackup() {
    const data = JSON.stringify({ app: 'fogon', version: 2, exported: new Date().toISOString(), settings: { eggWeight: S.eggWeight }, recipes: await dbAll() }, null, 1);
    const name = 'fogon-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    const file = new File([data], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: name }); return; } catch (e) { if (e && e.name === 'AbortError') return; }
    }
    const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  async function restoreBackup(file) {
    try {
      const j = JSON.parse(await file.text());
      if (!j || j.app !== 'fogon' || !Array.isArray(j.recipes)) throw new Error('bad');
      const have = new Set((await dbAll()).map(r => r.id)); let n = 0;
      for (const raw of j.recipes) { if (raw && raw.id && raw.title && !raw.sample) { await dbPut(migrate(raw)); if (!have.has(raw.id)) n++; } }
      toast(t('importedN') + n);
    } catch (e) { toast(t('badBackup')); }
  }

  /* ---------- events ---------- */
  document.addEventListener('input', e => { if (app.dataset.mode) onEditorInput(e); });
  document.addEventListener('change', async e => {
    const el = e.target;
    if (app.dataset.mode && el.dataset.f && el.type !== 'file') { onEditorInput(e); return; }
    if (el.dataset.act === 'photo' && el.files && el.files[0]) {
      try { draft.image = await compressImage(el.files[0], 1200); dirty = true; } catch (er) { /* unsupported */ }
      renderEditor(app.dataset.mode);
    }
    if (el.dataset.act === 'restore' && el.files && el.files[0]) { await restoreBackup(el.files[0]); el.value = ''; }
  });
  document.addEventListener('click', async e => {
    const el = e.target.closest('[data-act]'); if (!el) return;
    const act = el.dataset.act, i = el.dataset.i != null ? +el.dataset.i : null;
    const vs = current && app.dataset.recipe ? vsFor(current) : null;
    switch (act) {
      case 'lang': S.lang = S.lang === 'en' ? 'es' : 'en'; saveS(); app.dataset.mode ? renderEditor(app.dataset.mode) : route(true); break;
      case 'setlang': S.lang = el.dataset.l; saveS(); route(true); break;
      case 'mode': vs.mode = el.dataset.m; renderScaler(); break;
      case 'factor': vs.factor = +el.dataset.f; renderScaler(); renderBody(); break;
      case 'reset': vs.factor = 1; renderScaler(); renderBody(); break;
      case 'less': case 'more': {
        const s = Math.round(current.servings * vs.factor) + (act === 'more' ? 1 : -1);
        if (s >= 1) { vs.factor = s / current.servings; renderScaler(); renderBody(); }
        break;
      }
      case 'tick': vs.checked[i] = !vs.checked[i]; el.parentNode.classList.toggle('checked'); el.setAttribute('aria-pressed', !!vs.checked[i]); break;
      case 'step': vs.done[i] = !vs.done[i]; el.parentNode.classList.toggle('done'); break;
      case 'share': {
        const text = asText(current);
        if (navigator.share) { try { await navigator.share({ title: current.title, text }); } catch (er) { /* cancelled */ } }
        else { try { await navigator.clipboard.writeText(text); toast(t('shareSaved')); } catch (er) { /* */ } }
        break;
      }
      case 'wake':
        try {
          if (wakeLock) { await wakeLock.release(); wakeLock = null; }
          else { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => { wakeLock = null; }); }
        } catch (er) { wakeLock = null; }
        $('[data-act=wake] span').textContent = wakeLock ? t('awakeOn') : t('keepAwake');
        break;
      case 'delete': {
        if (!confirm(t('confirmDelete'))) break;
        const r = current; await dbDel(r.id); location.hash = '';
        toast(t('deleted'), { label: t('undo'), fn: async () => { await dbPut(r); location.hash = 'r/' + r.id; } });
        break;
      }
      // editor
      case 'save': saveDraft(); break;
      case 'additem': draft.items.push({ n: '', g: null }); dirty = true; renderEditor(app.dataset.mode); { const ins = $$('.in'); if (ins.length) ins[ins.length - 1].focus(); } break;
      case 'addsec': draft.items.push({ s: '' }); dirty = true; renderEditor(app.dataset.mode); break;
      case 'open': openRow = openRow === i ? -1 : i; renderEditor(app.dataset.mode); break;
      case 'up': case 'down': {
        const j = act === 'up' ? i - 1 : i + 1;
        if (j < 0 || j >= draft.items.length) break;
        [draft.items[i], draft.items[j]] = [draft.items[j], draft.items[i]];
        if (openRow === i) openRow = j; dirty = true; renderEditor(app.dataset.mode); break;
      }
      case 'rm': draft.items.splice(i, 1); openRow = -1; dirty = true; renderEditor(app.dataset.mode); break;
      case 'nophoto': draft.image = ''; dirty = true; renderEditor(app.dataset.mode); break;
      case 'export': exportBackup(); break;
    }
  });

  /* ---------- router ---------- */
  let lastHash = null;
  async function route(sameView) {
    const hash = location.hash.replace(/^#\/?/, '');
    const wasEditor = lastHash != null && /^(edit\/|new$)/.test(lastHash);
    if (wasEditor && hash !== lastHash) {
      if (dirty && !confirm(t('discard'))) { history.replaceState(null, '', '#' + lastHash); return; }
      draft = null; dirty = false;
    }
    const changed = hash !== lastHash; lastHash = hash;
    delete app.dataset.recipe; delete app.dataset.mode;
    document.documentElement.lang = S.lang;
    G.setNumLang(S.lang);
    const y = window.scrollY;
    if (hash.startsWith('r/')) await viewRecipe(hash.slice(2));
    else if (hash.startsWith('edit/')) await viewEditor('edit', hash.slice(5));
    else if (hash === 'new') await viewEditor('new');
    else if (hash === 'settings') viewSettings();
    else { current = null; await viewLibrary(); }
    window.scrollTo(0, changed && sameView !== true ? 0 : y);
  }
  window.addEventListener('hashchange', () => route());

  /* ---------- recipes delivered with the app ----------
     Each seed recipe has its own rev. A phone gets a recipe once; later revs replace it
     only if it was never edited on that phone. Recipes removed or deleted stay gone. */
  async function syncSeeds() {
    const seeds = window.SEED_RECIPES || [];
    const have = {}; (await dbAll()).forEach(r => { have[r.id] = r; });
    if (!S.seen) {
      S.seen = {};
      // phones that already had a batch: everything in it counts as delivered
      if (S.seed2) seeds.forEach(r => { if ((r.rev || 1) <= 1) S.seen[r.id] = 0; });
    }
    const untouched = r => r && r.created === r.updated;
    const now = Date.now();
    for (const id of window.SEED_REMOVE || []) {
      if (untouched(have[id])) await dbDel(id);
      S.seen[id] = -1;
    }
    for (const r of seeds) {
      const rev = r.rev || 1, seen = S.seen[r.id], ex = have[r.id];
      if (seen === -1) continue;
      if (seen == null) { if (!ex || untouched(ex)) await dbPut(fresh(r, ex, now)); S.seen[r.id] = rev; }
      else if (rev > seen) { if (untouched(ex)) await dbPut(fresh(r, ex, now)); S.seen[r.id] = rev; }
    }
    S.seed2 = true; saveS();
  }
  function fresh(r, ex, now) {
    const o = Object.assign({ servingsLabel: '', image: '' }, clone(r), { created: now, updated: now });
    if (ex && ex.image && !r.image) o.image = ex.image;
    delete o.rev;
    return o;
  }

  /* ---------- start ---------- */
  (async function start() {
    try {
      const all = await dbAll();
      for (const r of all) {
        if (r.sample) await dbDel(r.id);
        else if (!Array.isArray(r.items)) await dbPut(migrate(r));
      }
      await syncSeeds();
    } catch (e) { /* storage unavailable */ }
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    if (location.search) history.replaceState(null, '', location.pathname + location.hash);
    route();
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  })();
})();
