export const ALL_CURRENCY_TYPES = {
    'Copper': '#cd7f32',
    'Silver': '#a8a8a8',
    'Gold': '#d4af37',
    'Platinum': '#b0c4de'
} as const;

export type CurrencyType = keyof typeof ALL_CURRENCY_TYPES;

export type AllCurrencyDict = Record<CurrencyType, string>;