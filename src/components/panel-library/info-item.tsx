export default function InfoItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-start gap-[20px] w-full py-[16px] px-[20px] border border-white bg-opacity-300 rounded-xl">
      <div className="text-subtitle2 text-gray-700 w-[160px] text-start">
        {title}
      </div>
      <div className="text-subtitle2 text-gray-950 text-start flex-1 flex flex-wrap">
        {value}
      </div>
    </div>
  );
}
