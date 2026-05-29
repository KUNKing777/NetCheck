# NetCheck

Network diagnostics tool — pure static, no backend required.

## Features

- **IP Detection** — IP address, location, ISP, ASN, timezone
- **Network Environment** — connection type, downlink speed, RTT, data saver
- **Latency Test** — ping 16 services (Google, ChatGPT, Claude, GitHub, etc.)
- **Connectivity Test** — check which services are accessible
- **DNS Resolution** — resolve domains via Google DNS API
- **Summary** — overall network health report

## Services Tested

| International | Domestic |
|---------------|----------|
| Google        | Baidu    |
| ChatGPT       | Bilibili |
| OpenAI API    | Zhihu    |
| Claude        | Weibo    |
| GitHub        | Douyin   |
| YouTube       | Tencent  |
| Twitter / X   |          |
| Wikipedia     |          |
| Cloudflare    |          |

## Tech Stack

- Pure HTML / CSS / JavaScript
- No frameworks, no build tools, no backend
- Public APIs: ipapi.co, ipinfo.io, dns.google
- Browser APIs: fetch, Network Information API

## Usage

Just open `index.html` in a browser, or visit the GitHub Pages demo.

## License

MIT
