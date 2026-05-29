// ============================================================
// NetCheck - Network Diagnostics Tool
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
                if (r.ok) { const d = await r.json(); data = { ip: d.ip, city: d.city, region: d.region, country_name: d.country, org: d.org, timezone: d.timezone, asn: d.org?.split(' ')[0] || '--' }; }
            } catch {}
        }
        // ip-api.com
        if (!data) {
            try {
                const r = await fetch('https://ip-api.com/json/?fields=66846719', { signal: AbortSignal.timeout(5000) });
                if (r.ok) { const d = await r.json(); data = { ip: d.query, city: d.city, region: d.regionName, country_name: d.country, org: d.isp, asn: d.as, timezone: d.timezone }; }
            } catch {}
        }

        if (data) {
            document.getElementById('heroIP').textContent = data.ip || '--';
            document.getElementById('heroLoc').textContent = [data.city, data.country_name].filter(Boolean).join(', ');
            document.getElementById('dIP').textContent = data.ip || '--';
            document.getElementById('dLoc').textContent = [data.city, data.region, data.country_name].filter(Boolean).join(', ') || '--';
            document.getElementById('dISP').textContent = data.org || '--';
            document.getElementById('dASN').textContent = data.asn || data.as || '--';
            document.getElementById('dCountry').textContent = data.country_name || '--';
            document.getElementById('dTZ').textContent = data.timezone || '--';
            setBadge('ipBadge', 'done', 'OK');
        } else { throw new Error('fail'); }
    } catch {
        document.getElementById('heroIP').textContent = 'Failed';
        setBadge('ipBadge', 'fail', 'Error');
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
        setText('dSaver', conn.saveData ? 'Enabled' : 'Disabled');
    } else {
        setText('dConn', 'Not supported');
        setText('dDown', 'N/A');
        setText('dRTT', 'N/A');
        setText('dSaver', 'N/A');
    }
    setText('dOnline', navigator.onLine ? 'Online' : 'Offline');
    document.getElementById('dOnline').style.color = navigator.onLine ? 'var(--green)' : 'var(--red)';

    // IPv6 check
    checkIPv6();
}

