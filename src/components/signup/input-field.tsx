export default function InputField({
  label,
  type,
  placeholder,
  description,
  error = false,
  id,
}: {
  label: string;
  type: string;
  placeholder: string;
  description: string;
  error?: boolean;
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-[4px] w-full">
      <div className="flex flex-col gap-[8px] w-full">
        <div className="text-body5 text-primary-900 w-full text-left">
          {label}
        </div>
        <input
          id={id}
          type={type}
          className="w-full px-[16px] py-[12px] bg-opacity-800 border-t-0 border-x-0 border-b-1 border-primary-900 placeholder:text-gray-500 placeholder:text-body4 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
      {description && (
        <div
          className={`text-caption w-full text-left ${
            error ? "text-error-default" : "text-gray-600"
          }`}
        >
          {description}
        </div>
      )}
    </div>
  );
}
