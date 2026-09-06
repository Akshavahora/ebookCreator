import React from "react";

const InputField = ({ icon: Icon, label, name, ...props }) => {
  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-800"
      >
        {label}
      </label>

      {/* Input Wrapper */}
      <div className="relative">
        {/* Input Icon */}
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5">
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
            border-slate-300
            bg-white
            px-3
            py-2
            ${Icon ? "pl-10" : "pl-3"}
            text-sm
            font-medium
            text-slate-900
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-200
            hover:border-slate-400
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-500/10
          `}
        />
      </div>
    </div>
  );
};

export default InputField;