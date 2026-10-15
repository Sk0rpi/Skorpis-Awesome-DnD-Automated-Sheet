import {ALL_PROFICIENCY_TYPES} from "../../../02_models/023_Types/Proficiencies/AnyProficiencyTypes";

export function bindProficiencyCheckboxesEvents(character: Character): void {
    Object.entries(ALL_PROFICIENCY_TYPES).forEach(([typeName, typeGroup]) => {
        Object.entries(typeGroup).forEach(([proficiencyKey, attribute]) => {

            const proficiency = proficiencyKey as keyof typeof character.proficiencies;
            const checkbox_1 = document.getElementById(`${proficiency}-checkbox-1`) as HTMLInputElement | null;
            const checkbox_2 = document.getElementById(`${proficiency}-checkbox-2`) as HTMLInputElement | null;

            const currentProfLevel = character.proficiencies[proficiency]?.proficient ?? 0;

            if (checkbox_1) checkbox_1.checked = currentProfLevel >= 1;
            if (checkbox_2) checkbox_2.checked = currentProfLevel === 2;

            checkbox_2?.addEventListener('change', (event: Event) => {
                const target = event.target as HTMLInputElement;
                const nextLevel = target.checked ? 2 : 1;

                this.viewModel.handleProficiencyChange(proficiency, nextLevel);
            });

            checkbox_1?.addEventListener('change', (event: Event) => {
                const target = event.target as HTMLInputElement;
                const nextLevel = target.checked ? 1 : 0;

                this.viewModel.handleProficiencyChange(proficiency, nextLevel);
            });
        });
    });
}