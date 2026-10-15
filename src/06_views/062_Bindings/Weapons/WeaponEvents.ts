import {addAdvancedEventListener} from "../../../07_services/Util";
import {CharacterSheetViewModel} from "../../../03_viewmodels/CharacterSheet.ViewModel";

export function bindWeaponEvents(character: Character, viewModel: CharacterSheetViewModel): void {
    const weaponsAddNew = document.getElementById("weapons-add-new") as HTMLButtonElement;

    weaponsAddNew.addEventListener("click", (event) => {
        const weaponsNameInputNew = document.getElementById("weapons-name-input-new") as HTMLInputElement;
        const weaponsTypeInputNew = document.getElementById("weapons-type-input-new") as HTMLSelectElement;
        const weaponsModTypeInputNew = document.getElementById("weapons-mod-type-input-new") as HTMLSelectElement;
        const weaponsEffectInputNew = document.getElementById("weapons-effect-input-new") as HTMLInputElement;
        const weaponsEnhancementInputNew = document.getElementById("weapons-enhancement-input-new") as HTMLInputElement;
        const weaponsDamageDiceInputNew = document.getElementById("weapons-damage-dice-input-new") as HTMLInputElement;

        const name = weaponsNameInputNew.value;
        const type = weaponsTypeInputNew.value;
        const mod_type = weaponsModTypeInputNew.value;
        const effect = weaponsEffectInputNew.value;
        const enhancement = weaponsEnhancementInputNew.value;
        const damage_dice = weaponsDamageDiceInputNew.value;

        viewModel.handleNewWeapon(name, type as WeaponType, mod_type as AttributeType, effect, enhancement, damage_dice);
    })

    const weaponsAddPropertyNew = document.getElementById("weapons-add-property-new") as HTMLInputElement;

    addAdvancedEventListener(weaponsAddPropertyNew, (id, val) => viewModel.handleAddNewTempProperty(id, val));

viewModel.tempProperties.forEach(property => {
    const weaponsRemoveTempProperty = document.getElementById(`weapons-remove-temp-property-${property}`) as HTMLButtonElement;

    if(!weaponsRemoveTempProperty) return;

    weaponsRemoveTempProperty.addEventListener("click", (event) => {
        const button = event.currentTarget as HTMLButtonElement;
        viewModel.handleRemoveProperty(button.id);
    })
})

Object.entries(character.weapons).forEach(([name, weapon]) => {
    const weaponDelete = document.getElementById(`weapons-remove-${name}`) as HTMLButtonElement;

    weaponDelete.addEventListener("click", (event) => {
        const button = event.currentTarget as HTMLButtonElement;
        viewModel.handleRemoveWeapon(button.id);
    })

    const weaponsNameInput = document.getElementById(`weapons-name-input-${name}`) as HTMLInputElement;
    const weaponsTypeInput = document.getElementById(`weapons-type-input-${name}`) as HTMLInputElement;
    const weaponsModTypeInput = document.getElementById(`weapons-mod-type-input-${name}`) as HTMLInputElement;
    const weaponsEffectInput = document.getElementById(`weapons-effect-input-${name}`) as HTMLInputElement;
    const weaponsEnhancementInput = document.getElementById(`weapons-enhancement-input-${name}`) as HTMLInputElement;
    const weaponsDamageDiceInput = document.getElementById(`weapons-damage-dice-input-${name}`) as HTMLInputElement;
    const weaponsAddProperty = document.getElementById(`weapons-add-property-${name}`) as HTMLInputElement;

    addAdvancedEventListener(weaponsNameInput, (id, val) => viewModel.handleWeaponInput(id, val));
    addAdvancedEventListener(weaponsTypeInput, (id, val) => viewModel.handleWeaponInput(id, val));
    addAdvancedEventListener(weaponsModTypeInput, (id, val) => viewModel.handleWeaponInput(id, val));
    addAdvancedEventListener(weaponsEffectInput, (id, val) => viewModel.handleWeaponInput(id, val));
    addAdvancedEventListener(weaponsEnhancementInput, (id, val) => viewModel.handleWeaponInput(id, val));
    addAdvancedEventListener(weaponsDamageDiceInput, (id, val) => viewModel.handleWeaponInput(id, val));
    addAdvancedEventListener(weaponsAddProperty, (id, val) => viewModel.handleWeaponInput(id, val));

    Object.entries(weapon.properties).forEach(([key, property]) => {
        const weaponProperty = document.getElementById(`weapons-remove-property-${name}-${property}`) as HTMLInputElement;

        if(!weaponProperty) return;

        weaponProperty.addEventListener("click", (event) => {
            const button = event.currentTarget as HTMLButtonElement;
            viewModel.handleRemoveProperty(button.id);
        })
    })
})
}