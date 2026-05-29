// ============================================================
// NetCheck - Network Diagnostics Tool
// Pure static, no backend required
// ============================================================

const SERVICES = [
    { name: 'Google',           icon: 'fab fa-google',      color: '#4285f4', url: 'https://www.google.com/favicon.ico' },
    { name: 'Google APIs',      icon: 'fab fa-google',      color: '#34a853', url: 'https://www.googleapis.com/' },
    { name: 'ChatGPT',          icon: 'fas fa-robot',       color: '#10a37f', url: 'https://chatgpt.com/' },
    { name: 'OpenAI API',       icon: 'fas fa-brain',       color: '#412991', url: 'https://api.openai.com/' },
    { name: 'Claude',           icon: 'fas fa-microchip',   color: '#d97706', url: 'https://claude.ai/' },
    { name: 'GitHub',           icon: 'fab fa-github',      color: '#8b5cf6', url: 'https://github.com/favicon.ico' },
    { name: 'YouTube',          icon: 'fab fa-youtube',      color: '#ff0000', url: 'https://www.youtube.com/favicon.ico' },
    { name: 'Twitter / X',      icon: 'fab fa-x-twitter',   color: '#ffffff', url: 'https://x.com/favicon.ico' },
    { name: 'Wikipedia',        icon: 'fab fa-wikipedia-w',  color: '#636466', url: 'https://www.wikipedia.org/' },
    { name: 'Cloudflare',       icon: 'fas fa-cloud',       color: '#f38020', url: 'https://www.cloudflare.com/favicon.ico' },
    { name: 'Baidu',            icon: 'fas fa-search',      color: '#2932e1', url: 'https://www.baidu.com/favicon.ico' },
    { name: 'Bilibili',         icon: 'fas fa-tv',          color: '#fb7299', url: 'https://www.bilibili.com/favicon.ico' },
    { name: 'Zhihu',            icon: 'fas fa-comments',    color: '#0066ff', url: 'https://www.zhihu.com/favicon.ico' },
    { name: 'Weibo',            icon: 'fas fa-fire',        color: '#e6162d', url: 'https://www.weibo.com/favicon.ico' },
    { name: 'Douyin',           icon: 'fas fa-music',       color: '#000000', url: 'https://www.douyin.com/favicon.ico' },
    { name: 'Tencent',          icon: 'fas fa-message',     color: '#12b7f5', url: 'https://www.tencent.com/favicon.ico' },
];

const DNS_TARGETS = [
    'google.com',
    'github.com',
    'chatgpt.com',
    'claude.ai',
    'baidu.com',
    'bilibili.com',
    'cloudflare.com',
    'openai.com',
];

// ============================================================
// IP Detection
// ============================================================

async function checkIP() {
    const statusEl = document.getElementById('ipStatus');
    statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        // Try multiple APIs for reliability
        let data = null;

        try {
            const r = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
            if (r.ok) data = await r.json();
        } catch {}

        if (!data) {
            try {
                const r = await fetch('https://ipinfo.io/json', { signal: AbortSignal.timeout(5000) });
                if (r.ok) {
                    const d = await r.json();
                    data = {
                        ip: d.ip,
                        city: d.city,
                        region: d.region,
                        country_name: d.country,
                        org: d.org,
                        timezone: d.timezone,
                        asn: d.org?.split(' ')[0] || '--',
                    };
                }
            } catch {}
        }

        if (!data) {
            try {
                const r = await fetch('https://ip-api.com/json/?fields=66846719', { signal: AbortSignal.timeout(5000) });
                if (r.ok) {
                    const d = await r.json();
                    data = {
                        ip: d.query,
                        city: d.city,
                        region: d.regionName,
                        country_name: d.country,
                        org: d.isp,
                        asn: d.as,
                        timezone: d.timezone,
                    };
                }
            } catch {}
        }

        if (data) {
            document.getElementById('ipAddress').textContent = data.ip || '--';
            document.getElementById('ipLocation').textContent =
                [data.city, data.region, data.country_name].filter(Boolean).join(', ') || '--';
            document.getElementById('ipISP').textContent = data.org || data.isp || '--';
            document.getElementById('ipASN').textContent = data.asn || data.as || '--';
            document.getElementById('ipCountry').textContent = data.country_name || data.country || '--';
            document.getElementById('ipTimezone').textContent = data.timezone || '--';
            statusEl.innerHTML = '<i class="fas fa-check-circle text-green"></i>';
        } else {
            throw new Error('All IP APIs failed');
        }
    } catch (e) {
        document.getElementById('ipAddress').textContent = 'Detection failed';
        statusEl.innerHTML = '<i class="fas fa-times-circle text-red"></i>';
    }
}

