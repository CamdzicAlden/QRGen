import dropdown from "../assets/icons/dropdown.svg";
import type { DropdownCardProps } from "../types/dropdownCard";

function DropdownCard({
  title,
  type,
  value,
  onChange,
  options = [],
  defaultValue,
}: DropdownCardProps) {
  const validateColor = (color: string): void => {
    const isValid = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/i.test(
      color,
    );

    onChange(isValid ? color : defaultValue || "#000000");
  };

  return (
    <div className="bg-white border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.1)] py-[clamp(0.1rem,1.2vh,10rem)] pl-[clamp(0.1rem,1.5vw,10rem)] flex flex-col items-start gap-[clamp(0.1rem,1vh,10rem)] flex-1 min-w-0 h-full rounded-2xl">
      {/* Card title */}
      <p className="text-[clamp(0.1rem,2vh,10rem)] font-jakartaBold text-black/50">
        {title}
      </p>

      {/* Color picker */}
      {type === "color" && (
        <div className="w-full flex justify-start items-center gap-[clamp(0.1rem,1.5vh,10rem)]">
          <input
            type="color"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label={title}
            className="color-picker w-auto h-auto shrink-0 cursor-pointer"
          />

          <input
            type="text"
            value={value.toUpperCase()}
            onChange={(event) => onChange(event.target.value)}
            onBlur={(event) => validateColor(event.target.value)}
            aria-label={title}
            className="text-[clamp(0.1rem,2vh,10rem)] text-black/50 w-full border-none outline-none p-0 bg-transparent"
            maxLength={9}
          />
        </div>
      )}

      {/* Select dropdown */}
      {type === "select" && (
        <div className="relative w-full flex items-center">
          <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label={title}
            className="w-full appearance-none bg-transparent pr-[clamp(0.1rem,1.5vw,10rem)] outline-none cursor-pointer text-[clamp(0.1rem,2vh,10rem)] font-jakartaSemibold text-black/80"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <img
            src={dropdown}
            alt=""
            aria-hidden="true"
            className={`h-[clamp(0.1rem,2vh,10rem)] w-auto absolute right-3`}
          />
        </div>
      )}
    </div>
  );
}

export default DropdownCard;
