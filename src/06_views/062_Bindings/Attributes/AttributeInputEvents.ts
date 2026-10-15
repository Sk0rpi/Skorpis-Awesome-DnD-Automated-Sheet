import {ALL_ATTRIBUTE_TYPES} from "../../../02_models/023_Types/Attributes/AttributeTypes";

export function bindAttributeInputEvents(character: Character): void {
    Object.entries(ALL_ATTRIBUTE_TYPES).forEach(([key, value]) => {
        const checkbox = document.getElementById(value + "-checkbox") as HTMLInputElement | null;
        if (checkbox) checkbox.checked = character.attributes[value].isSave;

        checkbox?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            const targetID = target.id;
            const targetType = targetID.split("-")[0] as AttributeType;

            this.viewModel.handleAttributeSaveCheckboxChange(targetType, target.checked);
        });

        const checkboxButton = document.getElementById(value + "-checkbox-button") as HTMLInputElement | null;
        checkboxButton?.addEventListener("click", (event) => {
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event("change"));
            }
        })

        const input = document.getElementById(value + "-input") as HTMLInputElement | null;

        input?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            const targetID = target.id;
            const targetType = targetID.split("-")[0] as AttributeType;

            if (!isNumeric(target.value)) {
                target.value = character.attributes[targetType].effect.toString();
                return;
            }

            const newAttributeEffect = Number(target.value);

            this.viewModel.handleAttributeInputChange(targetType, newAttributeEffect);
        });

        const inputBase = document.getElementById(value + "-base-input") as HTMLInputElement;

        inputBase?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            const targetID = target.id;
            const targetType = targetID.split("-")[0] as AttributeType;

            if (!isNumeric(target.value)) {
                target.value = character.attributes[targetType].effect.toString();
                return;
            }

            const newAttributeBase = Number(target.value);

            this.viewModel.handleAttributeInputBaseChange(targetType, newAttributeBase);
        })
    })
}