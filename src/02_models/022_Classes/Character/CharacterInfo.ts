import {ICharacterInfo} from "../../021_Interfaces/Character/ICharacterInfo";

export class CharacterInfo implements ICharacterInfo {
    active_effects: string;
    alignment: string;
    background: string;
    level: number;
    name: string;
    class: string;
    quick_notes: string;
    species: string;
    character_appearance: string;

    constructor(
        data?: ICharacterInfo,
    ) {
        this.active_effects = data?.active_effects ?? "";
        this.alignment = data?.alignment ?? "";
        this.background = data?.background ?? "";
        this.level = data?.level ?? 1;
        this.name = data?.name ?? "";
        this.class = data?.class ?? "";
        this.quick_notes = data?.quick_notes ?? "";
        this.species = data?.species ?? "";
        this.character_appearance = data?.character_appearance ?? "";
    }
}