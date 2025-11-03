import UserGroupIcon from "@/assets/icons/ic_user_group";

interface QuickSearchButtonProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

export default function QuickSearchButton({
  title,
  subtitle,
  onClick,
}: QuickSearchButtonProps) {
  return (
    <div
      className="flex flex-col items-start px-[16px] py-[16px] justify-center gap-[12px] rounded-xl bg-opacity-500 border border-white cursor-pointer"
      onClick={onClick}
    >
      <UserGroupIcon width={24} height={24} />
      <div className="text-base font-medium">{title}</div>
      <div className="text-xs text-[#515151]">{subtitle}</div>
    </div>
  );
}
