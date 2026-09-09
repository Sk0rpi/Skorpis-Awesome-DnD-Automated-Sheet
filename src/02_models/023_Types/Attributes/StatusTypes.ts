export const ALL_STATUS_TYPES = [
    'Speed',
    'Armor-Class',
    'Current-HP',
    'Max-HP',
    'Initiative'
] as const;

export type StatusType = typeof ALL_STATUS_TYPES[number];
