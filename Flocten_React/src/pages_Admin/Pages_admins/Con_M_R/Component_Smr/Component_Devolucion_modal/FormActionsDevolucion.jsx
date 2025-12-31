const FormActionsDevolucion = ({ 
  onCancel, 
  uploadingImages, 
  
  estado, 
  isSubmitting 
}) => (
  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
    <button
      type="button"
      onClick={onCancel}
      disabled={isSubmitting || uploadingImages}
      className="px-6 py-2 border-2 border-base-300 bg-base-100 text-base-content rounded-lg 
                 hover:bg-base-200 hover:border-base-400 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200 font-medium min-w-[100px]"
    >
      Cancelar
    </button>
    <button
      type="submit"
      disabled={isSubmitting || uploadingImages || estado.tipo === "excedente"}
      className="px-6 py-2 bg-primary text-primary-content rounded-lg 
                 hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed 
                 flex items-center transition-all duration-200 font-medium justify-center
                 shadow-sm hover:shadow-md min-w-[180px]"
    >
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Registrando...
        </>
      ) : uploadingImages ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Subiendo imágenes...
        </>
      ) : (
        "Registrar Devolución"
      )}
    </button>
  </div>
);

export default FormActionsDevolucion;