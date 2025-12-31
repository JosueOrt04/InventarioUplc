import SectionWrapper from "./SectionWrapper"; // ✅ Agrega esta línea
import InfoField from "./InfoField";

const ItemInfoSection = ({ prestamo }) => (
  <SectionWrapper title="📦 Información del Item">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <InfoField
        label="Nombre del Item"
        value={prestamo.nombreItem}
        className="font-medium"
      />
      <ItemTypeBadge tipo={prestamo.tipoItem} />
      <InfoField
        label="ID del Item"
        value={prestamo.itemId}
        className="font-mono truncate"
      />
      <InfoField
        label="Referencia"
        value={prestamo.tipoItem === "Reactivo" ? "Reactivo" : "Herramienta"}
      />
    </div>
  </SectionWrapper>
);

const ItemTypeBadge = ({ tipo }) => (
  <div>
    <label className="text-sm font-medium text-gray-500 block mb-1">Tipo</label>
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        tipo === "Reactivo"
          ? "bg-purple-100 text-purple-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {tipo}
    </span>
  </div>
);

export default ItemInfoSection;
