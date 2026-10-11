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
import password from "../assets/icons/password.svg";

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

type InputField = {
  name: string;
  placeholder: string;
  icon: string;
  type?: "text" | "email" | "tel" | "password";
};

const inputFields: Record<OptionType, InputField[]> = {
  URL: [
    {
      name: "url",
      placeholder: "https://www.example.com",
      icon: url,
    },
  ],

  Text: [
    {
      name: "text",
      placeholder: "Enter your text",
      icon: text,
    },
  ],

  WiFi: [
    {
      name: "ssid",
      placeholder: "Network name",
      icon: wifi,
    },
    {
      name: "password",
      placeholder: "Password",
      icon: password,
      type: "password",
    },
  ],

  Email: [
    {
      name: "email",
      placeholder: "example@gmail.com",
      icon: email,
      type: "email",
    },
  ],

  Phone: [
    {
      name: "phone",
      placeholder: "+387 61 123 456",
      icon: phone,
      type: "tel",
    },
  ],

  SMS: [
    {
      name: "phone",
      placeholder: "Phone number",
      icon: phone,
      type: "tel",
    },
    {
      name: "message",
      placeholder: "Message",
      icon: sms,
    },
  ],
};

function OptionsCard() {
  const [selectedOption, setSelectedOption] = useState<OptionType>("URL");
  const [qrColor, setQrColor] = useState("#2563eb");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState("300x300");
  const [format, setFormat] = useState("SVG");

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 bg-white rounded-3xl border-0.5 border-black shadow-[0_2px_4px_rgba(0,0,0,0.25)] py-6 px-10">
      {/* Options container */}
      <div className="w-full flex justify-start items-center gap-4">
        {Object.entries(options).map(([option, { icon, iconSelected }]) => (
          <div
            key={option}
            className={`flex justify-center items-center gap-2 px-4 py-2 rounded-md cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.1)] text-sm font-jakartaSemibold ${selectedOption === option ? "bg-blue/10 text-blue/80" : "bg-white/80 text-black/80"}`}
            onClick={() => setSelectedOption(option as OptionType)}
          >
            <img
              src={selectedOption === option ? iconSelected : icon}
              alt={option}
              className="h-3.5"
            />
            <span>{option}</span>
          </div>
        ))}
      </div>

      {/* Input container */}
      <div className="w-full flex flex-col items-start text-sm font-jakartaBold gap-2">
        <p>Enter your {selectedOption}</p>

        <div className="w-full flex items-center gap-4">
          {inputFields[selectedOption].map((field) => (
            <div
              key={field.name}
              className="flex-1 min-w-0 flex justify-start items-center px-4 py-2.5 border border-black/20 rounded-lg gap-4"
            >
              <img
                src={field.icon}
                alt={""}
                className="h-4 opacity-50 shrink-0"
              />

              <input
                type={field.type ?? "text"}
                name={field.name}
                placeholder={field.placeholder}
                className="font-jakartaSemibold border-none outline-none flex-1 min-w-0 text-black/80"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Customize container */}
      <div className="w-full flex flex-col items-start text-sm font-jakartaBold gap-2">
        <p>Customize</p>

        <div className="w-full h-full flex justify-between items-center gap-4">
          <DropdownCard
            title="Color"
            type="color"
            defaultValue="#2563eb"
            value={qrColor}
            onChange={setQrColor}
          />

          <DropdownCard
            title="Background"
            type="color"
            defaultValue="#ffffff"
            value={backgroundColor}
            onChange={setBackgroundColor}
          />

          <DropdownCard
            title="Size"
            type="select"
            value={size}
            onChange={setSize}
            options={["150x150", "300x300", "500x500", "800x800"]}
          />

          <DropdownCard
            title="Format"
            type="select"
            value={format}
            onChange={setFormat}
            options={["SVG", "PNG"]}
          />
        </div>
      </div>

      {/* Button container */}
      <div className="w-full flex justify-center items-center bg-blue text-white/90 font-jakartaBold text-base gap-1 py-2 rounded-lg cursor-pointer hover:bg-blue/95 transition-all ease-in-out duration-200">
        <img src={QR} alt="QR" className="h-5" />
        <p>Generate QR Code</p>
      </div>
    </div>
  );
}

export default OptionsCard;
