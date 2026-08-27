import {IEntity} from "../../021_Interfaces/Entities/IEntity";

export class Entity implements IEntity {
    ac?: number;
    current_capacity?: number;
    hp?: number;
    inventory?: string;
    max_capacity?: number;
    name?: string;
    notes?: string;
    speed?: number;

    constructor(
        data: Partial<IEntity>
    ) {
        this.ac = data.ac;
        this.current_capacity = data.current_capacity;
        this.hp = data.hp;
        this.inventory = data.inventory;
        this.max_capacity = data.max_capacity;
        this.name = data.name;
        this.notes = data.notes;
        this.speed = data.speed;
    }
}