import React from "react";

const TextArea = ({ name, label, register, type, defaultValue, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <textarea
        {...rest}
        type={type}
        className="form-control"
        id={name}
        {...register(name, { defaultValue })}
      />
    </div>
  );
};

export default TextArea;
