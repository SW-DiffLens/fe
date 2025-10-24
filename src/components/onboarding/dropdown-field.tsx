import { useEffect, useRef, useState } from "react";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down";

export default function DropdownField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: string[];
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  // 외부 value 변경 시 내부 표시값 동기화
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="text-body5 text-primary-900 w-full text-left">
        {label}
      </div>
      <div className="relative" ref={selectRef}>
        <div
          onClick={() => setShowOptions((prev) => !prev)}
          className={`flex w-full justify-between items-center px-[16px] py-[12px] bg-white border border-gray-500 rounded-lg focus:outline-none text-body4 text-gray-500 cursor-pointer ${
            currentValue.length === 0 ? "text-gray-500" : "text-gray-950"
          }`}
        >
          {currentValue.length === 0 ? placeholder : currentValue}
          <ChevronDownIcon color="#757575" width={24} height={24} />
        </div>
        <ul
          className={`${
            showOptions ? "block" : "hidden"
          } absolute left-0 w-full bg-white rounded-lg h-[240px] overflow-y-scroll mt-[8px] py-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] custom-scrollbar z-10`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              value={option}
              onClick={() => {
                setCurrentValue(option);
                onChange(option);
                setShowOptions(false);
              }}
              className="w-full px-[16px] py-[12px] text-body4 text-gray-950 hover:bg-gray-300 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
