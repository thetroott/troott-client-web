import React, { useState, useEffect, useContext } from "react";
import { ITextInput } from "../../utils/interface.util";

const TextInput = (props: ITextInput) => {

  const {
    placeholder, 
    type, 
    name, 
    id, 
    hasIcon = false, 
    icon,
    defaultValue,
    autoComplete,
    className,
    showFocus,
    onChange,
  } = props


  useEffect(() => {

  }, []);

  return (
    <>
      <div className="form-group ui-relative mrgb1">
        {
          hasIcon &&
          <span className={`fe ${icon} ui-absolute input-icon brand-gray`}></span>
        } 
        
        <input 
        id={id ? id : ''}
        type={type} 
        name={name ? name : ''} 
        placeholder={placeholder ? placeholder : 'Type here'}
        defaultValue={defaultValue ? defaultValue : ''}
        onChange={onChange}
        autoComplete={autoComplete ? 'on' : 'off'}
        className={`form-control ${showFocus ? showFocus : ''} ${hasIcon ? 'pdl3' : 'pdl2'} font-dmsans ${className ? className : ''}`}
        />
      
      </div>
    </>
  );
};

export default TextInput;
