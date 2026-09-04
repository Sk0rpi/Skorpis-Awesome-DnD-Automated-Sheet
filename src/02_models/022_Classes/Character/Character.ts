import {ICharacter} from "../../021_Interfaces/Character/ICharacter";
import {IAttribute} from "../../021_Interfaces/Attributes/IAttribute";
import {ICharacterInfo} from "../../021_Interfaces/Character/ICharacterInfo";
import {ICharacterCurrency} from "../../021_Interfaces/Character/ICharacterCurrency";
import {IEntity} from "../../021_Interfaces/Entities/IEntity";
import {ISpellCasting} from "../../021_Interfaces/Spells/ISpellCasting";
import {ISpell} from "../../021_Interfaces/Spells/ISpell";
import {ICharacterStatus} from "../../021_Interfaces/Character/ICharacterStatus";
import {IWeapon} from "../../021_Interfaces/Weapons/IWeapon";
import {IProficiency} from "../../021_Interfaces/Proficiencies/IProficiency";
import {fillObject, fillRecord} from "../../../07_services/Util";
import {Attribute} from "../Attributes/Attribute";
import {CharacterInfo} from "./CharacterInfo";
import {CharacterStatus} from "./CharacterStatus";
import {CharacterCurrency} from "./CharacterCurrency";
import {Entity} from "../Entities/Entity";
import {Proficiency} from "../Proficiencies/Proficiency";
import {SpellCasting} from "../Spells/SpellCasting";
import {Spell} from "../Spells/Spell";
import {Weapon} from "../Weapons/Weapon";
import {CharacterNotes} from "./CharacterNotes";
import {ICharacterNotes} from "../../021_Interfaces/Character/ICharacterNotes";
import {AttributeType} from "../../023_Types/Attributes/AttributeTypes";
import {CurrencyType} from "../../023_Types/Character/CurrencyTypes";
import {StatusType} from "../../023_Types/Attributes/StatusTypes";

export class Character implements ICharacter {
    attributes: Record<AttributeType, IAttribute>;
    info: ICharacterInfo;
    currency: Record<CurrencyType, ICharacterCurrency>;
    entities: Record<string, IEntity>;
    notes: ICharacterNotes;
    inspiration: boolean;
    proficiencies: Record<string, IProficiency>;
    spell_casting: ISpellCasting;
    spells: Record<string, ISpell>;
    status: Record<StatusType, ICharacterStatus>;
    weapons: Record<string, IWeapon>;

    maximum_hit_die: string;
    current_hit_die: string;
    death_save_failure: number;
    death_save_success: number;

    initiative_base: number;

    proficiency_bonus: number = 0;
    passive_perception: number = 0;

    constructor(
        data?: ICharacter
    ) {
        this.attributes = fillRecord(data?.attributes ?? {} as Record<AttributeType, IAttribute>, Attribute);
        this.info = fillObject(data?.info ?? {} as ICharacterInfo, CharacterInfo);
        this.currency = fillRecord(data?.currency ?? {} as Record<CurrencyType, ICharacterCurrency>, CharacterCurrency);
        this.entities = fillRecord(data?.entities ?? {} as Record<string, Entity>, Entity);
        this.notes = fillObject(data?.notes ?? {} as ICharacterNotes, CharacterNotes);
        this.inspiration = data?.inspiration ?? false;
        this.proficiencies = fillRecord(data?.proficiencies ?? {} as Record<string, IProficiency>, Proficiency);
        this.spell_casting = fillObject(data?.spell_casting ?? {} as ISpellCasting, SpellCasting);
        this.spells = fillRecord(data?.spells ?? {}, Spell);
        this.status = fillRecord(data?.status ?? {} as Record<StatusType, ICharacterStatus>, CharacterStatus);
        this.weapons = fillRecord(data?.weapons ?? {}, Weapon);

        this.maximum_hit_die = data?.maximum_hit_die ?? "";
        this.current_hit_die = data?.current_hit_die ?? "";
        this.death_save_failure = data?.death_save_failure ?? 0;
        this.death_save_success = data?.death_save_success ?? 0;

        this.initiative_base = data?.initiative_base ?? 0;
    }
}