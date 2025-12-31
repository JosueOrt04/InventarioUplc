const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-xl mb-4">Página no encontrada</p>
    <button 
      onClick={() => window.history.back()} 
      className="btn btn-primary"
    >
      Volver
    </button>
  </div>
);

export default NotFound;