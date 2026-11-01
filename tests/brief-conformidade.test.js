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

console.log('\n=== Conformidade com o BRIEF.md — site Zarah Flor (index.html) ===\n');

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// As 6 seções de scroll em ordem: Capa (title page), Cap.1 .. Cap.5
const sections = index.match(/<section[\s\S]*?<\/section>/g) || [];
const capa = sections[0] || '';
const cap1 = sections[1] || '';
const cap2 = sections[2] || '';
const cap3 = sections[3] || '';
const cap4 = sections[4] || '';
const cap5 = sections[5] || '';

function has(haystack) {
  return [].slice.call(arguments).slice(1).every((n) => haystack.includes(n));
}

// ---- (a) Top bar Hibisco inclusiva ----
check(
  '1. Top bar Hibisco inclusiva (capa de mensagem de acolhimento)',
  index.includes('<header class="top-bar">') &&
    index.includes('--sc-hibisco:') &&
    index.includes('#A335AE') &&
    index.includes('background: var(--sc-hibisco)') &&
    index.includes('color: #FFFFFF') &&
    index.includes('todos os corpos e identidades são bem-vindos'),
  'top-bar ausente, sem cor hibisco/texto branco ou sem mensagem inclusiva'
);

// ---- (b) Jornada em capítulos após a capa ----
// Capa (title page): dispositivo de entrada "in", sem ato de scroll próprio
check(
  '2. Capa/title page com dispositivo de entrada (data-sc-in) e sem ato de scroll',
  capa.includes('data-sc-in') && !capa.includes('data-sc-act'),
  'capa não tem data-sc-in ou consome um ato de scroll indevidamente'
);

// Capítulo 1: pin + spotlight (tensão; mais quieto que o pico)
check(
  '3. Capítulo 1 usa pin + spotlight (tensão, mais quieto)',
  cap1.includes('data-sc-act="pin"') &&
    cap1.includes('data-sc-spotlight') &&
    !cap1.includes('data-sc-kinetic') &&
    !cap1.includes('data-sc-reveal'),
  'Cap.1 sem pin/spotlight ou com animações de pico'
);

// Capítulo 2 (PEAK): flow + reveal + kinetic lines + paralaxe (maior destaque visual)
check(
  '4. Capítulo 2 (pico) usa flow + reveal + kinetic lines + paralaxe',
  cap2.includes('data-sc-act="flow"') &&
    cap2.includes('data-sc-reveal') &&
    cap2.includes('data-sc-kinetic="lines"') &&
    cap2.includes('data-sc-parallax'),
  'Cap.2 (pico) sem um dos dispositivos de destaque'
);

// Capítulo 3: pan + tilt (alcance dos tratamentos)
check(
  '5. Capítulo 3 usa pan + tilt (alcance)',
  cap3.includes('data-sc-act="pan"') && cap3.includes('data-sc-tilt'),
  'Cap.3 sem pan ou sem tilt nos cards'
);

// Capítulo 4: pin + count (alívio, números reais)
check(
  '6. Capítulo 4 usa pin + count (alívio)',
  cap4.includes('data-sc-act="pin"') && cap4.includes('data-sc-count'),
  'Cap.4 sem pin ou sem count'
);

// Capítulo 5: flow close + CTA como texto corrido (não botão ilha)
check(
  '7. Capítulo 5 (fechamento) usa flow close com CTA texto corrido (não ilha)',
  cap5.includes('data-sc-act="flow"') &&
    cap5.includes('sc-cta--text') &&
    cap5.includes('wa.me/5511970653411') &&
    !cap5.includes('background:var(--sc-accent)') &&
    !cap5.includes('background:var(--sc-hibisco)'),
  'Cap.5 sem flow close ou CTA do fechamento é botão ilha (fundo sólido)'
);

// ---- (d) Zero scrub acts ----
check(
  '8. Zero scrub acts (nenhum data-sc-act="scrub" ou data-sc-scrub)',
  !index.includes('data-sc-act="scrub"') && !index.includes('data-sc-scrub'),
  'ato de scrub encontrado — proibido pelo BRIEF'
);

// ---- (c) Folha de encaminhamento: uma linha por capítulo ----
check(
  '9. Folha de encaminhamento cadastra uma linha por capítulo (5 linhas, id 1 a 5)',
  (index.match(/id:\s*[1-5]/g) || []).length === 5,
  'array chapters não tem as 5 linhas (Cap.1 a Cap.5)'
);

// Regra do score table: total de atos fora da banda proibida 6-7
const acts = (index.match(/data-sc-act=/g) || []).length;
check(
  `10. Total de atos fora da banda proibida (6-7): ${acts} ato(s)`,
  acts !== 6 && acts !== 7,
  `${acts} atos está dentro da banda proibida`
);

// ---- (h) Placeholders descritivos até fotos reais existirem ----
const imgTags = index.match(/<img[^>]*>/g) || [];
const imgsWithDescriptiveAlt = imgTags.filter(tag => /alt\s*=\s*"[^"]{5,}"/i.test(tag));
check(
  `11. Todas as ${imgTags.length} imagens/placeholders têm alt descritivo`,
  imgTags.length === imgsWithDescriptiveAlt.length && imgsWithDescriptiveAlt.length > 0,
  `${imgTags.length - imgsWithDescriptiveAlt.length} imagem(es) sem alt descritivo`
);


console.log(`\n=== Resultado: ${passes} passou, ${failures} falhou ===\n`);
process.exit(failures > 0 ? 1 : 0);
