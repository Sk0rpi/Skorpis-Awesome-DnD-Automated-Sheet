import {addAdvancedEventListener} from "../../../07_services/Util";

export function bindCurrencyEvents(character: Character): void {
    Object.entries(character.currency).forEach(([currencyName, currency]) => {
        const currencyTypeInput = document.getElementById(`currency-input-${currencyName}`) as HTMLInputElement;
        if(!currencyTypeInput) return;
        addAdvancedEventListener(currencyTypeInput, (id, val) => this.viewModel.handleCurrencyEvents(id, val));
    })
}