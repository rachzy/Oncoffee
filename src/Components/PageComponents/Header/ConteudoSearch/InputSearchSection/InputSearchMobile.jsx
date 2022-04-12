import React from 'react';

const InputSearchMobile = ({type, name, placeholder, value, onChange, onKeyPress}) => {
    return (
        <input type={type} name={name} placeholder={placeholder}  autoComplete="off" maxLength="300" value={value} onChange={onChange} onKeyPress={onKeyPress} />
    );
}
 
export default InputSearchMobile;