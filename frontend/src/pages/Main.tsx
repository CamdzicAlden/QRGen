import { useEffect, useState } from "react";

import AboutText from "../components/AboutText";
import Logo from "../components/Logo";
import scanConnect from "../assets/images/scanConnect.png";
import OptionsCard from "../components/OptionsCard";
import ResultCard from "../components/ResultCard";

import type { QRFormat } from "../types/shared";

function Main() {
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [qrFormat, setQrFormat] = useState<QRFormat>("svg");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (qrImageUrl) {
        URL.revokeObjectURL(qrImageUrl);
      }
    };
  }, [qrImageUrl]);

  const handleQRGenerated = (imageUrl: string, format: QRFormat) => {
    setQrImageUrl(imageUrl);
    setQrFormat(format);
  };

  return (
    <div className="w-full h-dvh box-border pt-[clamp(0.1rem,4vh,10rem)] pb-[clamp(0.1rem,2vh,10rem)] px-[clamp(0.1rem,5vw,10rem)] flex flex-col items-center gap-[clamp(0.1rem,4vh,10rem)] ">
      <Logo />

      <div className="w-full flex-1 min-h-0 grid grid-cols-[2fr_1fr] grid-rows-[1fr_2fr] place-items-center gap-[clamp(0.1rem,4vh,10rem)] ">
        <AboutText />

        <img
          src={scanConnect}
          alt="Scan and Connect"
          className="w-[70%] h-auto object-contain"
        />

        <OptionsCard
          onQRGenerated={handleQRGenerated}
          loading={loading}
          setLoading={setLoading}
        />

        <ResultCard imageUrl={qrImageUrl} format={qrFormat} loading={loading} />
      </div>
    </div>
  );
}

export default Main;
