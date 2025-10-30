export default function CompareBar({
  leftPercent = 30,
  rightPercent = 70,
  label = "특성1",
}: {
  leftPercent?: number;
  rightPercent?: number;
  label?: string;
}) {
  return (
    <div className="w-full gap-[20px]">
      <div className="w-full flex flex-col items-center justify-center gap-[4px]">
        <div className="w-full flex items-center justify-between">
          <div className="text-h6 text-secondary-300">{leftPercent}%</div>
          <div className="text-body4 text-gray-950">{label}</div>
          <div className="text-h6 text-tertiary-300">{rightPercent}%</div>
        </div>
      </div>
      <div className="w-full h-[28px] flex rounded-2xl border border-white overflow-hidden">
        <div
          className="h-full bg-secondary-300"
          style={{ width: `${leftPercent}%` }}
        />
        <div
          className="h-full bg-tertiary-300"
          style={{ width: `${rightPercent}%` }}
        />
      </div>
    </div>
  );
}
