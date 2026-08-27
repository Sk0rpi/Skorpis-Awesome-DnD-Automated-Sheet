import {ISpellCasting} from "../../021_Interfaces/Spells/ISpellCasting";
import {ISpellSlot} from "../../021_Interfaces/Spells/ISpellSlot";
import {fillRecord} from "../../../07_services/Util";
import {SpellSlot} from "./SpellSlot";

export class SpellCasting implements ISpellCasting {
    concentrating?: boolean;
    spell_slots?: Record<number, ISpellSlot>;

    constructor(
        data: Partial<ISpellCasting>,
    ) {
        this.concentrating = data.concentrating;
        this.spell_slots = fillRecord(data.spell_slots, SpellSlot);
    }
}