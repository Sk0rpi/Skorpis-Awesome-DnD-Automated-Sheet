import { AttributeType } from "../../023_Types/Attributes/AttributeTypes";
import { ProficiencyType } from "../../023_Types/Proficiencies/ProficiencyTypes";

export interface IProficiency {
    name: string;
    type: ProficiencyType;
    proficient: number;
    mod_type: AttributeType;

    mod: number;
}