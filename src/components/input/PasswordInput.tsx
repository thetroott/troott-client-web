import React, { useState, useEffect, useContext } from "react";
import { IPasswordInput } from "../../utils/interface.util";
import { Link } from "react-router-dom";

const PasswordInput = (props: IPasswordInput) => {

  const {
    placeholder, 
    name, 
    id, 
    ref,
    hasIcon = false, 
    icon = 'fe-user',
    defaultValue,
    autoComplete,
    className,
    showFocus,
    onChange,
  } = props

  const [passwordType, setPasswordType] = useState<string>('password')

  useEffect(() => {

  }, []);

  const toggleType = (e?: any) => {
      
      if(e) { e.preventDefault() }
       
      if(passwordType === 'password') {
        setPasswordType('text')
      } else {
        setPasswordType('password')
      }
  }

  return (
    <>
      <div className="form-group ui-relative mrgb1">
        {
          hasIcon &&
          <span className={`fe ${icon} ui-absolute input-icon brand-gray`}></span>
        }

        <Link onClick={(e) => toggleType(e)} to='' >
            <span className={`fe fe-${passwordType === 'password' ? 'eye' : 'eye-off'} ui-absolute eye-icon brand-gray`}></span>
        </Link>
        
        <input 
        ref={ref}
        id={id ? id : ''}
        name={name ? name : ''} 
        type={passwordType}
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

export default PasswordInput;
