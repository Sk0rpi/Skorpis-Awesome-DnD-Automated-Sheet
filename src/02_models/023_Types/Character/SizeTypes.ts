export const ALL_SIZE_TYPES = {
    'Tiny': 'Tiny',
    'Small': 'Small',
    'Medium': 'Medium',
    'Large': 'Large',
    'Huge': 'Huge',
    'Gargantuan': 'Gargantuan'
} as const;

export type SizeType = keyof typeof ALL_SIZE_TYPES;

export interface SizeMetrics {
    name: string;
    heightCm: { min: number; max: number };
    weightKg: { min: number; max: number };
    gridSizeMeters: number;
    gridFields: number;
}

export type AllSizeDict = Record<SizeType, SizeMetrics>;

export const DND_SIZE_DICTIONARY: AllSizeDict = {
    Tiny: {
        name: "Tiny",
        heightCm: { min: 0, max: 60 },
        weightKg: { min: 0, max: 3 },
        gridSizeMeters: 0.75,
        gridFields: 0.5
    },
    Small: {
        name: "Small",
        heightCm: { min: 60, max: 120 },
        weightKg: { min: 3, max: 30 },
        gridSizeMeters: 1.5,
        gridFields: 1
    },
    Medium: {
        name: "Medium",
        heightCm: { min: 120, max: 240 },
        weightKg: { min: 30, max: 250 },
        gridSizeMeters: 1.5,
        gridFields: 1
    },
    Large: {
        name: "Large",
        heightCm: { min: 240, max: 480 },
        weightKg: { min: 250, max: 2000 },
        gridSizeMeters: 3.0,
        gridFields: 2
    },
    Huge: {
        name: "Huge",
        heightCm: { min: 480, max: 960 },
        weightKg: { min: 2000, max: 16000 },
        gridSizeMeters: 4.5,
        gridFields: 3
    },
    Gargantuan: {
        name: "Gargantuan",
        heightCm: { min: 960, max: Infinity },
        weightKg: { min: 16000, max: Infinity },
        gridSizeMeters: 6.0,
        gridFields: 4
    }
};
