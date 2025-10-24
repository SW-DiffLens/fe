import Chip from "@/components/chip";
import { useState, useEffect } from "react";

interface FilterSectionProps {
  title: string;
  chips: {
    id: number;
    title: string;
  }[];
  onSelectionChange?: (selectedCount: number) => void;
  reset?: boolean;
}

export default function FilterSection({
  title,
  chips,
  onSelectionChange,
  reset = false,
}: FilterSectionProps) {
  const [selectedChips, setSelectedChips] = useState<number[]>([]);

  useEffect(() => {
    if (reset) {
      setSelectedChips([]);
      onSelectionChange?.(0);
    }
  }, [reset, onSelectionChange]);

  const handleChipClick = (id: number) => {
    let newSelectedChips;
    if (selectedChips.includes(id)) {
      newSelectedChips = selectedChips.filter((chip) => chip !== id);
    } else {
      newSelectedChips = [...selectedChips, id];
    }
    setSelectedChips(newSelectedChips);
    onSelectionChange?.(newSelectedChips.length);
  };
  return (
    <div className="w-full flex flex-col items-start justify-center gap-[12px]">
      <div className="text-subtitle2 text-gray-950">{title}</div>
      <div className="w-[460px] flex flex-wrap items-center justify-start gap-[4px]">
        {chips.map((chip) => (
          <Chip
            key={chip.id}
            variant={selectedChips.includes(chip.id) ? "selected" : "outlined"}
            chipType="text"
            clearIcon="off"
            onClick={() => handleChipClick(chip.id)}
          >
            {chip.title}
          </Chip>
        ))}
      </div>
    </div>
  );
}
