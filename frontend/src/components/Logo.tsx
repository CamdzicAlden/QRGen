import logo from "../assets/icons/logo.svg";

function Logo() {
  return (
    <div className="w-full flex justify-start items-center gap gap-1 text-xl font-jakartaBold text-black/80">
      <img src={logo} alt="logo" className="h-7 w-auto" />
      <p>
        QR<span className="text-blue/80">Gen</span>
      </p>
    </div>
  );
}

export default Logo;
