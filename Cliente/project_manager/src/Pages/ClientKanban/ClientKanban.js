import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaUserAlt } from "react-icons/fa";
import GenericButton1 from "../../Components/GenericButton1/GenericButton1";
import KanbanColumn from "../../Components/KanbanColumn/KanbanColumn";

import KanbanStyle from "./ClientKanbanStyle.module.css";
import axiosApi from "../../Axios/api";
import Spinner from "../../Components/Spinner/Spinner";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Kanban(props) {
  const [projectData, setprojectData] = useState({
    doing: [],
    done: [],
    toDo: [],
    projectId: "",
  });
  const [loading, setloading] = useState(true);
  const [projectName, setprojectName] = useState("");
  const [teamName, setteamName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [liderId, setliderId] = useState("")
  let { projectId } = useParams();
  const getTeam = () => {
    setloading(true);
    axiosApi
      .get(`/projects/getKanban?projectId=${projectId}`)
      .then((project) => {
        setloading(false);
        let proyectName = props.projects.forEach((project) => {
          if (project.proyectId == projectId) {
            setprojectName(project.proyectName);
            setteamName(project.teamName);
            setTeamId(project.teamId);
          }
        });
        console.log(project.data)
        project.data.data.toDo = project.data.data.toDo.filter((task)=> task.Relevante != 0  )
        project.data.data.doing = project.data.data.doing.filter((task)=> task.Relevante != 0  )
        project.data.data.done = project.data.data.done.filter((task)=> task.Relevante != 0  )
        setprojectData(project.data.data);
        
        setliderId(project.data.data.liderId)
        console.log("data:", project.data.data.liderId);
      })
      .catch((error) => {
        console.log(error.error);
      });
  };

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <div className={`${props.mode == "client" ? KanbanStyle.fullScreen : null}`}>
      <div className={KanbanStyle.container}>
        <div>
          <h1 className={KanbanStyle.title}>{projectName}</h1>
          <h3>{teamName}</h3>
        </div>
        <div className={KanbanStyle.userContainer}>
          {props.teams.map((Team) =>
            Team.idTeam == teamId
              ? Team.Participants.map((pepe) => (
                <div className={KanbanStyle.userDiv}>
                  <div className={KanbanStyle.user}>
                    <FaUserAlt color={pepe.Color} />
                    <p className={KanbanStyle.userName}>{pepe.Nombre}</p>
                  </div>
                </div>
              ))
              : null
          )}
        </div>
      </div>
      <div className={KanbanStyle.kanbanContainerCentered}>
        <div className={KanbanStyle.kanbanContainer}>
          <h1>Kanban</h1>
          {loading ? (
            <div className={KanbanStyle.spinnerContainer}>
              <Spinner />
            </div>
          ) : (
            <div className={KanbanStyle.columnsContainers}>
              <KanbanColumn
                client ="true"
                title="TO DO"
                liderId={liderId}
                tasks={projectData.toDo}
                teamId={teamId}
                refresh={() => {
                  getTeam();
                }}
              ></KanbanColumn>
              <KanbanColumn
                client ="true"
                title="DOING"
                tasks={projectData.doing}
                teamId={teamId}
              ></KanbanColumn>
              <KanbanColumn
                title="DONE"
                tasks={projectData.done}
                teamId={teamId}
              ></KanbanColumn>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    projects: state.UserInfo.proyects,
    teams: state.UserInfo.teams,
  };
};
export default connect(mapStateToProps)(Kanban);
