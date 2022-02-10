import React from 'react';

const InputSearchMobile = ({type, name, placeholder, value, onChange, onKeyPress}) => {
    return (
        <input autoComplete="off" type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onKeyPress={onKeyPress} />
    );
}
 
export default InputSearchMobile;