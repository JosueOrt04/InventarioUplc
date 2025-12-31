import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const FormInput = ({
  label,
  type = "text",
  icon: Icon,
  placeholder,
  value,
  onChange,
  name,
  maxLength,
  helperText,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="size-5 text-base-content/40" />
          </div>
        )}
        <input
          type={inputType}
          className={`input input-bordered w-full ${Icon ? "pl-10" : "pl-4"} ${
            showPasswordToggle ? "pr-10" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          maxLength={maxLength}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="size-5 text-base-content/40" />
            ) : (
              <Eye className="size-5 text-base-content/40" />
            )}
          </button>
        )}
      </div>
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
};

export default FormInput;
