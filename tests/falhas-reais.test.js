const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
let failures = 0;
let passes = 0;

function check(name, condition, detail = '') {
  if (condition) {
    passes++;
    console.log(`  OK   ${name}`);
  } else {
    failures++;
    console.log(`  FAIL ${name}${detail ? ' — ' + detail : ''}`);
  }
}

// Helper: extrair cor hex de um estilo inline ou CSS
function hexFromStyle(html, prop) {
  const m = html.match(new RegExp(prop + '\\s*:\\s*#([0-9a-fA-F]{6})'));
  return m ? '#' + m[1] : null;
}

// Luminância relativa (WCAG)
function relLum(r, g, b) {
  const s = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * s(r / 255) + 0.7152 * s(g / 255) + 0.0722 * s(b / 255);
}
function contrast(fg, bg) {
  const f = parseInt(fg.slice(1), 16);
  const b = parseInt(bg.slice(1), 16);
  const l1 = relLum(f >> 16, (f >> 8) & 255, f & 255);
  const l2 = relLum(b >> 16, (b >> 8) & 255, b & 255);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

console.log('\n=== Falhas reais do site Zarah Flor (TDD red) ===\n');

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// 1. CTA da Capa não deve ser "botão ilha" (fundo sólido) — deve ser texto corrido
const capaCtaBg = hexFromStyle(index, 'background');
check('1. CTA da Capa é texto corrido (não botão ilha)',
  !(index.includes('background:var(--sc-accent)') && index.includes('Agendar pelo WhatsApp')),
  'CTA da Capa tem fundo sólido (magnet) — BRIEF proíbe botão ilha');

// 2. Analytics não deve usar ID placeholder
check('2. Analytics ID não é placeholder',
  !index.includes('G-XXXXXXXXXX'),
  'gtag usa ID placeholder G-XXXXXXXXXX');

// 3. Contraste 4.5:1 — Cacau (#2A1712) sobre Canvas (#FAF7F2)
const c1 = contrast('#2A1712', '#FAF7F2');
check('3. Contraste Cacau/Canvas >= 4.5:1', c1 >= 4.5, `contraste = ${c1.toFixed(2)}`);

// 4. Contraste 4.5:1 — Ink-soft (#6E5E52) sobre Canvas (#FAF7F2) — texto secundário
const c2 = contrast('#6E5E52', '#FAF7F2');
check('4. Contraste Ink-soft/Canvas >= 4.5:1', c2 >= 4.5, `contraste = ${c2.toFixed(2)}`);

// 5. Nenhum texto branco sobre fundo ouro (contraste < 4.5:1)
const whiteOnGold = index.match(/color:\s*#FFFFFF[^;]*;[^}]*background:\s*(var\(--sc-accent\)|#C9944A)/gi) ||
                    index.match(/background:\s*(var\(--sc-accent\)|#C9944A)[^;]*;[^}]*color:\s*#FFFFFF/gi);
check('5. Nenhum texto branco sobre fundo ouro', !whiteOnGold || whiteOnGold.length === 0,
  whiteOnGold ? `${whiteOnGold.length} elemento(s) com branco sobre ouro` : 'ok');

// 6. Número de atos não deve estar na banda proibida (6-7)
const acts = (index.match(/data-sc-act=/g) || []).length;
check('6. Número de atos fora da banda proibida (6-7)', acts !== 6 && acts !== 7, `${acts} atos detectados`);

// 7. Folio tem 5 itens (capítulos 1-5, sem a capa)
const folioEls = index.match(/<div[^>]*class="[^"]*folio__item[^"]*"/g) || [];
check('7. Folio tem exatamente 5 itens', folioEls.length === 5, `${folioEls.length} elementos folio__item encontrados`);

// 8. Todos os 6 capítulos presentes (Capa + 5)
const chapters = ['Capítulo 1', 'Capítulo 2', 'Capítulo 3', 'Capítulo 4', 'Capítulo 5'];
let allChapters = true;
chapters.forEach(c => { if (!index.includes(c)) allChapters = false; });
check('8. Todos os 5 capítulos presentes', allChapters, 'algum capítulo falta');

// 9. Capítulo 2 (PEAK) tem kinetic lines (maior destaque visual)
check('9. Capítulo 2 tem kinetic lines (PEAK)',
  index.includes('data-sc-kinetic="lines"') && index.includes('Capítulo 2'),
  'Capítulo 2 não tem kinetic lines');

// 10. Capítulo 1 é mais quieto (sem kinetic, sem reveal)
const cap1 = index.indexOf('Capítulo 1');
const cap2 = index.indexOf('Capítulo 2');
const cap1Segment = index.slice(cap1, cap2 > -1 ? cap2 : index.length);
check('10. Capítulo 1 é mais quieto (sem kinetic/reveal)',
  !cap1Segment.includes('data-sc-kinetic') && !cap1Segment.includes('data-sc-reveal'),
  'Capítulo 1 tem animações de pico — deveria ser mais quieto que o Cap. 2');

console.log(`\n=== Resultado: ${passes} passou, ${failures} falhou ===\n`);
process.exit(failures > 0 ? 1 : 0);
