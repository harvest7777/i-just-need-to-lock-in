import path from 'path';
const { chromium } = require('playwright-extra')
const stealth = require('puppeteer-extra-plugin-stealth')()

const authFile = path.join(__dirname, './/user.json');

// for some reasont hese evasions break shit??/
stealth.enabledEvasions.delete('iframe.contentWindow')
stealth.enabledEvasions.delete('media.codecs')

chromium.use(stealth)

// browser args needed to stop chrome from tweakin
chromium.launch({
  headless: false,
  args: ['--disable-blink-features=AutomationControlled']
}).then(async (browser: { newPage: () => any; close: () => any }) => {
  const page = await browser.newPage()

  await page.goto('http://localhost:3000')
  console.log("in stealth mode")
  await page.waitForURL('**/lockin');
  await page.context().storageState({ path: authFile });
  console.log("HELLL YE we authentciated poggers")
  await browser.close()
})
