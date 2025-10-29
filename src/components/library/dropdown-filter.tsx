export default function DropdownFilter({
  options,
  open,
  setSelectedFilter,
}: {
  options: string[];
  open: boolean;
  setSelectedFilter: (filter: string) => void;
}) {
  return (
    <ul
      className={`absolute right-0 top-full mt-[12px] inline-block whitespace-nowrap min-w-[180px] bg-white rounded-lg py-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] z-20 ${
        open ? "block" : "hidden"
      }`}
    >
      {options.map((option) => (
        <li
          key={option}
          onClick={() => {
            setSelectedFilter(option);
          }}
          className="px-[16px] py-[12px] flex items-center gap-[8px] text-body4 text-gray-950 hover:bg-gray-300 cursor-pointer"
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
