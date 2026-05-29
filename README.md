<div align="center">

# NetCheck

[![Demo](https://img.shields.io/badge/Demo-Live-0070f3?style=for-the-badge&logo=githubpages&logoColor=white)](https://kunking777.github.io/NetCheck/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Pure Static](https://img.shields.io/badge/Pure%20Static-HTML%2FCSS%2FJS-64748b?style=for-the-badge&logo=html5&logoColor=white)]()

**网络诊断工具 · Network Diagnostics Tool**

纯静态实现，无需后端，打开即用。
Pure static — no backend, no build tools, just open and use.

[中文](#中文) | [English](#english)

</div>

---

<a id="中文"></a>

## 中文

### 功能

| 功能 | 说明 |
|------|------|
| **IP 检测** | IP 地址、地理位置、运营商、ASN、时区、IPv6 |
| **网络环境** | 连接类型、下行速度、RTT、省流量模式 |
| **延迟测试** | Ping 16 个国内外服务，带进度条和延迟分布图 |
| **连通性检测** | 一键检测 Google、ChatGPT、Claude 等服务是否可达 |
| **DNS 解析** | 通过 DoH 解析 10 个域名（DNSPod / 阿里 DNS / Google，自动故障转移），测量解析速度 |
| **WebRTC 泄露** | 检测真实 IP 是否通过 WebRTC 协议泄露 |
| **DNS 泄露** | 通过 Cloudflare Trace 检测 DNS 是否暴露 |
| **浏览器指纹** | Canvas、WebGL、Audio、UA 等多维指纹分析 |
| **中英切换** | 一键切换中文/英文界面，记忆用户偏好 |

### 测试的服务

| 国际服务 | 国内服务 |
|----------|----------|
| Google   | 百度     |
| ChatGPT  | 哔哩哔哩 |
| OpenAI   | 知乎     |
| Claude   | 微博     |
| GitHub   | 抖音     |
| YouTube  | 腾讯     |
| Twitter  |          |
| Wikipedia|          |
| Cloudflare|         |
| DeepSeek |          |

### 技术栈

- **前端** — 纯 HTML / CSS / JavaScript，无框架、无构建工具
- **设计** — Vercel Design System（Geist 字体、shadow-as-border）
- **API** — ipapi.co、ipinfo.io、ip-api.com、doh.pub、dns.alidns.com、dns.google、Cloudflare Trace
- **浏览器 API** — fetch、Network Information API、RTCPeerConnection、Canvas/WebGL/Audio

### 使用方法

```bash
git clone https://github.com/KUNKing777/NetCheck.git
cd NetCheck
open index.html
```

---

<a id="english"></a>

## English

### Features

| Feature | Description |
|---------|-------------|
| **IP Detection** | IP address, location, ISP, ASN, timezone, IPv6 |
| **Network Environment** | Connection type, downlink speed, RTT, data saver |
| **Latency Test** | Ping 16 services with progress bar and distribution |
| **Connectivity** | One-click check if Google, ChatGPT, Claude are reachable |
| **DNS Resolution** | Resolve 10 domains via DoH (DNSPod / AliDNS / Google, auto failover), measure speed |
| **WebRTC Leak** | Detect real IP leaking via WebRTC protocol |
| **DNS Leak** | Detect DNS exposure via Cloudflare Trace |
| **Fingerprint** | Canvas, WebGL, Audio, UA and more fingerprint analysis |
| **i18n** | One-click Chinese/English toggle, remembers preference |

### Services Tested

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
| DeepSeek      |          |

### Tech Stack

- **Frontend** — Pure HTML / CSS / JavaScript, no frameworks, no build tools
- **Design** — Vercel Design System (Geist font, shadow-as-border)
- **APIs** — ipapi.co, ipinfo.io, ip-api.com, doh.pub, dns.alidns.com, dns.google, Cloudflare Trace
- **Browser APIs** — fetch, Network Information API, RTCPeerConnection, Canvas/WebGL/Audio

### Usage

```bash
git clone https://github.com/KUNKing777/NetCheck.git
cd NetCheck
open index.html
```

---

## License

MIT
