import dropdown from "../assets/icons/dropdown.svg";

function DropdownCard({ title }: { title: string }) {
  return (
    <div className="bg-white border border-black/10 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] py-2 px-4 flex flex-col items-start gap-2 flex-1">
      <p className="text-sm font-jakartaBold text-black/50">{title}</p>

      <div className="w-full flex justify-between items-center">
        <div className="w-2 h-2 rounded-[50%] bg-blue"></div>
        <img src={dropdown} alt="D" />
      </div>
    </div>
  );
}

export default DropdownCard;
