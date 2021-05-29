console.log('index.js Loaded');
function RSSReader(event){
    event.preventDefault();
    console.log("In RSS Reader");
    var websiteUrl = "https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/";
    fetch('http://127.0.0.1:3000/functions/RssReader',{
        method:'POST',    
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify({url:websiteUrl})
    })
    .then(res =>{return res.json()})
    .then(data=>{console.log(data);})
}
var examples = [
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
function KnowledgeCenter(event){
    event.preventDefault();
    console.log("In Knowledge Center ");
    fetch('http://127.0.0.1:3000/functions/MetaData',{
        method:'POST',    
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify({urls:examples})
    })
    .then(res =>{return res.json()})
    .then(data=>{console.log(data.array);})
}