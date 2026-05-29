// ============================================================
// NetCheck - Network Diagnostics Tool
// Vercel Design System Edition
// ============================================================

const SERVICES = [
    { name: 'Google',       icon: 'fab fa-google',      color: '#4285f4', url: 'https://www.google.com/favicon.ico' },
    { name: 'ChatGPT',      icon: 'fas fa-robot',       color: '#10a37f', url: 'https://chatgpt.com/' },
    { name: 'OpenAI API',   icon: 'fas fa-brain',       color: '#412991', url: 'https://api.openai.com/' },
    { name: 'Claude',       icon: 'fas fa-microchip',   color: '#d97706', url: 'https://claude.ai/' },
    { name: 'GitHub',       icon: 'fab fa-github',      color: '#6e40c9', url: 'https://github.com/favicon.ico' },
    { name: 'YouTube',      icon: 'fab fa-youtube',     color: '#ff0000', url: 'https://www.youtube.com/favicon.ico' },
    { name: 'Twitter/X',    icon: 'fab fa-x-twitter',   color: '#000',    url: 'https://x.com/favicon.ico' },
    { name: 'Wikipedia',    icon: 'fab fa-wikipedia-w', color: '#636466', url: 'https://www.wikipedia.org/' },
    { name: 'Cloudflare',   icon: 'fas fa-cloud',       color: '#f38020', url: 'https://www.cloudflare.com/favicon.ico' },
    { name: 'Baidu',        icon: 'fas fa-search',      color: '#2932e1', url: 'https://www.baidu.com/favicon.ico' },
    { name: 'Bilibili',     icon: 'fas fa-tv',          color: '#fb7299', url: 'https://www.bilibili.com/favicon.ico' },
    { name: 'Zhihu',        icon: 'fas fa-comments',    color: '#0066ff', url: 'https://www.zhihu.com/favicon.ico' },
    { name: 'Weibo',        icon: 'fas fa-fire',        color: '#e6162d', url: 'https://www.weibo.com/favicon.ico' },
    { name: 'Douyin',       icon: 'fas fa-music',       color: '#000',    url: 'https://www.douyin.com/favicon.ico' },
    { name: 'Tencent',      icon: 'fas fa-message',     color: '#12b7f5', url: 'https://www.tencent.com/favicon.ico' },
    { name: 'DeepSeek',     icon: 'fas fa-dragon',      color: '#4d6bfe', url: 'https://www.deepseek.com/favicon.ico' },
];

const DNS_TARGETS = [
    'google.com', 'github.com', 'chatgpt.com', 'claude.ai',
    'openai.com', 'baidu.com', 'bilibili.com', 'cloudflare.com',
    'deepseek.com', 'wikipedia.org',
];

// ============================================================
// i18n - Language Support
// ============================================================

let currentLang = localStorage.getItem('netcheck_lang') || 'zh';

