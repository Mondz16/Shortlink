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
      <label
        htmlFor={id}
        style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? undefined}
        className="input"
      />
    </div>
  );
}
