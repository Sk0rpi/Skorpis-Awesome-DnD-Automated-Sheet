export const ALL_ATTRIBUTE_TYPES = [
    'NONE',
    'STR',
    'DEX',
    'CON',
    'INT',
    'WIS',
    'CHA'
] as const;

export type AttributeType = typeof ALL_ATTRIBUTE_TYPES[number];
