/* Gram engine: rounding a 1 g scale can follow, spoon guides, count hints, scaling. */
(function (root) {
  'use strict';
  const FR = [[0, ''], [1 / 8, '⅛'], [1 / 4, '¼'], [1 / 3, '⅓'], [1 / 2, '½'], [2 / 3, '⅔'], [3 / 4, '¾'], [1, '']];
  function frac(x) {
    let w = Math.floor(x), f = x - w, best = FR[0], d = 9;
    for (const n of FR) { const dd = Math.abs(f - n[0]); if (dd < d) { d = dd; best = n; } }
    if (best[0] === 1) { w += 1; best = FR[0]; }
    return (w ? String(w) : '') + best[1] || '0';
  }
  function half(x) { // nearest ½ (¼ below 1)
    const step = x < 1 ? 0.25 : 0.5;
    const r = Math.max(step, Math.round(x / step) * step);
    return frac(r);
  }
  function roundG(g, exact) {
    if (g == null || isNaN(g)) return null;
    if (g < 1) return g;               // shown as "<1 g"
    if (exact) return Math.round(g);   // unscaled: keep the recipe's own numbers
    if (g < 100) return Math.round(g);
    if (g < 1000) return Math.round(g / 5) * 5;
    return Math.round(g / 10) * 10;
  }
  let NUMLANG = null;
  function setNumLang(l) { NUMLANG = l; }
  function num(n, lang) {
    return (NUMLANG || lang) === 'es' ? n.toLocaleString('es-CO') : n.toLocaleString('en-US');
  }
  function fmtG(g, lang, exact) {
    const r = roundG(g, exact);
    if (r == null) return '';
    if (r < 1) return (lang === 'es' ? 'menos de 1' : 'under 1') + ' g';
    return num(r, lang) + ' g';
  }
  const SPOON = { en: { tsp: 'tsp', tbsp: 'tbsp', pinch: 'pinch' }, es: { tsp: 'cdta', tbsp: 'cda', pinch: 'pizca' } };
  function spoon(g, perTsp, lang) {
    if (!perTsp || g == null || roundG(g) >= 5) return '';
    const L = SPOON[lang] || SPOON.en;
    const tsp = g / perTsp;
    if (tsp < 0.1) return '≈ 1 ' + L.pinch;
    if (tsp >= 3) return '≈ ' + frac(tsp / 3) + ' ' + L.tbsp;
    return '≈ ' + frac(tsp) + ' ' + L.tsp;
  }
  const EGG = { en: ['egg', 'eggs'], es: ['huevo', 'huevos'] };
  function count(g, item, eggW, lang) {
    if (g == null) return '';
    let per, one, many;
    if (item.egg) { per = eggW || 50; [one, many] = EGG[lang] || EGG.en; }
    else if (item.pc && item.pc[0]) { [per, one, many] = item.pc; many = many || one; }
    else return '';
    const n = g / per;
    const s = half(n);
    const word = n <= 1.24 ? one : many;
    return (lang === 'es' ? '≈ ' : '≈ ') + s + ' ' + word;
  }
  /* one ingredient line at a scale factor */
  function line(item, factor, settings, lang) {
    if (item.s != null) return { section: item.s };
    if (item.g == null || item.g === '') return { amount: '', hint: '', name: item.n || '', text: item.t || '', chk: !!item.chk };
    const g = +item.g * factor;
    const exact = Math.abs(factor - 1) < 1e-9;
    const hints = [spoon(g, item.tsp, lang), count(g, item, settings && settings.eggWeight, lang)].filter(Boolean);
    return { amount: fmtG(g, lang, exact), hint: hints.join(' · '), name: item.n || '', chk: !!item.chk, g };
  }
  function steps(text, factor, lang) {
    return String(text || '').replace(/\{\s*(\d+(?:[.,]\d+)?)\s*g\s*\}/gi, (_, n) => fmtG(parseFloat(n.replace(',', '.')) * factor, lang, Math.abs(factor - 1) < 1e-9));
  }
  function total(items) {
    return (items || []).reduce((a, it) => a + (it.s == null && it.g != null && it.g !== '' ? +it.g : 0), 0);
  }
  const G = { setNumLang, roundG, fmtG, spoon, count, line, steps, total, frac };
  if (typeof module !== 'undefined' && module.exports) module.exports = G; else root.Grams = G;
})(typeof window !== 'undefined' ? window : globalThis);
