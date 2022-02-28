import React from "react";

const Input = ({
  id,
  className,
  name,
  type,
  placeholder,
  onClick,
  onChange,
  onKeyPress,
  value,
}) => {
  return (
    <input
      id={id}
      className={className}
      name={name}
      type={type}
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
      onKeyPress={onKeyPress}
      value={value}
    />
  );
};

export default Input;
