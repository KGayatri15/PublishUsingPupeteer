/**
 * References
 * https://www.hongkiat.com/blog/rss-reader-in-javascript/
 * https://github.com/puppeteer/puppeteer/issues/3594
 * https://www.nikolas-blog.com/web-crawling-with-puppeteer
 * https://stackoverflow.com/questions/56330197/jsdoms-queryselectorall-returned-too-many-xml-elements
 * 
 */
//RSS READER
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const {JSDOM} = require('jsdom');
(async ()=>{
    try{
        const browser = await puppeteer.launch({ headless:true });
        const page = await browser.newPage();
        await page.goto("https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/");
        var result = await page.evaluate(()=>{
        var rssLinks =  document.querySelectorAll('link[type="application/rss+xml"]');
        var list = [...rssLinks];
        return list.map(link => link.getAttribute('href'));
        })
        for await (var url of result){
            console.log("For this RSS URL :- " + url);
            var response = 
            await fetch(url)
            .then(result =>{return result.text()})
            .then( (text) =>{
               // let doc  = parser.parseFromString(text,'text/xml');
                let doc = new JSDOM(text,{contentType:"text/xml"}).window.document;
                let items = doc.querySelectorAll('item');
                console.log("No of <item> tags :- " + items.length);
                var titleList = [];
                items.forEach((item)=>{
                    titleList.push(item.querySelector('title').textContent);
                })
                console.log(titleList);
            })
            .catch((err)=>{console.log(err);})
        }
        await browser.close();
    }catch(err){
        console.log(err);
    }
})();