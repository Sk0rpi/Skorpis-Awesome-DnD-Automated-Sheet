import {IWeapon} from "../../021_Interfaces/Weapons/IWeapon";
import {WeaponPropertyType} from "../../023_Types/Weapons/WeaponPropertyTypes";
import {WeaponType} from "../../023_Types/Proficiencies/WeaponTypes";
import {AttributeType} from "../../023_Types/Attributes/AttributeTypes";

export class Weapon implements IWeapon {
    name: string;
    damage_dice: string;
    effect: number;
    enhancement: number;
    mod_type: AttributeType;
    properties: Record<string, WeaponPropertyType>;
    type: WeaponType;

    proficient: boolean = false;
    proficiency_bonus: number = 0;
    mod: number = 0;

    constructor(
        data?: IWeapon
    ) {
        this.name = data?.name ?? "";
        this.damage_dice = data?.damage_dice ?? "1d4";
        this.effect = data?.effect ?? 0;
        this.enhancement = data?.enhancement ?? 0;
        this.mod_type = data?.mod_type ?? "NONE" as AttributeType;
        this.properties = data?.properties ?? {};
        this.type = data?.type ?? "NONE" as WeaponType;
    }

    get hit(): number {
        return this.proficiency_bonus + this.mod + this.effect + this.enhancement;
    }

    get damage_bonus(): number {
        return this.mod + this.effect + this.enhancement;
    }
}