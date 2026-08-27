import {ICharacterInfo} from "../../021_Interfaces/Character/ICharacterInfo";

export class CharacterInfo implements ICharacterInfo {
    age?: number;
    alignment?: string;
    allies?: string;
    background?: string;
    bonds?: string;
    character_appearance?: string;
    flaws?: string;
    height?: number;
    ideals?: string;
    level?: number;
    name?: string;
    primary_class?: string;
    secondary_class?: string;
    species?: string;
    weight?: number;

    constructor(
        data: Partial<ICharacterInfo>,
    ) {
        this.age = data.age;
        this.alignment = data.alignment;
        this.allies = data.allies;
        this.background = data.background;
        this.bonds = data.bonds;
        this.character_appearance = data.character_appearance;
        this.flaws = data.flaws;
        this.height = data.height;
        this.ideals = data.ideals;
        this.level = data.level;
        this.name = data.name;
        this.primary_class = data.primary_class;
        this.secondary_class = data.secondary_class;
        this.species = data.species;
        this.weight = data.weight;
    }
}