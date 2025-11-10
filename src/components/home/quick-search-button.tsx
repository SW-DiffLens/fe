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
      className="flex cursor-pointer flex-col items-start justify-center gap-[12px] rounded-xl border border-white bg-opacity-500 px-[16px] py-[16px]"
      onClick={onClick}
    >
      <UserGroupIcon width={24} height={24} />
      <div className="font-medium text-base">{title}</div>
      <div className="text-[#515151] text-xs">{subtitle}</div>
    </div>
  );
}
