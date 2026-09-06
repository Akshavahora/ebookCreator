const SelectField = ({ icon: Icon, label, name, options, ...props }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-800"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
            <Icon className="h-4 w-4 text-slate-500" />
          </div>
        )}

        <select
          id={name}
          name={name}
          {...props}
          className={`
            h-11 w-full appearance-none rounded-xl
            border border-slate-300
            bg-white
            px-3 py-2
            text-sm font-medium text-slate-900
            outline-none
            transition-all
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-500/10
            ${Icon ? "pl-10" : ""}
          `}
        >
          {options.map((option) => (
            <option
              key={option.value || option}
              value={option.value || option}
              className="bg-white text-slate-900"
            >
              {option.label || option}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-4 w-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectField;