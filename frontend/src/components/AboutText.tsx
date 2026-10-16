import qrBlue from "../assets/icons/QRBlue.svg";

function AboutText() {
  return (
    <div className="lg:justify-self-start flex flex-col items-center lg:items-start gap-[clamp(0.1rem,3vh,10rem)] lg:gap-[clamp(0.1rem,2.5vh,10rem)] font-jakartaBold">
      <div className="flex justify-center items-center px-[clamp(1rem,1.6vw,10rem)] py-[clamp(0.1rem,1.2vh,10rem)] gap-[clamp(0.1rem,1vh,10rem)] text-blue/90 text-[clamp(0.1rem,1.5vh,10rem)] bg-blue/10 rounded-full">
        <img src={qrBlue} alt="QR" className="h-[clamp(0.1rem,2.2vh,10rem)] " />
        <span>Free QR Code Generator</span>
      </div>

      <p className="text-[clamp(0.1rem,4.6vh,30rem)] lg:text-[clamp(0.1rem,5.7vh,30rem)] leading-[1.1] text-black/90 text-center lg:text-left">
        Turn your links into <br />
        QR codes in <span className="text-blue/90">seconds</span>
      </p>

      <p className="hidden lg:block text-[clamp(0.1rem,1.8vh,10rem)] lg:text-[clamp(0.1rem,2vh,10rem)] text-black/70 font-jakartaSemibold text-center lg:text-left">
        Create QR codes for websites, text, Wi-Fi, emails and more.
        <br />
        Fast, easy and completely free.
      </p>

      <p className="block lg:hidden text-[clamp(0.1rem,1.8vh,10rem)] lg:text-[clamp(0.1rem,2vh,10rem)] text-black/70 font-jakartaSemibold text-center lg:text-left">
        Create QR codes for websites, text, Wi-Fi, emails and more. Fast, easy
        and completely free.
      </p>
    </div>
  );
}

export default AboutText;