// ============================================================
// Network Environment
// ============================================================

function checkNetworkEnv() {
    const statusEl = document.getElementById('envStatus');
    statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        if (conn) {
            document.getElementById('connType').textContent = conn.type || 'N/A';
            document.getElementById('connEffective').textContent = conn.effectiveType || 'N/A';
            document.getElementById('connDownlink').textContent = conn.downlink ? `${conn.downlink} Mbps` : 'N/A';
            document.getElementById('connRTT').textContent = conn.rtt ? `${conn.rtt} ms` : 'N/A';
            document.getElementById('connDataSaver').textContent = conn.saveData ? 'Enabled' : 'Disabled';
        } else {
            document.getElementById('connType').textContent = 'Not supported';
            document.getElementById('connEffective').textContent = 'N/A';
            document.getElementById('connDownlink').textContent = 'N/A';
            document.getElementById('connRTT').textContent = 'N/A';
            document.getElementById('connDataSaver').textContent = 'N/A';
        }

        document.getElementById('connOnline').textContent = navigator.onLine ? 'Online' : 'Offline';
        document.getElementById('connOnline').style.color = navigator.onLine ? 'var(--green)' : 'var(--red)';

        statusEl.innerHTML = '<i class="fas fa-check-circle text-green"></i>';
    } catch {
        statusEl.innerHTML = '<i class="fas fa-times-circle text-red"></i>';
    }
}

// ============================================================
// Latency Test
// ============================================================

async function measureLatency(url, timeout = 8000) {
    const start = performance.now();
    try {
        await fetch(url, {
            mode: 'no-cors',
            cache: 'no-store',
            signal: AbortSignal.timeout(timeout),
        });
        return Math.round(performance.now() - start);
    } catch {
        return -1; // timeout or error
    }
}

async function runLatencyTest() {
    const statusEl = document.getElementById('latencyStatus');
    const listEl = document.getElementById('latencyList');
    statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    listEl.innerHTML = '';

    // Build UI first
    SERVICES.forEach(s => {
        const level = 'fast';
        listEl.innerHTML += `
            <div class="latency-item" id="lat-${s.name.replace(/[^a-zA-Z]/g, '')}">
                <div class="latency-icon" style="background: ${s.color}22; color: ${s.color}">
                    <i class="${s.icon}"></i>
                </div>
                <div class="latency-info">
                    <div class="latency-name">${s.name}</div>
                    <div class="latency-url">${s.url}</div>
                </div>
                <div class="latency-bar-wrap">
                    <div class="latency-bar">
                        <div class="latency-bar-fill fast" style="width: 0%"></div>
                    </div>
                </div>
                <div class="latency-value text-muted">...</div>
            </div>
        `;
    });

    // Run tests sequentially to avoid network congestion
    for (const s of SERVICES) {
        const id = `lat-${s.name.replace(/[^a-zA-Z]/g, '')}`;
        const el = document.getElementById(id);
        if (!el) continue;

        const valueEl = el.querySelector('.latency-value');
        const barFill = el.querySelector('.latency-bar-fill');

        const latency = await measureLatency(s.url);

        if (latency === -1) {
            valueEl.textContent = 'Timeout';
            valueEl.className = 'latency-value timeout';
            barFill.style.width = '100%';
            barFill.className = 'latency-bar-fill timeout';
        } else {
            valueEl.textContent = `${latency} ms`;
            const percent = Math.min(100, (latency / 3000) * 100);
            barFill.style.width = `${percent}%`;

            if (latency < 300) {
                valueEl.className = 'latency-value fast';
                barFill.className = 'latency-bar-fill fast';
            } else if (latency < 1000) {
                valueEl.className = 'latency-value medium';
                barFill.className = 'latency-bar-fill medium';
            } else {
                valueEl.className = 'latency-value slow';
                barFill.className = 'latency-bar-fill slow';
            }
        }
    }

    statusEl.innerHTML = '<i class="fas fa-check-circle text-green"></i>';
}

