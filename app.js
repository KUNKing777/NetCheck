// ============================================================
// NetCheck - Network Diagnostics Tool
// Vercel Design System Edition
// ============================================================

const SERVICES = [
    { name: 'Google',       color: '#4285f4', url: 'https://www.google.com/favicon.ico',        favicon: 'https://www.google.com/favicon.ico' },
    { name: 'ChatGPT',      color: '#10a37f', url: 'https://chatgpt.com/',                       favicon: 'https://chatgpt.com/favicon.ico' },
    { name: 'OpenAI API',   color: '#412991', url: 'https://platform.openai.com/',               favicon: 'https://openai.com/favicon.ico' },
    { name: 'Claude',       color: '#d97706', url: 'https://www.anthropic.com/',                 favicon: 'https://www.anthropic.com/favicon.ico' },
    { name: 'GitHub',       color: '#6e40c9', url: 'https://github.com/favicon.ico',            favicon: 'https://github.com/favicon.ico' },
    { name: 'YouTube',      color: '#ff0000', url: 'https://www.youtube.com/favicon.ico',       favicon: 'https://www.youtube.com/favicon.ico' },
    { name: 'Twitter/X',    color: '#000',    url: 'https://x.com/favicon.ico',                  favicon: 'https://x.com/favicon.ico' },
    { name: 'Wikipedia',    color: '#636466', url: 'https://www.wikipedia.org/',                 favicon: 'https://www.wikipedia.org/favicon.ico' },
    { name: 'Cloudflare',   color: '#f38020', url: 'https://www.cloudflare.com/favicon.ico',    favicon: 'https://www.cloudflare.com/favicon.ico' },
    { name: 'Baidu',        color: '#2932e1', url: 'https://www.baidu.com/favicon.ico',         favicon: 'https://www.baidu.com/favicon.ico' },
    { name: 'Bilibili',     color: '#fb7299', url: 'https://www.bilibili.com/favicon.ico',      favicon: 'https://www.bilibili.com/favicon.ico' },
    { name: 'Zhihu',        color: '#0066ff', url: 'https://www.zhihu.com/favicon.ico',         favicon: 'https://www.zhihu.com/favicon.ico' },
    { name: 'Weibo',        color: '#e6162d', url: 'https://www.weibo.com/favicon.ico',         favicon: 'https://www.weibo.com/favicon.ico' },
    { name: 'Douyin',       color: '#000',    url: 'https://www.douyin.com/favicon.ico',        favicon: 'https://www.douyin.com/favicon.ico' },
    { name: 'Tencent',      color: '#12b7f5', url: 'https://www.tencent.com/favicon.ico',       favicon: 'https://www.tencent.com/favicon.ico' },
    { name: 'DeepSeek',     color: '#4d6bfe', url: 'https://www.deepseek.com/favicon.ico',      favicon: 'https://www.deepseek.com/favicon.ico' },
];

const DNS_TARGETS = [
    'google.com', 'github.com', 'chatgpt.com', 'claude.ai',
    'openai.com', 'baidu.com', 'bilibili.com', 'cloudflare.com',
    'deepseek.com', 'wikipedia.org',
];

