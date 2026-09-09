export const ALL_PROFICIENCIES = [
    'Skills',
    "Artisan's Tools",
    'Gaming Sets',
    'Musical Instruments',
    'Vehicles',
    'Languages',
    'Armor',
    'Weapons'
] as const;

export type ProficiencyType = typeof ALL_PROFICIENCIES[number];

export const ALL_PROFICIENCIES_ICONS = [
    'fa-running',
    'fa-tools',
    'fa-dice',
    'fa-music',
    'fa-shuttle-van',
    'fa-language',
    'fa-shield-alt',
    'fa-fist-raised'
] as const;