const i18n = {
    zh: {
        nav_ip: 'IP 信息', nav_latency: '延迟测试', nav_dns: 'DNS 解析', nav_security: '安全检测',
        hero_badge: '一站式网络诊断工具', hero_title: '检查你的网络环境',
        hero_desc: '一键检测 IP 地址、网络延迟、DNS 解析、WebRTC 泄露、浏览器指纹等全方位网络信息',
        hero_ip_label: 'Your IP Address',
        feat_ip: 'IP 信息', feat_ip_desc: 'IP 地址、地理位置、ISP、ASN、时区',
        feat_env: '网络环境', feat_env_desc: '连接类型、下行速度、RTT、省流模式',
        feat_latency: '延迟测试', feat_latency_desc: 'Ping 16 个服务：Google、ChatGPT、GitHub 等',
        feat_conn: '连通性', feat_conn_desc: '检测全球服务的可访问性',
        feat_dns: 'DNS 解析', feat_dns_desc: '通过 Google DNS 解析域名，测量速度',
        feat_webrtc: 'WebRTC 泄露', feat_webrtc_desc: '检测 WebRTC 协议导致的真实 IP 泄露',
        feat_dnsleak: 'DNS 泄露', feat_dnsleak_desc: '检查 DNS 查询是否在 VPN 外暴露',
        feat_fp: '浏览器指纹', feat_fp_desc: '浏览器与设备指纹分析',
        btn_run: '开始检测',
        sec_ip: 'IP & 网络信息', sec_latency: '延迟 & 连通性', sec_dns: 'DNS 解析',
        sec_leak: '安全 & 泄露检测', sec_summary: '检测摘要',
        label_ip: 'IP 地址', label_loc: '位置', label_isp: 'ISP', label_asn: 'ASN',
        label_country: '国家', label_tz: '时区', label_conn: '连接类型',
        label_down: '下行速度', label_rtt: 'RTT', label_ipv6: 'IPv6',
        label_saver: '省流模式', label_online: '在线状态',
        badge_pending: '等待中', badge_running: '检测中...', badge_done: '完成', badge_error: '错误',
        empty_hint: '点击"开始检测"或上方卡片开始测试',
        leak_webrtc: 'WebRTC 泄露', leak_dns: 'DNS 泄露', leak_fp: '浏览器指纹',
        leak_waiting: '等待检测', leak_safe: '安全', leak_warn: '注意', leak_danger: '泄露',
        summary_empty: '点击"开始检测"运行全面网络诊断',
        footer: 'NetCheck — 纯静态网络诊断工具 · 数据不会上传至任何服务器',
    },
    en: {
        nav_ip: 'IP Info', nav_latency: 'Latency', nav_dns: 'DNS', nav_security: 'Security',
        hero_badge: 'All-in-one Network Diagnostics', hero_title: 'Check Your Network',
        hero_desc: 'One-click check IP, latency, DNS, WebRTC leak, browser fingerprint and more',
        hero_ip_label: 'Your IP Address',
        feat_ip: 'IP Info', feat_ip_desc: 'IP address, location, ISP, ASN, timezone',
        feat_env: 'Network Env', feat_env_desc: 'Connection type, downlink, RTT, data saver',
        feat_latency: 'Latency Test', feat_latency_desc: 'Ping 16 services: Google, ChatGPT, GitHub, etc.',
        feat_conn: 'Connectivity', feat_conn_desc: 'Check accessibility of global services',
        feat_dns: 'DNS Resolution', feat_dns_desc: 'Resolve domains via Google DNS, measure speed',
        feat_webrtc: 'WebRTC Leak', feat_webrtc_desc: 'Detect real IP leaking via WebRTC protocol',
        feat_dnsleak: 'DNS Leak', feat_dnsleak_desc: 'Check if DNS queries are exposed outside VPN',
        feat_fp: 'Fingerprint', feat_fp_desc: 'Browser & device fingerprint analysis',
        btn_run: 'Run Check',
        sec_ip: 'IP & Network Info', sec_latency: 'Latency & Connectivity', sec_dns: 'DNS Resolution',
        sec_leak: 'Security & Leak Tests', sec_summary: 'Summary',
        label_ip: 'IP Address', label_loc: 'Location', label_isp: 'ISP', label_asn: 'ASN',
        label_country: 'Country', label_tz: 'Timezone', label_conn: 'Connection',
        label_down: 'Downlink', label_rtt: 'RTT', label_ipv6: 'IPv6',
        label_saver: 'Data Saver', label_online: 'Online Status',
        badge_pending: 'Pending', badge_running: 'Running...', badge_done: 'Done', badge_error: 'Error',
        empty_hint: 'Click "Run Check" or cards above to start',
        leak_webrtc: 'WebRTC Leak', leak_dns: 'DNS Leak', leak_fp: 'Fingerprint',
        leak_waiting: 'Waiting', leak_safe: 'Safe', leak_warn: 'Warning', leak_danger: 'Leaked',
        summary_empty: 'Click "Run Check" to start diagnostics',
        footer: 'NetCheck — Pure static network diagnostics tool · No data uploaded to any server',
    }
};

function t(key) {
    return i18n[currentLang][key] || i18n['zh'][key] || key;
}

function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = t(key);
        if (text) el.textContent = text;
    });
    document.getElementById('btnLang').textContent = currentLang === 'zh' ? 'EN' : '中';
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}

