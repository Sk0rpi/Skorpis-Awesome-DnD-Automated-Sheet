import {ICharacterCurrency} from "../../021_Interfaces/Character/ICharacterCurrency";

export class CharacterCurrency implements ICharacterCurrency {
    amount?: number;
    color?: string;
    name?: string;

    constructor(
        data: Partial<ICharacterCurrency>
    ) {
        this.amount = data.amount;
        this.color = data.color;
        this.name = data.name;
    }
}