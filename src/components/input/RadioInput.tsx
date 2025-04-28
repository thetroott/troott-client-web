import React, { useState, useEffect, useContext } from "react";
import { IRadioInput} from "../../utils/interface.util";

const RadioInput = (props: IRadioInput) => {

  const {
    name, 
    id, 
    options,
    defaultValue,
    className,
    emailText,
    phoneNumber,
    onChange,
  } = props


  useEffect(() => {

  }, []);

  return (
    <>
      <div className="form-group ui-relative mrgb1">
               
        <input 
        id={id ? id : ''}
      
        name={name ? name : ''} 
       
        defaultValue={defaultValue ? defaultValue : ''}
        onChange={onChange}
        
        className={`form-control 'pdl2' font-dmsans ${className ? className : ''}`}
        />
      
      </div>
    </>
  );
};

export default RadioInput;
