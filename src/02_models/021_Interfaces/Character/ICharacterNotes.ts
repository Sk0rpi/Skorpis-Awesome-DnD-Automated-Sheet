export interface ICharacterNotes {

    equipment: string;
    features: string;

    character_appearance_base64: string;
    height: number;
    age: number;
    weight: number;
    ideals: string;
    bonds: string;
    flaws: string;
    allies: string;

    inventory: string;
    items: Record<string, number>;
}