import {chromium} from 'playwright';

const url = process.argv[2] ?? 'http://localhost:9000';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  headless: true,
  args: ['--no-proxy-server'],
});
const page = await browser.newPage();
page.on('console', msg => console.log('[console]', msg.type(), msg.text()));
page.on('pageerror', err => console.log('[pageerror]', err.message));
page.on('requestfailed', req => console.log('[requestfailed]', req.url(), req.failure()?.errorText));
page.on('response', res => {
  if (res.status() >= 400) console.log('[response]', res.status(), res.url());
});

await page.goto(url, {waitUntil: 'networkidle'});
await page.waitForSelector('#render', {timeout: 30000});
console.log('render button found, clicking...');
await page.click('#render');

await page.waitForSelector('#render[data-rendering]', {timeout: 15000}).catch(() => {
  console.log('warning: data-rendering attribute not observed, continuing to poll anyway');
});
console.log('rendering started, waiting for completion...');

await page.waitForFunction(
  () => {
    const el = document.querySelector('#render');
    return el && !el.hasAttribute('data-rendering');
  },
  undefined,
  {timeout: 5 * 60 * 1000},
);
console.log('rendering finished');

await browser.close();
