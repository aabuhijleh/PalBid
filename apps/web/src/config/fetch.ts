import type { ClientRequestOptions } from "hono/client";

const DEFAULT_TIMEOUT = 10000; // 10 seconds

const customFetch: typeof fetch = (
  url,
  options = {},
  timeout = DEFAULT_TIMEOUT,
) => {
  const signal = AbortSignal.timeout(timeout);
  return fetch(url, { signal, ...options });
};

export const commonOptions = {
  fetch: customFetch,
} satisfies ClientRequestOptions;
