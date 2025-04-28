import React, { useEffect } from "react";
import { IIconButton } from "../../utils/interface.util";
import { Link } from "react-router-dom";

function IconButton(props: IIconButton) {

    const { width, height, icon } = props

  useEffect(() => {

  }, []);
  
  
  return (
    <>
            <Link to='' className="icon-button">

                {
                    icon.type === 'web' && icon.name &&
                    <span className={`${icon.name}`}></span>
                }
                {
                    icon.type === 'image' && icon.url &&
                    <img 
                    width={icon.width ? icon.width : '40px'}
                    height={icon.height ? icon.height : '40px'}
                    alt={icon.name} 
                    src={icon.url} />
                }
          
            </Link>
    </>

  )

}

export default IconButton;
