const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  required = false, 
  children,
  disabled = false 
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-base-content">
      {label} {required && <span className="text-error">*</span>}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full border-2 border-base-300 bg-base-100 rounded-lg px-4 py-3 pr-10 
                   focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                   transition-all duration-200 appearance-none cursor-pointer
                   hover:border-base-400 shadow-sm disabled:opacity-50"
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

export default SelectField;