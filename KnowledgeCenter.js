const puppeteer = require('puppeteer');
var urls = [
    "https://github.com/bronzwikgk/tooltip-sequence",
    "https://github.com/bronzwikgk/pointer-tracker",
    "https://github.com/bronzwikgk/webscript",
    "https://github.com/bronzwikgk/time-track",
    "https://github.com/bronzwikgk/tooltip-sequence",
    "https://github.com/bronzwikgk/reasondb",
    "https://tailwindcss.com/",
    "https://kislayverma.com/software-architecture/architecture-pattern-orchestration-via-workflows/",
    "https://support.integromat.com/hc/en-us/articles/115003864294?mobile_site=true",
    "https://github.com/josdejong/jsoneditor",
    "https://blog.wax-o.com/2014/01/how-to-find-deep-and-get-parent-in-javascript-nested-objects-with-recursive-functions-and-the-reference-concept-level-beginner/",
    "https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/",
    "https://github.com/EmilHernvall/dnsguide",
    "https://smartsheet-platform.github.io/api-docs/?javascript#objects-31",
    "https://github.com/okayrunner/piper"
];
(async()=>{
    try{
        const browser = await puppeteer.launch({ headless:true });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        var data = [];data.push(['URL','TITLE']);
        for await(url of urls){
            console.log(url);
            await page.goto(url);
            var title = await page.evaluate(()=>{
                return document.getElementsByTagName('title')[0].textContent;
            })
            data.push([url,title]);
        }
        console.log(data);
        await browser.close();
    }catch(err){
        console.log(err);
    }
})();
//parallel
