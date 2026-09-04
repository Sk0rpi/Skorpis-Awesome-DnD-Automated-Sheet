export const ALL_SPELL_SLOT_TYPES = {
    1: 4,
    2: 3,
    3: 3,
    4: 3,
    5: 3,
    6: 2,
    7: 2,
    8: 1,
    9: 1
} as const;

export type SpellSlotType = keyof typeof ALL_SPELL_SLOT_TYPES;

export type AllSpellSlotDict = Record<SpellSlotType, number>;