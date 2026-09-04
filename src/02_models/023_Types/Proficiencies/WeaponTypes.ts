import {AttributeType} from "../Attributes/AttributeTypes";

export const ALL_WEAPONS = {
    'simple-melee': 'NONE',
    'simple-ranged': 'NONE',
    'martial-melee': 'NONE',
    'martial-ranged': 'NONE',

    // Simple Melee Weapons (Einfache Nahkampfwaffen)
    'club': 'NONE',
    'dagger': 'NONE',
    'greatclub': 'NONE',
    'handaxe': 'NONE',
    'javelin': 'NONE',
    'light-hammer': 'NONE',
    'mace': 'NONE',
    'quarterstaff': 'NONE',
    'sickle': 'NONE',
    'spear': 'NONE',

    // Simple Ranged Weapons (Einfache Fernkampfwaffen)
    'light-crossbow': 'NONE',
    'dart': 'NONE',
    'shortbow': 'NONE',
    'sling': 'NONE',

    // Martial Melee Weapons (Kriegsnahkampfwaffen)
    'battleaxe': 'NONE',
    'flail': 'NONE',
    'glaive': 'NONE',
    'greataxe': 'NONE',
    'greatsword': 'NONE',
    'halberd': 'NONE',
    'lance': 'NONE',
    'longsword': 'NONE',
    'maul': 'NONE' ,
    'morningstar': 'NONE',
    'pike': 'NONE',
    'rapier': 'NONE',
    'scimitar': 'NONE',
    'shortsword': 'NONE',
    'trident': 'NONE',
    'war-pick': 'NONE',
    'warhammer': 'NONE',
    'whip': 'NONE',

    // Martial Ranged Weapons (Kriegsfernkampfwaffen)
    'blowgun': 'NONE',
    'hand-crossbow': 'NONE',
    'heavy-crossbow': 'NONE',
    'longbow': 'NONE',
    'net': 'NONE'
} as const;

export type WeaponType = keyof typeof ALL_WEAPONS;

export type AllWeaponDict = Record<WeaponType, AttributeType>;