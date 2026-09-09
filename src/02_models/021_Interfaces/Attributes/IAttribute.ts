import { AttributeType } from "../../023_Types/Attributes/AttributeTypes";

export interface IAttribute {
    type: AttributeType;
    base: number;
    effect: number;
    isSave: boolean;

    save_mod: number;

    get total(): number
    get mod(): number
}