// DoH resolvers ordered by best availability in China
const DNS_RESOLVERS = [
    { name: 'DNSPod',   url: 'https://doh.pub/dns-query' },
    { name: 'AliDNS',   url: 'https://dns.alidns.com/dns-query' },
    { name: 'Google',   url: 'https://dns.google/resolve' },
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
        leak_no_leak: '无泄露', leak_leaked: '已泄露',
        leak_safe_result: '安全', leak_warn_result: '注意',
        summary_connectivity: '连通性', summary_reachable: '个服务可达',
        summary_dns_title: 'DNS', summary_resolved: '个域名解析成功',
        summary_webrtc_title: 'WebRTC', summary_webrtc_no_leak: '未检测到泄露',
        summary_webrtc_leaked: 'IP 可能已泄露',
        summary_dns_no_leak: '未检测到泄露', summary_dns_potential: '存在潜在泄露',
        summary_domestic: '国内', summary_international: '国际',
        running_diag: '正在运行全面诊断...',
        ip_detect_fail: '检测失败',
        env_unsupported: '不支持', env_on: '已开启', env_off: '已关闭',
        status_online: '在线', status_offline: '离线',
        ipv6_yes: '是', ipv6_ipv4_only: '否 (仅 IPv4)', ipv6_fail: '检测失败',
        dns_no_record: '无记录', dns_resolve_fail: '解析失败',
        latency_timeout: '超时',
        webrtc_no_local: '未检测到本地 IP', webrtc_timeout: '超时 - 未检测到泄露',
        webrtc_unsupported: 'WebRTC 不支持',
        dnsleak_cf_prefix: 'Cloudflare 识别', dnsleak_cf_unavail: 'Cloudflare trace 不可用',
        fp_enabled: '已启用', fp_disabled: '已禁用', fp_not_set: '未设置',
        fp_cores: ' 核', fp_points: ' 点',
        fp_yes: '是', fp_no: '否',
        fp_user_agent: 'User Agent', fp_platform: '平台', fp_language: '语言',
        fp_languages: '语言列表', fp_screen: '屏幕', fp_color_depth: '色深',
        fp_timezone: '时区', fp_touch: '触控支持', fp_cookies: 'Cookie',
        fp_dnt: '请勿追踪', fp_hw_concurrency: '硬件并发', fp_device_memory: '设备内存',
        fp_webgl_vendor: 'WebGL 厂商', fp_webgl_renderer: 'WebGL 渲染器',
        fp_canvas_hash: 'Canvas 哈希', fp_audio_context: '音频指纹',
        btn_copy: '复制报告', report_title: 'NetCheck 网络诊断报告',
        report_time: '时间', report_section_ip: 'IP 信息', report_section_network: '网络环境',
        report_section_latency: '延迟测试', report_section_summary: '检测摘要',
        speed_testing: '测速中...', speed_fail: '测速失败', speed_mbps: ' Mbps',
        label_speed: '实测速度',
        toast_online: '网络已恢复连接', toast_offline: '网络连接已断开',
        label_property: 'IP 属性', label_webrtc_ip: 'WebRTC 泄露 IP',
        ip_hosting: '机房IP', ip_proxy: '代理/VPN', ip_mobile: '移动网络', ip_residential: '住宅IP',
        toast_ip_change: 'IP 地址已发生变化',
        report_copied: '已复制到剪贴板',
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
        leak_no_leak: 'No Leak', leak_leaked: 'Leaked',
        leak_safe_result: 'Safe', leak_warn_result: 'Warning',
        summary_connectivity: 'Connectivity', summary_reachable: ' services reachable',
        summary_dns_title: 'DNS', summary_resolved: ' domains resolved',
        summary_webrtc_title: 'WebRTC', summary_webrtc_no_leak: 'No leak detected',
        summary_webrtc_leaked: 'IP may be leaked',
        summary_dns_no_leak: 'No leak detected', summary_dns_potential: 'Potential leak',
        summary_domestic: 'Domestic', summary_international: 'International',
        running_diag: 'Running full diagnostics...',
        ip_detect_fail: 'Detection failed',
        env_unsupported: 'Unsupported', env_on: 'On', env_off: 'Off',
        status_online: 'Online', status_offline: 'Offline',
        ipv6_yes: 'Yes', ipv6_ipv4_only: 'No (IPv4 only)', ipv6_fail: 'Detection failed',
        dns_no_record: 'No records', dns_resolve_fail: 'Resolve failed',
        latency_timeout: 'Timeout',
        webrtc_no_local: 'No local IP detected', webrtc_timeout: 'Timeout - no leak detected',
        webrtc_unsupported: 'WebRTC not supported',
        dnsleak_cf_prefix: 'Cloudflare detected', dnsleak_cf_unavail: 'Cloudflare trace unavailable',
        fp_enabled: 'Enabled', fp_disabled: 'Disabled', fp_not_set: 'Not set',
        fp_cores: ' cores', fp_points: ' points',
        fp_yes: 'Yes', fp_no: 'No',
        fp_user_agent: 'User Agent', fp_platform: 'Platform', fp_language: 'Language',
        fp_languages: 'Languages', fp_screen: 'Screen', fp_color_depth: 'Color Depth',
        fp_timezone: 'Timezone', fp_touch: 'Touch Support', fp_cookies: 'Cookies',
        fp_dnt: 'Do Not Track', fp_hw_concurrency: 'Hardware Concurrency',
        fp_device_memory: 'Device Memory', fp_webgl_vendor: 'WebGL Vendor',
        fp_webgl_renderer: 'WebGL Renderer', fp_canvas_hash: 'Canvas Hash',
        fp_audio_context: 'Audio Context',
        btn_copy: 'Copy Report', report_title: 'NetCheck Network Report',
        report_time: 'Time', report_section_ip: 'IP Info', report_section_network: 'Network',
        report_section_latency: 'Latency', report_section_summary: 'Summary',
        speed_testing: 'Testing...', speed_fail: 'Test failed', speed_mbps: ' Mbps',
        label_speed: 'Measured Speed',
        toast_online: 'Network reconnected', toast_offline: 'Network disconnected',
        label_property: 'IP Type', label_webrtc_ip: 'WebRTC Leaked IP',
        ip_hosting: 'Datacenter', ip_proxy: 'Proxy/VPN', ip_mobile: 'Mobile', ip_residential: 'Residential',
        toast_ip_change: 'IP address has changed',
        report_copied: 'Copied to clipboard',
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
    refreshDynamicContent();
}

function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const btn = document.getElementById('btnHamburger');
    nav.classList.toggle('open');
    btn.classList.toggle('active');
}