// ============================================================
// Connectivity Test
// ============================================================

async function testConnectivity(url, timeout = 6000) {
    const start = performance.now();
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        await fetch(url, {
            mode: 'no-cors',
            cache: 'no-store',
            signal: controller.signal,
        });
        clearTimeout(timer);
        return { ok: true, time: Math.round(performance.now() - start) };
    } catch {
        return { ok: false, time: -1 };
    }
}

async function runConnectivityTest() {
    const statusEl = document.getElementById('connectStatus');
    const gridEl = document.getElementById('connectGrid');
    statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    gridEl.innerHTML = '';

    // Build UI
    SERVICES.forEach(s => {
        gridEl.innerHTML += `
            <div class="connect-item" id="conn-${s.name.replace(/[^a-zA-Z]/g, '')}">
                <div class="connect-dot"></div>
                <div class="connect-info">
                    <div class="connect-name">${s.name}</div>
                    <div class="connect-url">${new URL(s.url).hostname}</div>
                </div>
                <span class="connect-badge">Testing...</span>
            </div>
        `;
    });

    // Test all in parallel
    const results = await Promise.allSettled(
        SERVICES.map(async s => {
            const r = await testConnectivity(s.url);
            return { ...s, ...r };
        })
    );

    let successCount = 0;
    let failCount = 0;

    results.forEach((result, i) => {
        const s = SERVICES[i];
        const id = `conn-${s.name.replace(/[^a-zA-Z]/g, '')}`;
        const el = document.getElementById(id);
        if (!el) return;

        const dot = el.querySelector('.connect-dot');
        const badge = el.querySelector('.connect-badge');

        if (result.status === 'fulfilled' && result.value.ok) {
            el.classList.add('success');
            dot.classList.add('success');
            badge.textContent = `${result.value.time} ms`;
            badge.classList.add('success');
            successCount++;
        } else {
            el.classList.add('fail');
            dot.classList.add('fail');
            badge.textContent = 'Blocked';
            badge.classList.add('fail');
            failCount++;
        }
    });

    statusEl.innerHTML = '<i class="fas fa-check-circle text-green"></i>';
    return { successCount, failCount, total: SERVICES.length };
}

// ============================================================
// DNS Resolution Test
// ============================================================

async function testDNS(domain, timeout = 5000) {
    const start = performance.now();
    try {
        const r = await fetch(`https://dns.google/resolve?name=${domain}&type=A`, {
            signal: AbortSignal.timeout(timeout),
        });
        const data = await r.json();
        const time = Math.round(performance.now() - start);
        const ips = data.Answer?.map(a => a.data).join(', ') || 'No record';
        return { ok: true, ips, time };
    } catch {
        return { ok: false, ips: 'Resolution failed', time: -1 };
    }
}

async function runDNSTest() {
    const statusEl = document.getElementById('dnsStatus');
    const listEl = document.getElementById('dnsList');
    statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    listEl.innerHTML = '';

    // Build UI
    DNS_TARGETS.forEach(d => {
        listEl.innerHTML += `
            <div class="dns-item" id="dns-${d.replace(/\./g, '-')}">
                <div class="dns-domain">${d}</div>
                <div class="dns-result text-muted">Resolving...</div>
                <div class="dns-time text-muted">...</div>
            </div>
        `;
    });

    // Test all
    const results = await Promise.allSettled(
        DNS_TARGETS.map(async d => {
            const r = await testDNS(d);
            return { domain: d, ...r };
        })
    );

    results.forEach((result, i) => {
        const d = DNS_TARGETS[i];
        const id = `dns-${d.replace(/\./g, '-')}`;
        const el = document.getElementById(id);
        if (!el) return;

        const resultEl = el.querySelector('.dns-result');
        const timeEl = el.querySelector('.dns-time');

        if (result.status === 'fulfilled' && result.value.ok) {
            resultEl.textContent = result.value.ips;
            resultEl.style.color = 'var(--text)';
            timeEl.textContent = `${result.value.time} ms`;
            timeEl.style.color = result.value.time < 200 ? 'var(--green)' : 'var(--yellow)';
        } else {
            resultEl.textContent = 'Resolution failed';
            resultEl.style.color = 'var(--red)';
            timeEl.textContent = '--';
            timeEl.style.color = 'var(--red)';
        }
    });

    statusEl.innerHTML = '<i class="fas fa-check-circle text-green"></i>';
}

