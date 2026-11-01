const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://localhost:4500/', { waitUntil: 'domcontentloaded' });

  // Clicar programaticamente no item 3 do folio (dispara o handler de clique real)
  await page.evaluate(() => {
    document.querySelector('.folio__item--3').click();
  });

  // Aguardar o setTimeout(0) do handler executar o scrollTo
  await page.waitForTimeout(500);

  const scrollY = await page.evaluate(() => window.scrollY);
  const item3Current = await page.locator('.folio__item--3').evaluate(el => el.classList.contains('folio__item--current'));
  console.log('scrollY after programmatic click:', scrollY, 'item3 current:', item3Current);

  await browser.close();
  process.exit(scrollY > 100 ? 0 : 1);
})();
