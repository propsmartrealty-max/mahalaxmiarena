export const INDEXNOW_KEY = '83f2e1a90c4b4d6e812a65cb21f8a709';

export async function submitToIndexNow(
  host: string,
  urls: string[]
): Promise<{ success: boolean; status: number; count: number; error?: string }> {
  try {
    const payload = {
      host: host.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      key: INDEXNOW_KEY,
      keyLocation: `https://${host.replace(/^https?:\/\//, '').replace(/\/$/, '')}/${INDEXNOW_KEY}.txt`,
      urlList: urls.slice(0, 10000),
    };

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: res.ok || res.status === 202,
      status: res.status,
      count: payload.urlList.length,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      status: 500,
      count: 0,
      error: msg,
    };
  }
}
