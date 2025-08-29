import React ,{forwardRef} from 'react'

function Input({ label, type = "text", id, name, className = "", ...props }, ref) {
  const inputId = id || name;
  return (
    <div>
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input)
