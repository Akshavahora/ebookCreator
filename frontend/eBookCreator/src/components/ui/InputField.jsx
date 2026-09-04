
import React from "react";

const InputField = ({
  icon: Icon,
  label,
  name,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-200"
      >
        {label}
      </label>

      {/* Input Wrapper */}
      <div className="relative">
        {/* Input Icon */}
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon className="h-4 w-4 text-gray-500" />
          </div>
        )}

        {/* Input */}
        <input
          id={name}
          name={name}
          {...props}
          className={`
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.05]
            px-3
            py-2
            ${Icon ? "pl-10" : "pl-3"}
            text-white
            placeholder:text-gray-600
            outline-none
            transition-all
            duration-200
            hover:border-white/20
            focus:border-violet-500/60
            focus:bg-white/[0.07]
            focus:ring-2
            focus:ring-violet-500/10
          `}
        />
      </div>
    </div>
  );
};

export default InputField;

