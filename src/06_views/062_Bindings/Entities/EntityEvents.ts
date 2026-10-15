export function bindEntityEvents(character: Character): void {
    const entitiesAddNew = document.getElementById("entities-add-new") as HTMLButtonElement;

    entitiesAddNew.addEventListener("click", () => {
        const entitiesNameInputNew = document.getElementById("entities-name-input-new") as HTMLInputElement;
        const entitiesACInputNew = document.getElementById("entities-ac-input-new") as HTMLInputElement;
        const entitiesHPCurrentInputNew = document.getElementById("entities-hp_current-input-new") as HTMLInputElement;
        const entitiesHPMaxInputNew = document.getElementById("entities-hp_max-input-new") as HTMLInputElement;
        const entitiesCapacityCurrentInputNew = document.getElementById("entities-capacity_current-input-new") as HTMLInputElement;
        const entitiesCapacityMaxInputNew = document.getElementById("entities-capacity_max-input-new") as HTMLInputElement;
        const entitiesNotesInputNew = document.getElementById("entities-notes-input-new") as HTMLTextAreaElement;
        const entitiesInventoryInputNew = document.getElementById("entities-inventory-input-new") as HTMLTextAreaElement;
        const entitiesSpeedInputNew = document.getElementById("entities-speed-input-new") as HTMLInputElement;

        const name = entitiesNameInputNew.value.replaceAll(`"`, `„`);
        const ac = entitiesACInputNew.value;
        const hp_current = entitiesHPCurrentInputNew.value;
        const hp_max = entitiesHPMaxInputNew.value;
        const capacity_current = entitiesCapacityCurrentInputNew.value;
        const capacity_max = entitiesCapacityMaxInputNew.value;
        const notes = entitiesNotesInputNew.value;
        const inventory = entitiesInventoryInputNew.value;
        const speed = entitiesSpeedInputNew.value;

        this.viewModel.handleNewEntity(name, ac, hp_current, hp_max, capacity_current, capacity_max, notes, inventory, speed);
    });

    Object.entries(character.entities).forEach(([entityName, entity]) => {
        const entityDelete = document.getElementById(`entities-remove-${entityName}`) as HTMLButtonElement;

        if(!entityDelete) return;

        entityDelete.addEventListener("click", (event) => {
            const button = event.currentTarget as HTMLButtonElement;
            this.viewModel.handleRemoveEntity(button.id);
        });

        const entitiesNameInput = document.getElementById(`entities-name-input-${entityName}`) as HTMLInputElement;
        const entitiesACInput = document.getElementById(`entities-ac-input-${entityName}`) as HTMLInputElement;
        const entitiesHPCurrentInput = document.getElementById(`entities-hp_current-input-${entityName}`) as HTMLInputElement;
        const entitiesHPMaxInput = document.getElementById(`entities-hp_max-input-${entityName}`) as HTMLInputElement;
        const entitiesCapacityCurrentInput = document.getElementById(`entities-capacity_current-input-${entityName}`) as HTMLInputElement;
        const entitiesCapacityMaxInput = document.getElementById(`entities-capacity_max-input-${entityName}`) as HTMLInputElement;
        const entitiesNotesInput = document.getElementById(`entities-notes-input-${entityName}`) as HTMLTextAreaElement;
        const entitiesInventoryInput = document.getElementById(`entities-inventory-input-${entityName}`) as HTMLTextAreaElement;
        const entitiesSpeedInput = document.getElementById(`entities-speed-input-${entityName}`) as HTMLInputElement;

        addAdvancedEventListener(entitiesNameInput, (id, val) => this.viewModel.handleEntityInput(id, val));
        addAdvancedEventListener(entitiesACInput, (id, val) => this.viewModel.handleEntityInput(id, val));
        addAdvancedEventListener(entitiesHPCurrentInput, (id, val) => this.viewModel.handleEntityInput(id, val));
        addAdvancedEventListener(entitiesHPMaxInput, (id, val) => this.viewModel.handleEntityInput(id, val));
        addAdvancedEventListener(entitiesCapacityCurrentInput, (id, val) => this.viewModel.handleEntityInput(id, val));
        addAdvancedEventListener(entitiesCapacityMaxInput, (id, val) => this.viewModel.handleEntityInput(id, val));
        addAdvancedEventListener(entitiesNotesInput, (id, val) => this.viewModel.handleEntityInput(id, val));
        addAdvancedEventListener(entitiesInventoryInput, (id, val) => this.viewModel.handleEntityInput(id, val));
        addAdvancedEventListener(entitiesSpeedInput, (id, val) => this.viewModel.handleEntityInput(id, val));
    });
}