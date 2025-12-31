import { useLaboratorioData } from "../components/Componen_Informacion/hooks/useLaboratorioData";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

import LoadingState from "../components/Componen_Informacion/components/LoadingState";
import ErrorState from "../components/Componen_Informacion/components/ErrorState";
import EmptyState from "../components/Componen_Informacion/components/EmptyState";
import ReactivosSection from "../components/Componen_Informacion/components/ReactivosSection";
import HerramientasSection from "../components/Componen_Informacion/components/HerramientasSection";
import UsuariosSection from "../components/Componen_Informacion/components/UsuariosSection";
import FAQSection from "../components/Componen_Informacion/components/FAQSection";
import ReactivoModal from "../components/Componen_Informacion/components/ReactivoModal";
import HerramientaModal from "../components/Componen_Informacion/components/HerramintaModal";

const Inf_Readaptivos = () => {
  const { authUser } = useAuthStore();
  const { 
    reactivos, 
    herramientas, 
    usuarios, 
    loading, 
    error,
    // Funcionalidades de búsqueda
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    searchItems
  } = useLaboratorioData();

  const [selectedReactivo, setSelectedReactivo] = useState(null);
  const [selectedHerramienta, setSelectedHerramienta] = useState(null);
  const [showReactivoModal, setShowReactivoModal] = useState(false);
  const [showHerramientaModal, setShowHerramientaModal] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Verificar autenticación
  useEffect(() => {
    if (authUser) {
      setAuthChecked(true);
    } else {
      setAuthChecked(true);
    }
  }, [authUser]);

  // Manejar búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== searchTerm) {
        searchItems(searchInput);
        setSearchTerm(searchInput);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput, searchTerm]);

  const handleViewCompleteInfoReactivo = (reactivo) => {
    setSelectedReactivo(reactivo);
    setShowReactivoModal(true);
  };

  const handleViewCompleteInfoHerramienta = (herramienta) => {
    setSelectedHerramienta(herramienta);
    setShowHerramientaModal(true);
  };

  const closeReactivoModal = () => {
    setShowReactivoModal(false);
    setSelectedReactivo(null);
  };

  const closeHerramientaModal = () => {
    setShowHerramientaModal(false);
    setSelectedHerramienta(null);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  // Estados de carga y error
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingState />;
  
  if (error) {
    if (error.includes("Sesión expirada") || error.includes("No autenticado")) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8 bg-base-100 shadow-xl rounded-lg max-w-md">
            <div className="text-error text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-error mb-4">Sesión Expirada</h2>
            <p className="text-gray-600 mb-6">
              Tu sesión ha expirado o no estás autenticado. Por favor, inicia sesión nuevamente.
            </p>
            <button 
              onClick={() => window.location.href = '/login'}
              className="btn btn-primary"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      );
    }
    return <ErrorState error={error} />;
  }

  const hasData = searchResults.reactivos.length > 0 || 
                  searchResults.herramientas.length > 0 || 
                  searchResults.usuarios.length > 0;

  return (
    <div className="min-h-screen to-primary-content">
      {/* Header Mejorado con Buscador */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center bg-secondary-content pt-4 pb-8 rounded-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-8 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-shadow-transparent">
            Gestión de Laboratorio
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Sistema integral para el control de inventario de reactivos,
            herramientas y usuarios registrados
          </p>
          
          {/* Buscador */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
             <input
  type="text"
  value={searchInput}
  onChange={handleSearchChange}
  placeholder="Buscar reactivos, herramientas o usuarios..."
  className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-2xl text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  aria-label="Buscar en inventario"
/>
              {searchInput && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Busca reactivos y herramientas por código o nombre
            </p>
          </div>

          {/* Indicador de estado de autenticación */}
          <div className="mt-6 flex justify-center">
            <div className="bg-base-100 rounded-lg px-4 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    authUser ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
                <span className="text-sm text-gray-600">
                  {authUser ? `Autenticado como: ${authUser.controlNumber}` : "Modo de solo lectura"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de búsqueda */}
      {isSearching && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <div className="loading loading-spinner loading-sm"></div>
            <span>Buscando...</span>
          </div>
        </div>
      )}

      {/* Resultados de búsqueda */}
      {searchInput && !isSearching && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Resultados de búsqueda para: "{searchInput}"
                </h3>
                <p className="text-blue-600 text-sm">
                  {searchResults.reactivos.length} reactivos, {searchResults.herramientas.length} herramientas, {searchResults.usuarios.length} usuarios
                </p>
              </div>
              <button
                onClick={clearSearch}
                className="btn btn-sm btn-ghost text-blue-600 hover:text-blue-800"
              >
                Limpiar búsqueda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {searchInput ? searchResults.reactivos.length : reactivos.length}
            </h3>
            <p className="text-gray-600 text-sm">Reactivos</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {searchInput ? searchResults.herramientas.length : herramientas.length}
            </h3>
            <p className="text-gray-600 text-sm">Herramientas</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {searchInput ? searchResults.usuarios.length : usuarios.length}
            </h3>
            <p className="text-gray-600 text-sm">Usuarios</p>
          </div>
        </div>
      </div>

      {/* Mostrar mensaje si no hay resultados */}
      {searchInput && !isSearching && !hasData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-500">
              No hay reactivos, herramientas o usuarios que coincidan con "{searchInput}"
            </p>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      {hasData && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-8">
            {/* Sección de Reactivos - Solo mostrar si hay resultados */}
            {searchResults.reactivos.length > 0 && (
              <section>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            Inventario de Reactivos
                          </h2>
                          <p className="text-blue-100 text-sm mt-1">
                            {searchResults.reactivos.length} elementos {searchInput ? "encontrados" : "registrados"}
                          </p>
                        </div>
                      </div>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {searchResults.reactivos.length}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
                    <ReactivosSection
                      reactivos={searchResults.reactivos}
                      onViewCompleteInfo={handleViewCompleteInfoReactivo}
                      searchTerm={searchInput}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Sección de Herramientas - Solo mostrar si hay resultados */}
            {searchResults.herramientas.length > 0 && (
              <section>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            Inventario de Herramientas
                          </h2>
                          <p className="text-green-100 text-sm mt-1">
                            {searchResults.herramientas.length} herramientas {searchInput ? "encontradas" : "disponibles"}
                          </p>
                        </div>
                      </div>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {searchResults.herramientas.length}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-green-50">
                    <HerramientasSection
                      herramientas={searchResults.herramientas}
                      onViewCompleteInfo={handleViewCompleteInfoHerramienta}
                      searchTerm={searchInput}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Sección de Usuarios - Solo mostrar si hay resultados */}
            {searchResults.usuarios.length > 0 && (
              <section>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            Lista de Usuarios
                          </h2>
                          <p className="text-purple-100 text-sm mt-1">
                            {searchResults.usuarios.length} usuarios {searchInput ? "encontrados" : "registrados"}
                          </p>
                        </div>
                      </div>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {searchResults.usuarios.length}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-purple-50">
                    <UsuariosSection 
                      usuarios={searchResults.usuarios} 
                      searchTerm={searchInput}
                    />
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sección de FAQs - Solo mostrar cuando no hay búsqueda activa */}
          {!searchInput && (
            <section className="mt-16">
              <FAQSection />
            </section>
          )}
        </main>
      )}

      {/* Modales */}
      {showReactivoModal && selectedReactivo && (
        <ReactivoModal
          reactivo={selectedReactivo}
          onClose={closeReactivoModal}
        />
      )}

      {showHerramientaModal && selectedHerramienta && (
        <HerramientaModal
          herramienta={selectedHerramienta}
          onClose={closeHerramientaModal}
        />
      )}
    </div>
  );
};

export default Inf_Readaptivos;