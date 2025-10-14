import { APP_BASE } from "$lib/config/api";

/**
 * Decompress gzip-compressed data (browser)
 * @param input - Gzipped data as Uint8Array or Base64 string
 * @returns Promise<string>
 */
export async function decompressGzip(input: Uint8Array | string): Promise<string> {
  const compressed =
    typeof input === "string"
      ? Uint8Array.from(atob(input), (c) => c.charCodeAt(0))
      : input;

  const ds = new DecompressionStream("gzip");
  const stream = new Response(new Blob([compressed]).stream().pipeThrough(ds));

  return stream.text();
}

/**
 * Format ISO date string to "d, YYYY-MM-DD H:i:s"
 * Example: "Senin, 2025-10-14 03:52:34"
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  // Nama hari dalam Bahasa Indonesia
  const days = [
    "Minggu", "Senin", "Selasa", "Rabu",
    "Kamis", "Jumat", "Sabtu"
  ];

  const dayName = days[date.getDay()];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${dayName}, ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Fetch and load complaint data
 * @returns Promise<any | null> first complaint data or null
 */
export async function loadInitialData() {
  try {
    const res = await fetch(`${APP_BASE}/complaint/monitoring`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const response = await res.json();
    const compressed = response?.data?.data?.data?.complaintsCompressed;
    if (!compressed) throw new Error("No compressed data found");

    const decompressed = await decompressGzip(compressed);
    const complaints = JSON.parse(decompressed);
    const updatedTime = formatDateTime(response?.data?.data?.data?.updatedTime);
    const headers = Object.keys(complaints?.[0]?.[0] || {});

    return {
      complaint: complaints[0],
      updatedTime,
      headers
    };
    
  } catch (err) {
    console.error("Failed to load complaints:", err);
    return null;
  }
  
}