function toggleLang() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('netcheck_lang', currentLang);
    applyLang();
}

// Progress tracking
let totalSteps = 0;
let currentStep = 0;

function initProgress(total) {
    totalSteps = total;
    currentStep = 0;
    const bar = document.getElementById('progressBar');
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    bar.style.display = 'flex';
    fill.style.width = '0%';
    text.textContent = '0%';
}

function updateProgress(step) {
    currentStep = step;
    const pct = Math.round((currentStep / totalSteps) * 100);
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    fill.style.width = pct + '%';
    text.textContent = pct + '%';
}

function hideProgress() {
    setTimeout(() => {
        document.getElementById('progressBar').style.display = 'none';
    }, 600);
}

// ============================================================
// IP Detection
// ============================================================

async function checkIP() {
    setBadge('ipBadge', 'running');
    try {
        let data = null;
        // ipapi.co
        try {
            const r = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
            if (r.ok) data = await r.json();
        } catch {}
        // ipinfo.io
        if (!data) {
            try {
                const r = await fetch('https://ipinfo.io/json', { signal: AbortSignal.timeout(5000) });
                if (r.ok) {
                    const d = await r.json();
                    data = {
                        ip: d.ip, city: d.city, region: d.region,
                        country_name: d.country, org: d.org,
                        timezone: d.timezone, asn: d.org?.split(' ')[0] || '--'
                    };
                }
            } catch {}
        }
        // ip-api.com
        if (!data) {
            try {
                const r = await fetch('https://ip-api.com/json/?fields=66846719', { signal: AbortSignal.timeout(5000) });
                if (r.ok) {
                    const d = await r.json();
                    data = {
                        ip: d.query, city: d.city, region: d.regionName,
                        country_name: d.country, org: d.isp,
                        asn: d.as, timezone: d.timezone
                    };
                }
            } catch {}
        }

        if (data) {
            document.getElementById('heroIP').textContent = data.ip || '--';
            document.getElementById('heroIP').classList.remove('skeleton');
            document.getElementById('heroLoc').textContent = [data.city, data.country_name].filter(Boolean).join(', ');
            document.getElementById('heroLoc').classList.remove('skeleton');
            if (data.org) document.getElementById('heroISP').textContent = data.org;
            document.getElementById('dIP').textContent = data.ip || '--';
            document.getElementById('dLoc').textContent = [data.city, data.region, data.country_name].filter(Boolean).join(', ') || '--';
            document.getElementById('dISP').textContent = data.org || '--';
            document.getElementById('dASN').textContent = data.asn || data.as || '--';
            document.getElementById('dCountry').textContent = data.country_name || '--';
            document.getElementById('dTZ').textContent = data.timezone || '--';
            setBadge('ipBadge', 'done', '完成');
        } else { throw new Error('fail'); }
    } catch {
        document.getElementById('heroIP').textContent = '检测失败';
        document.getElementById('heroIP').classList.remove('skeleton');
        setBadge('ipBadge', 'fail', '错误');
    }
}

// ============================================================
// Network Environment
// ============================================================

function checkEnv() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
        setText('dConn', conn.effectiveType || conn.type || 'N/A');
        setText('dDown', conn.downlink ? `${conn.downlink} Mbps` : 'N/A');
        setText('dRTT', conn.rtt ? `${conn.rtt} ms` : 'N/A');
        setText('dSaver', conn.saveData ? '已开启' : '已关闭');
    } else {
        setText('dConn', '不支持');
        setText('dDown', 'N/A');
        setText('dRTT', 'N/A');
        setText('dSaver', 'N/A');
    }
    setText('dOnline', navigator.onLine ? '在线' : '离线');
    document.getElementById('dOnline').style.color = navigator.onLine ? 'var(--green)' : 'var(--red)';
    checkIPv6();
}

