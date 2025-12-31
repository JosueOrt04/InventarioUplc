/**
 * Componente específico para inputs de fecha
 */
const DateInput = ({ value, onChange, name, placeholder, onFocus }) => {
  return (
    <input
      type="text"
      name={name}
      value={value ?? ""}
      onChange={onChange}
      required
      placeholder={placeholder}
      className="w-full border-2 border-base-300 bg-base-100 rounded-lg px-4 py-3
                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                 transition-all duration-200 hover:border-base-400 shadow-sm"
      onFocus={onFocus}
      readOnly
    />
  );
};

export default DateInput;
