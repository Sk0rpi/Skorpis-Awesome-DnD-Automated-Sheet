import {IEntity} from "../../021_Interfaces/Entities/IEntity";

export class Entity implements IEntity {
    ac: number;
    current_capacity: number;
    hp: number;
    inventory: string;
    max_capacity: number;
    name: string;
    notes: string;
    speed: number;

    constructor(
        data?: IEntity
    ) {
        this.ac = data?.ac ?? 0;
        this.current_capacity = data?.current_capacity ?? 0;
        this.hp = data?.hp ?? 0;
        this.inventory = data?.inventory ?? "";
        this.max_capacity = data?.max_capacity ?? 0;
        this.name = data?.name ?? "";
        this.notes = data?.notes ?? "";
        this.speed = data?.speed ?? 0;
    }
}
