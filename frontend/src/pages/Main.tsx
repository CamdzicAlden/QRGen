import { useEffect, useState } from "react";

import AboutText from "../components/AboutText";
import Logo from "../components/Logo";
import scanConnect from "../assets/images/scanConnect.png";
import OptionsCard from "../components/OptionsCard";
import ResultCard from "../components/ResultCard";

type QRFormat = "svg" | "png";

function Main() {
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [qrFormat, setQrFormat] = useState<QRFormat>("svg");

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
    <div className="w-full h-dvh box-border pt-6 pb-6 px-20 flex flex-col items-center gap-10">
      <Logo />

      <div className="w-full flex-1 min-h-0 grid grid-cols-[2fr_1fr] grid-rows-[1fr_2fr] place-items-center gap-8">
        <AboutText />

        <img
          src={scanConnect}
          alt="Scan and Connect"
          className="w-[70%] h-auto object-contain"
        />

        <OptionsCard onQRGenerated={handleQRGenerated} />

        <ResultCard imageUrl={qrImageUrl} format={qrFormat} />
      </div>
    </div>
  );
}

export default Main;
