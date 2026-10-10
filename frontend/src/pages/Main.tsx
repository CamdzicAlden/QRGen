import AboutText from "../components/AboutText";
import Logo from "../components/Logo";
import scanConnect from "../assets/images/scanConnect.png";

function Main() {
  return (
    <div className="w-full h-full py-6 px-14 flex flex-col align-center gap-16">
      <Logo />

      <div className="w-full grid grid-cols-2 grid-rows-2 place-items-center">
        <AboutText />

        <img
          src={scanConnect}
          alt="Scan and Connect"
          className="w-[60%] h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default Main;