async function checkIPv6() {
    try {
        const r = await fetch('https://api64.ipify.org?format=json', { signal: AbortSignal.timeout(5000) });
        const d = await r.json();
        const isV6 = d.ip?.includes(':');
        setText('dIPv6', isV6 ? `是 (${d.ip})` : '否 (仅 IPv4)');
        document.getElementById('dIPv6').style.color = isV6 ? 'var(--green)' : 'var(--text-muted)';
    } catch {
        setText('dIPv6', '检测失败');
    }
}

// ============================================================
// Latency & Connectivity
// ============================================================

async function ping(url, timeout = 8000) {
    const start = performance.now();
    try {
        await fetch(url, { mode: 'no-cors', cache: 'no-store', signal: AbortSignal.timeout(timeout) });
        return Math.round(performance.now() - start);
    } catch { return -1; }
}

async function runLatency() {
    setBadge('latBadge', 'running');
    const table = document.getElementById('latencyTable');
    table.innerHTML = '';

    SERVICES.forEach(s => {
        const id = s.name.replace(/[^a-zA-Z]/g, '');
        table.innerHTML += `
            <div class="lat-row" id="lat-${id}">
                <div class="lat-icon" style="background:${s.color}12;color:${s.color}"><i class="${s.icon}"></i></div>
                <div class="lat-name">${s.name}</div>
                <div class="lat-bar-wrap"><div class="lat-bar fast" style="width:0%"></div></div>
                <div class="lat-value text-muted">...</div>
                <div class="lat-status"></div>
            </div>`;
    });

    let ok = 0;
    for (let i = 0; i < SERVICES.length; i++) {
        const s = SERVICES[i];
        const id = s.name.replace(/[^a-zA-Z]/g, '');
        const el = document.getElementById(`lat-${id}`);
        if (!el) continue;
        const val = el.querySelector('.lat-value');
        const bar = el.querySelector('.lat-bar');
        const st = el.querySelector('.lat-status');

        const ms = await ping(s.url);
        if (ms === -1) {
            val.textContent = '超时'; val.className = 'lat-value timeout';
            bar.style.width = '100%'; bar.className = 'lat-bar timeout';
            st.innerHTML = '<i class="fas fa-times-circle text-red"></i>';
        } else {
            val.textContent = `${ms} ms`;
            const pct = Math.min(100, (ms / 3000) * 100);
            bar.style.width = `${pct}%`;
            if (ms < 300) { val.className = 'lat-value fast'; bar.className = 'lat-bar fast'; }
            else if (ms < 1000) { val.className = 'lat-value medium'; bar.className = 'lat-bar medium'; }
            else { val.className = 'lat-value slow'; bar.className = 'lat-bar slow'; }
            st.innerHTML = '<i class="fas fa-check-circle text-green"></i>';
            ok++;
        }
    }
    setBadge('latBadge', 'done', `${ok}/${SERVICES.length}`);
    return { ok, total: SERVICES.length };
}

// ============================================================
// DNS Resolution
// ============================================================

async function runDNS() {
    setBadge('dnsBadge', 'running');
    const table = document.getElementById('dnsTable');
    table.innerHTML = '';

    DNS_TARGETS.forEach(d => {
        table.innerHTML += `
            <div class="dns-row" id="dns-${d.replace(/\./g, '-')}">
                <div class="dns-domain">${d}</div>
                <div class="dns-ips text-muted">...</div>
                <div class="dns-time text-muted">...</div>
                <div class="dns-status"></div>
            </div>`;
    });

    const results = [];
    for (const d of DNS_TARGETS) {
        const row = document.getElementById(`dns-${d.replace(/\./g, '-')}`);
        const ipsEl = row.querySelector('.dns-ips');
        const timeEl = row.querySelector('.dns-time');
        const stEl = row.querySelector('.dns-status');

        const start = performance.now();
        try {
            const r = await fetch(`https://dns.google/resolve?name=${d}&type=A`, { signal: AbortSignal.timeout(5000) });
            const data = await r.json();
            const ms = Math.round(performance.now() - start);
            const ips = data.Answer?.map(a => a.data).join(', ') || '无记录';
            ipsEl.textContent = ips;
            ipsEl.classList.remove('text-muted');
            timeEl.textContent = `${ms} ms`;
            timeEl.className = ms < 200 ? 'dns-time fast' : ms < 500 ? 'dns-time medium' : 'dns-time slow';
            timeEl.style.color = ms < 200 ? 'var(--green)' : ms < 500 ? 'var(--yellow)' : 'var(--orange)';
            stEl.innerHTML = '<i class="fas fa-check-circle text-green"></i>';
            results.push({ domain: d, ok: true, ips, ms });
        } catch {
            ipsEl.textContent = '解析失败';
            ipsEl.classList.remove('text-muted');
            ipsEl.style.color = 'var(--red)';
            timeEl.textContent = '--';
            stEl.innerHTML = '<i class="fas fa-times-circle text-red"></i>';
            results.push({ domain: d, ok: false, ips: 'Failed', ms: -1 });
        }
    }

    const dnsOk = results.filter(r => r.ok).length;
    setBadge('dnsBadge', 'done', `${dnsOk}/${DNS_TARGETS.length}`);
    return results;
}

