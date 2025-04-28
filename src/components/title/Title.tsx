/* eslint-disable no-useless-concat */
import React, { useEffect } from 'react';
import { ITitle } from "../../utils/interface.util"

const Title = (props: ITitle) => {

    const {text, size, color, margin } = props

    useEffect(() => {

    }, []);

    const computeClass = () => {

        let result: string = 'font-dmsans-black'

        if (color){
            result = result + " " + `${color}`
        } else {
            result = result + ` brand-color`
        }

        if (size) {
            result = result + " " +`${size}`
        } else {
            result = result + ` fs-36`
        }

        if (margin) {
            result = result + " " + `${margin.top ? margin.top : " "} ${margin.bottom ? margin.bottom : " "}`
        } else {
            result = result + ` mrgb`
        }

        return result    
    }



    return (
        <>
            <h1 className={computeClass()}>{ text }</h1>
        </>
    );
};

export default Title;