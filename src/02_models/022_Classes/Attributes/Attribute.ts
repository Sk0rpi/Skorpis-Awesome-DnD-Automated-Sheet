import { IAttribute } from "../../021_Interfaces/Attributes/IAttribute";
import { AttributeType } from "../../023_Types/Attributes/AttributeTypes";

export class Attribute implements IAttribute {
    type?: AttributeType;
    base?: number;
    effect?: number;

    constructor(
        data: Partial<IAttribute>
    ){
        this.type = data.type;
        this.base = data.base;
        this.effect = data.effect;
    }

    get total(): number {
        return this.base + this.effect;
    }
}