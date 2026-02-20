const STORAGE_KEY = 'waitlist_submissions_v1';

function appendLocalSubmission(payload) {
  const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  current.push(payload);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function buildPayload({ intent, email, business_name, channel_interest }) {
  return {
    intent,
    email: String(email || '').trim().toLowerCase(),
    business_name: String(business_name || '').trim(),
    channel_interest,
    created_at_iso: new Date().toISOString(),
    user_agent: navigator.userAgent,
    referrer: document.referrer || '',
    page_url: window.location.href,
  };
}

export async function submitWaitlist(payload, hpValue) {
  if (String(hpValue || '').trim() !== '') {
    return { ok: true, mode: 'spam_ignored' };
  }

  const webAppUrl = import.meta.env.VITE_WAITLIST_WEBAPP_URL;

  if (!webAppUrl) {
    appendLocalSubmission(payload);
    return { ok: true, mode: 'local' };
  }

  try {
    const formData = new FormData();
    formData.append('created_at_iso', payload.created_at_iso);
    formData.append('intent', payload.intent);
    formData.append('email', payload.email);
    formData.append('business_name', payload.business_name || '');
    formData.append('channel_interest', payload.channel_interest);
    formData.append('user_agent', payload.user_agent);
    formData.append('referrer', payload.referrer || '');
    formData.append('page_url', payload.page_url);

    const response = await fetch(webAppUrl, {
      method: 'POST',
      body: formData,
    });

    let responseData = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }

    if (!response.ok || responseData?.ok === false) {
      appendLocalSubmission(payload);
      return { ok: false, mode: 'local-fallback' };
    }

    return { ok: true, mode: 'sheets' };
  } catch {
    appendLocalSubmission(payload);
    return { ok: false, mode: 'local-fallback' };
  }
}
