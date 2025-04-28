import React, { useState, useEffect, useContext } from 'react';
import { IButton } from "../../utils/interface.util";
import { Link } from 'react-router-dom'

const Button = (props: IButton) => {

    const {
        text,
        onClick
    } = props

    useEffect(() => {
    
    }, []);

    return (
        <>
            <div  className="form-group ui-relative mrgb1">
                <Link 
                to='' 
                className='btn font-dmsans-bold onwhite'
                onClick={(e) => onClick(e)}>{text}</Link>
            </div>
            
        </>
    );
};

export default Button;