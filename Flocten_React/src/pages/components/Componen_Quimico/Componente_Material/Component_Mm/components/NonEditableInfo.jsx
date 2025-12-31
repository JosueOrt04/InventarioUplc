import React from "react";

const NonEditableInfo = ({ codigo, createdAt }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-base-200 rounded-lg">
      <div>
        <label className="label">
          <span className="label-text font-semibold">Código</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={codigo}
          disabled
        />
        <label className="label">
          <span className="label-text-alt text-warning">Campo no editable</span>
        </label>
      </div>

      <div>
        <label className="label">
          <span className="label-text font-semibold">Fecha de Registro</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={new Date(createdAt).toLocaleDateString()}
          disabled
        />
        <label className="label">
          <span className="label-text-alt text-warning">Campo no editable</span>
        </label>
      </div>
    </div>
  );
};

export default NonEditableInfo;
