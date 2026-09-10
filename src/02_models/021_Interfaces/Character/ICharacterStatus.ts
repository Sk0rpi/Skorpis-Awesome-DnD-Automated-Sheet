export interface ICharacterStatus {
    type: string;
    base: number;
    effect: number;
    pre_total_extra: string;
    post_total_extra: string;
    read_only_base: boolean;

    get total(): number;
}