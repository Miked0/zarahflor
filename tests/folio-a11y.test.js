const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:4500/', { waitUntil: 'domcontentloaded' });

  const a11y = await page.evaluate(() => {
    const items = document.querySelectorAll('.folio__item');
    return Array.from(items).map((item, i) => ({
      i: i + 1,
      tabindex: item.getAttribute('tabindex'),
      role: item.getAttribute('role'),
      focusable: item.tabIndex >= 0,
    }));
  });
  console.log('folio a11y:', JSON.stringify(a11y, null, 2));

  const allFocusable = a11y.every(x => x.focusable);
  const allHaveRole = a11y.every(x => x.role);
  await browser.close();
  process.exit(allFocusable && allHaveRole ? 0 : 1);
})();
