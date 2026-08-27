import {IWeapon} from "../../021_Interfaces/Weapons/IWeapon";
import {WeaponPropertyType} from "../../023_Types/Weapons/WeaponPropertyTypes";
import {WeaponType} from "../../023_Types/Proficiencies/WeaponTypes";
import {AttributeType} from "../../023_Types/Attributes/AttributeTypes";

export class Weapon implements IWeapon{
    name?: string;
    damage_dice?: string;
    effect?: number;
    enhancement?: number;
    mod?: AttributeType;
    weapon_properties?: Record<string, WeaponPropertyType>;
    weapon_type?: WeaponType;

    constructor(
        data: Partial<IWeapon>
    ) {
        this.name = data.name;
        this.damage_dice = data.damage_dice;
        this.effect = data.effect;
        this.enhancement = data.enhancement;
        this.mod = data.mod;
        this.weapon_properties = data.weapon_properties;
        this.weapon_type = data.weapon_type;
    }
}