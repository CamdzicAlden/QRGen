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
import password from "../assets/icons/password.svg";

import type { OptionType, InputField } from "../types/optionsCard";

export const options = {
  URL: { icon: url, iconSelected: urlBlue },
  Text: { icon: text, iconSelected: textBlue },
  WiFi: { icon: wifi, iconSelected: wifiBlue },
  Email: { icon: email, iconSelected: emailBlue },
  Phone: { icon: phone, iconSelected: phoneBlue },
  SMS: { icon: sms, iconSelected: smsBlue },
};

export const inputFields: Record<OptionType, InputField[]> = {
  URL: [
    {
      name: "url",
      placeholder: "https://www.example.com",
      icon: url,
      required: true,
    },
  ],

  Text: [
    {
      name: "text",
      placeholder: "Enter your text",
      icon: text,
      required: true,
    },
  ],

  WiFi: [
    {
      name: "ssid",
      placeholder: "Network name",
      icon: wifi,
      required: true,
    },
    {
      name: "password",
      placeholder: "Password",
      icon: password,
      required: true,
    },
  ],

  Email: [
    {
      name: "email",
      placeholder: "example@gmail.com",
      icon: email,
      type: "email",
      required: true,
    },
  ],

  Phone: [
    {
      name: "phone",
      placeholder: "+387 61 123 456",
      icon: phone,
      type: "tel",
      required: true,
    },
  ],

  SMS: [
    {
      name: "phone",
      placeholder: "Phone number",
      icon: phone,
      type: "tel",
      required: true,
    },
    {
      name: "message",
      placeholder: "Message",
      icon: sms,
      required: false,
    },
  ],
};
