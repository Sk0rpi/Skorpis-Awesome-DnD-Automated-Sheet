import {AttributeType} from "../Attributes/AttributeTypes";

export const ALL_GAMING_SETS = {
    'dice-sets': 'CHA',
    'dragonchess-set': 'INT',
    'playing-card-set': 'CHA',
    'three-dragon-ante-set': 'INT'
} as const;

export type GamingSetType = keyof typeof ALL_GAMING_SETS;

export type AllGamingSetDict = Record<GamingSetType, AttributeType>;