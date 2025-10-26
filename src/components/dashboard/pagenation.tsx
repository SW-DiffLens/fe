import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import ChevronRightIcon from "@/assets/icons/ic_chevron_right";
export default function Pagenation() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex items-center justify-center px-[8px] py-[8px] cursor-pointer">
        <ChevronLeftIcon color="#9E9E9E" width={24} height={24} />
      </div>
      <div className="flex items-center justify-center px-[8px] py-[8px] cursor-pointer">
        <div className="text-button-medium text-primary-600 px-[8px]">1</div>
      </div>
      <div className="flex items-center justify-center px-[8px] py-[8px] cursor-pointer">
        <div className="text-button-medium text-gray-700 px-[8px]">2</div>
      </div>
      <div className="flex items-center justify-center px-[8px] py-[8px] cursor-pointer">
        <div className="text-button-medium text-gray-700 px-[8px]">3</div>
      </div>
      <div className="flex items-center justify-center px-[8px] py-[8px] cursor-pointer">
        <div className="text-button-medium text-gray-700 px-[8px]">4</div>
      </div>
      <div className="flex items-center justify-center px-[8px] py-[8px] cursor-pointer">
        <div className="text-button-medium text-gray-700 px-[8px]">5</div>
      </div>
      <div className="flex items-center justify-center px-[8px] py-[8px] cursor-pointer">
        <div className="text-button-medium text-gray-700 px-[8px]">...</div>
      </div>
      <div className="flex items-center justify-center px-[8px] py-[8px] cursor-pointer">
        <div className="text-button-medium text-gray-700 px-[8px]">10</div>
      </div>
      <div className="flex items-center justify-center gap-[8px] cursor-pointer">
        <ChevronRightIcon width={24} height={24} />
      </div>
    </div>
  );
}
