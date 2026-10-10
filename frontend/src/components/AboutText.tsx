import qrBlue from "../assets/icons/QRBlue.svg";

function AboutText() {
  return (
    <div className="justify-self-start flex flex-col items-start gap-4 font-jakartaBold">
      <div className="flex justify-center items-center px-4 py-2 gap-2 text-blue/90 text-xs bg-blue/10 rounded-full">
        <img src={qrBlue} alt="QR" className="h-4" />
        <span>Free QR Code Generator</span>
      </div>

      <p className="text-4xl text-black/90">
        Turn your links into <br />
        QR codes in <span className="text-blue/90">seconds</span>
      </p>

      <p className="text-md text-black/70 font-jakartaSemibold">
        Create QR codes for websites, text, Wi-Fi, emails and more.
        <br />
        Fast, easy and completely free.
      </p>
    </div>
  );
}

export default AboutText;
