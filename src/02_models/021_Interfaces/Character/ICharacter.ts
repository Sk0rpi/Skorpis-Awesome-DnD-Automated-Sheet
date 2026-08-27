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

export interface ICharacter {
    info?: ICharacterInfo;

    inspiration?: boolean;

    attributes?: Record<string, IAttribute>;

    status?: ICharacterStatus;
    currency?: Record<string, ICharacterCurrency>;

    notes?: ICharacterNotes;

    weapons?: Record<string, IWeapon>;

    spell_casting?: ISpellCasting;
    spells?: Record<string, ISpell>;

    entities?: Record<string, IEntity>;

    proficiencies?: Record<string, IProficiency>;
}
