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
    <div className="w-dvw h-auto lg:h-dvh box-border pt-[clamp(0.1rem,4vh,10rem)] pb-[clamp(0.1rem,2vh,10rem)] px-[clamp(0.1rem,4vw,10rem)] lg:px-[clamp(0.1rem,5vw,10rem)] flex flex-col items-center gap-[clamp(0.1rem,15vh,10rem)] lg:gap-[clamp(0.1rem,4vh,10rem)] ">
      <Logo />

      <div className="w-full max-w-dvw flex-1 min-h-0 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr_1fr] sm:grid-rows-4 lg:grid-rows-[1fr_2fr] place-items-center gap-[clamp(0.1rem,10vh,20rem)] md:gap-[clamp(0.1rem,10vh,10rem)] lg:gap-[clamp(0.1rem,4vh,10rem)]">
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
