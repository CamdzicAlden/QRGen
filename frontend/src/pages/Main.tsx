import AboutText from "../components/AboutText";
import Logo from "../components/Logo";
import scanConnect from "../assets/images/scanConnect.png";
import OptionsCard from "../components/OptionsCard";

function Main() {
  return (
    <div className="w-full h-dvh box-border pt-6 pb-2 px-20 flex flex-col align-center gap-10">
      <Logo />

      <div className="w-full flex-1 min-h-0 grid grid-cols-[1.5fr_1fr] grid-rows-[1fr_2fr] place-items-center gap-8">
        <AboutText />

        <img
          src={scanConnect}
          alt="Scan and Connect"
          className="w-[70%] h-auto object-contain"
        />

        <OptionsCard />
      </div>
    </div>
  );
}

export default Main;
