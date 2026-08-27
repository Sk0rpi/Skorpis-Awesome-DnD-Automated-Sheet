import {ICharacterStatus} from "../../021_Interfaces/Character/ICharacterStatus";

export class CharacterStatus implements ICharacterStatus {
    ac_base?: number;
    ac_effect?: number;
    current_hit_die?: string;
    death_save_failure?: number;
    death_save_success?: number;
    hp_current?: number;
    hp_max_base?: number;
    hp_max_effect?: number;
    hp_temp?: number;
    initiative_effect?: number;
    maximum_hit_die?: string;
    speed_base?: number;
    speed_effect?: number;

    constructor(
        data: Partial<ICharacterStatus>,
    ) {
        this.ac_base = data.ac_base;
        this.ac_effect = data.ac_effect;
        this.current_hit_die = data.current_hit_die;
        this.death_save_failure = data.death_save_failure;
        this.death_save_success = data.death_save_success;
        this.hp_current = data.hp_current;
        this.hp_max_base = data.hp_max_base;
        this.hp_max_effect = data.hp_max_effect;
        this.hp_temp = data.hp_temp;
        this.initiative_effect = data.initiative_effect;
        this.maximum_hit_die = data.maximum_hit_die;
        this.speed_base = data.speed_base;
        this.speed_effect = data.speed_effect;
    }
}