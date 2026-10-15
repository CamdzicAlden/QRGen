import { useEffect, useState } from "react";

import qrExample from "../assets/images/qrExample.svg";
import download from "../assets/icons/download.svg";
import copy from "../assets/icons/copy.svg";

import type { ResultCardProps } from "../types/resultCard";
import Loading from "./Loading";
import Toast from "./Toast";

function ResultCard({ imageUrl, format, loading }: ResultCardProps) {
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setSuccess(""), 3000);
    return () => clearTimeout(timeout);
  }, [success]);

  useEffect(() => {
    const timeout = setTimeout(() => setFailure(""), 3000);
    return () => clearTimeout(timeout);
  }, [failure]);

  const handleCopy = async () => {
    setSuccess("");
    setFailure("");

    if (!imageUrl) {
      setFailure("Generate a QR code first.");
      return;
    }

    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
        throw new Error(
          "Image clipboard access is not supported by this browser.",
        );
      }

      // Load the generated SVG or PNG into an image element.
      const image = new Image();
      image.src = imageUrl;

      await image.decode();

      // Convert the image to PNG because clipboard image support
      // is more widely compatible with image/png than image/svg+xml.
      const canvas = document.createElement("canvas");

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not prepare the image for copying.");
      }

      context.drawImage(image, 0, 0);

      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Could not convert the QR code to PNG."));
          }
        }, "image/png");
      });

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": pngBlob,
        }),
      ]);

      setSuccess("Successfully copied QR code!");
    } catch (error) {
      console.error(error);
      setFailure("Failed to copy QR code!");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-black/10 w-full h-full flex flex-col justify-center items-center gap-[clamp(0.1rem,3.5vh,10rem)] shadow-[0_2px_4px_rgba(0,0,0,0.25)] p-[clamp(0.1rem,3vh,10rem)]">
      <p className="text-[clamp(0.1rem,2.5vh,10rem)] font-jakartaBold text-black/90">
        Your QR Code
      </p>

      <div className="h-[clamp(0.1rem,27vh,40rem)] w-auto flex justify-center items-center">
        {loading ? (
          <Loading height="clamp(0.1rem, 4vh, 5rem)" />
        ) : (
          <img
            src={imageUrl ?? qrExample}
            alt={imageUrl ? "Generated QR code" : "QR code example"}
            className="h-full w-auto object-contain"
          />
        )}
      </div>

      <div className="flex justify-center items-center gap-[clamp(0.1rem,2vh,10rem)]">
        <a
          href={imageUrl ?? undefined}
          download={imageUrl ? `qr-code.${format}` : undefined}
          aria-disabled={!imageUrl}
          onClick={(event) => {
            if (!imageUrl) {
              event.preventDefault();
            }
          }}
          className={`flex justify-center items-center gap-[clamp(0.1rem,1vh,10rem)] bg-blue/10 w-[clamp(0.1rem,9vw,10rem)] py-[clamp(0.1rem,1.5vh,10rem)] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-200 ${
            imageUrl
              ? "cursor-pointer hover:bg-blue/20"
              : "cursor-not-allowed opacity-50"
          }`}
        >
          <img src={download} alt="" />
          <span className="text-[clamp(0.1rem,2vh,10rem)] font-jakartaSemibold text-blue/90">
            Download
          </span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!imageUrl}
          className={`flex justify-center items-center gap-[clamp(0.1rem,1vh,10rem)] bg-blue/10 w-[clamp(0.1rem,9vw,10rem)] py-[clamp(0.1rem,1.5vh,10rem)] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-200 ${
            imageUrl
              ? "cursor-pointer hover:bg-blue/20"
              : "cursor-not-allowed opacity-50"
          }`}
        >
          <img src={copy} alt="" />
          <span className="text-[clamp(0.1rem,2vh,10rem)] font-jakartaSemibold text-blue/90">
            Copy
          </span>
        </button>
      </div>

      {success && <Toast message={success} type="success" />}
      {failure && <Toast message={failure} type="error" />}
    </div>
  );
}

export default ResultCard;
