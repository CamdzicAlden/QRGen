const API = import.meta.env.VITE_API_URL;

export interface QRFormData {
  type: "url" | "text" | "wifi" | "email" | "phone" | "sms";
  url?: string;
  text?: string;
  ssid?: string;
  password?: string;
  email?: string;
  phone?: string;
  message?: string;
  color: string;
  background: string;
  size: number;
  format: "svg" | "png";
}

interface ApiError extends Error {
  status: number;
}

export async function generateQR(formData: QRFormData): Promise<Blob> {
  if (!API) {
    throw new Error("VITE_API_URL is not configured");
  }

  const response = await fetch(`${API}api/qr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    let message = "Failed to generate QR code";

    try {
      const data = await response.json();

      if (typeof data.message === "string") {
        message = data.message;
      }

      if (Array.isArray(data.errors)) {
        message = data.errors
          .map(
            (item: { field?: string; message?: string }) =>
              `${item.field ? `${item.field}: ` : ""}${item.message ?? ""}`,
          )
          .join("; ");
      }
    } catch {
      // Keep the fallback message if the error body is not JSON.
    }

    const error = new Error(message) as ApiError;
    error.status = response.status;

    throw error;
  }

  const contentType = response.headers.get("Content-Type") ?? "";

  if (
    !contentType.startsWith("image/svg+xml") &&
    !contentType.startsWith("image/png")
  ) {
    throw new Error("The server did not return a valid QR image");
  }

  return response.blob();
}
