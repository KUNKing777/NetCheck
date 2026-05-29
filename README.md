# NetCheck

网络诊断工具 —— 纯静态，无需后端。  
Network diagnostics tool — pure static, no backend required.

---

## 功能 / Features

- **IP 检测 / IP Detection** — IP 地址、地理位置、运营商、ASN、时区  
  IP address, location, ISP, ASN, timezone
- **网络环境 / Network Environment** — 连接类型、下行速度、RTT、省流量模式  
  connection type, downlink speed, RTT, data saver
- **延迟测试 / Latency Test** — Ping 16 个服务（Google、ChatGPT、Claude、GitHub 等）  
  ping 16 services (Google, ChatGPT, Claude, GitHub, etc.)
- **连通性测试 / Connectivity Test** — 检查各服务是否可访问  
  check which services are accessible
- **DNS 解析 / DNS Resolution** — 通过 Google DNS API 解析域名  
  resolve domains via Google DNS API
- **总览报告 / Summary** — 整体网络健康报告  
  overall network health report

---

## 测试的服务 / Services Tested

| 国际服务 / International | 国内服务 / Domestic |
|--------------------------|---------------------|
| Google                   | 百度 / Baidu        |
| ChatGPT                  | 哔哩哔哩 / Bilibili |
| OpenAI API               | 知乎 / Zhihu        |
| Claude                   | 微博 / Weibo        |
| GitHub                   | 抖音 / Douyin       |
| YouTube                  | 腾讯 / Tencent      |
| Twitter / X              |                     |
| Wikipedia                |                     |
| Cloudflare               |                     |

---

## 技术栈 / Tech Stack

- 纯 HTML / CSS / JavaScript，无框架、无构建工具、无后端  
  Pure HTML / CSS / JavaScript — no frameworks, no build tools, no backend
- 公开 API：ipapi.co、ipinfo.io、dns.google  
  Public APIs: ipapi.co, ipinfo.io, dns.google
- 浏览器 API：fetch、Network Information API  
  Browser APIs: fetch, Network Information API

---

## 使用方法 / Usage

在浏览器中直接打开 `index.html`，或访问 GitHub Pages 在线演示。  
Just open `index.html` in a browser, or visit the GitHub Pages demo.

---

## 许可证 / License

MIT
