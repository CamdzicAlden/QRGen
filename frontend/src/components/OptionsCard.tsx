import url from "../assets/icons/url.svg";
import urlBlue from "../assets/icons/urlBlue.svg";
import text from "../assets/icons/text.svg";
import textBlue from "../assets/icons/textBlue.svg";
import wifi from "../assets/icons/wifi.svg";
import wifiBlue from "../assets/icons/wifiBlue.svg";
import email from "../assets/icons/email.svg";
import emailBlue from "../assets/icons/emailBlue.svg";
import phone from "../assets/icons/phone.svg";
import phoneBlue from "../assets/icons/phoneBlue.svg";
import sms from "../assets/icons/sms.svg";
import smsBlue from "../assets/icons/smsBlue.svg";
import QR from "../assets/icons/QR.svg";

import { useState } from "react";
import DropdownCard from "./DropdownCard";

const options = {
  URL: { icon: url, iconSelected: urlBlue },
  Text: { icon: text, iconSelected: textBlue },
  WiFi: { icon: wifi, iconSelected: wifiBlue },
  Email: { icon: email, iconSelected: emailBlue },
  Phone: { icon: phone, iconSelected: phoneBlue },
  SMS: { icon: sms, iconSelected: smsBlue },
};

type OptionType = keyof typeof options;

function OptionsCard() {
  const [selectedOption, setSelectedOption] = useState<OptionType>("URL");

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 bg-white rounded-xl border-0.5 border-black shadow-[0_2px_4px_rgba(0,0,0,0.25)] py-6 px-10">
      <div className="w-full flex justify-between items-center">
        {Object.entries(options).map(([option, { icon, iconSelected }]) => (
          <div
            key={option}
            className={`flex justify-center items-center gap-1 px-4 py-2 rounded-md cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.1)] text-sm font-jakartaSemibold ${selectedOption === option ? "bg-blue/10 text-blue/90" : "bg-white/80 text-black/90"}`}
            onClick={() => setSelectedOption(option as OptionType)}
          >
            <img
              src={selectedOption === option ? iconSelected : icon}
              alt={option}
              className="w-4"
            />
            <span>{option}</span>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col items-start text-sm font-jakartaBold gap-2">
        <p>Enter your {selectedOption}</p>

        <div className="w-full flex justify-start items-center px-4 py-2.5 border border-black/20 rounded-md gap-4">
          <img
            src={options[selectedOption].icon}
            alt={selectedOption}
            className="w-5 opacity-50"
          />

          <input
            type="text"
            placeholder="https://www.example.com"
            className="font-jakartaSemibold border-none outline-none flex-1"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-start text-sm font-jakartaBold gap-2">
        <p>Customize</p>

        <div className="w-full flex justify-between items-center gap-4">
          <DropdownCard title="Color" />
          <DropdownCard title="Background" />
          <DropdownCard title="Size" />
          <DropdownCard title="Format" />
        </div>
      </div>

      <div className="w-full flex justify-center items-center bg-blue text-white/90 font-jakartaBold text-base gap-1 py-2 rounded-md cursor-pointer">
        <img src={QR} alt="QR" className="h-6" />
        <p>Generate QR Code</p>
      </div>
    </div>
  );
}

export default OptionsCard;
