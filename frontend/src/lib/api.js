/**
 * API helper untuk memanggil backend Express
 *
 * Development: request ke /api/* di-proxy ke http://localhost:5000
 * Production:  request langsung ke NEXT_PUBLIC_API_URL
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Wrapper fetch dengan base URL dan default headers
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ─── Sensor API ───────────────────────────────────────────────

/**
 * Ambil data sensor kolam terbaru
 * @param {number} limit - jumlah data yang diambil (default: 50)
 */
export async function getSensorKolam(limit = 50) {
  return apiFetch(`/api/sensor/kolam?limit=${limit}`);
}

/**
 * Ambil data sensor tanah terbaru
 * @param {number} limit - jumlah data yang diambil (default: 50)
 */
export async function getSensorTanah(limit = 50) {
  return apiFetch(`/api/sensor/tanah?limit=${limit}`);
}

/**
 * Health check — cek apakah backend berjalan
 */
export async function checkHealth() {
  return apiFetch("/api/health");
}

export default apiFetch;