function initDarkMode() {
    const saved = localStorage.getItem('netcheck_dark');
    if (saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
}

function toggleDark() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('netcheck_dark', document.documentElement.classList.contains('dark'));
}

initDarkMode();

// Close mobile nav when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#mainNav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mainNav').classList.remove('open');
            document.getElementById('btnHamburger').classList.remove('active');
        });
    });
});

// Actual DOMContentLoaded runs after; move below to avoid conflict

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

let ipSources = [];
let ipProxyInfo = {};

async function fetchOneIP(api, url, mapper) {
    try {
        const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
        if (r.ok) return { api, data: mapper(await r.json()), ok: true };
    } catch {}
    return { api, data: null, ok: false };
}

async function checkIP() {
    setBadge('ipBadge', 'running');
    ipSources = [];
    ipProxyInfo = {};

    const results = await Promise.all([
        fetchOneIP('ipapi.co', 'https://ipapi.co/json/', d => ({
            ip: d.ip, city: d.city, region: d.region, country: d.country_name,
            countryCode: d.country_code, org: d.org, timezone: d.timezone,
            asn: d.asn, lat: d.latitude, lon: d.longitude,
        })),
        fetchOneIP('ipinfo.io', 'https://ipinfo.io/json', d => ({
            ip: d.ip, city: d.city, region: d.region, country: d.country,
            countryCode: d.country, org: d.org, timezone: d.timezone,
            asn: d.org?.split(' ')[0] || '', lat: d.loc?.split(',')[0], lon: d.loc?.split(',')[1],
        })),
        fetchOneIP('ip-api.com', 'https://ip-api.com/json/?fields=67043327', d => ({
            ip: d.query, city: d.city, region: d.regionName, country: d.country,
            countryCode: d.countryCode, org: d.isp, timezone: d.timezone,
            asn: d.as, asname: d.asname, lat: d.lat, lon: d.lon,
            proxy: d.proxy, hosting: d.hosting, mobile: d.mobile,
        })),
    ]);

    ipSources = results;

    // Pick best data (prefer ip-api.com for ASN, ipapi.co for geo)
    const best = (ipSources.find(r => r.ok) || {}).data || {};
    const ipapiData = ipSources.find(r => r.api === 'ipapi.co' && r.ok)?.data || {};
    const ipinfoData = ipSources.find(r => r.api === 'ipinfo.io' && r.ok)?.data || {};
    const ipApiData = ipSources.find(r => r.api === 'ip-api.com' && r.ok)?.data || {};

    if (best.ip) {
        const ip = best.ip || ipApiData.ip || ipinfoData.ip || ipapiData.ip || '--';
        const loc = [best.city || ipapiData.city, best.country || ipapiData.country].filter(Boolean).join(', ');

        document.getElementById('heroIP').textContent = ip;
        document.getElementById('heroIP').classList.remove('skeleton');
        document.getElementById('heroLoc').textContent = loc;
        document.getElementById('heroLoc').classList.remove('skeleton');
        if (best.org || ipApiData.org) document.getElementById('heroISP').textContent = ipApiData.org || best.org || '--';

        document.getElementById('dIP').textContent = ip;
        document.getElementById('dLoc').textContent = [best.city || ipapiData.city, best.region || ipapiData.region, best.country || ipapiData.country].filter(Boolean).join(', ') || '--';
        document.getElementById('dISP').textContent = ipApiData.org || best.org || '--';

        // ASN formatting
        const asnRaw = ipApiData.asn || ipApiData.as || ipapiData.asn || ipinfoData.asn || '';
        const asOrg = ipApiData.asname || ipApiData.org || best.org || '';
        document.getElementById('dASN').textContent = asnRaw ? (asOrg ? `${asnRaw} - ${asOrg}` : asnRaw) : '--';

        document.getElementById('dCountry').textContent = best.country || ipapiData.country || '--';
        document.getElementById('dTZ').textContent = best.timezone || ipapiData.timezone || '--';

        // IP property: proxy / hosting / mobile
        ipProxyInfo = { proxy: ipApiData.proxy, hosting: ipApiData.hosting, mobile: ipApiData.mobile };
        renderIPProperty();

        // Multi-source geo table
        renderGeoSources();

        setBadge('ipBadge', 'done');
    } else {
        document.getElementById('heroIP').textContent = t('ip_detect_fail');
        document.getElementById('heroIP').classList.remove('skeleton');
        setBadge('ipBadge', 'fail');
    }
}

function renderIPProperty() {
    const el = document.getElementById('dProperty');
    if (!el) return;
    const tags = [];
    if (ipProxyInfo.hosting) tags.push(`<span class="ip-tag tag-dc" data-i18n-prop="ip_hosting">${t('ip_hosting')}</span>`);
    else if (ipProxyInfo.proxy) tags.push(`<span class="ip-tag tag-proxy" data-i18n-prop="ip_proxy">${t('ip_proxy')}</span>`);
    else if (ipProxyInfo.mobile) tags.push(`<span class="ip-tag tag-mobile" data-i18n-prop="ip_mobile">${t('ip_mobile')}</span>`);
    else tags.push(`<span class="ip-tag tag-residential" data-i18n-prop="ip_residential">${t('ip_residential')}</span>`);
    el.innerHTML = tags.join('');
}

