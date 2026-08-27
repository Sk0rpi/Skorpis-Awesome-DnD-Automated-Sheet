import { ISpellSlot } from "./ISpellSlot";

export interface ISpellCasting{
    concentrating?: boolean;
    spell_slots?: Record<number, ISpellSlot>;
}