// ============================================================
// WebRTC Leak Detection
// ============================================================

async function checkWebRTC() {
    return new Promise(resolve => {
        const ips = new Set();
        try {
            const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            pc.createDataChannel('');
            pc.createOffer().then(offer => pc.setLocalDescription(offer));
            pc.onicecandidate = e => {
                if (!e.candidate) {
                    pc.close();
                    const list = [...ips];
                    const hasPrivate = list.some(ip => /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/.test(ip));
                    const hasV6 = list.some(ip => ip.includes(':'));
                    resolve({
                        ips: list, hasPrivate, hasV6,
                        safe: list.length <= 1,
                        detail: list.length ? list.join(', ') : '未检测到本地 IP'
                    });
                    return;
                }
                const match = e.candidate.candidate.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|([a-f0-9:]+)/gi);
                if (match) match.forEach(ip => ips.add(ip));
            };
            setTimeout(() => { pc.close(); resolve({ ips: [...ips], safe: true, detail: '超时 - 未检测到泄露' }); }, 5000);
        } catch {
            resolve({ ips: [], safe: true, detail: 'WebRTC 不支持' });
        }
    });
}

// ============================================================
// DNS Leak Test
// ============================================================

async function checkDNSLeak() {
    try {
        const r = await fetch('https://www.cloudflare.com/cdn-cgi/trace', { signal: AbortSignal.timeout(5000) });
        const text = await r.text();
        const data = {};
        text.split('\n').forEach(line => {
            const [k, v] = line.split('=');
            if (k && v) data[k.trim()] = v.trim();
        });
        return {
            ip: data.ip || '--',
            location: data.loc || '--',
            warp: data.warp || '--',
            safe: data.warp === 'off' || !data.warp,
            detail: `Cloudflare 识别: ${data.ip} (${data.loc}) | WARP: ${data.warp || 'N/A'}`
        };
    } catch {
        return { ip: '--', safe: true, detail: 'Cloudflare trace 不可用' };
    }
}

// ============================================================
// Browser Fingerprint
// ============================================================

