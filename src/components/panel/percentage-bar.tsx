export default function PercentageBar({ percentage }: { percentage: number }) {
  const filledBars = Math.floor(percentage / 10);

  return (
    <div className="flex items-center justify-start gap-[4px]">
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className={`w-[12px] h-[24px] rounded-full ${
            index < filledBars ? "bg-primary-700" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