const GEO_FLAGS = {
    'CN': '🇨🇳', 'US': '🇺🇸', 'JP': '🇯🇵', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷',
    'KR': '🇰🇷', 'SG': '🇸🇬', 'HK': '🇭🇰', 'TW': '🇹🇼', 'AU': '🇦🇺', 'CA': '🇨🇦',
    'IN': '🇮🇳', 'BR': '🇧🇷', 'RU': '🇷🇺', 'NL': '🇳🇱', 'IT': '🇮🇹', 'ES': '🇪🇸',
};

function renderGeoSources() {
    // Disabled: single consolidated result shown in hero/detail
    const el = document.getElementById('dGeoSources');
    if (el) el.style.display = 'none';
}

function showWebRTCLeakIP() {
    const el = document.getElementById('dWebRTCIP');
    if (!el || !lastWebrtc) return;
    if (!lastWebrtc.safe && lastWebrtc.leakedIPs?.length) {
        el.textContent = lastWebrtc.leakedIPs.join(', ');
        el.style.color = 'var(--red)';
    } else {
        el.textContent = t('leak_no_leak');
        el.style.color = 'var(--green)';
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
        setText('dSaver', conn.saveData ? t('env_on') : t('env_off'));
    } else {
        setText('dConn', t('env_unsupported'));
        setText('dDown', 'N/A');
        setText('dRTT', 'N/A');
        setText('dSaver', 'N/A');
    }
    setText('dOnline', navigator.onLine ? t('status_online') : t('status_offline'));
    document.getElementById('dOnline').style.color = navigator.onLine ? 'var(--green)' : 'var(--red)';
    checkIPv6();
    runSpeedTest();
}

async function runSpeedTest() {
    const el = document.getElementById('dSpeed');
    if (!el) return;
    el.textContent = t('speed_testing');
    el.style.color = 'var(--accent)';

    try {
        const url = `https://picsum.photos/1024/768?random=${Date.now()}`;
        const start = performance.now();
        const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
        if (!r.ok) throw new Error('fail');
        const blob = await r.blob();
        const ms = performance.now() - start;
        const sizeMB = blob.size / (1024 * 1024);
        const speedMbps = ((sizeMB * 8) / (ms / 1000)).toFixed(1);
        el.textContent = `${speedMbps}${t('speed_mbps')}`;
        el.style.color = speedMbps > 10 ? 'var(--green)' : speedMbps > 2 ? 'var(--yellow)' : 'var(--red)';
    } catch {
        el.textContent = t('speed_fail');
        el.style.color = 'var(--text-muted)';
    }
}

