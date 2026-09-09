export interface ICharacterNotes {
    equipment: string;
    features: string;
    notes: string;

    character_appearance_base64: string;
    height: number;
    age: number;
    weight: number;
    size: string;

    ideals: string;
    bonds: string;
    flaws: string;
    allies: string;

    inventory: Record<number, string>;
}