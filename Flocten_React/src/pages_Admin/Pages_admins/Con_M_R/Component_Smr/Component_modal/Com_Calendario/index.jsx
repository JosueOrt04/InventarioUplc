import { useState, useRef, useEffect } from "react";
import Calendar from "./Component/Calendar";
import InputLabel from "./Component/InputLabel";
import HelperText from "./Component/HelperText";
import UnitDisplay from "./Component/UnitDisplay";
import CalendarIcon from "./Component/CalendarIcon";
import DateInput from "./Component/DateInput";
import StandardInput from "./Component/StandardInput";


/**
 * Componente de campo de entrada reutilizable
 * Soporta diferentes tipos: text, number, date (con calendario personalizado)
 */
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  min,
  max,
  step,
  placeholder,
  helperText,
  unit,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Renderizar campo de fecha con calendario personalizado
  if (type === "date") {
    return (
      <div className="space-y-2 relative">
        <InputLabel label={label} required={required} />
        
        <div className="relative" ref={calendarRef}>
          <DateInput
            value={value}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            onFocus={() => setShowCalendar(true)}
          />
          
          <CalendarIcon onToggle={() => setShowCalendar(!showCalendar)} />
          
          {showCalendar && (
            <Calendar
              onDateSelect={onChange}
              onClose={() => setShowCalendar(false)}
              value={value}
              name={name}
            />
          )}
        </div>

        <HelperText text={helperText} />
      </div>
    );
  }

  // Renderizar campo de entrada estándar (text, number, etc.)
  return (
    <div className="space-y-2">
      <InputLabel label={label} required={required} />
      
      <div className="relative">
        <StandardInput
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          required={required}
          placeholder={placeholder}
        />
        
        <UnitDisplay unit={unit} />
      </div>

      <HelperText text={helperText} />
    </div>
  );
};

export default InputField;
