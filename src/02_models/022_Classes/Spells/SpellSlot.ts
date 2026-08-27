import {ISpellSlot} from "../../021_Interfaces/Spells/ISpellSlot";

export class SpellSlot implements ISpellSlot {
    level?: number;
    max?: number;
    unlocked?: number;
    used?: number;

    constructor(
        data: Partial<ISpellSlot>,
    ) {
        this.level = data.level;
        this.max = data.max;
        this.unlocked = data.unlocked;
        this.used = data.used;
    }
}