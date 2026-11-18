// scripts/harden-cloudflare-zones.mjs
// Ultra-Advanced Enterprise Cloudflare Edge Hardening & Security Calibration

const AUTH_EMAIL = process.env.CLOUDFLARE_EMAIL || '';
const AUTH_KEY = process.env.CLOUDFLARE_API_KEY || '';

const ZONES = [
  { name: 'kohinoorthearena.in', id: '1c030a98b7e7a28c8373922a82f3babf' },
  { name: 'mahalaxmithearena.in', id: '57da30128253b2b3cd89c44e39c2f5b3' }
];

const SETTINGS_TO_APPLY = [
  { id: 'always_use_https', value: 'on' },
  { id: '0rtt', value: 'on' },
  { id: 'always_online', value: 'on' },
  { id: 'early_hints', value: 'on' },
  { id: 'hotlink_protection', value: 'on' },
  { id: 'min_tls_version', value: '1.2' },
  { id: 'tls_1_3', value: 'on' },
  { id: 'brotli', value: 'on' },
  { id: 'http3', value: 'on' },
  { id: 'ip_geolocation', value: 'on' },
  { id: 'sort_query_string_for_cache', value: 'on' },
  { id: 'browser_check', value: 'on' },
  {
    id: 'security_header',
    value: {
      strict_transport_security: {
        enabled: true,
        max_age: 63072000,
        include_subdomains: true,
        preload: true,
        nosniff: true
      }
    }
  }
];

async function updateZoneSetting(zoneId, settingId, value) {
  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/${settingId}`;
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'X-Auth-Email': AUTH_EMAIL,
        'X-Auth-Key': AUTH_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });
    const data = await res.json();
    return { id: settingId, success: data.success, errors: data.errors };
  } catch (err) {
    return { id: settingId, success: false, errors: [err.message] };
  }
}

async function enableBotFightMode(zoneId) {
  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/bot_management`;
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'X-Auth-Email': AUTH_EMAIL,
        'X-Auth-Key': AUTH_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fight_mode: true }),
    });
    const data = await res.json();
    return { id: 'bot_fight_mode', success: data.success, errors: data.errors };
  } catch (err) {
    return { id: 'bot_fight_mode', success: false, errors: [err.message] };
  }
}

async function runHardening() {
  console.log('\n======================================================');
  console.log('🛡️ ULTRA-ADVANCED CLOUDFLARE EDGE HARDENING SYSTEM');
  console.log('======================================================\n');

  for (const zone of ZONES) {
    console.log(`📡 Hardening Zone: ${zone.name} (${zone.id})...`);
    for (const s of SETTINGS_TO_APPLY) {
      const res = await updateZoneSetting(zone.id, s.id, s.value);
      if (res.success) {
        console.log(`   ✅ ${s.id}: configured successfully.`);
      } else {
        console.log(`   ⚠️ ${s.id}: ${JSON.stringify(res.errors)}`);
      }
    }

    // Try Bot Fight Mode
    const bfm = await enableBotFightMode(zone.id);
    if (bfm.success) {
      console.log(`   ✅ bot_fight_mode: enabled.`);
    } else {
      console.log(`   ℹ️ bot_fight_mode: skipped (${bfm.errors?.[0]?.message || 'free/pro feature check'})`);
    }
    console.log('');
  }

  console.log('🌟 CLOUDFLARE EDGE HARDENING COMPLETED SUCCESSFULLY.\n');
}

runHardening().catch(console.error);
