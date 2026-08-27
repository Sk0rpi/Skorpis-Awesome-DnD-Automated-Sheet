export interface ICharacterStatus {
  speed_base?: number;
  speed_effect?: number;
  ac_base?: number;
  ac_effect?: number;
  initiative_effect?: number;
  hp_max_base?: number;
  hp_max_effect?: number;
  hp_current?: number;
  hp_temp?: number;
  maximum_hit_die?: string;
  current_hit_die?: string;
  death_save_failure?: number;
  death_save_success?: number;
}