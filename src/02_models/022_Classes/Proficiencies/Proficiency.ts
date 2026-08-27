import {IProficiency} from "../../021_Interfaces/Proficiencies/IProficiency";
import {AttributeType} from "../../023_Types/Attributes/AttributeTypes";
import {ProficiencyType} from "../../023_Types/Proficiencies/ProficiencyTypes";

export class Proficiency implements IProficiency {
    mod_type?: AttributeType;
    name?: string;
    proficient?: number;
    type?: ProficiencyType;

    constructor(
        data: Partial<IProficiency>
    ) {
        this.mod_type = data.mod_type;
        this.name = data.name;
        this.proficient = data.proficient;
        this.type = data.type;
    }
}