import { WeaponPropertyType } from "../../023_Types/Weapons/WeaponPropertyTypes";
import { WeaponType } from "../../023_Types/Proficiencies/WeaponTypes";
import { AttributeType } from "../../023_Types/Attributes/AttributeTypes";

export interface IWeapon {
    name: string;
    type: WeaponType;
    properties: Record<string, WeaponPropertyType>;
    mod_type: AttributeType;
    effect: number;
    enhancement: number;
    damage_dice: string;

    proficient: boolean;
    proficiency_bonus: number;
    mod: number;

    get hit(): number;
    get damage_bonus(): number;
}