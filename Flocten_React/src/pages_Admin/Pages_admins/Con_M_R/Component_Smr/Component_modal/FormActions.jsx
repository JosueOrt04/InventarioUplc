const FormActions = ({ onCancel, onSubmit, loading, subiendoImagenes, isSubmitting }) => (
  <div className="flex justify-end space-x-3 pt-6 border-t border-base-300">
    <button
      type="button"
      onClick={onCancel}
      disabled={loading || subiendoImagenes || isSubmitting}
      className="px-6 py-3 border-2 border-base-300 bg-base-100 text-base-content rounded-lg 
                 hover:bg-base-200 hover:border-base-400 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200 font-medium min-w-[100px]"
    >
      Cancelar
    </button>
    <button
      type="submit"
      disabled={loading || subiendoImagenes || isSubmitting}
      className="px-6 py-3 bg-primary text-primary-content rounded-lg 
                 hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed 
                 flex items-center transition-all duration-200 font-medium justify-center
                 shadow-sm hover:shadow-md min-w-[180px]"
    >
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Registrando...
        </>
      ) : subiendoImagenes ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Subiendo imágenes...
        </>
      ) : (
        "Registrar Préstamo"
      )}
    </button>
  </div>
);

export default FormActions;