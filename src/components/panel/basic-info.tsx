export default function BasicInfo({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between w-full gap-[8px] py-[12px] px-[4px] border-b border-gray-300">
      <div className="text-subtitle1 text-gray-700">{title}</div>
      <div className="text-body4 text-gray-950">{value}</div>
    </div>
  );
}
