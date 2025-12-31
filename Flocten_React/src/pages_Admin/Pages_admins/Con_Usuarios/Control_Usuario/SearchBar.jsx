const SearchBar = ({ searchTerm, setSearchTerm, onRefresh }) => {
  return (
    <div className="bg-base-100 p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="form-control flex-1">
          <div className="input-group">
            <input
              type="text"
              placeholder="Buscar por nombre o número de control..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={onRefresh}>
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;