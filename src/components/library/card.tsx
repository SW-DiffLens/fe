import Button from "@/components/button";
import Chip from "@/components/chip";

interface CardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  filters: string[];
  onSelect: (id: number) => void;
  onDeselect: (id: number) => void;
  selectedCards: number[];
}
export default function Card({
  id,
  title,
  description,
  tags,
  filters,
  onSelect,
  onDeselect,
  selectedCards,
}: CardProps) {
  return (
    <div className="w-full h-full bg-opacity-500 rounded-2xl px-[40px] py-[32px] flex flex-col items-start justify-start gap-[16px]">
      <input
        type="checkbox"
        id={`card-${id}`}
        className="w-[16px] h-[16px] rounded-sm border border-gray-900 bg-white"
        onChange={() => {
          if (selectedCards.includes(id)) {
            onDeselect(id);
          } else {
            onSelect(id);
          }
        }}
      />
      <div className="text-h6 text-gray-950">{title}</div>
      <div className="text-subtitle2 text-gray-700">{description}</div>
      <div className="flex items-center justify-start gap-[8px]">
        {tags.map((tag) => (
          <Chip key={tag} variant="filled" chipType="text">
            {tag}
          </Chip>
        ))}
      </div>
      <div className="flex flex-col items-start justify-center gap-[4px]">
        <div className="text-label text-gray-700">적용된 필터</div>
        <div className="flex items-center justify-start gap-[8px]">
          {filters.map((filter) => (
            <Chip key={filter} variant="outlined" chipType="text">
              {filter}
            </Chip>
          ))}
        </div>
      </div>
      <Button variant="filled" size="small" fullWidth>
        보기
      </Button>
    </div>
  );
}
