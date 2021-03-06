import { InputProps } from ".";

export const DefaultInput = ({
  label,
  name,
  type = "text",
  placeholder = label,
  required = false,
  defaultValue,
}: InputProps) => {
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={name}>
        {label}
        {required && <span className="text-red-600 pl-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="bg-gray-100 w-full px-1 py-2 rounded-md"
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
      />
    </div>
  );
};
