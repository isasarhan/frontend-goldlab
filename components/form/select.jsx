import React from "react";

const SelectField = ({ name, options = [], label, onChange,register, defaultValue, ...rest }) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <select {...rest} className="form-select"  onChange={()=>onChange()} {...register(name)} >
      <option value="">Choose Option</option>
        {options &&
          options.map((option) => (
            <option value={option._id} key={"name" + option._id}>
              {option.cname}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectField;
