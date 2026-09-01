import {AttributeType} from "../Attributes/AttributeTypes";

export const ALL_ARTISANS_TOOLS = {
    'alchemists-supplies': 'INT',
    'brewers-supplies': 'CON',
    'calligraphers-supplies': 'DEX',
    'carpenters-tools': 'STR',
    'cartographers-tools': 'INT',
    'cobblers-tools': 'DEX',
    'cooks-utensils': 'WIS',
    'glassblowers-tools': 'DEX',
    'jewelers-kits': 'DEX',
    'leatherworkers-tools': 'DEX',
    'masons-tools': 'STR',
    'painters-supplies': 'DEX',
    'potters-tools': 'DEX',
    'smiths-tools': 'STR',
    'tinkers-tools': 'DEX',
    'weavers-tools': 'DEX',
    'woodcarvers-tools': 'DEX',
    'disguise-kit': 'CHA',
    'forgery-kit': 'DEX',
    'herbalism-kit': 'WIS',
    'navigators-tools': 'WIS',
    'poisoners-kit': 'INT',
    'thieves-tools': 'DEX'
} as const;

export type ArtisansToolType = keyof typeof ALL_ARTISANS_TOOLS;

export type AllArtisansToolDict = Record<ArtisansToolType, AttributeType>;