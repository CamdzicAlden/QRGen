import QRCode from "qrcode";
import type { QRRequest } from "../schemas/qrSchema.js";

type QRCodeResult = {
  data: string | Buffer;
  contentType: string;
};

export const generateQR = async (
  payload: string,
  options: Pick<QRRequest, "color" | "background" | "size" | "format">,
): Promise<QRCodeResult> => {
  const qrOptions = {
    errorCorrectionLevel: "H" as const,
    margin: 2,
    width: options.size,
    color: {
      dark: options.color,
      light: options.background,
    },
  };

  if (options.format === "svg") {
    const svg = await QRCode.toString(payload, {
      ...qrOptions,
      type: "svg",
    });

    return {
      data: svg,
      contentType: "image/svg+xml; charset=utf-8",
    };
  }

  const png = await QRCode.toBuffer(payload, {
    ...qrOptions,
    type: "png",
  });

  return {
    data: png,
    contentType: "image/png",
  };
};
