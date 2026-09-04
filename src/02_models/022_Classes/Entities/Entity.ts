import {IEntity} from "../../021_Interfaces/Entities/IEntity";

export class Entity implements IEntity {
    ac: number;
    current_capacity: number;
    hp_max: number;
    hp_current: number;
    inventory: string;
    max_capacity: number;
    name: string;
    notes: string;
    speed: string;

    constructor(
        data?: IEntity
    ) {
        this.ac = data?.ac ?? 0;
        this.current_capacity = data?.current_capacity ?? 0;
        this.hp_max = data?.hp_max ?? 0;
        this.hp_current = data?.hp_current ?? 0;
        this.inventory = data?.inventory ?? "";
        this.max_capacity = data?.max_capacity ?? 0;
        this.name = data?.name ?? "";
        this.notes = data?.notes ?? "";
        this.speed = data?.speed ?? "";
    }
}
