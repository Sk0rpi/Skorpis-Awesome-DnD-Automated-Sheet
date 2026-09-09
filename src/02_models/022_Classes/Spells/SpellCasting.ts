import {ISpellCasting} from "../../021_Interfaces/Spells/ISpellCasting";
import {ISpellSlot} from "../../021_Interfaces/Spells/ISpellSlot";
import {fillRecord} from "../../../07_services/Util";
import {SpellSlot} from "./SpellSlot";
import {AttributeType} from "../../023_Types/Attributes/AttributeTypes";
import {SpellSlotType} from "../../023_Types/Spells/SpellSlotTypes";

export class SpellCasting implements ISpellCasting {
    concentrating: boolean;
    spell_slots: Record<SpellSlotType, ISpellSlot>;
    spell_mod_type: AttributeType;

    spell_mod: number = 0;
    proficiency_bonus: number = 0;
    con_save: number = 0;

    constructor(
        data?: ISpellCasting,
    ) {
        this.concentrating = data?.concentrating ?? false;
        this.spell_slots = fillRecord(data?.spell_slots ?? {} as Record<SpellSlotType, ISpellSlot>, SpellSlot);
        this.spell_mod_type = data?.spell_mod_type ?? "INT" as AttributeType;
    }

    get spell_attack(): number {
        return this.proficiency_bonus + this.spell_mod;
    }

    get spell_save(): number {
        return 8 + this.spell_attack;
    }
}