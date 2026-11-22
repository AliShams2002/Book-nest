type InputProps = {
  type: string;
  value: string;
  placeholder?: string;
  onChange: () => void;
  className: string;
};

const Input = ({
  type,
  value,
  placeholder,
  onChange,
  className,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${className}`}
    />
  );
};

export default Input;
