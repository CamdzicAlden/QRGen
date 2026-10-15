import type { QRFormat } from "../types/shared";

import type {
  OptionType,
  OptionsCardProps,
  QRInputValues,
} from "../types/optionsCard";

import { options, inputFields } from "../constants/optionsCard";
import QR from "../assets/icons/QR.svg";
import { useState } from "react";
import DropdownCard from "./DropdownCard";
import { generateQR } from "../../api/qrGenerator";
import { qrRequestSchema } from "../schemas/qrSchema";
import Loading from "./Loading";

function OptionsCard({ onQRGenerated, loading, setLoading }: OptionsCardProps) {
  const [selectedOption, setSelectedOption] = useState<OptionType>("URL");
  const [qrColor, setQrColor] = useState("#2563eb");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState("300x300");
  const [format, setFormat] = useState("SVG");

  const [formData, setFormData] = useState<QRInputValues>({
    url: "",
    text: "",
    ssid: "",
    password: "",
    email: "",
    phone: "",
    message: "",
  });

  const canSubmit = Object.values(formData).some(
    (value) => value.trim() !== "",
  );

  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setInputError("");
  };

  const handleSubmit = async () => {
    console.log("Started");
    setLoading(true);
    setError("");
    setInputError("");

    try {
      const selectedFormat = format.toLowerCase() as QRFormat;

      const requestData = {
        type: selectedOption.toLowerCase() as
          | "url"
          | "text"
          | "wifi"
          | "email"
          | "phone"
          | "sms",
        ...formData,
        color: qrColor,
        background: backgroundColor,
        size: Number(size.split("x")[0]),
        format: selectedFormat,
      };

      const validation = qrRequestSchema.safeParse(requestData);

      if (!validation.success) {
        setInputError(validation.error.issues[0]?.message ?? "Invalid input");
        setFormData({
          url: "",
          text: "",
          ssid: "",
          password: "",
          email: "",
          phone: "",
          message: "",
        });
        return;
      }

      const blob = await generateQR(validation.data);

      const imageUrl = URL.createObjectURL(blob);

      onQRGenerated(imageUrl, selectedFormat);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to generate QR code",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-[clamp(0.1rem,3.6vh,10rem)] bg-white rounded-3xl border-0.5 border-black shadow-[0_2px_4px_rgba(0,0,0,0.25)] py-[clamp(0.1rem,3vh,10rem)] px-[clamp(0.1rem,4vw,10rem)] ">
      {/* Options container */}
      <div className="w-full flex justify-start items-center gap-[clamp(0.1rem,2vh,10rem)] ">
        {Object.entries(options).map(([option, { icon, iconSelected }]) => (
          <div
            key={option}
            className={`flex justify-center items-center gap-[clamp(0.1rem,1.5vh,10rem)] px-[clamp(0.1rem,2vw,10rem)] py-[clamp(0.1rem,1.3vh,10rem)] rounded-lg cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.1)] text-[clamp(0.1rem,2vh,10rem)] font-jakartaSemibold ${selectedOption === option ? "bg-blue/10 text-blue/80" : "bg-white/80 text-black/80"} hover:bg-blue/10 transition-all ease-in-out duration-75`}
            onClick={() => {
              setSelectedOption(option as OptionType);
              setInputError("");
            }}
          >
            <img
              src={selectedOption === option ? iconSelected : icon}
              alt={option}
              className="h-[clamp(0.1rem,2.2vh,10rem)]"
            />
            <span>{option}</span>
          </div>
        ))}
      </div>

      {/* Inputs container */}
      <div className="w-full flex flex-col items-start text-[clamp(0.1rem,2vh,10rem)] font-jakartaBold gap-[clamp(0.1rem,1.5vh,10rem)]">
        <p>Enter your {selectedOption}</p>

        <div className="w-full flex items-center gap-[clamp(0.1rem,2vh,10rem)]">
          {inputFields[selectedOption].map((field) => (
            <div
              key={field.name}
              className={`flex-1 min-w-0 flex justify-start items-center px-[clamp(0.1rem,1.5vw,10rem)] py-[clamp(0.1rem,1.5vh,10rem)] border ${inputError ? "border-red-500" : "border-black/20"} rounded-lg gap-[clamp(0.1rem,2vh,10rem)]`}
            >
              <img
                src={field.icon}
                alt={""}
                className="h-[clamp(0.1rem,2.3vh,10rem)] opacity-50 shrink-0"
              />

              <input
                type={field.type ?? "text"}
                name={field.name}
                placeholder={inputError || field.placeholder}
                required={field.required}
                onChange={handleChange}
                value={formData[field.name]}
                className={`font-jakartaSemibold border-none outline-none flex-1 min-w-0 ${inputError ? "text-red-500" : "text-black/80"}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Customize container */}
      <div className="w-full flex flex-col items-start text-[clamp(0.1rem,2vh,10rem)] font-jakartaBold gap-[clamp(0.1rem,1.5vh,10rem)]">
        <p>Customize</p>

        <div className="w-full h-full flex justify-between items-center gap-[clamp(0.1rem,2vh,10rem)]">
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
      <div
        className={`w-full h-[clamp(0.1rem,6vh,10rem)] flex justify-center items-center bg-blue text-white/90 font-jakartaBold text-[clamp(0.1rem,2.2vh,10rem)] gap-[clamp(0.1rem,0.7vh,10rem)]  rounded-lg ${canSubmit ? "cursor-pointer hover:bg-blue/90" : "cursor-not-allowed bg-blue/50"} transition-all ease-in-out duration-200`}
        onClick={canSubmit ? handleSubmit : undefined}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <img src={QR} alt="QR" className="h-[clamp(0.1rem,2.5vh,10rem)]" />
            <p>Generate QR Code</p>
          </>
        )}
      </div>
    </div>
  );
}

export default OptionsCard;
