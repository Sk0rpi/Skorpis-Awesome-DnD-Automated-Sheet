import {ALL_SKILLS} from "./SkillTypes";
import { ALL_ARTISANS_TOOLS } from "./ArtisansToolTypes";
import { ALL_GAMING_SETS } from "./GamingSetTypes";
import { ALL_MUSICAL_INSTRUMENTS } from "./MusicalInstrumentTypes";
import { ALL_VEHICLE_TYPES } from "./VehicleTypes";
import { ALL_LANGUAGES } from "./LanguageTypes";
import { ALL_ARMOR_TYPES } from "./ArmorTypes";
import { ALL_WEAPONS } from "./WeaponTypes";
import {ProficiencyType} from "./ProficiencyTypes";

export const ALL_PROFICIENCY_TYPES = {
    "Skills": ALL_SKILLS,
    "Artisan's Tools": ALL_ARTISANS_TOOLS,
    "Gaming Sets": ALL_GAMING_SETS,
    "Musical Instruments": ALL_MUSICAL_INSTRUMENTS,
    "Vehicles": ALL_VEHICLE_TYPES,
    "Languages": ALL_LANGUAGES,
    "Armor": ALL_ARMOR_TYPES,
    "Weapons": ALL_WEAPONS
} as const;

export type AnyProficiencyType = keyof typeof ALL_PROFICIENCY_TYPES;

export type AnyProficiencyTypeDict = Record<ProficiencyType, AnyProficiencyType>;
