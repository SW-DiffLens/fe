export default function BasicInfo({
  title,
  groupA,
  groupB,
}: {
  title: string;
  groupA: string;
  groupB: string;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-[16px] py-[20px] bg-opacity-500 rounded-xl border border-white">
      <div className="text-subtitle2 text-gray-700">{title}</div>
      <div className="text-subtitle1 text-secondary-500">{groupA}</div>
      <div className="text-subtitle1 text-tertiary-500">{groupB}</div>
    </div>
  );
}
