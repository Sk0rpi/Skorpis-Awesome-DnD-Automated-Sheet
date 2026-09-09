import {SpellSlotType} from "../../023_Types/Spells/SpellSlotTypes";

export interface ISpellSlot{
    level: SpellSlotType;
    max: number;
    unlocked: number;
    used: number;
}