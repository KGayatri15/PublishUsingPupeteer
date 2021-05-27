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
        var data = [];
        var json = JSON.parse(JSON.stringify({}));
        const browser = await puppeteer.launch({ headless:true });
        const page = await browser.newPage();
        var websiteURL = "https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/"; 
        json['websiteUrl'] = websiteURL;
        await page.goto(websiteURL);
        var result = await page.evaluate(()=>{
        var rssLinks =  document.querySelectorAll('link[type="application/rss+xml"]');
        var list = [...rssLinks];
        return list.map(link => link.getAttribute('href'));
        })
        await browser.close();
        json['WEBSITE_RSS_CONTENT'] = [];
        for await (var url of result){
            var RSS_JSON = JSON.parse(JSON.stringify({}));
            console.log("For this RSS URL :- " + url);
            RSS_JSON['url'] = url;
            RSS_JSON['items'] = [];
            await fetch(url)
            .then(result =>{return result.text()})
            .then( (text) =>{
                let doc = new JSDOM(text,{contentType:"text/xml"}).window.document;
                let items = doc.querySelectorAll('item');
                console.log("No of <item> tags :- " + items.length);
                items.forEach((item)=>{
                    var item_JSON = JSON.parse(JSON.stringify({}));
                    item_JSON['title'] = item.querySelector('title').textContent
                  //  item_JSON['content'] = item.querySelector('description').textContent
                    RSS_JSON.items.push(item_JSON);
                })
            })
            .catch((err)=>{console.log(err);})
            console.log(RSS_JSON);
            json.WEBSITE_RSS_CONTENT.push(RSS_JSON);
        }
        data.push(json);
        console.log(data);
    }catch(err){
        console.log(err);
    }
})();