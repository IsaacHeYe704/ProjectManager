import React from 'react'
import GenericButton1Style from "./GenericButton1Style.module.css";

const GenericButton1 = (props) => {
    return (
        <div>
            <button className={GenericButton1Style.estiloBoton}>{props.nombre}</button>
        </div>
    )

}
export default GenericButton1;