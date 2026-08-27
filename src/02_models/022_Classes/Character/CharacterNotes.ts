import {ICharacterNotes} from "../../021_Interfaces/Character/ICharacterNotes";

export class CharacterNotes implements ICharacterNotes{
    active_effects?: string;
    age?: number;
    allies?: string;
    bonds?: string;
    character_appearance_base64?: string;
    equipment?: string;
    features?: string;
    flaws?: string;
    height?: number;
    ideals?: string;
    inventory?: string;
    items?: Record<string, number>;
    notes?: string;
    quick_notes?: string;
    weight?: number;

    constructor(
        data: Partial<ICharacterNotes>,
    ) {
        this.active_effects = data.active_effects;
        this.age = data.age;
        this.allies = data.allies;
        this.bonds = data.bonds;
        this.character_appearance_base64 = data.character_appearance_base64;
        this.equipment = data.equipment;
        this.features = data.features;
        this.flaws = data.flaws;
        this.height = data.height;
        this.ideals = data.ideals;
        this.inventory = data.inventory;
        this.items = data.items;
        this.notes = data.notes;
        this.quick_notes = data.quick_notes;
        this.weight = data.weight;
    }
}