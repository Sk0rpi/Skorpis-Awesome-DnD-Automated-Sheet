import {ISpellSlot} from "../../021_Interfaces/Spells/ISpellSlot";
import {SpellSlotType} from "../../023_Types/Spells/SpellSlotTypes";

export class SpellSlot implements ISpellSlot {
    level: SpellSlotType;
    max: number;
    unlocked: number;
    used: number;

    constructor(
        data?: ISpellSlot,
    ) {
        this.level = data?.level ?? 0 as SpellSlotType;
        this.max = data?.max ?? 0;
        this.unlocked = data?.unlocked ?? 0;
        this.used = data?.used ?? 0;
    }
}
