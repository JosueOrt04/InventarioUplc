import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full mb-4">
      <input
        type="text"
        placeholder="Buscar por código o nombre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input input-bordered w-full bg-base-100"
      />
    </div>
  );
};

export default SearchBar;
