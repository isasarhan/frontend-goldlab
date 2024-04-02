import React from "react";

const DateField = ({ name, label, register, defaultValue, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div >
        <input
        className="form-control"
          type="date"
          id={name}
          {...register(name)}
          {...rest}
        />
      </div>
    </div>
  );
};

export default DateField;
