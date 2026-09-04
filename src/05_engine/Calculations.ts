export function calculateProficiencyBonus(level: number): number {
    level = level < 1 ? 1 : level > 20 ? 20 : level;
    return Math.ceil(level / 4) + 1;
}