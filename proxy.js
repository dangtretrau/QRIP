const https = require('https');
const fs = require('fs');
const http = require('http');

const PROXY_SOURCES = [
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
    'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt',
    'https://raw.githubusercontent.com/Anonym0usWork13/Universal-Proxy-List/main/http.txt',
    'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
    'https://raw.githubusercontent.com/proxiesmaster/Proxy-List/main/http.txt',
    'https://raw.githubusercontent.com/roosterkid/open-proxy-list/main/HTTPS_RAW.txt',
    'https://raw.githubusercontent.com/ErcanDedeoglu/proxies/main/proxies/http.txt',
    'https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.txt',
    'https://raw.githubusercontent.com/officialputuid/Kumpulan-Proxy/main/http.txt',
    'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/hookzof/socks5_list/master/http.txt',
    'https://raw.githubusercontent.com/saisuiu/singleton_tools_project/main/proxy/http.txt',
    'https://raw.githubusercontent.com/sunny9577/proxy-list/master/proxies.txt',
    'https://raw.githubusercontent.com/MuhammetCandir/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/proxy4noobs/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/http.txt',
    'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
    'https://raw.githubusercontent.com/BraveS0ft/public-proxy/main/http.txt',
    'https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list', 
    'https://raw.githubusercontent.com/chips-ce/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/a2u/free-proxy-list/master/http.txt',
    'https://raw.githubusercontent.com/zev-x/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
    'https://proxylist.icu/proxy/1',
    'https://api.openproxylist.xyz/http.txt',
    'https://www.proxy-list.download/api/v1/get?type=http',
    'http://proxydb.net/?offset=0', 
    'http://proxydb.net/?offset=100', 
    'http://proxydb.net/?offset=200', 
    'http://spys.me/proxy.txt',
    'https://www.free-proxy-list.net/', 
    'https://free-proxy-list.net/anonymous-proxy.html',
    'https://free-proxy-list.net/uk-proxy.html',
    'https://free-proxy-list.net/us-proxy.html',
    'https://sslproxies.org/',
    'https://www.proxynova.com/proxy-server-list/', 
    'https://www.proxynova.com/proxy-server-list/country-vn/', 
    'https://www.proxynova.com/proxy-server-list/country-us/', 
    'https://www.proxynova.com/proxy-server-list/country-cn/', 
    'https://checkerproxy.net/api/archive/2025-11-17', 
    'https://checkerproxy.net/api/archive/2025-11-16', 
    'http://www.gatherproxy.com/http/all' 
];

const OUTPUT_FILE = 'proxies.txt';

function fetchUrl(url) {
    const client = url.startsWith('https') ? https : http; 

    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(`Failed to fetch ${url}. Status Code: ${res.statusCode}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function runCollector() {
    console.log(`Bắt đầu thu thập proxy từ ${PROXY_SOURCES.length} nguồn...`);
    
    const uniqueProxies = new Set();
    const fetchPromises = PROXY_SOURCES.map(source => fetchUrl(source));
    const ipPortRegex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+)/g;

    try {
        const results = await Promise.allSettled(fetchPromises);

        for (const result of results) {
            if (result.status === 'fulfilled') {
                const content = result.value;
                let match;
                while ((match = ipPortRegex.exec(content)) !== null) {
                    uniqueProxies.add(match[1]);
                }
            } else {
                console.error(`Lỗi khi lấy dữ liệu từ một nguồn: ${result.reason.message.substring(0, 100)}...`);
            }
        }

        const outputData = [...uniqueProxies].join('\n');
        
        fs.writeFileSync(OUTPUT_FILE, outputData);

        console.log('--- Hoàn thành ---');
        console.log(`Đã tổng hợp và lọc được **${uniqueProxies.size}** proxy duy nhất.`);
        console.log(`Dữ liệu đã được lưu vào file: **${OUTPUT_FILE}**`);

    } catch (error) {
        console.error('Lỗi trong quá trình chạy:', error.message);
    }
}

runCollector();