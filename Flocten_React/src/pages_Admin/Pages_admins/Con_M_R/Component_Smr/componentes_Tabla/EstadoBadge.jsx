const EstadoBadge = ({ estado }) => {
  const config = {
    activo: { color: "bg-green-100 text-green-800", text: "Activo" },
    devuelto: { color: "bg-blue-100 text-blue-800", text: "Devuelto" },
    atrasado: { color: "bg-red-100 text-red-800", text: "Atrasado" },
    incompleto: { color: "bg-orange-100 text-orange-800", text: "Incompleto" },
  };

  const { color, text } = config[estado] || {
    color: "bg-gray-100 text-gray-800",
    text: estado,
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {text}
    </span>
  );
};

export default EstadoBadge;
