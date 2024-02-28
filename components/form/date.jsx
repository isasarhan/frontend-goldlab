import React from "react";

const DateField = ({ name, label, register, defaultValue, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="form-control">
        <input
          type="date"
          id={name}
          {...register(name)}
        />
      </div>
    </div>
  );
};

export default DateField;
