import { ISpellSlot } from "./ISpellSlot";
import {AttributeType} from "../../023_Types/Attributes/AttributeTypes";
import {SpellSlotType} from "../../023_Types/Spells/SpellSlotTypes";

export interface ISpellCasting{
    concentrating: boolean;
    spell_slots: Record<SpellSlotType, ISpellSlot>;
    spell_mod_type: AttributeType;

    spell_mod: number;
    proficiency_bonus: number;
    con_save: number;

    get spell_save(): number;
    get spell_attack(): number;
}