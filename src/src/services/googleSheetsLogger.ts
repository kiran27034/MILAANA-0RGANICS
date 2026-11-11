export async function logLoginToSheet(phoneNumber: string) {
  // Option A: Free Webhook URL (Make.com / Zapier)
  const WEBHOOK_URL = "https://hook.us1.make.com/YOUR_WEBHOOK_ID_HERE";

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        loginTime: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        status: "SUCCESSFUL_LOGIN",
      }),
    });
  } catch (error) {
    console.error("Failed to log entry to Google Sheets:", error);
  }
}