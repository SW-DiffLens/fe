export default function DistributionBox({
  title,
  categories,
}: {
  title: string;
  categories: { name: string; groupA: number; groupB: number }[];
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-[12px]">
      <div className="text-subtitle2 text-gray-700 w-full text-start">
        {title}
      </div>
      <div className="w-full grid grid-cols-2 gap-[40px]">
        {/* A 그룹 */}
        <div className="w-full flex flex-col items-center justify-center gap-[16px] py-[30px] px-[22px] bg-[#FDE7FF]/50 rounded-xl border border-white">
          {categories.map((category) => (
            <div
              key={`groupA-${category.name}`}
              className="w-full flex items-center justify-between"
            >
              <div className="text-body5 text-gray-950">{category.name}</div>
              <div className="flex items-center justify-center gap-[12px]">
                <div className="w-[200px] h-[10px] flex rounded-2xl border border-white overflow-hidden">
                  <div
                    className="h-full bg-gray-300"
                    style={{ width: `${100 - category.groupA}%` }}
                  />
                  <div
                    className="h-full bg-secondary-300"
                    style={{ width: `${category.groupA}%` }}
                  />
                </div>
                <div className="text-subtitle2 text-secondary-500 w-[38px] text-right">
                  {category.groupA}%
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* B 그룹 */}
        <div className="w-full flex flex-col items-center justify-center gap-[16px] py-[30px] px-[22px] bg-[#DAE7FF]/50 rounded-xl border border-white">
          {categories.map((category) => (
            <div
              key={`groupB-${category.name}`}
              className="w-full flex items-center justify-between"
            >
              <div className="text-body5 text-gray-950">{category.name}</div>
              <div className="flex items-center justify-center gap-[12px]">
                <div className="w-[200px] h-[10px] flex rounded-2xl border border-white overflow-hidden">
                  <div
                    className="h-full bg-gray-300"
                    style={{ width: `${100 - category.groupB}%` }}
                  />
                  <div
                    className="h-full bg-tertiary-300"
                    style={{ width: `${category.groupB}%` }}
                  />
                </div>
                <div className="text-subtitle2 text-tertiary-500 w-[38px] text-right">
                  {category.groupB}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
