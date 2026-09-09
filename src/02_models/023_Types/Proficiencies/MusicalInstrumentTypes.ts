import {AttributeType} from "../Attributes/AttributeTypes";

export const ALL_MUSICAL_INSTRUMENTS = {
    'bagpipes': 'CHA',
    'drum': 'CHA',
    'dulcimer': 'CHA',
    'flute': 'CHA',
    'lute': 'CHA',
    'lyre': 'CHA',
    'horn': 'CHA',
    'pan-flute': 'CHA',
    'shawm': 'CHA',
    'viol': 'CHA'
} as const;

export type MusicalInstrumentType = keyof typeof ALL_MUSICAL_INSTRUMENTS;

export type AllMusicalInstrumentDict = Record<MusicalInstrumentType, AttributeType>;