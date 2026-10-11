import qrExample from "../assets/images/qrExample.svg";
import download from "../assets/icons/download.svg";
import copy from "../assets/icons/copy.svg";

function ResultCard() {
  return (
    <div className="bg-white rounded-3xl border border-black/10 w-full h-full flex flex-col justify-center items-center gap-6 shadow-[0_2px_4px_rgba(0,0,0,0.25)] p-8">
      <p className="text-md font-jakartaBold text-black/90">Your QR Code</p>

      <img src={qrExample} alt="QR Code" className="w-48 h-auto" />

      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-2 bg-blue/10 px-4 py-2 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] cursor-pointer hover:bg-blue/20 transition-all ease-in-out duration-200">
          <img src={download} alt="Download" />
          <p className="text-sm font-jakartaSemibold text-blue/90">Download</p>
        </div>

        <div className="flex justify-center items-center gap-2 bg-blue/10 px-4 py-2 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] cursor-pointer hover:bg-blue/20 transition-all ease-in-out duration-200">
          <img src={copy} alt="Download" />
          <p className="text-sm font-jakartaSemibold text-blue/90 ">Copy</p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
