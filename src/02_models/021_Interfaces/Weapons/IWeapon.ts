import { WeaponPropertyType } from "../../023_Types/Weapons/WeaponPropertyTypes";
import { WeaponType } from "../../023_Types/Proficiencies/WeaponTypes";
import { AttributeType } from "../../023_Types/Attributes/AttributeTypes";

export interface IWeapon {
    name?: string;
    weapon_type?: WeaponType;
    weapon_properties?: Record<string, WeaponPropertyType>;
    mod?: AttributeType;
    effect?: number;
    enhancement?: number;
    damage_dice?: string;
}