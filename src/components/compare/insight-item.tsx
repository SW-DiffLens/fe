export default function InsightItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-[8px] px-[40px] py-[20px] bg-opacity-500 rounded-xl border border-white">
      <div className="text-subtitle1 text-gray-950">{title}</div>
      <div className="w-full h-[1px] bg-primary-300" />
      <div className="text-body5 text-gray-700">{description}</div>
    </div>
  );
}
