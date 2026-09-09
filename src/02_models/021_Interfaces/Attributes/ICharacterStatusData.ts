export interface ICharacterStatusData {
    type: string;
    base: number;
    effect: number;
    color: string;
    pre_total_extra: string;
    post_total_extra: string;
    read_only_base: boolean;

    get total(): number;
}