import React from "react";

const InputField = ({ name, label, register, type, defaultValue, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <input
        {...rest}
        type={type}
        className="form-control"
        id={name}
        defaultValue={defaultValue}
        {...register(name, defaultValue={defaultValue})}
      />
    </div>
  );
};

export default InputField;
