import { IAttribute } from "../Attributes/IAttribute";
import { ICharacterStatus } from "./ICharacterStatus";
import { ICharacterCurrency } from "./ICharacterCurrency";
import { IWeapon } from "../Weapons/IWeapon";
import { ISpellCasting } from "../Spells/ISpellCasting";
import { ISpell } from "../Spells/ISpell";
import { IEntity } from "../Entities/IEntity";
import {ICharacterInfo} from "./ICharacterInfo";
import {IProficiency} from "../Proficiencies/IProficiency";
import {ICharacterNotes} from "./ICharacterNotes";
import {CurrencyType} from "../../023_Types/Character/CurrencyTypes";
import {AttributeType} from "../../023_Types/Attributes/AttributeTypes";
import {StatusType} from "../../023_Types/Attributes/StatusTypes";

export interface ICharacter {
    info: ICharacterInfo;

    inspiration: boolean;

    attributes: Record<AttributeType, IAttribute>;

    status: Record<StatusType, ICharacterStatus>;
    currency: Record<CurrencyType, ICharacterCurrency>;

    notes: ICharacterNotes;

    weapons: Record<string, IWeapon>;

    spell_casting: ISpellCasting;
    spells: Record<string, ISpell>;

    entities: Record<string, IEntity>;

    proficiencies: Record<string, IProficiency>;

    maximum_hit_die: string;
    current_hit_die: string;
    death_save_failure: number;
    death_save_success: number;

    initiative_base: number;

    proficiency_bonus: number;
    passive_perception: number;
}
