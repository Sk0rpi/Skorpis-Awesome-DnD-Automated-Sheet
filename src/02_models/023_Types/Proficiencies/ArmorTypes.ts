import {AttributeType} from "../Attributes/AttributeTypes";

export const ALL_ARMOR_TYPES = {
    'light-armor': 'DEX',
    'medium-armor': 'DEX',
    'heavy-armor': 'NONE',
    'shields': 'NONE'
} as const;

export type ArmorType = keyof typeof ALL_ARMOR_TYPES;

export type AllArmorDict = Record<ArmorType, AttributeType>;