async function checkIPv6() {
    try {
        const r = await fetch('https://api64.ipify.org?format=json', { signal: AbortSignal.timeout(5000) });
        const d = await r.json();
        const isV6 = d.ip?.includes(':');
        setText('dIPv6', isV6 ? `${t('ipv6_yes')} (${d.ip})` : t('ipv6_ipv4_only'));
        document.getElementById('dIPv6').style.color = isV6 ? 'var(--green)' : 'var(--text-muted)';
    } catch {
        setText('dIPv6', t('ipv6_fail'));
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

async function asyncPool(limit, items, fn) {
    const results = [];
    const executing = new Set();
    for (const item of items) {
        const p = Promise.resolve().then(() => fn(item));
        results.push(p);
        executing.add(p);
        p.finally(() => executing.delete(p));
        if (executing.size >= limit) await Promise.race(executing);
    }
    return Promise.all(results);
}

async function runLatency() {
    setBadge('latBadge', 'running');
    const table = document.getElementById('latencyTable');
    table.innerHTML = '';

    SERVICES.forEach(s => {
        const id = s.name.replace(/[^a-zA-Z]/g, '');
        table.innerHTML += `
            <div class="lat-row" id="lat-${id}">
                <div class="lat-icon" style="background:${s.color}18"><img src="${s.favicon}" alt="${s.name}" onerror="this.outerHTML='<span style=color:${s.color};font-weight:700;font-size:15px>${s.name[0]}</span>'"></div>
                <div class="lat-name">${s.name}</div>
                <div class="lat-bar-wrap"><div class="lat-bar fast" style="width:0%"></div></div>
                <div class="lat-value text-muted">...</div>
                <div class="lat-status"></div>
            </div>`;
    });

    let ok = 0;
    await asyncPool(6, SERVICES, async (s) => {
        const id = s.name.replace(/[^a-zA-Z]/g, '');
        const el = document.getElementById(`lat-${id}`);
        if (!el) return;
        const val = el.querySelector('.lat-value');
        const bar = el.querySelector('.lat-bar');
        const st = el.querySelector('.lat-status');

        const ms = await ping(s.url);
        if (ms === -1) {
            val.textContent = t('latency_timeout');
            val.className = 'lat-value timeout';
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
    });

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
    await asyncPool(6, DNS_TARGETS, async (d) => {
        const row = document.getElementById(`dns-${d.replace(/\./g, '-')}`);
        const ipsEl = row.querySelector('.dns-ips');
        const timeEl = row.querySelector('.dns-time');
        const stEl = row.querySelector('.dns-status');

        const start = performance.now();
        let ok = false, ips = '', ms = 0;
        for (const resolver of DNS_RESOLVERS) {
            try {
                const isDoH = resolver.url.includes('/dns-query');
                const opts = {
                    signal: AbortSignal.timeout(4000),
                    headers: isDoH ? { 'Accept': 'application/dns-json' } : {}
                };
                const r = await fetch(`${resolver.url}?name=${d}&type=A`, opts);
                if (!r.ok) continue;
                const data = await r.json();
                ms = Math.round(performance.now() - start);
                ips = data.Answer?.map(a => a.data).join(', ') || t('dns_no_record');
                ok = true;
                break;
            } catch {}
        }
        if (ok) {
            ipsEl.textContent = ips;
            ipsEl.classList.remove('text-muted');
            timeEl.textContent = `${ms} ms`;
            timeEl.className = ms < 200 ? 'dns-time fast' : ms < 500 ? 'dns-time medium' : 'dns-time slow';
            timeEl.style.color = ms < 200 ? 'var(--green)' : ms < 500 ? 'var(--yellow)' : 'var(--orange)';
            stEl.innerHTML = '<i class="fas fa-check-circle text-green"></i>';
            results.push({ domain: d, ok: true, ips, ms });
        } else {
            ipsEl.textContent = t('dns_resolve_fail');
            ipsEl.classList.remove('text-muted');
            ipsEl.style.color = 'var(--red)';
            timeEl.textContent = '--';
            stEl.innerHTML = '<i class="fas fa-times-circle text-red"></i>';
            results.push({ domain: d, ok: false, ips: 'Failed', ms: -1 });
        }
    });

    const dnsOk = results.filter(r => r.ok).length;
    setBadge('dnsBadge', 'done', `${dnsOk}/${DNS_TARGETS.length}`);
    return results;
}

// ============================================================
// WebRTC Leak Detection
// ============================================================

async function checkWebRTC() {
    return new Promise(resolve => {
        const rawIPs = new Set();
        try {
            const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            pc.createDataChannel('');
            pc.createOffer().then(offer => pc.setLocalDescription(offer));
            pc.onicecandidate = e => {
                if (!e.candidate) {
                    pc.close();
                    // Filter valid IPs, exclude 0.0.0.0 and localhost
                    const valid = [...rawIPs].filter(ip =>
                        ip !== '0.0.0.0' && ip !== '127.0.0.1' && !ip.startsWith('127.')
                    );
                    // Separate private vs public
                    const isPrivate = ip => /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|169\.254\.)/.test(ip);
                    const privateIPs = valid.filter(isPrivate);
                    const publicIPs = valid.filter(ip => !isPrivate(ip) && !ip.includes(':'));

                    // Get HTTP-detected IP for comparison
                    const httpIP = document.getElementById('dIP')?.textContent || '';

                    // Leak = WebRTC exposes a public IP different from HTTP IP
                    const leaked = publicIPs.some(ip => httpIP && ip !== httpIP);
                    const hasPrivate = privateIPs.length > 0;

                    let detail;
                    if (leaked) {
                        detail = `${t('leak_danger')}: ${publicIPs.filter(ip => ip !== httpIP).join(', ')}`;
                    } else if (publicIPs.length) {
                        detail = `${t('leak_safe')} (${publicIPs.join(', ')})`;
                    } else if (privateIPs.length) {
                        detail = `${t('leak_safe_result')} (${t('label_loc')}: ${privateIPs.join(', ')})`;
                    } else {
                        detail = t('webrtc_no_local');
                    }
                    resolve({
                        ips: valid, publicIPs, privateIPs, hasPrivate,
                        safe: !leaked,
                        leakedIPs: leaked ? publicIPs.filter(ip => ip !== httpIP) : [],
                        detail
                    });
                    return;
                }
                const match = e.candidate.candidate.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|([a-f0-9:]+)/gi);
                if (match) match.forEach(ip => rawIPs.add(ip));
            };
            setTimeout(() => { pc.close(); resolve({ ips: [], publicIPs: [], privateIPs: [], hasPrivate: false, safe: true, leakedIPs: [], detail: t('webrtc_timeout') }); }, 5000);
        } catch {
            resolve({ ips: [], publicIPs: [], privateIPs: [], hasPrivate: false, safe: true, leakedIPs: [], detail: t('webrtc_unsupported') });
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
            detail: `${t('dnsleak_cf_prefix')}: ${data.ip} (${data.loc}) | WARP: ${data.warp || 'N/A'}`
        };
    } catch {
        return { ip: '--', safe: true, detail: t('dnsleak_cf_unavail') };
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
    const yes = t('fp_yes');
    fp['Touch Support'] = navigator.maxTouchPoints > 0 ? `${yes} (${navigator.maxTouchPoints}${t('fp_points')})` : t('fp_no');
    fp['Cookies'] = navigator.cookieEnabled ? t('fp_enabled') : t('fp_disabled');
    fp['Do Not Track'] = navigator.doNotTrack || t('fp_not_set');
    fp['Hardware Concurrency'] = `${navigator.hardwareConcurrency || '?'}${t('fp_cores')}`;
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

let summaryRows = [];
let lastLatResult = null;
let lastDnsResults = null;
let lastWebrtc = null;
let lastDnsLeak = null;
let lastFp = null;
let hasRun = false;

function refreshDynamicContent() {
    if (!hasRun) return;

    // Re-render IP properties with new language
    renderIPProperty();
    renderGeoSources();

    // Re-run leak checks for fresh i18n text, then re-render
    if (hasRun) {
        Promise.all([checkWebRTC(), checkDNSLeak()]).then(([freshWebrtc, freshDnsLeak]) => {
            lastWebrtc = freshWebrtc;
            lastDnsLeak = freshDnsLeak;
            renderLeak(freshWebrtc, freshDnsLeak, checkFingerprint());
            showWebRTCLeakIP();
        });
    }

    // Rebuild summary with translated text
    rebuildSummary();

    // Update latency timeout text
    document.querySelectorAll('.lat-value.timeout').forEach(el => {
        el.textContent = t('latency_timeout');
    });

    // Update DNS fail/no-record texts
    DNS_TARGETS.forEach(d => {
        const row = document.getElementById(`dns-${d.replace(/\./g, '-')}`);
        if (!row) return;
        const ipsEl = row.querySelector('.dns-ips');
        if (!ipsEl) return;
        const text = ipsEl.textContent.trim();
        if (text === '解析失败' || text === 'Resolve failed' || text === t('dns_resolve_fail')) {
            ipsEl.textContent = t('dns_resolve_fail');
        }
        if (text === '无记录' || text === 'No records' || text === t('dns_no_record')) {
            ipsEl.textContent = t('dns_no_record');
        }
    });
}

function rebuildSummary() {
    if (!hasRun || !lastLatResult) return;
    summaryRows = [];

    const ip = document.getElementById('dIP')?.textContent || '--';
    const loc = document.getElementById('dLoc')?.textContent || '--';
    summaryRows.push(`<div class="summary-row"><i class="fas fa-globe text-green"></i> IP: <strong>${ip}</strong> — ${loc}</div>`);

    if (lastLatResult) {
        const pct = Math.round((lastLatResult.ok / lastLatResult.total) * 100);
        const c = pct >= 70 ? 'text-green' : pct >= 40 ? 'text-yellow' : 'text-red';
        summaryRows.push(`<div class="summary-row"><i class="fas fa-server ${c}"></i> ${t('summary_connectivity')}: <strong>${lastLatResult.ok}/${lastLatResult.total}</strong>${t('summary_reachable')} (${pct}%)</div>`);
    }

    if (lastDnsResults) {
        const dnsOk = lastDnsResults.filter(r => r.ok).length;
        summaryRows.push(`<div class="summary-row"><i class="fas fa-search text-green"></i> ${t('summary_dns_title')}: <strong>${dnsOk}/${lastDnsResults.length}</strong>${t('summary_resolved')}</div>`);
    }

    if (lastWebrtc) {
        summaryRows.push(`<div class="summary-row"><i class="fas fa-video ${lastWebrtc.safe ? 'text-green' : 'text-red'}"></i> ${t('summary_webrtc_title')}: ${lastWebrtc.safe ? t('summary_webrtc_no_leak') : t('summary_webrtc_leaked')}</div>`);
    }

    if (lastDnsLeak) {
        summaryRows.push(`<div class="summary-row"><i class="fas fa-shield-alt ${lastDnsLeak.safe ? 'text-green' : 'text-yellow'}"></i> ${t('summary_dns_title')}: ${lastDnsLeak.safe ? t('summary_dns_no_leak') : t('summary_dns_potential')}</div>`);
    }

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
    summaryRows.push(`<div class="summary-row"><i class="fas fa-flag text-green"></i> ${t('summary_domestic')}: <strong>${domOk}/${domestic.length}</strong> | ${t('summary_international')}: <strong>${intOk}/${intl.length}</strong></div>`);

    document.getElementById('summaryBox').innerHTML = summaryRows.join('');
}

function appendSummaryLine(html) {
    summaryRows.push(html);
    const el = document.getElementById('summaryBox');
    el.innerHTML = summaryRows.join('');
}

async function runAllChecks() {
    const btn = document.getElementById('btnRun');
    btn.classList.add('running');
    btn.disabled = true;
    summaryRows = [];
    document.getElementById('summaryBox').innerHTML = `<div class="summary-empty"><i class="fas fa-spinner fa-spin"></i><p>${t('running_diag')}</p></div>`;

    initProgress(7);

    await checkIP();                                updateProgress(1);
    const ip = document.getElementById('dIP').textContent;
    const loc = document.getElementById('dLoc').textContent;
    summaryRows = [];
    appendSummaryLine(`<div class="summary-row"><i class="fas fa-globe text-green"></i> IP: <strong>${ip}</strong> — ${loc}</div>`);

    checkEnv();                                     updateProgress(2);

    const latResult = await runLatency();           updateProgress(3);
    if (latResult) {
        const pct = Math.round((latResult.ok / latResult.total) * 100);
        const c = pct >= 70 ? 'text-green' : pct >= 40 ? 'text-yellow' : 'text-red';
        appendSummaryLine(`<div class="summary-row"><i class="fas fa-server ${c}"></i> ${t('summary_connectivity')}: <strong>${latResult.ok}/${latResult.total}</strong>${t('summary_reachable')} (${pct}%)</div>`);
    }

    const dnsResults = await runDNS();              updateProgress(4);
    if (dnsResults) {
        const dnsOk = dnsResults.filter(r => r.ok).length;
        appendSummaryLine(`<div class="summary-row"><i class="fas fa-search text-green"></i> ${t('summary_dns_title')}: <strong>${dnsOk}/${dnsResults.length}</strong>${t('summary_resolved')}</div>`);
    }

    const webrtc = await checkWebRTC();             updateProgress(5);
    appendSummaryLine(`<div class="summary-row"><i class="fas fa-video ${webrtc.safe ? 'text-green' : 'text-red'}"></i> ${t('summary_webrtc_title')}: ${webrtc.safe ? t('summary_webrtc_no_leak') : t('summary_webrtc_leaked')}</div>`);

    const dnsLeak = await checkDNSLeak();           updateProgress(6);
    appendSummaryLine(`<div class="summary-row"><i class="fas fa-shield-alt ${dnsLeak.safe ? 'text-green' : 'text-yellow'}"></i> ${t('summary_dns_title')}: ${dnsLeak.safe ? t('summary_dns_no_leak') : t('summary_dns_potential')}</div>`);

    const fp = checkFingerprint();                  updateProgress(7);

    // Store for language re-render
    lastLatResult = latResult;
    lastDnsResults = dnsResults;
    lastWebrtc = webrtc;
    showWebRTCLeakIP();
    lastDnsLeak = dnsLeak;
    lastFp = fp;
    hasRun = true;
    renderLeak(webrtc, dnsLeak, fp);
    setBadge('leakBadge', 'done');

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
    appendSummaryLine(`<div class="summary-row"><i class="fas fa-flag text-green"></i> ${t('summary_domestic')}: <strong>${domOk}/${domestic.length}</strong> | ${t('summary_international')}: <strong>${intOk}/${intl.length}</strong></div>`);

    hideProgress();
    btn.classList.remove('running');
    btn.disabled = false;
    document.getElementById('summaryActions').style.display = 'flex';
}

async function copyReport() {
    const markdown = generateReportMarkdown();
    try {
        await navigator.clipboard.writeText(markdown);
        const btn = document.getElementById('btnCopyReport');
        btn.classList.add('copied');
        btn.querySelector('span').textContent = t('report_copied');
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.querySelector('span').textContent = t('btn_copy');
        }, 2000);
    } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = markdown;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    }
}

function generateReportMarkdown() {
    const ts = (d) => {
        const p = new Date(d);
        return `${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,'0')}-${String(p.getDate()).padStart(2,'0')} ${String(p.getHours()).padStart(2,'0')}:${String(p.getMinutes()).padStart(2,'0')}:${String(p.getSeconds()).padStart(2,'0')}`;
    };
    const lines = [`# ${t('report_title')}`, '', `**${t('report_time')}:** ${ts(new Date())}`, ''];

    // IP
    const ip = document.getElementById('dIP')?.textContent || '--';
    const loc = document.getElementById('dLoc')?.textContent || '--';
    const isp = document.getElementById('dISP')?.textContent || '--';
    lines.push(`## ${t('report_section_ip')}`, `- **${t('label_ip')}:** ${ip}`, `- **${t('label_loc')}:** ${loc}`, `- **${t('label_isp')}:** ${isp}`, '');

    // Network
    const conn = document.getElementById('dConn')?.textContent || '--';
    const down = document.getElementById('dDown')?.textContent || '--';
    const rtt = document.getElementById('dRTT')?.textContent || '--';
    const ipv6 = document.getElementById('dIPv6')?.textContent || '--';
    lines.push(`## ${t('report_section_network')}`, `- **${t('label_conn')}:** ${conn}`, `- **${t('label_down')}:** ${down}`, `- **${t('label_rtt')}:** ${rtt}`, `- **${t('label_ipv6')}:** ${ipv6}`, '');

    // Latency
    lines.push(`## ${t('report_section_latency')}`);
    SERVICES.forEach(s => {
        const id = s.name.replace(/[^a-zA-Z]/g, '');
        const el = document.getElementById(`lat-${id}`);
        const val = el?.querySelector('.lat-value')?.textContent || '--';
        lines.push(`- **${s.name}:** ${val}`);
    });
    lines.push('');

    // Summary lines
    lines.push(`## ${t('report_section_summary')}`);
    const summary = document.getElementById('summaryBox');
    if (summary) {
        summary.querySelectorAll('.summary-row').forEach(row => {
            lines.push(`- ${row.textContent.trim()}`);
        });
    }

    return lines.join('\n');
}

function renderLeak(webrtc, dnsLeak, fp) {
    const grid = document.getElementById('leakGrid');
    grid.innerHTML = `
        <div class="leak-item">
            <i class="fas fa-video" style="color:${webrtc.safe ? 'var(--green)' : 'var(--red)'}"></i>
            <h4>${t('leak_webrtc')}</h4>
            <div class="result ${webrtc.safe ? 'safe' : 'danger'}">${webrtc.safe ? t('leak_no_leak') : t('leak_leaked')}</div>
            <p class="text-muted" style="font-size:12px;margin-top:8px">${webrtc.detail}</p>
        </div>
        <div class="leak-item">
            <i class="fas fa-shield-alt" style="color:${dnsLeak.safe ? 'var(--green)' : 'var(--yellow)'}"></i>
            <h4>${t('leak_dns')}</h4>
            <div class="result ${dnsLeak.safe ? 'safe' : 'warn'}">${dnsLeak.safe ? t('leak_safe_result') : t('leak_warn_result')}</div>
            <p class="text-muted" style="font-size:12px;margin-top:8px">${dnsLeak.detail}</p>
        </div>
        <div class="leak-item">
            <i class="fas fa-fingerprint" style="color:var(--purple)"></i>
            <h4>${t('leak_fp')}</h4>
            <div class="result pending">${fp['Canvas Hash']}</div>
            <p class="text-muted" style="font-size:12px;margin-top:8px">${fp['WebGL Renderer']}</p>
        </div>`;

    const fpTable = document.getElementById('fpTable');
    const fpLabelMap = {
        'User Agent': 'fp_user_agent', 'Platform': 'fp_platform', 'Language': 'fp_language',
        'Languages': 'fp_languages', 'Screen': 'fp_screen', 'Color Depth': 'fp_color_depth',
        'Timezone': 'fp_timezone', 'Touch Support': 'fp_touch', 'Cookies': 'fp_cookies',
        'Do Not Track': 'fp_dnt', 'Hardware Concurrency': 'fp_hw_concurrency',
        'Device Memory': 'fp_device_memory', 'WebGL Vendor': 'fp_webgl_vendor',
        'WebGL Renderer': 'fp_webgl_renderer', 'Canvas Hash': 'fp_canvas_hash',
        'Audio Context': 'fp_audio_context',
    };
    fpTable.innerHTML = Object.entries(fp).map(([k, v]) => {
        const label = t(fpLabelMap[k]) || k;
        return `<div class="fp-row"><div class="fp-label">${label}</div><div class="fp-value">${v}</div></div>`;
    }).join('');
}

// ============================================================
// Monitoring & Toast
// ============================================================

function showToast(msg, type) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type || 'info'}`;
    const icon = type === 'warn' ? 'fa-exclamation-triangle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 4000);
}

let lastOnlineStatus = null;
let lastIP = null;

function startMonitor() {
    // Monitor online/offline
    lastOnlineStatus = navigator.onLine;
    window.addEventListener('online', () => {
        if (lastOnlineStatus === false) showToast(t('toast_online'), 'info');
        lastOnlineStatus = true;
    });
    window.addEventListener('offline', () => {
        showToast(t('toast_offline'), 'error');
        lastOnlineStatus = false;
    });

    // Poll IP changes every 30s
    setInterval(async () => {
        try {
            const r = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
            if (r.ok) {
                const data = await r.json();
                if (lastIP && lastIP !== data.ip) {
                    showToast(`${t('toast_ip_change')}: ${data.ip}`, 'warn');
                    document.getElementById('heroIP').textContent = data.ip;
                    document.getElementById('dIP').textContent = data.ip;
                }
                lastIP = data.ip;
            }
        } catch {}
    }, 30000);
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

    // Start monitoring
    startMonitor();
});
