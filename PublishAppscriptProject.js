(async () => {
    const browser = await puppeteer.launch({ headless:false });
    const page = await browser.newPage();
    await page.goto("https://en.wikipedia.org/wiki/Cars_(film)");
    await page.screenshot({ path: "cars.png" })
   // await browser.waitForTarget(()=>false);
    var result = await page.evaluate(()=>{
        let headings = document.querySelectorAll(".mw-headline");
        const headlingList = [...headings];
        return headlingList.map(h=>h.innerText)
   })
   console.log(result);
    await browser.close()
})();
// "args":["--disable-web-security", "--user-data-dir", "--allow-running-insecure-content" ]
//https://stackoverflow.com/questions/59514049/unable-to-sign-into-google-with-selenium-automation-because-of-this-browser-or/61545042#61545042
(async () => {
    const browser = await puppeteer.launch({ headless:false });
    const page = await browser.newPage();
   //  await page.goto('https://accounts.google.com/signin/v2/identifier');
      const navigationPromise = page.waitForNavigation()

      await page.goto('https://accounts.google.com/',{waitUntil:'networkidle2'})

      await navigationPromise

      await page.waitForSelector('input[type="email"]')
      await page.click('input[type="email"]')

      await navigationPromise

      //TODO : change to your email 
      await page.type('input[type="email"]', 'youremail@gmail.com')

      await page.waitForSelector('#identifierNext')
      await page.click('#identifierNext')

      await page.waitForSelector('input[type="password"]')
      await page.click('input[type="email"]')

      //TODO : change to your password
      await page.type('input[type="password"]', 'yourpassword')
      await page.waitForSelector('#passwordNext')
      await page.click('#passwordNext')
      await navigationPromise
      await browser.waitForTarget(()=>false);
      await browser.close()
})();
//https://gist.github.com/Brandawg93/728a93e84ed7b66d8dd0af966cb20ecb
(async ()=>{
    const browser = puppeteer.launch({headless:false});
    const page = await browser.newPage();
    const pages = await browser.pages();
// Close the new tab that chromium always opens first.
    pages[0].close();
    await page.goto('https://accounts.google.com/signin/v2/identifier', { waitUntil: 'networkidle2' });
//  if (headless) {
  // Wait for email input.
    await page.waitForSelector('#identifierId');
    let badInput = true;
    // Keep trying email until user inputs email correctly.
    // This will error due to captcha if too many incorrect inputs.
    while (badInput) {
        const email = await prompt('Email or phone: ');
        await page.type('#identifierId', email);
        await page.waitFor(1000);
        await page.keyboard.press('Enter');
        await page.waitFor(1000);
        badInput = await page.evaluate(() => document.querySelector('#identifierId[aria-invalid="true"]') !== null);
        if (badInput) {
        console.log('Incorrect email or phone. Please try again.');
        await page.click('#identifierId', { clickCount: 3 });
        }
    }
    const password = await prompt('Enter your password: ', true);
    console.log('Finishing up...');
    // Wait for password input
    await page.type('input[type="password"]', password);
    await page.waitFor(1000);
    await page.keyboard.press('Enter');
    // For headless mode, 2FA needs to be handled here.
    // Login via gmail app works autmatically.
// }
 })();
