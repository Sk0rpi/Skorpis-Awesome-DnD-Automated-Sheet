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

export class Character implements ICharacter {
    attributes: Record<string, IAttribute>;
    info: ICharacterInfo;
    currency: Record<string, ICharacterCurrency>;
    entities: Record<string, IEntity>;
    notes: ICharacterNotes;
    inspiration: boolean;
    proficiencies: Record<string, IProficiency>;
    spell_casting: ISpellCasting;
    spells: Record<string, ISpell>;
    status: ICharacterStatus;
    weapons: Record<string, IWeapon>;

    constructor(
        data: Partial<ICharacter>
    ) {
        this.attributes = fillRecord(data.attributes, Attribute);
        this.info = fillObject(data.info, CharacterInfo);
        this.currency = fillRecord(data.currency, CharacterCurrency);
        this.entities = fillRecord(data.entities, Entity);
        this.notes = fillObject(data.notes, CharacterNotes);
        this.inspiration = data.inspiration;
        this.proficiencies = fillRecord(data.proficiencies, Proficiency);
        this.spell_casting = fillRecord(data.spell_casting, SpellCasting);
        this.spells = fillRecord(data.spells, Spell);
        this.status = fillObject(data.status, CharacterStatus);
        this.weapons = fillRecord(data.weapons, Weapon);
    }
}