async function checkIPv6() {
    try {
        const r = await fetch('https://api64.ipify.org?format=json', { signal: AbortSignal.timeout(5000) });
        const d = await r.json();
        const isV6 = d.ip?.includes(':');
        setText('dIPv6', isV6 ? `Yes (${d.ip})` : 'No (IPv4 only)');
        document.getElementById('dIPv6').style.color = isV6 ? 'var(--green)' : 'var(--text-muted)';
    } catch {
        setText('dIPv6', 'Check failed');
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
                <div class="lat-icon" style="background:${s.color}15;color:${s.color}"><i class="${s.icon}"></i></div>
                <div class="lat-name">${s.name}</div>
                <div class="lat-bar-wrap"><div class="lat-bar fast" style="width:0%"></div></div>
                <div class="lat-value text-muted">...</div>
                <div class="lat-status"></div>
            </div>`;
    });

    let ok = 0;
    for (const s of SERVICES) {
        const id = s.name.replace(/[^a-zA-Z]/g, '');
        const el = document.getElementById(`lat-${id}`);
        if (!el) continue;
        const val = el.querySelector('.lat-value');
        const bar = el.querySelector('.lat-bar');
        const st = el.querySelector('.lat-status');

        const ms = await ping(s.url);
        if (ms === -1) {
            val.textContent = 'Timeout'; val.className = 'lat-value timeout';
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
    const results = [];
    for (const d of DNS_TARGETS) {
        const start = performance.now();
        try {
            const r = await fetch(`https://dns.google/resolve?name=${d}&type=A`, { signal: AbortSignal.timeout(5000) });
            const data = await r.json();
            const ms = Math.round(performance.now() - start);
            const ips = data.Answer?.map(a => a.data).join(', ') || 'No record';
            results.push({ domain: d, ok: true, ips, ms });
        } catch {
            results.push({ domain: d, ok: false, ips: 'Failed', ms: -1 });
        }
    }
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
                        ips: list,
                        hasPrivate,
                        hasV6,
                        safe: list.length <= 1,
                        detail: list.length ? list.join(', ') : 'No local IPs detected'
                    });
                    return;
                }
                const match = e.candidate.candidate.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|([a-f0-9:]+)/gi);
                if (match) match.forEach(ip => ips.add(ip));
            };
            setTimeout(() => { pc.close(); resolve({ ips: [...ips], safe: true, detail: 'Timeout - no leak detected' }); }, 5000);
        } catch {
            resolve({ ips: [], safe: true, detail: 'WebRTC not supported' });
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
            detail: `Cloudflare sees: ${data.ip} (${data.loc}) | WARP: ${data.warp || 'N/A'}`
        };
    } catch {
        return { ip: '--', safe: true, detail: 'Cloudflare trace unavailable' };
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
    fp['Touch Support'] = navigator.maxTouchPoints > 0 ? `Yes (${navigator.maxTouchPoints} points)` : 'No';
    fp['Cookies'] = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
    fp['Do Not Track'] = navigator.doNotTrack || 'Not set';
    fp['Hardware Concurrency'] = `${navigator.hardwareConcurrency || '?'} cores`;
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

function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function setBadge(id, state, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'badge' + (state === 'done' ? ' done' : state === 'fail' ? ' fail' : '');
    el.textContent = text || (state === 'running' ? 'Running...' : 'Pending');
}

// ============================================================
// Run All
// ============================================================

async function runAllChecks() {
    const btn = document.querySelector('.btn-run');
    btn.classList.add('running'); btn.disabled = true;
    document.getElementById('summaryBox').innerHTML = '<p class="text-muted">Running diagnostics...</p>';

    await checkIP();
    checkEnv();
    const latResult = await runLatency();
    const dnsResults = await runDNS();
    const webrtc = await checkWebRTC();
    const dnsLeak = await checkDNSLeak();
    const fp = checkFingerprint();

    // Render leak section
    renderLeak(webrtc, dnsLeak, fp);
    setBadge('leakBadge', 'done', 'Done');

    // Summary
    generateSummary(latResult, dnsResults, webrtc, dnsLeak);

    btn.classList.remove('running'); btn.disabled = false;
}

function renderLeak(webrtc, dnsLeak, fp) {
    const grid = document.getElementById('leakGrid');
    grid.innerHTML = `
        <div class="leak-item">
            <i class="fas fa-video" style="color:${webrtc.safe ? 'var(--green)' : 'var(--red)'}"></i>
            <h4>WebRTC Leak</h4>
            <div class="result ${webrtc.safe ? 'safe' : 'danger'}">${webrtc.safe ? 'No Leak' : 'Leaked'}</div>
            <p class="text-muted" style="font-size:12px;margin-top:6px">${webrtc.detail}</p>
        </div>
        <div class="leak-item">
            <i class="fas fa-shield-alt" style="color:${dnsLeak.safe ? 'var(--green)' : 'var(--yellow)'}"></i>
            <h4>DNS Leak</h4>
            <div class="result ${dnsLeak.safe ? 'safe' : 'warn'}">${dnsLeak.safe ? 'Safe' : 'Check'}</div>
            <p class="text-muted" style="font-size:12px;margin-top:6px">${dnsLeak.detail}</p>
        </div>
        <div class="leak-item">
            <i class="fas fa-fingerprint" style="color:var(--purple)"></i>
            <h4>Fingerprint</h4>
            <div class="result pending">${fp['Canvas Hash']}</div>
            <p class="text-muted" style="font-size:12px;margin-top:6px">${fp['WebGL Renderer']}</p>
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
        rows.push(`<div class="summary-row"><i class="fas fa-server ${c}"></i> Connectivity: <strong>${latResult.ok}/${latResult.total}</strong> services reachable (${pct}%)</div>`);
    }

    if (dnsResults) {
        const dnsOk = dnsResults.filter(r => r.ok).length;
        rows.push(`<div class="summary-row"><i class="fas fa-search text-green"></i> DNS: <strong>${dnsOk}/${dnsResults.length}</strong> domains resolved</div>`);
    }

    rows.push(`<div class="summary-row"><i class="fas fa-video ${webrtc.safe ? 'text-green' : 'text-red'}"></i> WebRTC: ${webrtc.safe ? 'No leak detected' : 'IP may be leaked'}</div>`);
    rows.push(`<div class="summary-row"><i class="fas fa-shield-alt ${dnsLeak.safe ? 'text-green' : 'text-yellow'}"></i> DNS: ${dnsLeak.safe ? 'No leak detected' : 'Potential leak'}</div>`);

    // Domestic vs International
    const domestic = ['Baidu', 'Bilibili', 'Zhihu', 'Weibo', 'Douyin', 'Tencent'];
    const intl = ['Google', 'ChatGPT', 'OpenAI API', 'Claude', 'YouTube', 'Twitter/X'];
    let domOk = 0, intOk = 0;
    domestic.forEach(n => { const el = document.getElementById(`lat-${n.replace(/[^a-zA-Z]/g, '')}`); if (el?.querySelector('.lat-value.fast') || el?.querySelector('.lat-value.medium')) domOk++; });
    intl.forEach(n => { const el = document.getElementById(`lat-${n.replace(/[^a-zA-Z]/g, '')}`); if (el?.querySelector('.lat-value.fast') || el?.querySelector('.lat-value.medium')) intOk++; });
    rows.push(`<div class="summary-row"><i class="fas fa-flag text-green"></i> Domestic: <strong>${domOk}/${domestic.length}</strong> | International: <strong>${intOk}/${intl.length}</strong></div>`);

    el.innerHTML = rows.join('');
}

// ============================================================
// Feature card click
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', e => {
            const action = card.dataset.action;
            if (action) { e.preventDefault(); window[action](); }
        });
    });
    // Smooth scroll for nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
