import {AttributeType} from "../Attributes/AttributeTypes";

export const ALL_LANGUAGES = {
    'common': 'NONE',
    'dwarvish': 'NONE',
    'elvish': 'NONE',
    'giant': 'NONE',
    'gnomish': 'NONE',
    'goblin': 'NONE',
    'halfling': 'NONE',
    'orc': 'NONE',
    'abyssal': 'NONE',
    'celestial': 'NONE',
    'draconic': 'NONE',
    'deep-speech': 'NONE',
    'infernal': 'NONE',
    'primordial': 'NONE',
    'sylvan': 'NONE',
    'undercommon': 'NONE',
    'cant': 'NONE',
    'druidic': 'NONE',
    'thieves cant': 'NONE'
} as const;

export type LanguageType = keyof typeof ALL_LANGUAGES;

export type AllLanguageDict = Record<LanguageType, AttributeType>;