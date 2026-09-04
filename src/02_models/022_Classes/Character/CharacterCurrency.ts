import {ICharacterCurrency} from "../../021_Interfaces/Character/ICharacterCurrency";
import {CurrencyType} from "../../023_Types/Character/CurrencyTypes";

export class CharacterCurrency implements ICharacterCurrency {
    amount: number;
    name: CurrencyType;

    constructor(
        data?: ICharacterCurrency
    ) {
        this.amount = data?.amount ?? 0;
        this.name = data?.name ?? "NONE" as CurrencyType;
    }
}
