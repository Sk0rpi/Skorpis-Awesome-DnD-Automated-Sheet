import {addAdvancedEventListener} from "../../../07_services/Util";

export function bindSpellCastingEvents(): void {
    const modTypeInput = document.getElementById('spell-casting-mod-type-input') as HTMLInputElement;
    const concentrationCheckbox = document.getElementById('spell-casting-concentrating-checkbox') as HTMLInputElement;

    addAdvancedEventListener(modTypeInput, (id, val) => this.viewModel.handleSpellCastingEvent(id, val));

    concentrationCheckbox.addEventListener('change', (event): void => {
        const target = event.currentTarget as HTMLInputElement;
        const id = target.id;
        this.viewModel.handleSpellCastingEvent(id, "")
    })

    const checkboxButton = document.getElementById("spell-casting-concentrating-checkbox-button") as HTMLInputElement | null;
    checkboxButton?.addEventListener("click", (event) => {
        if (concentrationCheckbox) {
            concentrationCheckbox.checked = !concentrationCheckbox.checked;
            concentrationCheckbox.dispatchEvent(new Event("change"));
        }
    })
}