function checkFingerprint() {
    const fp = {};
    fp['User Agent'] = navigator.userAgent;
    fp['Platform'] = navigator.platform || '--';
    fp['Language'] = navigator.language || '--';
    fp['Languages'] = navigator.languages?.join(', ') || '--';
    fp['Screen'] = `${screen.width}x${screen.height} @ ${window.devicePixelRatio}x`;
    fp['Color Depth'] = `${screen.colorDepth}-bit`;
    fp['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone || '--';
    fp['Touch Support'] = navigator.maxTouchPoints > 0 ? `是 (${navigator.maxTouchPoints} 点)` : '否';
    fp['Cookies'] = navigator.cookieEnabled ? '已启用' : '已禁用';
    fp['Do Not Track'] = navigator.doNotTrack || '未设置';
    fp['Hardware Concurrency'] = `${navigator.hardwareConcurrency || '?'} 核`;
    fp['Device Memory'] = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'N/A';
    fp['WebGL Vendor'] = getWebGLInfo().vendor;
    fp['WebGL Renderer'] = getWebGLInfo().renderer;
    fp['Canvas Hash'] = getCanvasHash();
    fp['Audio Context'] = getAudioFingerprint();
    return fp;
}

function getWebGLInfo() {
    try {
        const c = document.createElement('canvas');
        const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
        if (!gl) return { vendor: 'N/A', renderer: 'N/A' };
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        return {
            vendor: ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
            renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
        };
    } catch { return { vendor: 'N/A', renderer: 'N/A' }; }
}

function getCanvasHash() {
    try {
        const c = document.createElement('canvas');
        c.width = 200; c.height = 50;
        const ctx = c.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(0, 0, 200, 50);
        ctx.fillStyle = '#069';
        ctx.fillText('NetCheck fingerprint', 2, 15);
        const data = c.toDataURL();
        let hash = 0;
        for (let i = 0; i < data.length; i++) hash = ((hash << 5) - hash) + data.charCodeAt(i);
        return '0x' + Math.abs(hash).toString(16).slice(0, 8);
    } catch { return 'N/A'; }
}

function getAudioFingerprint() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const analyser = ctx.createAnalyser();
        const gain = ctx.createGain();
        gain.gain.value = 0;
        osc.connect(analyser);
        analyser.connect(gain);
        gain.connect(ctx.destination);
        osc.start(0);
        const data = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(data);
        osc.stop();
        ctx.close();
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += Math.abs(data[i]);
        return '0x' + Math.abs(Math.round(sum)).toString(16).slice(0, 6);
    } catch { return 'N/A'; }
}

// ============================================================
// UI Helpers
// ============================================================

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = text;
        el.classList.remove('skeleton-text');
    }
}

function setBadge(id, state, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'badge' + (state === 'done' ? ' done' : state === 'fail' ? ' fail' : state === 'running' ? ' running' : '');
    if (text) {
        el.textContent = text;
    } else {
        el.textContent = state === 'running' ? t('badge_running') : state === 'done' ? t('badge_done') : state === 'fail' ? t('badge_error') : t('badge_pending');
    }
}

// ============================================================
// Run All
// ============================================================

async function runAllChecks() {
    const btn = document.getElementById('btnRun');
    btn.classList.add('running');
    btn.disabled = true;
    document.getElementById('summaryBox').innerHTML = '<div class="summary-empty"><i class="fas fa-spinner fa-spin"></i><p>正在运行全面诊断...</p></div>';

    // Progress: 7 major steps
    initProgress(7);

    await checkIP();        updateProgress(1);
    checkEnv();             updateProgress(2);
    const latResult = await runLatency();   updateProgress(3);
    const dnsResults = await runDNS();      updateProgress(4);
    const webrtc = await checkWebRTC();     updateProgress(5);
    const dnsLeak = await checkDNSLeak();   updateProgress(6);
    const fp = checkFingerprint();          updateProgress(7);

    renderLeak(webrtc, dnsLeak, fp);
    setBadge('leakBadge', 'done', '完成');
    generateSummary(latResult, dnsResults, webrtc, dnsLeak);

    hideProgress();
    btn.classList.remove('running');
    btn.disabled = false;
}

function renderLeak(webrtc, dnsLeak, fp) {
    const grid = document.getElementById('leakGrid');
    grid.innerHTML = `
        <div class="leak-item">
            <i class="fas fa-video" style="color:${webrtc.safe ? 'var(--green)' : 'var(--red)'}"></i>
            <h4>WebRTC 泄露</h4>
            <div class="result ${webrtc.safe ? 'safe' : 'danger'}">${webrtc.safe ? '无泄露' : '已泄露'}</div>
            <p class="text-muted" style="font-size:12px;margin-top:8px">${webrtc.detail}</p>
        </div>
        <div class="leak-item">
            <i class="fas fa-shield-alt" style="color:${dnsLeak.safe ? 'var(--green)' : 'var(--yellow)'}"></i>
            <h4>DNS 泄露</h4>
            <div class="result ${dnsLeak.safe ? 'safe' : 'warn'}">${dnsLeak.safe ? '安全' : '注意'}</div>
            <p class="text-muted" style="font-size:12px;margin-top:8px">${dnsLeak.detail}</p>
        </div>
        <div class="leak-item">
            <i class="fas fa-fingerprint" style="color:var(--purple)"></i>
            <h4>浏览器指纹</h4>
            <div class="result pending">${fp['Canvas Hash']}</div>
            <p class="text-muted" style="font-size:12px;margin-top:8px">${fp['WebGL Renderer']}</p>
        </div>`;

    const fpTable = document.getElementById('fpTable');
    fpTable.innerHTML = Object.entries(fp).map(([k, v]) =>
        `<div class="fp-row"><div class="fp-label">${k}</div><div class="fp-value">${v}</div></div>`
    ).join('');
}

