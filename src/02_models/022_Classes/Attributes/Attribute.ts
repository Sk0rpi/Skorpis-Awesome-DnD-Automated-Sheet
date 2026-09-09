import { IAttribute } from "../../021_Interfaces/Attributes/IAttribute";
import { AttributeType } from "../../023_Types/Attributes/AttributeTypes";
import {calculateTotal} from "../../../07_services/Util";

export class Attribute implements IAttribute {
    type: AttributeType;
    base: number;
    effect: number;
    isSave: boolean;

    save_mod: number = 0;

    constructor(
        data?: IAttribute
    ){
        this.type = data?.type ?? "NONE" as AttributeType;
        this.base = data?.base ?? 10;
        this.effect = data?.effect ?? 0;
        this.isSave = data?.isSave ?? false;
    }

    get total(): number {
        return calculateTotal(this.base, this.effect);
    }

    get mod(): number {
        return Math.floor((this.total - 10) / 2);
    }

}