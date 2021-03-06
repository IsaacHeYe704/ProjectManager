import React, { useState } from "react";
import HeaderStyle from "./HeaderStyle.module.css";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import imagen from "./images/PatoLogo.png";
import { connect } from "react-redux";
import Notification from "../Notification/Notification";

const Header = (props) => {
  const [showNotification, setshowNotification] = useState(false)

  return (
    <div className={HeaderStyle.headerDiv}>
      <div className={HeaderStyle.userContainer}>
        <img className={HeaderStyle.logo} src={imagen}></img>
        <h1 className={HeaderStyle.logoName}>Gestor de proyectos</h1>
      </div>
      <div className={HeaderStyle.userContainer}>
        <div className={HeaderStyle.notifDiv}>
          <section className={HeaderStyle.notificationContainer} onClick={() => { setshowNotification(!showNotification) }}>
            <MdOutlineNotificationsActive className="ListIcon" onClick={() => { setshowNotification(!showNotification) }} />
            <div>
              {showNotification ?
                <Notification notifications={[]} /> : null}
            </div>
          </section>
        </div>
        <div className={HeaderStyle.userInfoStyle}>
        <h1 className={HeaderStyle.userName}>
          {props.Name}
        </h1>
        <h1 className={HeaderStyle.userCode}> #{props.Id}</h1>
        </div>
        <FaUserAlt className="ListIcon" color={props.Color}></FaUserAlt>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    Name: state.UserInfo.name,
    Id: state.UserInfo.id,
    Color: state.UserInfo.color,
  };
};
export default connect(mapStateToProps)(Header);
