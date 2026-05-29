<div align="center">

# NetCheck

**网络诊断工具 · Network Diagnostics Tool**

[![Demo](https://img.shields.io/badge/Demo-Live-0070f3?style=for-the-badge&logo=githubpages&logoColor=white)](https://kunking777.github.io/NetCheck/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Pure Static](https://img.shields.io/badge/Pure%20Static-HTML%2FCSS%2FJS-64748b?style=for-the-badge&logo=html5&logoColor=white)]()

纯静态实现，无需后端，打开即用。
Pure static — no backend, no build tools, just open and use.

</div>

---

## Features

| 功能 | 说明 |
|------|------|
| **IP 检测** | IP 地址、地理位置、运营商、ASN、时区、IPv6 |
| **网络环境** | 连接类型、下行速度、RTT、省流量模式 |
| **延迟测试** | Ping 16 个国内外服务，带进度条和延迟分布图 |
| **连通性检测** | 一键检测 Google、ChatGPT、Claude 等服务是否可达 |
| **DNS 解析** | 通过 Google DNS API 解析 10 个域名，测量解析速度 |
| **WebRTC 泄露** | 检测真实 IP 是否通过 WebRTC 协议泄露 |
| **DNS 泄露** | 通过 Cloudflare Trace 检测 DNS 是否暴露 |
| **浏览器指纹** | Canvas、WebGL、Audio、UA 等多维指纹分析 |
| **中英切换** | 一键切换中文/英文界面，记忆用户偏好 |

## Services Tested

```
International                          Domestic
─────────────────────────────────────  ──────────────────
Google                                 Baidu
ChatGPT                                Bilibili
OpenAI API                             Zhihu
Claude                                 Weibo
GitHub                                 Douyin
YouTube                                Tencent
Twitter / X
Wikipedia
Cloudflare
DeepSeek
```

## Tech Stack

- **Frontend** — Pure HTML / CSS / JavaScript
- **Design** — Vercel Design System (Geist font, shadow-as-border)
- **APIs** — ipapi.co, ipinfo.io, dns.google, Cloudflare Trace
- **Browser APIs** — fetch, Network Information API, RTCPeerConnection, Canvas/WebGL/Audio

## Project Structure

```
NetCheck/
├── index.html      # Page structure
├── style.css       # Vercel-inspired styles
├── app.js          # All logic (IP, latency, DNS, leak, fingerprint, i18n)
└── README.md
```

## Usage

```bash
# Clone
git clone https://github.com/KUNKing777/NetCheck.git
cd NetCheck

# Open directly
open index.html

# Or use any static server
npx serve .
python3 -m http.server 8080
```

## License

MIT
