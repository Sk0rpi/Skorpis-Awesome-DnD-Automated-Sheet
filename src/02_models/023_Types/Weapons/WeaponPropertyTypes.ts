export const ALL_WEAPON_PROPERTIES = [
    'Ammunition',
    'Finesse',
    'Heavy',
    'Light',
    'Loading',
    'Range',
    'Reach',
    'Special',
    'Thrown',
    'Two-Handed',
    'Versatile'
] as const;

export type WeaponPropertyType = typeof ALL_WEAPON_PROPERTIES[number];
