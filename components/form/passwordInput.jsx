import React from "react";

const PasswordField = ({
  name,
  label,
  register,
  type,
  defaultValue,
  icon,
  onShowPassword,
  ...rest
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <div className="input-group mb-3">
        <input
          {...rest}
          type={type}
          id={name}
          defaultValue={defaultValue}
          {...register(name, (defaultValue = { defaultValue }))}
          className="form-control"
          aria-label={label}
        />
        <a className="input-group-text btn btn-primary" type="button" htmlFor={name} onClick={onShowPassword}>
          {icon}
        </a>
      </div>
    </div>
  );
};

export default PasswordField;
