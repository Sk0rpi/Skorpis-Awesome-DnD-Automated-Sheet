import {ISpell} from "../../021_Interfaces/Spells/ISpell";

export class Spell implements ISpell {
    casting_time: string;
    concentration: boolean;
    level: number;
    material: boolean;
    name: string;
    notes: string;
    range: string;
    somatic: boolean;
    verbal: boolean;

    constructor(
        data?: ISpell,
    ) {
        this.casting_time = data?.casting_time ?? "";
        this.concentration = data?.concentration ?? false;
        this.level = data?.level ?? 0;
        this.material = data?.material ?? false;
        this.name = data?.name ?? "";
        this.notes = data?.notes ?? "";
        this.range = data?.range ?? "";
        this.somatic = data?.somatic ?? false;
        this.verbal = data?.verbal ?? false;
    }
}
