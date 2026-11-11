const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";
export const SHEET_ID = "1ikj7W_K51ci42FF1jHMMmRk-eyWX_ihdty0wX1G7xN0";

function headers() {
  const lovable = process.env["LOVABLE_API_KEY"];
  const conn = process.env["GOOGLE_SHEETS_API_KEY"];
  if (!lovable || !conn) throw new Error("Google Sheets is not connected");
  return { Authorization: `Bearer ${lovable}`, "X-Connection-Api-Key": conn, "Content-Type": "application/json" };
}

export async function appendRow(tab: string, row: (string | number)[]) {
  const res = await fetch(`${GATEWAY_URL}/spreadsheets/${SHEET_ID}/values/${tab}!A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST", headers: headers(), body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Sheets append failed [${res.status}]: ${body}`);
    throw new Error("Could not save. Please try again or call +91 88679 73331.");
  }
}

export async function readRows(range: string): Promise<string[][]> {
  const res = await fetch(`${GATEWAY_URL}/spreadsheets/${SHEET_ID}/values/${range}`, { headers: headers() });
  if (!res.ok) { console.error(`Sheets read failed [${res.status}]: ${await res.text()}`); return []; }
  return ((await res.json()).values ?? []) as string[][];
}

export const normPhone = (p: string) => p.replace(/\D/g, "").slice(-10);
