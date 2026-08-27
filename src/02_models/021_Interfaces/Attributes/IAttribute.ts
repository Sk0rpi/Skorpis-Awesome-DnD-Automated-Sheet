import { AttributeType } from "../../023_Types/Attributes/AttributeTypes";

export interface IAttribute {
    type?: AttributeType;
    base?: number;
    effect?: number;
}