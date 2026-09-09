export const ALL_ENTITY_TYPES = [
    'Mount',
    'Vehicle',
    'Companion',
    'Summon',
    'Pet'
] as const;

export type EntityType = typeof ALL_ENTITY_TYPES[number];
