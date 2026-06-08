export default function InputField({
  label,
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  id: string;
  value: string;
  placeholder: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? undefined}
        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      />
    </div>
  );
}
