import type { QRRequest } from "../schemas/qrSchema.js";

const escapeWifiValue = (value: string): string =>
  value.replace(/([\\;,:"])/g, "\\$1");

export const createQRPayload = (data: QRRequest): string => {
  switch (data.type) {
    case "url":
      return data.url;

    case "text":
      return data.text;

    case "wifi":
      return (
        `WIFI:T:WPA;` +
        `S:${escapeWifiValue(data.ssid)};` +
        `P:${escapeWifiValue(data.password)};;`
      );

    case "email":
      return `mailto:${data.email}`;

    case "phone":
      return `tel:${data.phone}`;

    case "sms": {
      const phone = data.phone;
      const message = data.message;

      if (!message) {
        return `sms:${phone}`;
      }

      return `sms:${phone}?body=${encodeURIComponent(message)}`;
    }
  }
};
