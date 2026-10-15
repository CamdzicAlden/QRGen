import type { QRFormat } from "./shared";

export interface ResultCardProps {
  imageUrl: string | null;
  format: QRFormat;
  loading: boolean;
}