function generateSummary(latResult, dnsResults, webrtc, dnsLeak) {
    const el = document.getElementById('summaryBox');
    const rows = [];

    const ip = document.getElementById('dIP').textContent;
    const loc = document.getElementById('dLoc').textContent;
    rows.push(`<div class="summary-row"><i class="fas fa-globe text-green"></i> IP: <strong>${ip}</strong> — ${loc}</div>`);

    if (latResult) {
        const pct = Math.round((latResult.ok / latResult.total) * 100);
        const c = pct >= 70 ? 'text-green' : pct >= 40 ? 'text-yellow' : 'text-red';
        rows.push(`<div class="summary-row"><i class="fas fa-server ${c}"></i> 连通性: <strong>${latResult.ok}/${latResult.total}</strong> 个服务可达 (${pct}%)</div>`);
    }

    if (dnsResults) {
        const dnsOk = dnsResults.filter(r => r.ok).length;
        rows.push(`<div class="summary-row"><i class="fas fa-search text-green"></i> DNS: <strong>${dnsOk}/${dnsResults.length}</strong> 个域名解析成功</div>`);
    }

    rows.push(`<div class="summary-row"><i class="fas fa-video ${webrtc.safe ? 'text-green' : 'text-red'}"></i> WebRTC: ${webrtc.safe ? '未检测到泄露' : 'IP 可能已泄露'}</div>`);
    rows.push(`<div class="summary-row"><i class="fas fa-shield-alt ${dnsLeak.safe ? 'text-green' : 'text-yellow'}"></i> DNS: ${dnsLeak.safe ? '未检测到泄露' : '存在潜在泄露'}</div>`);

    // Domestic vs International
    const domestic = ['Baidu', 'Bilibili', 'Zhihu', 'Weibo', 'Douyin', 'Tencent'];
    const intl = ['Google', 'ChatGPT', 'OpenAI API', 'Claude', 'YouTube', 'Twitter/X'];
    let domOk = 0, intOk = 0;
    domestic.forEach(n => {
        const el = document.getElementById(`lat-${n.replace(/[^a-zA-Z]/g, '')}`);
        if (el?.querySelector('.lat-value.fast') || el?.querySelector('.lat-value.medium')) domOk++;
    });
    intl.forEach(n => {
        const el = document.getElementById(`lat-${n.replace(/[^a-zA-Z]/g, '')}`);
        if (el?.querySelector('.lat-value.fast') || el?.querySelector('.lat-value.medium')) intOk++;
    });
    rows.push(`<div class="summary-row"><i class="fas fa-flag text-green"></i> 国内: <strong>${domOk}/${domestic.length}</strong> | 国际: <strong>${intOk}/${intl.length}</strong></div>`);

    el.innerHTML = rows.join('');
}

// ============================================================
// Feature card click & nav
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Feature cards: scroll to section + run action
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', e => {
            const action = card.dataset.action;
            const href = card.getAttribute('href');
            if (action) {
                e.preventDefault();
                // Scroll to section first
                if (href && href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                    }
                }
                // Run action
                window[action]();
            }
        });
    });

    // Smooth scroll for nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Scroll spy for nav
    const sections = ['ip', 'latency', 'dns', 'leak'];
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.nav-link').forEach(l => {
                    l.classList.toggle('active', l.dataset.section === id);
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // Auto-detect IP on load
    checkIP();
    checkEnv();

    // Apply language
    applyLang();
});
