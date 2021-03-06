import React, { useState } from "react";
import GenericButton1 from "../GenericButton1/GenericButton1";
import AddSubTaskStyle from "./AddSubtaskStyle.module.css";
import { GiCancel } from "react-icons/gi";
import axiosApi from "../../Axios/api";
import { useParams } from "react-router";
import swal from "sweetalert";

const AddSubtask = (props) => {
  const [subTaskText, setSubTaskText] = useState("");
  const [subTaskTextError, setSubTaskTextError] = useState(false);
  const { taskId } = useParams();
  const createsubtask = () => {
    if (subTaskText.length > 0 && subTaskText.length < 50) {
      const params = new URLSearchParams();
      params.append("description", subTaskText);
      params.append("taskId", taskId);
      axiosApi
        .post("/projects/addSubtask", params)
        .then((response) => {
          props.refresh();
          swal(
            "Subtarea agregada correctamente",
            "Recuerda que los estados de la tarea dependen de la subtarea"
          );
          setSubTaskText("");
        })
        .catch((error) => {
          swal({
            icon: 'error',
            title: "Error agregando subtarea",
            text: "No hemos podido crear la subtarea, intenta mas tarde",
            footer: '<a href="">Why do I have this issue?</a>'
          })
        });
    }
    else {
      setSubTaskTextError(true)
    }
  }
  const validate = () => {
 
  }
  return (
    <div className={AddSubTaskStyle.container}>
      <p className={AddSubTaskStyle.descriptionStyle}>Descripción</p>
      {
        subTaskTextError ?
          <p style={{ color: "rgb(189, 5, 5)" }}>Debes escribir una descripción y que sea menor a 50 caracteres</p> :
          null
      }
      <textarea className={`${AddSubTaskStyle.textareaStyle} ${
        subTaskTextError ? AddSubTaskStyle.notValid : null
      }`} 
        value={subTaskText}
        onChange={(e) => {
          setSubTaskTextError(false);
          setSubTaskText(e.target.value);
          
        }}
      />
      <div className={AddSubTaskStyle.buttonCancel}>
        <div onClick={createsubtask}>
          <button className={AddSubTaskStyle.buttonStyle}
            nombre="añadir"
          >Añadir</button>
        </div>
        <div onClick={props.closeModal}>
          <GiCancel className={AddSubTaskStyle.icon} fontSize="x-large"></GiCancel>
        </div>
      </div>

    </div>

  );
};

export default AddSubtask;
