import React, { useState } from "react";
import GenericButton2 from "../GenericButton2/GenericButton2";
import AddParticipantStyle from "./AddParticipantStyle.module.css";
import { GiCancel } from "react-icons/gi";
import apiAxios from "../../Axios/api";
import swal from "sweetalert";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/Actions/UserInfo";

export const AddParticipant = (props) => {
  const [participantId, setparticipantId] = useState("");
  const [participantIdError, setparticipantIdError] = useState(false);
  const addParticipant = () => {
    if (checkParameters()) {
        const params = new URLSearchParams();
        params.append("teamId", props.teamId);
        params.append("participant", participantId);
        apiAxios
          .post("/teams/addParticipant", params)
          .then((response) => {
            swal(
              "participante agregado correctamente",
              "puedes agregar cuantos participantes quieras"
            );
            props.refreshUserData({ participantId: props.liderId });
            props.setshowModal();
            console.log("response",response);
          })
          .catch((e) => {
            // console.log(Object.getOwnPropertyNames(e));
            
              swal({
                icon: 'error',
                title: "Error agregando participante",
                text: "no puedes añadir el mismo participante varias veces",
                footer: '<a href="">Why do I have this issue?</a>'
              })
            console.log("error",e.response);
          });
    } else {
      alert("no se manda");
    }
  };
  const checkParameters = () => {
    let isOk = true;
    if (!(participantId.length >= 1 && participantId.length < 50)) {
      setparticipantIdError(true);
      isOk = false;
    }
    return isOk;
  };
  return (
    <div className={AddParticipantStyle.grayContainer}>
        {
            participantIdError ? 
            <p style={{color:"red"}}>debes ingresar un id valido</p>
            :null
        }
      <div className={AddParticipantStyle.inputContainer}>
        <input
        className={` ${
            participantIdError ? AddParticipantStyle.notValid : null
          }`}
          type="text"
          placeholder="Introduzca el código del usuario..."
          value={participantId}
          onChange={(e) => {
            setparticipantIdError(false);
            setparticipantId(e.target.value);
          }}
        ></input>
      </div>
      <div className={AddParticipantStyle.buttonContainer}>
        <div onClick={() => addParticipant()}>
          <GenericButton2 text="Añadir"></GenericButton2>
        </div>
        <GiCancel fontSize="x-large"></GiCancel>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
    return {
      liderId: state.UserInfo.id,
    };
  };
const mapDispatchToProps = (dispatch) => {
    return {
      refreshUserData: (payload) =>
        dispatch(actionCreators.refreshUserData(payload)),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)( AddParticipant);