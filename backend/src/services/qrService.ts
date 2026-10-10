import QRCode from "qrcode";

type QRFormat = "svg" | "png";

interface QRCodeResult {
  data: string | Buffer;
  contentType: string;
}

export const generateQR = async (
  url: string,
  format: QRFormat,
): Promise<QRCodeResult> => {
  if (format === "svg") {
    const svg = await QRCode.toString(url, {
      type: "svg",
      errorCorrectionLevel: "H",
      margin: 2,
      width: 300,
      color: {
        dark: "#4356FD",
        light: "#FFFFFF",
      },
    });

    return {
      data: svg,
      contentType: "image/svg+xml",
    };
  }

  const png = await QRCode.toBuffer(url, {
    type: "png",
    errorCorrectionLevel: "H",
    margin: 2,
    width: 300,
    color: {
      dark: "#4356FD",
      light: "#FFFFFF",
    },
  });

  return {
    data: png,
    contentType: "image/png",
  };
};
