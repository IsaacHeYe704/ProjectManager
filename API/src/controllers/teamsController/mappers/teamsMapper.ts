import ParticipanteDto from "../dtoObjects/ParticipanteDto";
import TeamDetailDto from "../dtoObjects/TeamDetailDto";

var objectMapper = require("object-mapper");
export default class teamsMapper {
  objectMapper: any;
  constructor() {
    this.objectMapper = objectMapper;
  }
  getDto(teamsVo: any) {
    
    const teamsCleanVo = teamsVo[0];
    
    const teamId = teamsCleanVo[0].equipoId;
    const teamName = teamsCleanVo[0].Tag;
    let participants: Array<ParticipanteDto> = teamsCleanVo.map((data: any) => {
      let theParticipant = new ParticipanteDto(
        data.IDParticipante,
        data.participanteNombre,
        data.Color
      );
      return theParticipant;
    });
    let proyects = teamsCleanVo.map((data: any) => {
        let theProyect = {
            id: data.IDProyecto, 
            name: data.pryectoNombre,
        }
        return theProyect;
      });
    //Delete duplicated participants and proyects that are result from db inner joins
    
    participants  = this.delete_duplicated_In_Array(participants,["name", "id"]);
    
    // console.log(participants);
    proyects = proyects.filter(
        (thing: { id: any; name: any; }, index: any, self: any[]) =>
          index ===
          self.findIndex((t) => t.id === thing.id && t.name === thing.name && thing.name !== null  && thing.name !== "")
      );
    
        return(new TeamDetailDto(teamId,teamName,participants,proyects));
        
  }
  delete_duplicated_In_Array(theArray:any[],properties:any[])
  {
    theArray = theArray.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => t[properties[0]] === thing[properties[0]] && t[properties[1]] === thing[properties[1]])
    );
    return theArray
  }
}
