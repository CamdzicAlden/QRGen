import { options } from "../constants/optionsCard";
import type { QRFormat } from "./shared";

export type OptionType = keyof typeof options;

export type InputField = {
  name: keyof QRInputValues;
  placeholder: string;
  icon: string;
  type?: "text" | "email" | "tel";
  required: boolean;
};

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
