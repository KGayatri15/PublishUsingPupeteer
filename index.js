const puppeteer = require('puppeteer');

// (async () => {
//     const browser = await puppeteer.launch({ headless:false });
//     const page = await browser.newPage();
//     await page.goto("https://en.wikipedia.org/wiki/Cars_(film)");
//     await page.screenshot({ path: "cars.png" })
//    // await browser.waitForTarget(()=>false);
//     var result = await page.evaluate(()=>{
//         let headings = document.querySelectorAll(".mw-headline");
//         const headlingList = [...headings];
//         return headlingList.map(h=>h.innerText)
//    })
//    console.log(result);
//     await browser.close()
//    })();
   (async () => {
    const browser = await puppeteer.launch({ headless:false });
    const page = await browser.newPage();
   //  await page.goto('https://accounts.google.com/signin/v2/identifier');
      const navigationPromise = page.waitForNavigation()

      await page.goto('https://accounts.google.com/')

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