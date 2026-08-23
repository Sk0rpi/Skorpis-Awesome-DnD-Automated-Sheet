// src/types.ts

export type Attribute = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface Skill {
  name: string;
  attribute: Attribute;
  proficient: boolean;
  modifier: number;
}

export interface CharacterData {
  name: string;
  characterClass: string;
  level: number;
  proficiencyBonus: number;
  skills: Skill[];
}