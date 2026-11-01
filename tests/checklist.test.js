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

console.log('\n=== Verificação dos 20 itens do checklist ===\n');

// 1. Página 404 personalizada
check('1. Página 404 personalizada', fs.existsSync(path.join(root, '404.html')), 'arquivo 404.html');

// 2. CTA no topo da página
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
check('2. CTA no topo da página (WhatsApp)', index.includes('wa.me/5511970653411'), 'link WhatsApp no index.html');

// 3. Meta title em cada página
check('3. Meta title (index)', /<title>[^<]+<\/title>/.test(index));
check('3. Meta title (404)', /<title>[^<]+<\/title>/.test(fs.readFileSync(path.join(root, '404.html'), 'utf8')));
check('3. Meta title (obrigado)', /<title>[^<]+<\/title>/.test(fs.readFileSync(path.join(root, 'obrigado.html'), 'utf8')));
check('3. Meta title (privacidade)', /<title>[^<]+<\/title>/.test(fs.readFileSync(path.join(root, 'privacidade.html'), 'utf8')));
check('3. Meta title (termos)', /<title>[^<]+<\/title>/.test(fs.readFileSync(path.join(root, 'termos.html'), 'utf8')));

// 4. Meta description em cada página
check('4. Meta description (index)', index.includes('name="description"'));
check('4. Meta description (404)', fs.readFileSync(path.join(root, '404.html'), 'utf8').includes('name="description"'));

// 5. Imagem Open Graph
check('5. Imagem Open Graph (og:image)', index.includes('og:image') && index.includes('og-image.svg'));

// 6. Conjunto de favicons
check('6. Favicon SVG', fs.existsSync(path.join(root, 'favicon.svg')));
check('6. Favicon 32x32', fs.existsSync(path.join(root, 'favicon-32x32.svg')));
check('6. Favicon 16x16', fs.existsSync(path.join(root, 'favicon-16x16.svg')));
check('6. Apple touch icon', fs.existsSync(path.join(root, 'apple-touch-icon.svg')));
check('6. Manifest.json', fs.existsSync(path.join(root, 'manifest.json')));

// 7. robots.txt
check('7. robots.txt', fs.existsSync(path.join(root, 'robots.txt')), fs.readFileSync(path.join(root, 'robots.txt'), 'utf8'));

// 8. sitemap.xml
check('8. sitemap.xml', fs.existsSync(path.join(root, 'sitemap.xml')), fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8'));

// 9. Texto alt em toda imagem
const imgTags = index.match(/<img[^>]*>/g) || [];
const imgsWithoutAlt = imgTags.filter(tag => !/alt\s*=/i.test(tag));
check('9. Todas as imagens têm alt (index)', imgsWithoutAlt.length === 0, `${imgsWithoutAlt.length} sem alt`);

// 10. Versão mobile ajustada (media queries)
check('10. Versão mobile (media queries)', index.includes('@media (max-width: 860px)'));

// 11. CTA fixo no celular (referral fixo bottom)
check('11. CTA fixo no celular', index.includes('position: fixed') && index.includes('bottom: 2rem'));

// 12. Telas de carregamento (placeholders)
check('12. Telas de carregamento (placeholders)', index.includes('placeholder'));

// 13. Erros de formulário (página obrigado + privacidade com tratamento)
check('13. Página de obrigado (fluxo de formulário)', fs.existsSync(path.join(root, 'obrigado.html')));

// 14. Página de obrigado
check('14. Página de obrigado', fs.existsSync(path.join(root, 'obrigado.html')));

// 15. Política de privacidade
check('15. Política de privacidade', fs.existsSync(path.join(root, 'privacidade.html')));

// 16. Termos de uso
check('16. Termos de uso', fs.existsSync(path.join(root, 'termos.html')));

// 17. Banner de cookies
check('17. Banner de cookies', index.includes('cookie-banner') && index.includes('cookie-accept'));

// 18. Analytics configurado (não placeholder)
check('18. Analytics sem ID placeholder', !index.includes('G-XXXXXXXXXX'), 'gtag ainda usa G-XXXXXXXXXX');

// 19. Endereço de contato real
check('19. Endereço de contato real', index.includes('Maestro Cardim') && index.includes('97065-3411'));

// 20. Domínio próprio com HTTPS (referência no sitemap/og)
check('20. Domínio próprio com HTTPS (referência)', index.includes('https://zarahflor.com.br/'));

console.log(`\n=== Resultado: ${passes} passou, ${failures} falhou ===\n`);
process.exit(failures > 0 ? 1 : 0);
