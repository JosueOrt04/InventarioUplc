


const InfoField = ({ label, value, className = "" }) => (
  <div>
    <label className="text-sm font-medium text-gray-500 block mb-1">
      {label}
    </label>
    <p className={`text-sm text-gray-900 ${className}`}>
      {value}
    </p>
  </div>
);

export default InfoField;