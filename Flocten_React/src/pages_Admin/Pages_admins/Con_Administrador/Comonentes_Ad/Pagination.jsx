// components/Con_Administrador/Pagination.jsx
import React from "react";

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // ✅ Generar números de página dinámicamente
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Número máximo de páginas visibles

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Ajustar si estamos cerca del final
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* ✅ Información de registros */}
        <div className="text-sm text-base-content/70">
          Mostrando{" "}
          <span className="font-semibold">
            {startItem}-{endItem}
          </span>{" "}
          de <span className="font-semibold">{totalItems}</span> registros
          {totalPages > 1 && (
            <span className="ml-2">
              (Página {currentPage} de {totalPages})
            </span>
          )}
        </div>

        {/* ✅ Navegación de páginas - solo si hay más de 1 página */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            {/* Botón Anterior */}
            <button
              className="btn btn-sm btn-outline"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              ⬅️ Anterior
            </button>

            {/* Números de página */}
            <div className="join">
              {/* Mostrar primera página si no está visible */}
              {!pageNumbers.includes(1) && (
                <>
                  <button
                    className={`join-item btn btn-sm ${
                      currentPage === 1 ? "btn-active" : ""
                    }`}
                    onClick={() => onPageChange(1)}
                  >
                    1
                  </button>
                  {!pageNumbers.includes(2) && (
                    <span className="join-item btn btn-sm btn-disabled">
                      ...
                    </span>
                  )}
                </>
              )}

              {/* Páginas visibles */}
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  className={`join-item btn btn-sm ${
                    currentPage === page ? "btn-active" : ""
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              ))}

              {/* Mostrar última página si no está visible */}
              {!pageNumbers.includes(totalPages) && (
                <>
                  {!pageNumbers.includes(totalPages - 1) && (
                    <span className="join-item btn btn-sm btn-disabled">
                      ...
                    </span>
                  )}
                  <button
                    className={`join-item btn btn-sm ${
                      currentPage === totalPages ? "btn-active" : ""
                    }`}
                    onClick={() => onPageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Botón Siguiente */}
            <button
              className="btn btn-sm btn-outline"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Siguiente ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
