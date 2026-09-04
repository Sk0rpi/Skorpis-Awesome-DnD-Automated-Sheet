import {ICharacterStatus} from "../../021_Interfaces/Character/ICharacterStatus";
import {calculateTotal} from "../../../07_services/Util";

export class CharacterStatus implements ICharacterStatus {
    base: number;
    color: string;
    effect: number;
    post_total_extra: string;
    pre_total_extra: string;
    read_only_base: boolean;
    type: string;

    constructor(
        data?: ICharacterStatus
    ) {
        this.base = data?.base ?? 0;
        this.color = data?.color ?? "is-dark";
        this.effect = data?.effect ?? 0;
        this.post_total_extra = data?.post_total_extra ?? "";
        this.pre_total_extra = data?.pre_total_extra ?? "";
        this.read_only_base = data?.read_only_base ?? false;
        this.type = data?.type ?? "";
    }

    get total(): number {
        return calculateTotal(this.base, this.effect);
    }

}