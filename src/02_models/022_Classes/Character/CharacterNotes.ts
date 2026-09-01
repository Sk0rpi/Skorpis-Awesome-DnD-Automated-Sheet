import {ICharacterNotes} from "../../021_Interfaces/Character/ICharacterNotes";

export class CharacterNotes implements ICharacterNotes {
    age: number;
    allies: string;
    bonds: string;
    character_appearance_base64: string;
    equipment: string;
    features: string;
    flaws: string;
    height: number;
    ideals: string;
    inventory: string;
    items: Record<string, number>;
    weight: number;

    constructor(
        data?: ICharacterNotes,
    ) {
        this.age = data?.age ?? 0;
        this.allies = data?.allies ?? "";
        this.bonds = data?.bonds ?? "";
        this.character_appearance_base64 = data?.character_appearance_base64 ?? "";
        this.equipment = data?.equipment ?? "";
        this.features = data?.features ?? "";
        this.flaws = data?.flaws ?? "";
        this.height = data?.height ?? 0;
        this.ideals = data?.ideals ?? "";
        this.inventory = data?.inventory ?? "";
        this.items = data?.items ?? {};
        this.weight = data?.weight ?? 0;
    }
}
