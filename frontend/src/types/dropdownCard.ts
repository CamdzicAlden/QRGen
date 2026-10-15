export type DropdownCardProps = {
  title: string;
  type: "color" | "select";
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  defaultValue?: string;
};
