import React from "react";
import SearchIcon from "@/assets/icons/ic_search";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}

export default function SearchBar({
  placeholder = "검색어를 입력하세요",
  value = "",
  onChange,
}: SearchBarProps) {
  return (
    <div className="w-full flex items-start justify-between py-[16px] px-[20px] bg-opacity-800 rounded-lg border border-white">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-body2 text-gray-950 placeholder:text-gray-700"
      />
      <SearchIcon color="#482A88" width={24} height={24} />
    </div>
  );
}