// ============================================================
// Summary
// ============================================================

function generateSummary(ipData, envData, connectResult) {
    const el = document.getElementById('summaryContent');
    const rows = [];

    // IP
    const ip = document.getElementById('ipAddress').textContent;
    const location = document.getElementById('ipLocation').textContent;
    const isp = document.getElementById('ipISP').textContent;
    rows.push(`<div class="summary-row"><i class="fas fa-globe text-green"></i> IP: <strong>${ip}</strong> (${location}) - ${isp}</div>`);

    // Connectivity
    if (connectResult) {
        const pct = Math.round((connectResult.successCount / connectResult.total) * 100);
        const color = pct >= 70 ? 'text-green' : pct >= 40 ? 'text-yellow' : 'text-red';
        rows.push(`<div class="summary-row"><i class="fas fa-server ${color}"></i> Connectivity: <strong>${connectResult.successCount}/${connectResult.total}</strong> services reachable (${pct}%)</div>`);
    }

    // Google
    const googleItem = document.querySelector('#conn-googlecom');
    if (googleItem) {
        const ok = googleItem.classList.contains('success');
        rows.push(`<div class="summary-row"><i class="fab fa-google ${ok ? 'text-green' : 'text-red'}"></i> Google: ${ok ? 'Accessible' : 'Blocked'}</div>`);
    }

    // ChatGPT
    const chatgptItem = document.querySelector('#conn-chatgptcom');
    if (chatgptItem) {
        const ok = chatgptItem.classList.contains('success');
        rows.push(`<div class="summary-row"><i class="fas fa-robot ${ok ? 'text-green' : 'text-red'}"></i> ChatGPT: ${ok ? 'Accessible' : 'Blocked'}</div>`);
    }

    // GitHub
    const githubItem = document.querySelector('#conn-github');
    if (githubItem) {
        const ok = githubItem.classList.contains('success');
        rows.push(`<div class="summary-row"><i class="fab fa-github ${ok ? 'text-green' : 'text-red'}"></i> GitHub: ${ok ? 'Accessible' : 'Blocked'}</div>`);
    }

    // Domestic services
    const domesticServices = ['Baidu', 'Bilibili', 'Zhihu', 'Weibo'];
    let domesticOk = 0;
    domesticServices.forEach(name => {
        const el = document.getElementById(`conn-${name.replace(/[^a-zA-Z]/g, '')}`);
        if (el && el.classList.contains('success')) domesticOk++;
    });
    rows.push(`<div class="summary-row"><i class="fas fa-flag text-green"></i> Domestic services: <strong>${domesticOk}/${domesticServices.length}</strong> reachable</div>`);

    // Network type
    const connType = document.getElementById('connEffective').textContent;
    if (connType && connType !== 'N/A') {
        rows.push(`<div class="summary-row"><i class="fas fa-wifi text-green"></i> Network: ${connType}</div>`);
    }

    el.innerHTML = rows.join('');
}

// ============================================================
// Run All Checks
// ============================================================

async function runAllChecks() {
    const btn = document.querySelector('.btn-refresh');
    btn.classList.add('running');
    btn.disabled = true;

    // Reset summary
    document.getElementById('summaryContent').innerHTML = '<p class="text-muted">Running diagnostics...</p>';

    // Run sequentially
    await checkIP();
    checkNetworkEnv();
    await runLatencyTest();
    const connectResult = await runConnectivityTest();
    await runDNSTest();
    generateSummary(null, null, connectResult);

    btn.classList.remove('running');
    btn.disabled = false;
}

// Auto-run on load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(runAllChecks, 500);
});
