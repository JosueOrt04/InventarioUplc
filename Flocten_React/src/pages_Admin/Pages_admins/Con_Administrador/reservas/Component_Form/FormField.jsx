
export const FormField = ({
  label,
  type = "text",
  register,
  error,
  options = [],
  disabled = false,
  placeholder = "",
  ...props
}) => {
  return (
    <div className="form-control">
      <label className="label">{label}</label>

      {type === "select" ? (
        <select
          className="select select-bordered"
          {...register}
          disabled={disabled}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          className="textarea textarea-bordered"
          {...register}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />
      ) : (
        <input
          type={type}
          className="input input-bordered"
          {...register}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />
      )}

      {error && (
        <span className="text-error text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};
