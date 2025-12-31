/**
 * Componente para la etiqueta del campo
 */
const InputLabel = ({ label, required }) => (
  <label className="block text-sm font-semibold text-base-content">
    {label} {required && <span className="text-error">*</span>}
  </label>
);

export default InputLabel;
