import ParticipanteLoginDto from "../dtoObjects/participantLogInDto";
import TeamDto from "../dtoObjects/TeamDto";

var objectMapper = require('object-mapper');
const ParticipanteDto = require('../DtoObjects/ParticipanteDto');
export default class ParticipantMapper {
    objectMapper: any;
    constructor()
    {
        this.objectMapper = objectMapper;
    }
    getDto(participantVo: any,participantId:any)
    {
        let participantVoCopy =participantVo.participants;
        
        let projects = [...participantVo.proyectos];
        let id:string;
        let name:string;
        let color:string;
        participantVoCopy = participantVoCopy.filter((participant:any)=>
            participant.ID == participantId
        )
        let participants = participantVo.participants;
        // console.log(participantVo);
        
        
        id = participantVoCopy[0].ID;
        name = participantVoCopy[0].Nombre;
        color = participantVoCopy[0].Color;


        let theTeams = projects.map((theTeam)=>
        ({
            idTeam:theTeam.IDEquipo,
            teamName:theTeam.tag,
        })
        )
        //make unique the teams
        theTeams = theTeams.filter(
            (thing, index, self) =>
              index ===
              self.findIndex((t) => t.idTeam === thing.idTeam && t.teamName === thing.teamName)
          );
        
        
        let theTeamsDto:TeamDto[] =[];
        let teamDto:TeamDto;
        theTeams.map((theTeam)=>
        {
            let participantsOfThisTeam:any=[];
            participants.forEach((participante:any)=>{
                if(participante.IDEquipo == theTeam.idTeam)
                {
                    participantsOfThisTeam.push(participante);
                }
            });
            teamDto = new TeamDto(theTeam.idTeam,theTeam.teamName,participantsOfThisTeam); 
            theTeamsDto.push(teamDto)
        });
        
        let theProyects = projects.map((theProyect)=>
        ({
            proyectId:theProyect.IDEquipo,
            proyectName:theProyect.tag,
            teamId:theProyect.IDProyecto,
            teamName:theProyect.nombreProyecto
        })
        )
        //make unique the proyects
        theProyects = theProyects.filter(
            (thing, index, self) =>
              index ===
              self.findIndex((t) => t.teamId === thing.teamId && t.teamName === thing.teamName)
          );
        

        let participantDto = new ParticipanteLoginDto(id,name,color,theTeamsDto,theProyects);
        // console.log(participantDto);
        
        
        return participantDto
    }
}

