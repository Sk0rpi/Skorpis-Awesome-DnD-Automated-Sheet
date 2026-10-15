export function bindSpellEvents(character: Character): void {
    const spellsAddNew = document.getElementById("spells-add-new") as HTMLButtonElement;

    spellsAddNew.addEventListener("click", () => {
        const spellsLevelInputNew = document.getElementById("spells-level-input-new") as HTMLInputElement;
        const spellsNameInputNew = document.getElementById("spells-name-input-new") as HTMLInputElement;
        const spellsCastingTimeInputNew = document.getElementById("spells-casting-time-input-new") as HTMLInputElement;
        const spellsRangeInputNew = document.getElementById("spells-range-input-new") as HTMLInputElement;
        const spellsConcCheckboxNew = document.getElementById("spells-conc-checkbox-new") as HTMLInputElement;
        const spellsVCheckboxNew = document.getElementById("spells-v-checkbox-new") as HTMLInputElement;
        const spellsSCheckboxNew = document.getElementById("spells-s-checkbox-new") as HTMLInputElement;
        const spellsMCheckboxNew = document.getElementById("spells-m-checkbox-new") as HTMLInputElement;
        const spellsNotesInputNew = document.getElementById("spells-notes-input-new") as HTMLTextAreaElement;

        const level = spellsLevelInputNew.value;
        const name = spellsNameInputNew.value;
        const casting_time = spellsCastingTimeInputNew.value;
        const range = spellsRangeInputNew.value;
        const concentration = spellsConcCheckboxNew.checked;
        const verbal = spellsVCheckboxNew.checked;
        const somatic = spellsSCheckboxNew.checked;
        const material = spellsMCheckboxNew.checked;
        const notes = spellsNotesInputNew.value;

        this.viewModel.handleNewSpell(level, name, casting_time, range, concentration, verbal, somatic, material, notes);
    });

    Object.entries(character.spells).forEach(([spellName, spell]) => {
        const spellDelete = document.getElementById(`spells-remove-${spellName}`) as HTMLButtonElement;

        spellDelete.addEventListener("click", (event) => {
            const button = event.currentTarget as HTMLButtonElement;
            this.viewModel.handleRemoveSpell(button.id);
        });

        const spellsLevelInput = document.getElementById(`spells-level-input-${spellName}`) as HTMLInputElement;
        const spellsNameInput = document.getElementById(`spells-name-input-${spellName}`) as HTMLInputElement;
        const spellsCastingTimeInput = document.getElementById(`spells-casting-time-input-${spellName}`) as HTMLInputElement;
        const spellsRangeInput = document.getElementById(`spells-range-input-${spellName}`) as HTMLInputElement;
        const spellsNotesInput = document.getElementById(`spells-notes-input-${spellName}`) as HTMLTextAreaElement;
        const spellsConcentratingButton = document.getElementById(`spells-concentrating-button-${spellName}`) as HTMLButtonElement;
        const spellsConcentratingCheckbox = document.getElementById(`spells-concentrating-checkbox-${spellName}`) as HTMLInputElement;

        spellsConcentratingButton?.addEventListener("click", (event) => {
            if (spellsConcentratingCheckbox) {
                spellsConcentratingCheckbox.click()
            }
        })

        spellsConcentratingCheckbox?.addEventListener("click", (event) => {
            const target = event.target as HTMLInputElement;
            this.viewModel.handleSpellCheckboxChange(target.id, target.checked);
        })

        addAdvancedEventListener(spellsLevelInput, (id, val) => this.viewModel.handleSpellInput(id, val));
        addAdvancedEventListener(spellsNameInput, (id, val) => this.viewModel.handleSpellInput(id, val));
        addAdvancedEventListener(spellsCastingTimeInput, (id, val) => this.viewModel.handleSpellInput(id, val));
        addAdvancedEventListener(spellsRangeInput, (id, val) => this.viewModel.handleSpellInput(id, val));
        addAdvancedEventListener(spellsNotesInput, (id, val) => this.viewModel.handleSpellInput(id, val));

        const spellsConcCheckbox = document.getElementById(`spells-conc-checkbox-${spellName}`) as HTMLInputElement;
        const spellsVCheckbox = document.getElementById(`spells-v-checkbox-${spellName}`) as HTMLInputElement;
        const spellsSCheckbox = document.getElementById(`spells-s-checkbox-${spellName}`) as HTMLInputElement;
        const spellsMCheckbox = document.getElementById(`spells-m-checkbox-${spellName}`) as HTMLInputElement;

        spellsConcCheckbox?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            this.viewModel.handleSpellCheckboxChange(target.id, target.checked);
        });

        spellsVCheckbox?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            this.viewModel.handleSpellCheckboxChange(target.id, target.checked);
        });

        spellsSCheckbox?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            this.viewModel.handleSpellCheckboxChange(target.id, target.checked);
        });

        spellsMCheckbox?.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            this.viewModel.handleSpellCheckboxChange(target.id, target.checked);
        });
    });
}