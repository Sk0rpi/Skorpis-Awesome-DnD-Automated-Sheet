import {ICharacterStatusData} from "../../021_Interfaces/Attributes/ICharacterStatusData";
import {calculateTotal} from "../../../07_services/Util";

export class CharacterStatusData implements ICharacterStatusData {
    base: number;
    color: string;
    effect: number;
    post_total_extra: string = "";
    pre_total_extra: string = "";
    read_only_base: boolean = false;
    type: string;


    constructor(
        base: number,
        color: string,
        effect: number,
        type: string
    ) {
        this.base = base;
        this.color = color;
        this.effect = effect;
        this.type = type;
    }

    get total() {
        return calculateTotal(this.base, this.effect);
    }
}