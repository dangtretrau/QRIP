const http = require('http');
const fs = require('fs');

const SOURCES = [
"http://proxyspace.pro/http.txt",
"http://multiproxy.org/txt_all/proxy.txt",
"http://www.proxy-list.download/api/v1/get?type=http",
"http://www.proxyscan.io/download?type=http",
"http://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=20000&country=all",
"http://api.openproxylist.xyz/http.txt",
"http://api.proxynova.com/comb?type=http",
"http://www.freeproxy.world/api/proxies?type=http&limit=20000",
"http://rootjazz.com/proxies/proxies.txt",
"http://spys.me/proxy.txt",
"http://sheesh.rip/http.txt",
"http://proxydb.net/?protocol=http",
"http://pubproxy.com/api/proxy?type=http",
"http://geonode.com/api/proxy-list?limit=5000&type=http",
"http://proxyhub.me/en/all-http-proxy-list",
"http://www.cyber-hub.net/http.txt",
"http://liveproxies.net/http.txt",
"http://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt",
"http://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
"http://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt",
"http://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt",
"http://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt",
"http://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/http.txt",
"http://raw.githubusercontent.com/almroot/proxylist/master/list.txt",
"http://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt",
"http://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTP.txt",
"http://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt",
"http://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt",
"http://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt",
"http://raw.githubusercontent.com/hendrikbgr/Free-Proxy-Repo/master/proxy_list.txt",
"http://raw.githubusercontent.com/zevtyardt/proxy-list/main/http.txt",
"http://raw.githubusercontent.com/Anonym0usWork1221/Proxy-List/main/http.txt",
"http://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt"
];

while (SOURCES.length < 150) SOURCES.push(SOURCES[Math.floor(Math.random()*30)]);

const OUT = "proxies.txt";

function fetch(url) {
    return new Promise((resolve) => {
        const req = http.get(url, { timeout: 7000 }, (res) => {
            let d = "";
            res.on("data", c => d += c);
            res.on("end", () => resolve(res.statusCode === 200 ? d : ""));
        });
        req.on("timeout", () => { req.destroy(); resolve(""); });
        req.on("error", () => resolve(""));
    });
}

async function get(url) {
    let r = await fetch(url);
    if (r) return r;
    return await fetch(url);
}

async function run() {
    const set = new Set();
    const r = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+)/g;

    await Promise.all(
        SOURCES.map(async (src) => {
            let txt = await get(src);
            if (!txt) return;
            let m;
            while ((m = r.exec(txt)) !== null) set.add(m[1]);
        })
    );

    fs.writeFileSync(OUT, [...set].join("\n"));
    console.log("DONE:", set.size, "proxies saved ->", OUT);
}

run();
