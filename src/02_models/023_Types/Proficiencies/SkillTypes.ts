import {AttributeType} from "../Attributes/AttributeTypes";

export const ALL_SKILLS = {
    'acrobatics': 'DEX',
    'animal-handling': 'WIS',
    'arcana': 'INT',
    'athletics': 'STR',
    'deception': 'CHA',
    'history': 'INT',
    'insight': 'WIS',
    'intimidation': 'CHA',
    'investigation': 'INT',
    'medicine': 'WIS',
    'nature': 'INT',
    'perception': 'WIS',
    'performance': 'CHA',
    'persuasion': 'CHA',
    'religion': 'INT',
    'sleight-of-hand': 'DEX',
    'stealth': 'DEX',
    'survival': 'WIS'
} as const;

export type SkillType = keyof typeof ALL_SKILLS;

export type AllSkillsDict = Record<SkillType, AttributeType>;
