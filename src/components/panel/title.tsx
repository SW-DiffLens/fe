export default function Title({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-start gap-[8px]">
      <div
        className="w-[40px] h-[40px] flex items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #FBEEFF 0.5%, #D1E4FE 100%)",
        }}
      >
        {icon}
      </div>
      <div className="text-h5 text-primary-950">{title}</div>
    </div>
  );
}
