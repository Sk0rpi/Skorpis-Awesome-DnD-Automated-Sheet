import {IProficiency} from "../../021_Interfaces/Proficiencies/IProficiency";
import {AttributeType} from "../../023_Types/Attributes/AttributeTypes";
import {ProficiencyType} from "../../023_Types/Proficiencies/ProficiencyTypes";

export class Proficiency implements IProficiency {
    mod_type: AttributeType;
    name: string;
    proficient: number;
    type: ProficiencyType;
    mod: number = 0;

    constructor(mod_type: AttributeType, name: string, proficient: number, type: ProficiencyType);
    constructor(data?: IProficiency);
    constructor(firstParam?: AttributeType | IProficiency, name?: string, proficient?: number, type?: ProficiencyType) {
        if (typeof firstParam === "object" && firstParam !== null && "mod_type" in firstParam) {
            this.mod_type = firstParam.mod_type;
            this.name = firstParam.name;
            this.proficient = firstParam.proficient;
            this.type = firstParam.type;
        } else {
            this.mod_type = (firstParam as AttributeType) ?? ("NONE" as AttributeType);
            this.name = name ?? "";
            this.proficient = proficient ?? 0;
            this.type = type ?? ("NONE" as ProficiencyType);
        }
    }
}

