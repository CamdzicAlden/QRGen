import { options } from "../constants/optionsCard";

export type OptionType = keyof typeof options;

export type InputField = {
  name: string;
  placeholder: string;
  icon: string;
  type?: "text" | "email" | "tel";
  required: boolean;
};

export type QRFormat = "svg" | "png";

export interface OptionsCardProps {
  onQRGenerated: (imageUrl: string, format: QRFormat) => void;
}

export type QRInputValues = {
  url: string;
  text: string;
  ssid: string;
  password: string;
  email: string;
  phone: string;
  message: string;
};
