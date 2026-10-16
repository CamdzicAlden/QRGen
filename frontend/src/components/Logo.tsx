import logo from "../assets/icons/logo.svg";

function Logo() {
  return (
    <div className="w-full flex justify-start items-center gap-[clamp(0.1rem,0.6vh,10rem)] lg:gap-[clamp(0.1rem,1vh,10rem)] text-[clamp(0.1rem,2.5vh,10rem)] lg:text-[clamp(0.1rem,3vh,10rem)] font-jakartaBold text-black/80">
      <img
        src={logo}
        alt="logo"
        className="h-[clamp(0.1rem,3.3vh,10rem)] lg:h-[clamp(0.1rem,3.6vh,10rem)] w-auto"
      />
      <p>
        QR<span className="text-blue/80">Gen</span>
      </p>
    </div>
  );
}

export default Logo;
